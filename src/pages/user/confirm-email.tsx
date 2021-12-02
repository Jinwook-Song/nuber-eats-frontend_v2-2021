import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  VerifyEmail,
  VerifyEmailVariables,
} from "../../__generated__/VerifyEmail";
import useMyProfile from "../../hooks/useMyProfile";
import { Helmet } from "react-helmet-async";

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

function ConfirmEmail() {
  const { data: userData, refetch } = useMyProfile();
  const client = useApolloClient();
  const navigate = useNavigate();
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
    refetch().then(() => navigate(-1));
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
      <Helmet>
        <title>Verify Email | Uber Eats</title>
      </Helmet>
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
}

export default ConfirmEmail;
