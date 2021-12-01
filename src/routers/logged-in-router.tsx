import { gql, useQuery } from "@apollo/client";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { UBER_AUTH_TOKEN } from "../types";
import { MyProfileQuery } from "../__generated__/MyProfileQuery";

const MY_PROFILE_QUERY = gql`
  query MyProfileQuery {
    myProfile {
      id
      email
      role
      verified
    }
  }
`;

function LoggedInRouter() {
  const {
    error,
    loading,
    data: myProfileResult,
  } = useQuery<MyProfileQuery>(MY_PROFILE_QUERY);

  // invalid Token
  if (error) {
    localStorage.removeItem(UBER_AUTH_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);
  }

  if (!myProfileResult || loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wider">Loading...</span>
      </div>
    );
  }
  const onClick = () => {
    localStorage.removeItem(UBER_AUTH_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);
  };
  return (
    <div>
      <h1>{myProfileResult.myProfile.role}</h1>
      <button onClick={onClick}>Logout &rarr;</button>
    </div>
  );
}

export default LoggedInRouter;
