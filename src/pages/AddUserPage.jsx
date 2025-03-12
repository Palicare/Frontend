import BasicInforForm from "../components/BasicInfoForm.jsx";
import HeaderAddUser from "../components/HeaderAddUser.jsx"; 
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
    firstName: "", lastName: "", nationality: "", birthdate: "",
    gender: "", religion: "", diet: "", carelevel: "", roomNumber: "", profileImage: ""
  }));

  const [notfallData, setNotfallData] = useState(() => loadStoredData("notfallData", {
    firstName: "", lastName: "", birthDate: "", relation: "", power: ""
  }));

  const [medicalData, setMedicalData] = useState(() => loadStoredData("medicalData", {
    allergies: [], symptoms: []
  }));

  const [pflegebedarf, setPflegebedarf] = useState(() => loadStoredData("pflegebedarf", {
    careNeeds: []
  }));

  const [sonstigeData, setSonstigeData] = useState(() => loadStoredData("sonstigeData", {
    misc: ""
  }));

  // Save data to sessionStorage on change
  useEffect(() => sessionStorage.setItem("patientData", JSON.stringify(patientData)), [patientData]);
  useEffect(() => sessionStorage.setItem("notfallData", JSON.stringify(notfallData)), [notfallData]);
  useEffect(() => sessionStorage.setItem("medicalData", JSON.stringify(medicalData)), [medicalData]);
  useEffect(() => sessionStorage.setItem("pflegebedarf", JSON.stringify(pflegebedarf)), [pflegebedarf]);
  useEffect(() => sessionStorage.setItem("sonstigeData", JSON.stringify(sonstigeData)), [sonstigeData]);

  // 🔹 **Reset data when the user navigates away (even by manually entering a URL)**
  useEffect(() => {
    const allowedPaths = ["/adduser", "/adduser/camera"];
    
    if (!allowedPaths.includes(location.pathname)) {
      console.log("Navigated outside of AddUserPage. Resetting data...");

      sessionStorage.removeItem("patientData");
      sessionStorage.removeItem("notfallData");
      sessionStorage.removeItem("medicalData");
      sessionStorage.removeItem("pflegebedarf");
      sessionStorage.removeItem("sonstigeData");

      // Also reset local state
      setPatientData({
        firstName: "", lastName: "", nationality: "", birthdate: "",
        gender: "", religion: "", diet: "", carelevel: "", roomNumber: "", profileImage: ""
      });

      setNotfallData({ firstName: "", lastName: "", birthDate: "", relation: "", power: "" });
      setMedicalData({ allergies: [], symptoms: [] });
      setPflegebedarf({ careNeeds: [] });
      setSonstigeData({ misc: "" });
    }
  }, [location]); // Runs on route change **and** page load

  // Handle form submission
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
      const patientId = patientDataResponse.id;
      console.log("Neuer Patient ID:", patientId);
      console.log("Gesendete Patientendaten:", patientFormData);

      // If an image was taken, upload it
      if (patientData.profileImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", patientData.profileImage);

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

      // Clear all data after successful submission
      sessionStorage.removeItem("patientData");
      sessionStorage.removeItem("notfallData");
      sessionStorage.removeItem("medicalData");
      sessionStorage.removeItem("pflegebedarf");
      sessionStorage.removeItem("sonstigeData");

      setPatientData({
        firstName: "", lastName: "", nationality: "", birthdate: "",
        gender: "", religion: "", diet: "", carelevel: "", roomNumber: "", profileImage: ""
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
      <BasicInforForm patientData={patientData} setPatientData={setPatientData} />
      <NotfallkontaktForm notfallData={notfallData} setNotfallData={setNotfallData} />
      <MedicalInfoForm medicalData={medicalData} setMedicalData={setMedicalData} />
      <PalliativepflegeForm pflegebedarf={pflegebedarf || { careNeeds: [] }} setPflegebedarf={setPflegebedarf} />
      <SonstigeForm sonstigeData={sonstigeData} setSonstigeData={setSonstigeData} />

      <div className="button-container">
        <button className="cancel-button" onClick={() => navigate("/")}>Abbrechen</button>
        <button className="save-button" onClick={handleSubmit}>Speichern</button>
      </div>
    </>
  );
};

export default AddUserPage;
