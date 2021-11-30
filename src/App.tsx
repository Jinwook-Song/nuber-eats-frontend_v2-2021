import { useReactiveVar } from "@apollo/client";
import LoggedOutRouter from "./routers/logged-out-router";
import LoggedInRouter from "./routers/logged-in-router";
import { isLoggedInVar } from "./apollo";

function App() {
  /**
   * React components can also include reactive variable values in their state directly, without wrapping them in a query.
   */
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
