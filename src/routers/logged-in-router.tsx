import { isLoggedInVar } from "../apollo";

function LoggedInRouter() {
  const onClick = () => {
    isLoggedInVar(false);
  };
  return (
    <div>
      <h1>Logged In</h1>
      <button onClick={onClick}>Logout &rarr;</button>
    </div>
  );
}

export default LoggedInRouter;
