import Logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useMyProfile from "../hooks/useMyProfile";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { UBER_AUTH_TOKEN } from "../types";
import { useEffect, useState } from "react";

function Header() {
  const { data } = useMyProfile();
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  // refetch();

  // logout
  const onClick = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem(UBER_AUTH_TOKEN);
      authTokenVar(null);
      isLoggedInVar(false);

      navigate("/");
    }
  };

  const onScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {!data?.myProfile.verified && (
        <div className="bg-red-500 p-8 text-center text-lg text-white opacity-95 fixed top-0 w-full z-20">
          <span>Please verify your email.</span>
        </div>
      )}
      <header
        className="py-4 fixed top-0 w-full z-10 transition-colors"
        style={{
          backgroundColor: scrollY >= 100 ? "white" : "transparent",
        }}
      >
        <div className="w-full px-4 xl:px-2 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={Logo} className="w-40" alt="uber eats" />
          </Link>
          <input
            type="Search"
            placeholder="Search Restaurants..."
            className="w-2/5 p-4 focus:outline-none border-b-2 text-lime-600 bg-gray-100 focus:bg-gray-300 focus:placeholder-gray-50 transition-colors "
            style={{
              opacity: scrollY >= 500 ? "1" : "0",
              transition: "opacity 0.5s ease-in-out",
            }}
          />
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
