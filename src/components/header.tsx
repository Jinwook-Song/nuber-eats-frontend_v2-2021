import Logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useMyProfile from "../hooks/useMyProfile";

function Header() {
  const { data } = useMyProfile();
  return (
    <>
      {!data?.myProfile.verified && (
        <div className="bg-red-500 p-9 text-center text-xs text-white opacity-95 fixed top-0 w-full">
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
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
