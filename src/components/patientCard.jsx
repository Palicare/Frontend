import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/PatientCard.css";
import API_BASE_URL from "../config";

// room icon
const RoomIcon = () => (
  <svg
    width="512px"
    height="512px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="var(--ci-primary-color, currentColor)"
      d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"
      className="ci-primary"
    />
    <rect
      width="32"
      height="64"
      x="256"
      y="232"
      fill="var(--ci-primary-color, currentColor)"
      className="ci-primary"
    />
  </svg>
);

// Calculate age from birthDate
const calculateAge = (birthDate) => {
  if (!birthDate) return "N/A";
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

const PatientCard = ({ patient, id }) => {
  const [fetchedPatient, setFetchedPatient] = useState(null);
  const [loading, setLoading] = useState(!patient && !!id);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/patients/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch patient data: ${response.status}`);
        }

        const data = await response.json();
        setFetchedPatient(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Could not load patient information");
      } finally {
        setLoading(false);
      }
    };

    if (id && !patient) {
      fetchPatientData();
    }
  }, [id, patient]);

  const getGenderSymbol = (gender) => {
    if (!gender) return "";
    const genderLower = gender.toLowerCase();
    if (genderLower.includes("männlich")) return "♂";
    if (genderLower.includes("weiblich")) return "♀";
    if (genderLower.includes("divers")) return "⚥";
    return "N/A";
  };

  const handleCardClick = () => {
    const patientId = patient?.id || id;
    if (patientId) {
      navigate(`/detailView/${patientId}`);
    }
  };

  if (loading) {
    return (
      <div className="patient-card loading">
        <p>Loading patient information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-card error">
        <p>{error}</p>
      </div>
    );
  }

  const patientData = patient || fetchedPatient;

  if (!patientData) {
    return (
      <div className="patient-card empty">
        <p>No patient information available</p>
      </div>
    );
  }

  const patientId = patientData.id || id;

  // profile picture
  const profilePictureUrl = patientId
  ? `${API_BASE_URL}/api/patients/${patientId}/profile-picture`
  : "./src/Assets/DefaultUser.png";

  const displayData = {
    name:
      `${patientData.firstName || ""} ${patientData.lastName || ""}`.trim() ||
      "Unknown Patient",
    age: calculateAge(patientData.birthDate),
    gender: patientData.gender || "N/A",
    genderSymbol: getGenderSymbol(patientData.gender),
    religion: patientData.religion || "N/A",
    dietType: patientData.diet || "N/A",
    condition: patientData.symptoms?.join(", ") || "N/A",
    roomNumber: patientData.roomNumber || "N/A",
    emergency: {
      name: patientData.contact
        ? `${patientData.contact.firstName} ${patientData.contact.lastName}`
        : "Not specified",
      relation: patientData.contact?.relation || "",
    },
  };

  return (
    <div className="patient-card" onClick={handleCardClick}>
      <div className="patient-card-container">
        {/* Left section with patient info */}
        <div className="patient-info">
          {/* Header with name, age, gender */}
          <div className="patient-header">
            <div className="patient-name">{displayData.name}</div>
            <div className="patient-age">{displayData.age} J</div>
            <div className="patient-gender">
              {patientData.gender?.charAt(0) || "N/A"}{" "}
              {displayData.genderSymbol}
            </div>
          </div>

          {/* Patient details */}
          <div className="patient-details">
            <div className="patient-detail-row">
              <div className="detail-label">Religion:</div>
              <div className="detail-value">{displayData.religion}</div>

              <div className="detail-label diet-label">Ernährungstyp:</div>
              <div className="detail-value">{displayData.dietType}</div>
            </div>

            <div className="patient-detail-row">
              <div className="detail-label">Erkrankung:</div>
              <div className="detail-value">{displayData.condition}</div>
            </div>
          </div>
        </div>
        {/* middle section with avatar */}
        <div className="patient-avatar-container">
          <img
            src={profilePictureUrl}
            alt={displayData.name}
            className="patient-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "./src/Assets/DefaultUser.png";
            }}
          />
        </div>

        {/* Right section with  room and emergency */}
        <div className="patient-sidebar">
          <div className="room-info">
            <div className="room-number">
              <RoomIcon />
              <p>{displayData.roomNumber}</p>
            </div>

            <div className="emergency-contact">
              <div className="contact-label">Notfallkontakt:</div>
              <div className="contact-name">{displayData.emergency.name}</div>
              {displayData.emergency.relation && (
                <div className="contact-relation">
                  ({displayData.emergency.relation})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
