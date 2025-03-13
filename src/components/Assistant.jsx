import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles/assistant.css";
import MicrophoneIcon from "../Assets/Microphone.svg";
import RecordingIcon from "../Assets/Recording.svg";
import Send from "../Assets/send.svg";
import X from "../Assets/X.svg";

const Assistant = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/patients/${patientId}`);
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    getPatientData();
  }, [patientId]);

  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hallo wie kann ich dir helfen?", audioUrl: "" },
  ]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const [isRecording, setIsRecording] = useState(true);
  const [audioUrls, setAudioUrls] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant" && lastMessage.audioUrl) {
        const audio = new Audio(lastMessage.audioUrl);
        audio.playbackRate = 1.25;
        audio.play();
      }
    }
  }, [messages]);

  const toggleButton = () => {
    setIsRecording((prevState) => !prevState);
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = async () => {
    try {
      const constraints = { audio: true };
      if (navigator.userAgent.match(/Android|iPhone|iPad/i)) {
        constraints.video = { facingMode: "environment" }; // Use back camera on mobile
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrls((prevUrls) => [...prevUrls, newAudioUrl]);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing microphone or camera:", error);
    }
  };

  return (
    <>
      <div className="contentArea">
        <div className="chat-area">
          <h1 className="chat-title">New Chat - Patient {patientId}</h1>
          <div className="chatArea" ref={chatAreaRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`text ${msg.role === "user" ? "humanText" : "chatbotText"}`}>
                <p>{msg.text}</p>
                <audio controls onPlay={(e) => (e.target.playbackRate = 1.25)}>
                  <source src={msg.audioUrl} type="audio/wav" />
                </audio>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Assistant;
