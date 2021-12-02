import Logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useMyProfile from "../hooks/useMyProfile";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { UBER_AUTH_TOKEN } from "../types";

function Header() {
  const { data } = useMyProfile();
  const navigate = useNavigate();

  // logout
  const onClick = () => {
    localStorage.removeItem(UBER_AUTH_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);

    navigate("/");
  };

  return (
    <>
      {!data?.myProfile.verified && (
        <div className="bg-red-500 p-8 text-center text-lg text-white opacity-95 fixed top-0 w-full">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-8 fixed top-0 w-full">
        <div className="w-full px-4 xl:px-2 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={Logo} className="w-40" alt="uber eats" />
          </Link>
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon
                icon={faUser}
                className="text-2xl mr-4 hover:opacity-80"
              />
            </Link>
            <button onClick={onClick}>
              <FontAwesomeIcon
                className="text-2xl hover:opacity-80"
                icon={faSignOutAlt}
              />
            </button>
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
