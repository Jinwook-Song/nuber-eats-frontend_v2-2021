import { useForm } from "react-hook-form";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import useMyProfile from "../../hooks/useMyProfile";
import Spacing from "../../components/spacing";
import Button from "../../components/button";
import { EMAIL_VALIDATION_CHECK } from "../../types";
import {
  EditProfile,
  EditProfileVariables,
} from "../../__generated__/EditProfile";
import { useNavigate } from "react-router";

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

function UpdateProfile() {
  const { data: myProfileResult } = useMyProfile();
  const client = useApolloClient();
  const navigate = useNavigate();

  const onCompleted = (data: EditProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && myProfileResult) {
      const {
        myProfile: { email: prevEmail, id },
      } = myProfileResult;
      const newEmail = getValues("email");
      // update the cache
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              verified
              email
            }
          `,
          data: {
            verified: false,
            email: newEmail,
          },
        });
      }
    }
    navigate("/");
  };

  const [editProfileMutationFn, { loading }] = useMutation<
    EditProfile,
    EditProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: myProfileResult?.myProfile.email,
    },
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    editProfileMutationFn({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };

  return (
    <>
      <Spacing />
      <div className="mt-52 flex flex-col justify-center items-center">
        <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: EMAIL_VALIDATION_CHECK,
                message: "Please enter a valid email.",
              },
            })}
            className="input"
            type="email"
            placeholder="Email"
          />
          <input
            {...register("password")}
            className="input"
            type="password"
            placeholder="Password"
          />
          <Button
            loading={loading}
            canClick={isValid}
            actionText="Save Profile"
          />
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
