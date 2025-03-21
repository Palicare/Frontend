import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/AddUserPage.css";
import AddCamera from "../Assets/AddCamera.png";

const BasicInforForm = ({ patientData, setPatientData }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get navigation state
  const [imagePreview, setImagePreview] = useState(patientData.profileImage || AddCamera);

  useEffect(() => {
    if (location.state && location.state.capturedImage) {
      const file = location.state.capturedImage;

      // Create an object URL for the file
      const imageUrl = URL.createObjectURL(file);

      setPatientData((prevData) => ({
        ...prevData,
        profileImage: file, // Store the File object
      }));

      setImagePreview(imageUrl); // Set preview image
    }
  }, [location.state, setPatientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Behandlung des Geburtsdatums, um sicherzustellen, dass es im Format JJJJ-MM-TT vorliegt
    let formattedValue = value;

    if (name === "birthDate") {
        formattedValue = new Date(value).toISOString().split("T")[0]; // 确保日期格式为 YYYY-MM-DD
    } else if (name === "careLevel") {
      formattedValue = value ? parseInt(value, 10).toString() : ""; // ✅ 确保是字符串
  } else if (name === "roomNumber") {
      formattedValue = value !== "" ? parseInt(value, 10).toString() : ""; // ✅ 确保是字符串
  }
    setPatientData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
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
          src={imagePreview} // Use preview image
          alt="Upload Image"
          className="image-upload"
        />
      </div>

      {/* Personal Info */}
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
            <input type="date" name="birthDate" value={patientData.birthDate || ""} onChange={handleChange} />
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
    { [
    'Christentum', 
    'Islam',
    'Buddhismus', 
    'Hinduismus', 
    'Judentum', 
    'Sikhismus',  
    'Taoismus',  
    'Zoroastrismus',   
    'Shintoismus',  
    'Andere',  
    'Bahá\'í-Glaube',  
    'Jainismus',  
    'Konfuzianismus',  
    'Schamanismus',  
    'Unitarismus',  
    'Wicca',
    'Neopaganismus',  
    'Scientology',
    'Rastafari',
    'Cao Dai',
    'Falun Gong',
    'Tenrikyo',
    'Scientology-Kirche', 
    'Eckankar',
    'Atheismus',  
    'Agnostizismus',  
    'Humanismus',  
    'Säkularismus',  
    'Freidenkertum',  
    'Rationalismus',  
    'Katholizismus',  
    'Protestantismus',  
    'Lutheranismus',  
    'Kalvinismus',  
    'Anglikanismus',  
    'Orthodoxie',  
    'Evangelikalismus',  
    'Pfingstbewegung',  
    'Unitarismus',  
    'Mormonismus',   
    'Zeugen Jehovas',  
    'Altkatholizismus',    
    'Quäkertum',  
    'Freikirchen', 
    'Heilsarmee',   
    'Baptismus',  
    'Methodismus',  
    'Adventismus', 
    'Charismatische Bewegung',  
    'Hutterer',  
    'Christliche Wissenschaft',  
    'Unitarische Universalisten',  
]
      .sort()  // Sort alphabetically
      .map((religion) => (
        <option key={religion} value={religion}>{religion}</option>
      ))}
  </select>
</div>

          <div className="form-group">
  <label>Ernährungstyp:</label>
  <input 
    type="text" 
    name="diet" 
    value={patientData.diet} 
    onChange={handleChange} 
    placeholder="Bitte geben Sie den Ernährungstyp ein..."
  />
</div>


          <div className="form-group">
            <label>Plegestufe:</label>
            <select name="careLevel" value={patientData.careLevel} onChange={handleChange}>
              <option value="" disabled hidden>Bitte wählen...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="form-group">
            <label>Zimmernummer:</label>
            <input type="number" placeholder="Zimmernummer eingeben" name="roomNumber" value={patientData.roomNumber || ""} onChange={handleChange} />
          </div> 
        </div>
      </div>
    </div>
  );
};

export default BasicInforForm;
