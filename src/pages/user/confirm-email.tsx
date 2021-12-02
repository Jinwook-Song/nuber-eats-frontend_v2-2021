import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  VerifyEmail,
  VerifyEmailVariables,
} from "../../__generated__/VerifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

function ConfirmEmail() {
  const [verifyEmailMutationFn] = useMutation<
    VerifyEmail,
    VerifyEmailVariables
  >(VERIFY_EMAIL_MUTATION);

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
