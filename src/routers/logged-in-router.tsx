import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import Header from "../components/header";
import useMyProfile from "../hooks/useMyProfile";
import Restaurants from "../pages/client/restaurants";
import ConfirmEmail from "../pages/user/confirm-email";
import UpdateProfile from "../pages/user/edit-profile";
import { UBER_AUTH_TOKEN } from "../types";
import { UserRole } from "../__generated__/globalTypes";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Restaurants />} />;
      <Route path="/confirm" element={<ConfirmEmail />} />;
      <Route path="/edit-profile" element={<UpdateProfile />} />;
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function LoggedInRouter() {
  const { error, loading, data: myProfileResult } = useMyProfile();

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
      <Header />
      {myProfileResult.myProfile.role === UserRole.Client && <ClientRoutes />}
    </BrowserRouter>
  );
}

export default LoggedInRouter;
