import BasicInforForm from "../components/BasicInfoForm.jsx";
import Header from "../components/Header.jsx";
import NotfallkontaktForm from "../components/NotfallkontaktForm.jsx";
import PalliativepflegeForm from "../components/PalliativpflegeForm.jsx";
import MedicalInfoForm from "../components/MedicalInfoForm.jsx";
import SonstigeForm from "../components/SonstigeForm.jsx";
import "../styles/AddUserPage.css"; 
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

const AddUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to load data from sessionStorage (only during session)
  const loadStoredData = (key, defaultValue) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  };

  // Load state from sessionStorage or use default values
  const [patientData, setPatientData] = useState(() => loadStoredData("patientData", {
    id: null, firstName: "", lastName: "", nationality: "", birthDate: "",
    gender: "", religion: "", diet: "", careLevel: "", roomNumber: "", profileImage: "" ,
      contact: { 
        id: null,  firstName: "", lastName: "", birthDate: "", relation: "", phoneNumber: "", power: ""
    },
  }));

  const [medicalData, setMedicalData] = useState(() => loadStoredData("medicalData", {
    allergies: [], symptoms: []
  }));

  const [pflegebedarf, setPflegebedarf] = useState(() => loadStoredData("pflegebedarf", {
    careNeeds: []
  }));

  const [sonstigeData, setSonstigeData] = useState(() => {
    const storedData = sessionStorage.getItem("sonstigeData");
    return storedData ? JSON.parse(storedData) : { vorliebe: "", abneigung: "" };
});


  // Save data to sessionStorage on change
   useEffect(() => sessionStorage.setItem("patientData", JSON.stringify(patientData)), [patientData]);
   useEffect(() => sessionStorage.setItem("medicalData", JSON.stringify(medicalData)), [medicalData]);
   useEffect(() => sessionStorage.setItem("pflegebedarf", JSON.stringify(pflegebedarf)), [pflegebedarf]);
   useEffect(() => {sessionStorage.setItem("sonstigeData", JSON.stringify(sonstigeData));}, [sonstigeData]);
  

  // 🔹 **Reset data when the user navigates away (even by manually entering a URL) **
  useEffect(() => {
    const allowedPaths = ["/adduser", "/adduser/camera"];
    
    if (!allowedPaths.includes(location.pathname)) {
      console.log("Navigated outside of AddUserPage. Resetting data...");
      sessionStorage.removeItem("patientData");
      sessionStorage.removeItem("medicalData");
      sessionStorage.removeItem("pflegebedarf");
      sessionStorage.removeItem("sonstigeData");

      // Also reset local state
      setPatientData({
        id: null, firstName: "", lastName: "", nationality: "", birthDate: "",
        gender: "", religion: "", diet: "", careLevel: "", roomNumber:"", profileImage: "",
        contact: { id: null, firstName: "", lastName: "", birthDate: "", phoneNumber:"",relation: "", power: "" }
      });

      setMedicalData({ allergies: [], symptoms: [] });
      setPflegebedarf({ careNeeds: [] });
      setSonstigeData({ misc: JSON.stringify({ vorliebe: "", abneigung: "" }) });
    }
  }, [location]); // Runs on route change **and** page load



  const handleSubmit = async () => {
    try {
        // 1
        const patientFormData = {
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            nationality: patientData.nationality,
            birthDate: patientData.birthDate,
            gender: patientData.gender,
            religion: patientData.religion,
            diet: patientData.diet,
            profileImage: patientData.profileImage,
            careLevel: patientData.careLevel,
            roomNumber: patientData.roomNumber, 
            allergies: medicalData.allergies || [],
            symptoms: medicalData.symptoms || [],
            careNeeds: pflegebedarf.careNeeds || [],
            misc: JSON.stringify(sonstigeData),//misc: sonstigeData.misc ,
            


            contact: {
                firstName: patientData.contact.firstName,
                lastName: patientData.contact.lastName,
                birthDate: patientData.contact.birthDate,
                power: patientData.contact.power, // 
                relation: patientData.contact.relation,
                phoneNumber: patientData.contact.phoneNumber,
            }
        };
        console.log("Sending patient data:", JSON.stringify(patientFormData, null, 2));
        const patientResponse = await fetch("http://localhost:8080/patients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patientFormData),
        });

        if (!patientResponse.ok) {
            const errorText = await patientResponse.text();
            alert("Fehler beim Speichern des Patienten & Kontakt: " + errorText);
            return;
        }

        const patientDataResponse = await patientResponse.json();
        const patientId = patientDataResponse.id; 
        console.log("Neuer Patient ID:", patientId);
        console.log("Gesendete Patientendaten:", patientFormData);
        console.log("Patient Birth Date:", patientDataResponse.birthDate);
        console.log("misc:" ,patientDataResponse.misc)

        // 2
        if (patientData.profileImage) {
            const imageFormData = new FormData();
            imageFormData.append("file", patientData.profileImage);

            const imageResponse = await fetch(`http://localhost:8080/patients/${patientId}/profile-picture`, {
                method: "POST",
                body: imageFormData,
            });

            if (!imageResponse.ok) {
                alert("Fehler beim Hochladen des Bildes.");
                return;
            }

            console.log("Profilbild erfolgreich hochgeladen.");
        }

        // 3
        alert("Patient & Notfallkontakt & Foto erfolgreich erstellt!");

        sessionStorage.removeItem("patientData");
        sessionStorage.removeItem("medicalData");
        sessionStorage.removeItem("pflegebedarf");
        sessionStorage.removeItem("sonstigeData");

        setPatientData({
            id: null,
            firstName: "", lastName: "", birthDate: "",
            gender: "", religion: "", diet: "", nationality: "",
            careLevel: "", misc: "", roomNumber: "",
            profileImage: "",
            contact: {
                id: null, firstName: "", lastName: "", birthDate: "",
                power: "", relation: "", phoneNumber: "",
            },
           
        });
        setMedicalData({ allergies: [], symptoms: [] });
        setPflegebedarf({ careNeeds: [] });
        setSonstigeData({ misc: JSON.stringify({ vorliebe: "", abneigung: "" }) });

    } catch (error) {
        console.error("Speicherungsfehler:", error);
        alert("Speichern ist fehlgeschlagen.");
    }
};


  return (
    <>
      <Header/>
      <br />
      <BasicInforForm patientData={patientData} setPatientData={setPatientData} />
      <NotfallkontaktForm patientData={patientData || { contact: {} }} setPatientData={setPatientData}/>
      {<MedicalInfoForm medicalData={medicalData} setMedicalData={setMedicalData} />}
      <PalliativepflegeForm pflegebedarf={pflegebedarf || { careNeeds: [] }} setPflegebedarf={setPflegebedarf} />
      <SonstigeForm sonstigeData={sonstigeData} setSonstigeData={setSonstigeData} />
      <div className="button-container">
        <button className="cancel-button" onClick={() => navigate("/")}>Abbrechen</button>
        <button className="save-button" onClick={handleSubmit}>Speichern</button>
      </div>

    </>
  );

}
export default AddUserPage;
