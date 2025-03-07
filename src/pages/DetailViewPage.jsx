import { useState, useEffect } from "react";
import Header from "../components/Header";
import PersonalCard from "../components/PersonalCard";
import Assistant from "./Assistant";
import axios from "axios";

const DetailViewPage = () => {
    const [patient, setPatient] = useState({
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
          relation: ""
        },
        allergies: [],
        careNeeds: [],
        symptoms: []
      });

      useEffect(() => {
        axios.get('http://localhost:8080/patients/1')
          .then(response => {
            setPatient(response.data); 
        
          })
          .catch(error => {
            console.error("Fehler beim Laden der Patientendaten:", error);
          });
      }, []);

    return (
        <>
        <Header/>  
        <PersonalCard/>  
        <div>
            <h1>Patient: {patient.firstName} {patient.lastName}</h1>
        </div>
        <Assistant/>
        </>
    )
};

export default DetailViewPage;