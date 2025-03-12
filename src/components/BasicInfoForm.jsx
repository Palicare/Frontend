import { useNavigate } from 'react-router-dom';
import "../styles/AddUserPage.css"; 
import AddCamera from "../Assets/AddCamera.png";

const BasicInforForm = ({patientData, setPatientData}) => {

  const navigate = useNavigate(); 

    // 处理输入框变化
    const handleChange = (e) => {
      const { name, value } = e.target;
      setPatientData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };  

    const handleImageClick = () => {
      // Navigiert zur Kamera-Seite
      navigate(`/adduser/camera/${patientData.id}`);
    };

  return (
        <div className="personal-data-container">         
          {/* Upload  upload-icon */}
          <div className="image-upload" onClick={handleImageClick}>
            <img src={AddCamera} alt="Upload Image" className="image-upload" /> 
          </div>

          {/* Personal Info */}
          <div className="personal-data-form">
            <h2 className="form-title">Persönliche Daten:</h2>
            <hr className="linie-divider" />

            <div className="form-grid">

              <div className="form-group">
                <label className=".form-group label">Name:</label>
                <input className=".form-group input"type="text" placeholder="Name eingeben" name="firstName" value={patientData.firstName|| ""} onChange={handleChange}
               />
              </div>

              <div className="form-group">
                <label className=".form-group label">Nachname:</label>
                <input type="text" placeholder="Nachname eingeben" name="lastName" value={patientData.lastName|| ""} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className=".form-group label">Nationalität:</label>
                <input type="text" placeholder="Nationalität eingeben"  name="nationality" value={patientData.nationality|| ""} onChange={handleChange}   />
              </div>

              <div className="form-group">
                <label className=".form-group label">Geburtsdatum:</label>     
                <input  type="text" placeholder="jjj.mm.tt" name="birthDate" value={patientData.birthDate|| ""} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Geschlecht:</label>
                <select name="gender" value={patientData.gender} onChange={handleChange}>
                  <option value="" disabled hidden>Bitte wählen...</option>
                  <option>Weiblich</option>
                  <option>Männlich</option>
                  <option>Divers</option>
                </select>
              </div>

              <div className="form-group">
                <label>Religion:</label>
                <select name="religion" value={patientData.religion} onChange={handleChange}>
                  <option value="" disabled hidden>Bitte wählen...</option>
                  <option>Keine</option>
                  <option>Christentum</option>
                  <option>Islam</option>
                  <option>Buddhism</option>
                  <option>Hinduism</option>
                  <option>Judaism</option>
                  <option>Sikhism</option>
                  <option>Taoism</option>
                  <option>Zoroastrismus</option>
                  <option>Shintoismus</option>
                  <option>Andere</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ernährungstyp:</label>
                <select name="diet" value={patientData.diet} onChange={handleChange}>
                <option value="" disabled hidden>Bitte wählen...</option>
                <option>Normalkost</option>
                <option>Hausmannskost</option>
                <option>Vegetarisch</option>
                <option>Vegan</option>
                <option>Halal</option>
                <option>Koscher</option>
                <option>Diät</option>
                <option>Glutenfreie Ernährung</option>
                <option>Laktosefreie Ernährung</option>
                <option>Andere</option>
                </select>
              </div>

              <div className="form-group">
                <label>Plegestufe:</label>
                <select name="careLevel" value={patientData.careLevel} onChange={handleChange}>
                <option value="" disabled hidden>Bitte wählen...</option>
                <option>1</option>
                <option>2 </option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>
              </div>

              <div className="form-group">
                <label className=".form-group label">Raumnummer:</label>
                <input type="text" placeholder="Raumnummer" name="roomNumber" value={patientData.roomNumber|| ""} onChange={handleChange}  />
              </div> 


 
              </div>
            </div>
          </div>
        
      );
};

export default BasicInforForm;
