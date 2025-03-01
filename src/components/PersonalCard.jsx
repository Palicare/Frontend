import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/personalCard.css";

import DefaultUserIcon from "../Assets/DefaultUser.png"
import RoomIcon from "../Assets/Room.svg"



const PersonalCard = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/patients/${patientId}`);
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
            {patientData?.firstName} {patientData?.lastName}
          </p>
          <p>
            <strong>Geschlecht:</strong> {patientData?.gender || "N/A"}
          </p>
          <p>
            <strong>Geburtsdatum:</strong> {patientData?.dob || "N/A"}
          </p>
          <p>
            <strong>Notfallkontakt:</strong> {patientData?.emergencyContact || "N/A"}
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
          <p>
            <strong>Krankenkasse:</strong> {patientData?.insurance || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalCard;
