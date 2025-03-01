import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../styles/assistant.css";
import Header from '../components/Header.jsx';
import PersonalCard from '../components/PersonalCard.jsx'
import MicrophoneIcon from '../Assets/Microphone.svg';
import RecordingIcon from "../Assets/Recording.svg";
import Send from "../Assets/send.svg"
import X from "../Assets/X.svg"
import RoomIcon from "../Assets/Room.svg"
import DefaultUserIcon from "../Assets/DefaultUser.png"

export default function() {
    const {patientId} = useParams();
    const [patientData, setPatientData] = useState(null);
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

    const [messages, setMessages] = useState([
        { id: 1, text: "Hallo wie kann ich die Helfen?" , audioUrl: ""},
        { id: 2, text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", audioUrl: ""},
        { id:3 , text: "AI sagt jsdhgfbklsdjbhf",audioUrl: ""}
    ]);

    const [isRecording, setIsRecording] = useState(true);
    const [audioUrls, setAudioUrls] = useState([]);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    
    const toggleButton = () => {
        setIsRecording(prevState => !prevState);
        if(isRecording){
        startRecording()}
        else{
            stopRecording();
        }
    };

    const getLLMresponse = async () => {
        return new Promise((resolve) => {
            setMessages(prevMessages => {
                const newMessage = { id: prevMessages.length + 1, text: "AI sagtblbalalblab albabllabl alblablalblba lablalbabllbla lirim ispum bla bla bla" };
                const updatedMessages = [...prevMessages, newMessage];
                resolve(newMessage);
                return updatedMessages;
            });
        });
    };

    const saveMessage = async () => {
        const lastAudioUrl = await stopRecording(); 
        setMessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, text: "transkribierte Nachricht", audioUrl: lastAudioUrl}]);
        const response = await getLLMresponse();
    };


    
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
    
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
    
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const newAudioUrl = URL.createObjectURL(audioBlob);
                setAudioUrls(prevUrls => [...prevUrls, newAudioUrl]);
            };
    
            mediaRecorderRef.current.start();
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };
    
    const stopRecording = () => {
        return new Promise((resolve) => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                    const newAudioUrl = URL.createObjectURL(audioBlob);
                    setAudioUrls(prevUrls => {
                        const updatedUrls = [...prevUrls, newAudioUrl];
                        resolve(newAudioUrl);
                        return updatedUrls;
                    });
                };
                mediaRecorderRef.current.stop();
            }
        });
    };

    const abortRecording = () =>{
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setAudioUrls((prev) => prev.slice(0, -1));
        setIsRecording(prevState => !prevState);

    }
    

    return (
        <>
            <Header/>
            <div className="contentArea">
            <PersonalCard />

            <div className="chat-area">
            <h1>New Chat - Patient {patientId}</h1> 
                <div className="chatArea">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`text ${msg.id % 2 === 0 ? "humanText" : "chatbotText"}`}>
                            <p>{msg.text}</p>
                            <audio controls>
                                        <source src={msg.audioUrl} type="audio/wav" />
                            </audio>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lowerInteractionBar">
                
                    {isRecording ?(
                    <div className="interactionButtonArea">
                        <button className="interactionButton" onClick={toggleButton}>
                            <img src={MicrophoneIcon} alt="Microphone Icon" />
                        </button>
                    </div> 
                ) : (
                        <div className="interactionButtonArea">
                        <button className="minorInteractionA" onClick={abortRecording}>
                            <img src={X}/></button>
                        <button className="minorInteractionB">Pause</button>
                        <button className="interactionButton" onClick={toggleButton}>
                            <img src={RecordingIcon} alt="Recording Icon" />
                        </button>
                        <button className="minorInteractionC" onClick={saveMessage}>
                            <img src={Send}/>
                        </button>
                        </div>
                       ) }
            </div>
            </div>
        </>
    );
}
