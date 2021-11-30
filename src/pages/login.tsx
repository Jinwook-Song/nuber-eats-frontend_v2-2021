import { useForm } from "react-hook-form";

interface ILoginForm {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-md pt-3 pb-6 rounded-lg text-center">
        <h3 className=" text-3xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 mt-5 px-5"
        >
          <input
            {...register("email", { required: "Email is required." })}
            type="email"
            placeholder="Email"
            className="input mb-3"
          />
          {errors.email?.message && (
            <span className="mb-2 font-medium text-red-500">
              {errors.email?.message}
            </span>
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
            <span className="mt-2 font-medium text-red-500">
              {errors.password?.message}
            </span>
          )}
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
