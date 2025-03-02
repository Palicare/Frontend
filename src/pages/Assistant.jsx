import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../styles/assistant.css";
import Header from "../components/Header.jsx";
import PersonalCard from "../components/PersonalCard.jsx";
import MicrophoneIcon from "../Assets/Microphone.svg";
import RecordingIcon from "../Assets/Recording.svg";
import Send from "../Assets/send.svg";
import X from "../Assets/X.svg";
import RoomIcon from "../Assets/Room.svg";
import DefaultUserIcon from "../Assets/DefaultUser.png";

export default function () {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  useEffect(() => {
    const getPatientData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/patients/${patientId}`
        );
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    getPatientData();
  }, [patientId]);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hallo wie kann ich die Helfen?", audioUrl: "" },
  ]);

  const [isRecording, setIsRecording] = useState(true);
  const [audioUrls, setAudioUrls] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const toggleButton = () => {
    setIsRecording((prevState) => !prevState);
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };
  const getLLMresponse = async (transcribedText) => {
    // Systemanweisung für den Assistenten
    const roleDescription = "Du bist ein Assistent, der in der Palliativabteilung arbeitet. " +
                            "Du sollst dem Nutzer helfen, kulturelle Fragen zu beantworten.";

    // Konvertiere den Nachrichtenverlauf in eine JSON-ähnliche Struktur mit Rollen
    const formattedMessages = messages.map(msg => 
        msg.id % 2 === 0 ? `User: ${msg.text}` : `Assistant: ${msg.text}`
    ).join("\n");

    // Erstelle den finalen Text-Prompt für Ollama
    const prompt = `${roleDescription}\n\n${formattedMessages}\nUser: ${transcribedText}\nAssistant:`;

    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-r1:8b",
                prompt: prompt, // Die gesamte Konversation als formatierter String
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.response; // Die generierte Antwort des LLMs
    } catch (error) {
        console.error("Fehler beim Abrufen der LLM-Antwort:", error);
        return null;
    }
};


  const saveMessage = async () => {
    const lastAudioUrl = await stopRecording();

    // Convert the audio file URL to a Blob
    const response = await fetch(lastAudioUrl);
    const audioBlob = await response.blob();
    const audioFile = new File([audioBlob], "audio.mp3", {
      type: "audio/mpeg",
    });

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      // Send audio file to FastAPI for transcription
      const transcriptionResponse = await fetch(
        "http://127.0.0.1:5000/transcribe/",
        {
          method: "POST",
          body: formData,
        }
      );

      const transcriptionData = await transcriptionResponse.json();
      const transcribedText =
        transcriptionData.transcription || "Transcription failed";

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: transcribedText,
          audioUrl: lastAudioUrl,
        },
      ]);

      const llmResponse = await getLLMresponse(transcribedText);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: llmResponse,
          audioUrl: lastAudioUrl,
        },
      ]);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
    setIsRecording((prevState) => !prevState);
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
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrls((prevUrls) => [...prevUrls, newAudioUrl]);
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
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const newAudioUrl = URL.createObjectURL(audioBlob);
          setAudioUrls((prevUrls) => {
            const updatedUrls = [...prevUrls, newAudioUrl];
            resolve(newAudioUrl);
            return updatedUrls;
          });
        };
        mediaRecorderRef.current.stop();
      }
    });
  };

  const abortRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setAudioUrls((prev) => prev.slice(0, -1));
    setIsRecording((prevState) => !prevState);
  };

  return (
    <>
      <Header />
      <div className="contentArea">
        <PersonalCard />

        <div className="chat-area">
          <h1>New Chat - Patient {patientId}</h1>
          <div className="chatArea">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`text ${
                  msg.id % 2 === 0 ? "humanText" : "chatbotText"
                }`}
              >
                <p>{msg.text}</p>
                <audio controls>
                  <source src={msg.audioUrl} type="audio/wav" />
                </audio>
              </div>
            ))}
          </div>
        </div>

        <div className="lowerInteractionBar">
          {isRecording ? (
            <div className="interactionButtonArea">
              <button className="interactionButton" onClick={toggleButton}>
                <img src={MicrophoneIcon} alt="Microphone Icon" />
              </button>
            </div>
          ) : (
            <div className="interactionButtonArea">
              <button className="minorInteractionA" onClick={abortRecording}>
                <img src={X} />
              </button>
              <button className="minorInteractionB">Pause</button>
              <button className="interactionButton" onClick={toggleButton}>
                <img src={RecordingIcon} alt="Recording Icon" />
              </button>
              <button className="minorInteractionC" onClick={saveMessage}>
                <img src={Send} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
