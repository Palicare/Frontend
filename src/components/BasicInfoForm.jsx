import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../styles/AddUserPage.css";
import AddCamera from "../Assets/AddCamera.png";

const BasicInforForm = ({ patientData, setPatientData }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get navigation state

  useEffect(() => {
    if (location.state && location.state.capturedImage) {
      setPatientData((prevData) => ({
        ...prevData,
        profileImage: location.state.capturedImage, // Save image in patientData
      }));
    }
  }, [location.state, setPatientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageClick = () => {
    navigate(`/adduser/camera/`);
  };

  return (
    <div className="personal-data-container">
      {/* Upload Image Section */}
      <div className="image-upload" onClick={handleImageClick}>
        <img
          src={patientData.profileImage || AddCamera} // Use uploaded image if available
          alt="Upload Image"
          className="image-upload"
        />
      </div>

      {/* Personal Info Form */}
      <div className="personal-data-form">
        <h2 className="form-title">Persönliche Daten:</h2>
        <hr className="linie-divider" />
        <div className="form-grid">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" placeholder="Name eingeben" name="firstName" value={patientData.firstName || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Nachname:</label>
            <input type="text" placeholder="Nachname eingeben" name="lastName" value={patientData.lastName || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Nationalität:</label>
            <input type="text" placeholder="Nationalität eingeben" name="nationality" value={patientData.nationality || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Geburtsdatum:</label>
            <input type="text" placeholder="jjj.mm.tt" name="birthDate" value={patientData.birthDate || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Geschlecht:</label>
            <select name="gender" value={patientData.gender || ""} onChange={handleChange}>
              <option value="" disabled hidden>Bitte wählen...</option>
              <option>Weiblich</option>
              <option>Männlich</option>
              <option>Divers</option>
            </select>
          </div>

          <div className="form-group">
            <label>Raumnummer:</label>
            <input type="text" placeholder="Raumnummer" name="roomNumber" value={patientData.roomNumber || ""} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInforForm;
