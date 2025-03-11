import "../styles/AddUserPage.css"; 
import { useState } from "react";


const MedicalInfoForm = ({medicalData, setMedicalData }) => {

    const [allergyInput, setAllergyInput] = useState("");
    const [symptomInput, setSymptomInput] = useState("");
  
    // handle change
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === "allergien") {
        setAllergyInput(value);
      } else if (name === "symptome") {
        setSymptomInput(value);
      }
    };
  
  // Add Allergien
  const addAllergy = () => {
    if (allergyInput.trim()) {
      const updatedAllergies = medicalData.allergien ? medicalData.allergien.split(", ") : [];
      updatedAllergies.push(allergyInput.trim());
      setMedicalData((prevData) => ({
        ...prevData,
        allergien: updatedAllergies.join(", "),
      }));
      setAllergyInput("");
    }
  };

  // remove Allergien
  const removeAllergy = (index) => {
    const updatedAllergies = medicalData.allergien ? medicalData.allergien.split(", ").filter((_, i) => i !== index) : [];
    setMedicalData((prevData) => ({
      ...prevData,
      allergien: updatedAllergies.length > 0 ? updatedAllergies.join(", ") : "",
    }));
  };

  
   // Add Symptome
  const addSymptom = () => {
    if (symptomInput.trim()) {
      const updatedSymptoms = medicalData.symptome ? medicalData.symptome.split(", ") : [];
      updatedSymptoms.push(symptomInput.trim());
      setMedicalData((prevData) => ({
        ...prevData,
        symptome: updatedSymptoms.join(", "),
      }));
      setSymptomInput("");
    }
  };

  // remove Symptome
  const removeSymptom = (index) => {
    const updatedSymptoms = medicalData.symptome ? medicalData.symptome.split(", ").filter((_, i) => i !== index) : [];
    setMedicalData((prevData) => ({
      ...prevData,
      symptome: updatedSymptoms.length > 0 ? updatedSymptoms.join(", ") : "",
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
              name="allergien"
              value={allergyInput}
              onChange={handleChange}
              placeholder="Allergie eingeben"
              className="medical-input"
            />
            <button onClick={addAllergy} className="medical-add-button">+</button>
          </div>
          {medicalData.allergien && medicalData.allergien.trim() !== "" && (
          <ul className="medical-display">
            {medicalData.allergien.split(", ").map((allergy, index) => (
              allergy.trim() !== "" && (
                <span key={index} className="medical-item">
                {allergy} <button onClick={() => removeAllergy(index)} className="medical-remove-button">x</button>
              </span>
              )
            ))}
          </ul>
        )}
        </div>
  
        <div className="medical-section">
          <label className="medical-label">Symptome(n):</label>
          <div className="medical-input-group">
            <input
              type="text"
              name="symptome"
              value={symptomInput}
              onChange={handleChange}
              placeholder="Symptome eingeben"
              className="medical-input"
            />
            <button onClick={addSymptom} className="medical-add-button">+</button>
          </div>
          {medicalData.symptome && medicalData.symptome.trim() !== "" && (
          <ul className="medical-display">
            {medicalData.symptome.split(", ").map((symptom, index) => (
              symptom.trim() !== "" && (
                <span key={index} className="medical-item">
                {symptom} <button onClick={() => removeSymptom(index)} className="medical-remove-button">x</button>
              </span>
              )
            ))}
          </ul>
        )}
        </div>
      </div>

      </div>
    );
  };
export default MedicalInfoForm;




