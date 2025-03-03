import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PersonalCard from "../components/PersonalCard";
import InformationField from "../components/InformationField";
import axios from "axios";


const allergiesTest = ["Pollen", "Laktose", "Hülsenfrüchte"];
const careNeedsTest = ["Schmerzmittel", "Windel", "Anti-Depressiva"];
const symptomsTest = ["Fieber", "Husten", "Schnupfen"];

const DetailViewPage = () => {
    const { patientId } = useParams();
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
        const getPatientData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/patients/${patientId}`);
                const data = await response.json();
                setPatientData(data);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        getPatientData();
    }, [patientId]);

    return (
        <>
        <Header/>  
        <PersonalCard/>  
        <InformationField title={"Allergien"} data={allergiesTest}/>
        <InformationField title={"Pflege- und Versorgungsbedarf"} data={careNeedsTest}/>
        <InformationField title={"Symptome"} data={symptomsTest}/>
        
        </>
    )
};

export default DetailViewPage;