import { useEffect } from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  VerifyEmail,
  VerifyEmailVariables,
} from "../../__generated__/VerifyEmail";
import useMyProfile from "../../hooks/useMyProfile";

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

function ConfirmEmail() {
  const { data: userData } = useMyProfile();
  const client = useApolloClient();
  const onCompleted = (data: VerifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.myProfile.id) {
      // write caching
      client.writeFragment({
        id: `User:${userData.myProfile.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
    }
  };

  const [verifyEmailMutationFn] = useMutation<
    VerifyEmail,
    VerifyEmailVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    const code = window.location.href.split("code=")[1];
    if (code) {
      verifyEmailMutationFn({
        variables: {
          input: {
            code,
          },
        },
      });
    }
  }, [verifyEmailMutationFn]);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
}

export default ConfirmEmail;
