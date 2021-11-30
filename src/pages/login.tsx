function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-md py-8 rounded-lg text-center">
        <h3 className=" text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5 px-5">
          <input
            placeholder="Email"
            className="mb-3 bg-gray-100 shadow-inner   border-2 focus:border-opacity-60 focus:border-green-600 focus:outline-none  py-3 px-5 rounded-lg"
          />
          <input
            placeholder="Password"
            className=" bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-60 focus:border-green-600  py-3 px-5 rounded-lg"
          />
          <button className="mt-3 py-3 px-5 bg-gray-800 text-white text-lg rounded-lg focus:outline-none hover:opacity-90">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
