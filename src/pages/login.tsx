import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormError from "../components/form-error";
import Logo from "../images/logo.svg";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";
import Button from "../components/button";
import { EMAIL_VALIDATION_CHECK, UBER_AUTH_TOKEN } from "../types";
import { authTokenVar, isLoggedInVar } from "../apollo";

// Define mutation
const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      // save token
      localStorage.setItem(UBER_AUTH_TOKEN, token!);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutationFn, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutationFn({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      }); // if Valid, this fn exe.
    }
  };
  return (
    <div className="h-full flex items-center flex-col mt-7 lg:mt-32 ">
      <Helmet>
        <title>Login | Uber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={Logo} alt="uber eats" className="w-48 mb-9" />
        <h4 className="w-full font-medium text-left text-2xl mb-7">
          돌아오신 것을 환영합니다
        </h4>
        <h6 className="w-full font-light text-left text-sm mb-2">
          이메일 주소로 로그인하세요.
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
          <Button canClick={isValid} loading={loading} actionText="Log in" />

          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          Uber는 처음이신가요?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            계정 만들기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
