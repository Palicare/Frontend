
import BasicInforForm from "../components/BasicInfoForm.jsx";
import HeaderAddUser from "../components/HeaderAddUser.jsx"; 
import NotfallkontaktForm from "../components/NotfallkontaktForm.jsx";
import PalliativepflegeForm from "../components/PalliativpflegeForm.jsx";
import MedicalInfoForm from "../components/MedicalInfoForm.jsx";
import SonstigeForm from "../components/SonstigeForm.jsx";
import "../styles/AddUserPage.css"; 
import { useRef, useState } from "react";

const AddUserPage = () => {
  const [patientData,setPatientData] = useState({// 1. Teil
    name: "",
    nachname: "",
    nationalitaet: "",
    geburtsdatum: "",
    geschlecht: "",
    religion: "",
    ernaehrungstyp: "",
    plegestufe: "",
    raumNumber:"",
    foto: null,})
  
  const [notfallData, setNotfallData] = useState({//2 Teil
    name: "",
    nachname: "",
    geburtsdatum: "",
    beziehung: "",
    telefonnummer: "",
    vollmacht: "",
});
 
  const[medicalData, setMedicalData] = useState({allergien: " ", symptome: " "});//3. Teil????
  const [pflegebedarf, setPflegebedarf] = useState({ pflegebedarf: " " });  //4. Teil
  
  
  const [sonstigeData, setSonstigeData] = useState({
    zusatz:" ",    
    vorliebe: " ",    
    abneigung:" ",
  })
  
   
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("patientData", JSON.stringify(patientData));
    formData.append("notfallData", JSON.stringify(notfallData));
    formData.append("medicalData", JSON.stringify(medicalData));
    formData.append("pflegebedarf", JSON.stringify(pflegebedarf));
    formData.append("sonstigeData", JSON.stringify(sonstigeData));
    
    // AddFoto
    if(patientData.image){
      formData.append("image", patientData.image);
    }

    try {
      const response = await fetch("http://localhost:8080/uploadform", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Daten erfolgreich gesendet!");

        // 清空表单数据
        setPatientData({
          name: "",
          nachname: "",
          nationalitaet: "",
          geburtsdatum: "",
          geschlecht: "",
          religion: "",
          ernaehrungstyp: "",
          plegestufe: "",
          raumNumber:"",
          foto: null
        });

        setNotfallData({
          name: "",
          nachname: "",
          geburtsdatum: "",
          beziehung: "",
          telefonnummer: "",
          vollmacht: "",
        });

        setMedicalData({ allergien: "", symptome: "" });
        setPflegebedarf({ pflegebedarf: "" });
      } else {
        alert("Fehler beim Hochladen.");
      }
    } catch (error) {
      console.error("Speichern-Fehler:", error);
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
    <PalliativepflegeForm pflegebedarf={pflegebedarf} setPflegebedarf={setPflegebedarf} />
    <SonstigeForm sonstigeData={sonstigeData} setSonstigeData={setSonstigeData} />
  
    <div className="button-container">
        <button className="cancel-button" onClick={() => window.history.back()}>Abbrechen</button>
        <button className="save-button" onClick={handleSubmit}>Speichern</button>
    </div>
  </>

  );

};

export default AddUserPage;
