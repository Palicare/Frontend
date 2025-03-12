import "../styles/AddUserPage.css"; 
import { useState } from "react";


const MedicalInfoForm = ({medicalData, setMedicalData }) => {

    const [allergyInput, setAllergyInput] = useState("");
    const [symptomInput, setSymptomInput] = useState("");

  
    // handle change
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === "allergies") {
        setAllergyInput(value);
      } else if (name === "symptoms") {
        setSymptomInput(value);
      }
    };
  
  // Add Allergien
  const addAllergy = () => {
    if (allergyInput.trim()) {
      setMedicalData((prevData) => ({
        ...prevData,
        allergies: [...prevData.allergies, allergyInput.trim()] // ✅ 直接存入数组
      }));
      setAllergyInput(""); // 清空输入框
    }
  };

  // remove Allergien
  const removeAllergy = (index) => {
    setMedicalData((prevData) => ({
      ...prevData,
      allergies: prevData.allergies.filter((_, i) => i !== index) // ✅ 过滤数组
    }));
  };

  
   // Add Symptome
  const addSymptom = () => {
    if (symptomInput.trim()) {
      setMedicalData((prevData) => ({
        ...prevData,
        symptoms: [...prevData.symptoms, symptomInput.trim()] // ✅ 直接存入数组
      }));
      setSymptomInput(""); // 清空输入框
    }
  };

  // 移除症状
  const removeSymptom = (index) => {
    setMedicalData((prevData) => ({
      ...prevData,
      symptoms: prevData.symptoms.filter((_, i) => i !== index) // ✅ 过滤数组
    }));
  };

  
    return (
      <div className="personal-data-container">
      <div className="personal-data-form">
        <h2 className="form-title">Medizinische Informationen / Hintergründe:</h2>
        <hr className="linie-divider" />
  
        <div className="medical-section">
          <label className="medical-label">Allergie(n):</label>
          <div className="medical-input-group">
            <input
              type="text"
              name="allergies"
              value={allergyInput|| ""}
              onChange={handleChange}
              placeholder="Allergie eingeben"
              className="medical-input"
            />
            <button onClick={addAllergy} className="medical-add-button">+</button>
          </div>
          {medicalData.allergies.length > 0 && (
            <ul className="medical-display">
              {medicalData.allergies.map((allergy, index) => (
                <span key={index} className="medical-item">
                  {allergy} <button onClick={() => removeAllergy(index)} className="medical-remove-button">x</button>
                </span>
              ))}
            </ul>
        )}
        </div>
  
        <div className="medical-section">
          <label className="medical-label">Symptome(n):</label>
          <div className="medical-input-group">
            <input
              type="text"
              name="symptoms"
              value={symptomInput || ""}
              onChange={handleChange}
              placeholder="Symptome eingeben"
              className="medical-input"
            />
            <button onClick={addSymptom} className="medical-add-button">+</button>
          </div>
          {medicalData.symptoms.length > 0 && (
            <ul className="medical-display">
              {medicalData.symptoms.map((symptom, index) => (
                <span key={index} className="medical-item">
                  {symptom} <button onClick={() => removeSymptom(index)} className="medical-remove-button">x</button>
                </span>
              ))}
            </ul>
          )}
        </div>
      </div>

      </div>
    );
  };
export default MedicalInfoForm;




