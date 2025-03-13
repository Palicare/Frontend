import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/personalCard.css";
import API_BASE_URL from "../config";

import DefaultUserIcon from "../Assets/DefaultUser.png"
import RoomIcon from "../Assets/Room.svg"



const PersonalCard = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/patients/${patientId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (patientId) {
      getPatientData();
    }
  }, [patientId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); 
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img
          src={patientData?.imageUrl || DefaultUserIcon}
          style={{ width: "200px", height: "200px", display: "inline-block" }}
          alt="Patient"
        />
      </div>

      <div className="profile-info-box">
        <div className="profile-info-box-headline">
          <div className="left">
            <p>Persönliche Daten:</p>
          </div>
          <div className="right">
            <img src={RoomIcon} alt="Room Icon" />
            <p>{patientData?.roomNumber || "N/A"}</p>
          </div>
        </div>
        <div className="profile-info">
          <br />
          <p>
            <strong>Name: </strong>
            {patientData?.firstName || "N/A"} {patientData?.lastName || ""}
          </p>
          <p>
            <strong>Geschlecht:</strong> {patientData?.gender || "N/A"}
          </p>
          <p>
            <strong>Geburtsdatum:</strong> {patientData?.birthDate ? formatDate(patientData?.birthDate) : "N/A"}
          </p>
          <p>
            <strong>Notfallkontakt:</strong>
            {patientData?.contact
              ? `${patientData.contact.firstName} ${patientData.contact.lastName} (${patientData.contact.relation})`
              : "N/A"}
          </p>
          <p>
            <strong>Religion:</strong> {patientData?.religion || "N/A"}
          </p>
          <p>
            <strong>Nationalität:</strong> {patientData?.nationality || "N/A"}
          </p>
          <p>
            <strong>Ernährungstyp:</strong> {patientData?.diet || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalCard;
