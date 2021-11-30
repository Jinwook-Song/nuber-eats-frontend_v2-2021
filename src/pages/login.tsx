function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-md pt-3 pb-6 rounded-lg text-center">
        <h3 className=" text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5 px-5">
          <input placeholder="Email" className="input mb-3" />
          <input placeholder="Password" className="input" />
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
