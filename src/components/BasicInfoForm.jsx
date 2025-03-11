import "../styles/AddUserPage.css"; 
import AddCamera from "../Assets/AddCamera.png";

const BasicInforForm = ({patientData, setPatientData}) => {
    // 处理输入框变化
    const handleChange = (e) => {
      const { name, value } = e.target;
      setPatientData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };  

  return (
        <div className="personal-data-container">         
          {/* Upload  upload-icon */}
          <div className="image-upload">
            <img src={AddCamera} alt="Upload Image" className="image-upload" /> 
          </div>

          {/* Personal Info */}
          <div className="personal-data-form">
            <h2 className="form-title">Persönliche Daten:</h2>
            <hr className="linie-divider" />

            <div className="form-grid">

              <div className="form-group">
                <label className=".form-group label">Name:</label>
                <input className=".form-group input"type="text" placeholder="Name eingeben" name="name" value={patientData.name} onChange={handleChange}
               />
              </div>

              <div className="form-group">
                <label className=".form-group label">Nachname:</label>
                <input type="text" placeholder="Nachname eingeben" name="nachname" value={patientData.nachname} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className=".form-group label">Nationalität:</label>
                <input type="text" placeholder="Nationalität eingeben"  name="nationalitaet" value={patientData.nationalitaet} onChange={handleChange}   />
              </div>

              <div className="form-group">
                <label className=".form-group label">Geburtsdatum:</label>     
                <input  type="text" placeholder="tt.mm.jjjj" name="geburtsdatum" value={patientData.geburtsdatum} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Geschlecht:</label>
                <select name="geschlecht" value={patientData.geschlecht} onChange={handleChange}>
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
                <select name="ernaehrungstyp" value={patientData.ernaehrungstyp} onChange={handleChange}>
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
                <select name="plegestufe" value={patientData.plegestufe} onChange={handleChange}>
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
                <input type="text" placeholder="Raumnummer" name="raumnummer" value={patientData.raumnummer} onChange={handleChange}  />
              </div> 


 
              </div>
            </div>
          </div>
        
      );
};

export default BasicInforForm;
