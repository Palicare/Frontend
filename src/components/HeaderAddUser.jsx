import "../styles/AddUserPage.css"; 
import BackIcon from "../Assets/BackIcon.svg";
import AddUserIcon from "../Assets/AddUserIcon.png";
import Microphone from "../Assets/Microphone.svg";
import PaliLogo1 from "../Assets/PaliLogo1.png";
import Rechts_profile from "../Assets/Rechts_profile.svg";

const HeaderAddUser = () => {
  return (
    <header className="header-container">
      
      <img src={BackIcon} alt="Back" className="icon" />

       {/* add micron  */}
      <div className="icon-group">
        <div className="icon-border">
          <img src={AddUserIcon} alt="Add User" className="icon" />
        </div>
        <div className="icon-border">
          <img src={Microphone} alt="Microphone" className="icon" />
        </div>
      </div>

      {/* mitte Logo */}
      <div className="logo-container">
        <img src={PaliLogo1} alt="PalliCare Logo" className="logo" />
      </div>

      <div className="icon-group">
        {/* rechts profile */}        
            <div className="profile-border"> 
            <img src={Rechts_profile} alt="Profile" className="profile-icon" />
            </div> 
        </div>      
    </header>
  );
};

export default HeaderAddUser;
