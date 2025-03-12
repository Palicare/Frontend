
import BasicInforForm from "../components/BasicInfoForm.jsx";
import HeaderAddUser from "../components/HeaderAddUser.jsx"; 
import NotfallkontaktForm from "../components/NotfallkontaktForm.jsx";
import PalliativepflegeForm from "../components/PalliativpflegeForm.jsx";
import MedicalInfoForm from "../components/MedicalInfoForm.jsx";
import SonstigeForm from "../components/SonstigeForm.jsx";
import "../styles/AddUserPage.css"; 
import { useRef, useState } from "react";

const AddUserPage = () => {
  const [patientData, setPatientData] = useState({
        firstName: "",    //  改成后端数据库的字段名
        lastName: "",     //  
        nationality: "",  //  
        birthdate: "",    //  YYYY-MM-DD
        gender: "",       //  
        religion: "",     //  
        diet: "",         // 
        carelevel: "",    // 
        roomNumber: ""    //  
  });
  
  const [notfallData, setNotfallData] = useState({//2 Teil
    firstName: "",
    lastName: "",
    birthDate: "",
    relation: "",
    // telefonnummer: "",
    power: "",
});
 
  const[medicalData, setMedicalData] = useState({allergies: [],  symptoms: []});//
  const [pflegebedarf, setPflegebedarf] = useState({ careNeeds: [] });  //
  
  
  const [sonstigeData, setSonstigeData] = useState({
    misc:" ",    
    // vorliebe: " ",    
    // abneigung:" ",
  })
  
   
  const handleSubmit = async () => {
    const patientFormData = {
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      nationality: patientData.nationality,
      birthdate: patientData.birthdate,
      gender: patientData.gender,
      religion: patientData.religion,
      diet: patientData.diet,
      carelevel: patientData.carelevel,
      roomNumber: patientData.roomNumber,
      allergies: medicalData.allergies,
      symptoms: medicalData.symptoms,
      careNeeds: pflegebedarf.careNeeds,
      misc: sonstigeData.misc
  };

  try {
    // Upload AllDaten-Json
    const response = await fetch("http://localhost:8080/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientFormData)
    });

    if (!response.ok) {
        const errorText = await response.text();
        alert("Fehler beim Speichern: " + errorText);
        return;
    }

    const patientDataResponse = await response.json();
    const patientId = patientDataResponse.id; // 🔹 获取创建的 `patientId`
    console.log("Neuer Patient ID:", patientId);
    console.log("Gesendete Patientendaten:", patientFormData);
    

    // wenn image vorhanden
    if (patientData.foto) {
        const imageFormData = new FormData();
        imageFormData.append("file", patientData.foto);

        const imageResponse = await fetch(`http://localhost:8080/patients/${patientId}/profile-picture`, {
            method: "POST",
            body: imageFormData
        });

        if (!imageResponse.ok) {
            alert("Fehler beim Hochladen des Bildes.");
            return;
        }
    }

    alert("Patient erfolgreich erstellt!");
    
    // Leern alle Daten
    setPatientData({
        firstName: "", lastName: "", nationality: "", birthdate: "",
        gender: "", religion: "", diet: "", carelevel: "", roomNumber: ""
    });

    setNotfallData({ firstName: "", lastName: "", birthDate: "", relation: "", power: "" });
    setMedicalData({ allergies: [], symptoms: [] });
    setPflegebedarf({ careNeeds: [] });
    setSonstigeData({ misc: "" });

} catch (error) {
    console.error("Speicherungsfehler:", error);
    alert("Speichern ist fehlgeschlagen.");
}
};

  return (
    <>
    <HeaderAddUser />
    <br />
    {/* 传递 patientData 和 setPatientData 作为 props */}
    <BasicInforForm patientData={patientData} setPatientData={setPatientData} />
    <NotfallkontaktForm notfallData={notfallData} setNotfallData={setNotfallData} />
    <MedicalInfoForm medicalData={medicalData} setMedicalData={setMedicalData} />
    <PalliativepflegeForm pflegebedarf={pflegebedarf || { careNeeds: [] }} setPflegebedarf={setPflegebedarf} />

    <SonstigeForm sonstigeData={sonstigeData} setSonstigeData={setSonstigeData} />
  
    <div className="button-container">
        <button className="cancel-button" onClick={() => window.history.back()}>Abbrechen</button>
        <button className="save-button" onClick={handleSubmit}>Speichern</button>
    </div>
  </>

  );

};

export default AddUserPage;
