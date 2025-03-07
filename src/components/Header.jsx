import paliLogo1 from "../assets/PaliLogo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/components/header.css";
import BackButton from "../assets/BackButton.svg";
import AddPatient from "../assets/AddPatient.svg";
import Profile from "../assets/Profile.svg";
import Microphone from "../assets/Microphone.svg";

const Header = () => {
  return (
    <div className="header-container">
      <div className="icon-container">
        <img src={BackButton} alt="Back Button" />
        <div className="icon-border" style={{marginLeft: '30px'}}>
          <img src={AddPatient} alt="Add Patient" />
        </div>
        <div className="icon-border" style={{marginLeft: '10px'}}>
          <img src={Microphone} alt="Microphone" />
        </div>
      </div>
      <img className="logo" src={paliLogo1} alt="Logo" />
      <div className="icon-border">
        <img src={Profile} alt="Profile" />
      </div>
    </div>
  );
};

export default Header;
