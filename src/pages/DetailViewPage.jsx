import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API_BASE_URL from "../config";

import Header from "../components/Header";
import PersonalCard from "../components/PersonalCard";
import Assistant from "../components/Assistant";
import InformationField from "../components/InformationField";
import InformationFieldJSON from "../components/InformationFieldJSON"
import "../styles/detailViewPage.css";

const allergiesTest = ["Pollen", "Laktose", "Hülsenfrüchte"];
const careNeedsTest = ["Schmerzmittel", "Windel", "Anti-Depressiva"];
const symptomsTest = ["Fieber", "Husten", "Schnupfen"];

const DetailViewPage = () => {
  const { patientId } = useParams();
  const [currentView, setCurrentView] = useState(0);
  const [startX, setStartX] = useState(0);
  const [patientData, setPatientData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    religion: "",
    diet: "",
    nationality: "",
    careLevel: "",
    misc: "",
    roomNumber: null,
    contact: {
      id: null,
      firstName: "",
      lastName: "",
      birthDate: "",
      power: false,
      relation: "",
    },
    allergies: [],
    careNeeds: [],
    symptoms: [],
  });

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/patients/${patientId}`);
        const data = await response.json();
        setPatientData(data);
        console.log(data.contact);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    getPatientData();
  }, [patientId]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      setCurrentView(1);
    } else if (endX - startX > 50) {
      setCurrentView(0);
    }
  };

  return (
    <div className="container">
      <Header isHomeScreen={false}/>
      <PersonalCard />

      <div
        className="swipe-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="swipe-content"
          animate={{
            transform: `translateX(${currentView === 1 ? "-50%" : "0%"})`,
          }}
          transition={{ type: "spring", stiffness: 200, damping:20 }}
        >
          <div className="info-container">
            <InformationField title="Allergien" data={patientData.allergies} />
            <InformationField
              title="Pflege- und Versorgungsbedarf"
              data={patientData.careNeeds}
            />
            <InformationField title="Symptome" data={patientData.symptoms} />
            <InformationFieldJSON
              title="Sonstiges"
              data={patientData.misc ? patientData.misc.split(" ") : []}
            />
          </div>

          <div className="assistant-container">
            <Assistant />
          </div>
        </motion.div>
      </div>

      <div className="indicator">
        <span className={currentView === 0 ? "dot active" : "dot"}></span>
        <span className={currentView === 1 ? "dot active" : "dot"}></span>
      </div>
    </div>
  );
};

export default DetailViewPage;
