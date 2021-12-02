import Logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="py-8 fixed w-full">
      <div className="w-full px-4 xl:px-2 max-w-screen-xl mx-auto flex justify-between items-center">
        <img src={Logo} className="w-40" alt="uber eats" />
        <span className="text-xs">
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
          </Link>
        </span>
      </div>
    </header>
  );
}

export default Header;
