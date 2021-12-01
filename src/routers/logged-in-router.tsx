import { gql, useQuery } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import Restaurants from "../pages/client/restaurants";
import { UBER_AUTH_TOKEN } from "../types";
import { UserRole } from "../__generated__/globalTypes";
import { MyProfileQuery } from "../__generated__/MyProfileQuery";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Restaurants />} />;
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

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

  return (
    <BrowserRouter>
      {myProfileResult.myProfile.role === UserRole.Client && <ClientRoutes />}
    </BrowserRouter>
  );
}

export default LoggedInRouter;
