import Helmet from "react-helmet";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../components/form-error";
import Logo from "../images/logo.svg";
import Button from "./button";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../__generated__/CreateAccountMutation";
import { UserRole } from "../__generated__/globalTypes";
import { EMAIL_VALIDATION_CHECK } from "../components/types";

// Define mutation
const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      error
      ok
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

function CreateAccount() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const navigate = useNavigate();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      navigate("/login");
    }
  };

  const [
    createAccountMutationFn,
    { loading, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutationFn({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };
  return (
    <div className="h-full flex items-center flex-col mt-7 lg:mt-32 ">
      <Helmet>
        <title>Create Account | Uber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={Logo} alt="uber eats" className="w-48 mb-9" />
        <h4 className="w-full font-medium text-left text-2xl mb-7">시작하기</h4>
        <h6 className="w-full font-light text-left text-sm mb-2">
          이메일을 입력하세요(필수)
        </h6>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mb-3 w-full"
        >
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: EMAIL_VALIDATION_CHECK,
                message: "Please enter a valid email.",
              },
            })}
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 4,
                message: "Password should contain more than 4 chars.",
              },
            })}
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <select
            {...register("role", { required: "Shold select a role." })}
            className="bg-transparent input"
          >
            {Object.keys(UserRole).map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <Button
            canClick={isValid}
            loading={false}
            actionText="Create Account"
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          Already use Uber?{" "}
          <Link to="/login" className="text-lime-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
