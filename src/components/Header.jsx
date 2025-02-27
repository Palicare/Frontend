import paliLogo1 from "../assets/PaliLogo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header-container">
      <div className="icon-border">
        <FontAwesomeIcon icon={faUserPlus} size="2x" color="white" />
      </div>
      <img className="logo" src={paliLogo1} alt="Logo" />
      <div className="icon-border">
        <FontAwesomeIcon icon={faUser} size="2x" color="white" />
      </div>
    </div>
  );
};

export default Header;
