import { authToken, isLoggedInVar } from "../apollo";
import { UBER_AUTH_TOKEN } from "../types";

function LoggedInRouter() {
  const onClick = () => {
    localStorage.removeItem(UBER_AUTH_TOKEN);
    authToken(null);
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
