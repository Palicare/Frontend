import paliLogo1 from "../assets/PaliLogo1.png";
import { useNavigate } from "react-router-dom";
import "../styles/components/header.css";
import BackButton from "../assets/BackButton.svg";
import AddPatient from "../assets/AddPatient.svg";
import Profile from "../assets/Profile.svg";
import Microphone from "../assets/Microphone.svg";

const Header = ({ isHomeScreen }) => {

  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="icon-container">
        {!isHomeScreen && (
          <button onClick={() => navigate(-1)} className="icon-button">
            <img src={BackButton} alt="Back Button" />
          </button>
        )}

        {isHomeScreen && (
          <button onClick={() => navigate("/addUser")} className="icon-button">
          <div className="icon-border">
            <img src={AddPatient} alt="Add Patient" />
          </div>
          </button>
        )}
      </div>
      <img className="logo" src={paliLogo1} alt="Logo" />
      <button onClick={() => navigate()} className="icon-button" style={{marginRight: '40px'}}>
        <div className="icon-border">
          <img src={Profile} alt="Profile" />
        </div>
      </button>
    </div>
  );
};

export default Header;
