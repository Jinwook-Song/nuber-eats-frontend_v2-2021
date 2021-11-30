import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

function LoggedOutRouter() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = () => {
    console.log(watch());
    alert("Create account 🎉");
  };
  const onInvalid = () => {
    console.log("Can't create account.");
  };

  return (
    <div>
      <h1>LogIn First</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
                message: "Only gmail allowed.",
              },
            })}
            type="email"
            placeholder="email"
          />
          {errors.email?.message && (
            <span className="font-bold text-red-600">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div>
          <input
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 4,
                message: "Password should contain 4 characters.",
              },
            })}
            type="password"
            placeholder="password"
          />
          {errors.password?.message && (
            <span className="font-bold text-red-600">
              {errors.password?.message}
            </span>
          )}
        </div>
        <button className="bg-yellow-300 text-pink-900">Submit</button>
      </form>
    </div>
  );
}

export default LoggedOutRouter;
