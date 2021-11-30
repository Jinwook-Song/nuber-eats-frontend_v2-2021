import { isLoggedInVar } from "../apollo";

function LoggedOutRouter() {
  const onClick = () => {
    isLoggedInVar(true);
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={onClick}>Login &rarr;</button>
    </div>
  );
}

export default LoggedOutRouter;
