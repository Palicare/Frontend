
import "../styles/login.css";
import Logo from "../Assets/LOGO.svg"
import Person from "../Assets/Person.svg"
import { useNavigate } from "react-router-dom";




export default function() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/patientenprofile");
    };

    return <>
    <div className="logoContainer">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
        <div className="loginContainer">
      
      <div className="loginArea">
        <div className="userIcon">
          <img src={Person} alt="User Icon" />
        </div>
        <input type="text" placeholder="NUTZERNAME" className="inputField" />
        <input type="password" placeholder="PASSWORT" className="inputField" />
        <div className="loginResetButtons">
            <button className="pws-reset-button">Passwort vergessen</button>
            <button className="login-button" onClick={handleLogin}>Einloggen</button>
        </div>
      </div>
    </div>
    </>
}