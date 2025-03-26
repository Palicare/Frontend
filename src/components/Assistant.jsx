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
  const [isSending, setIsSending] = useState(false);

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
    { role: "assistant", text: "Hallo wie kann ich die Helfen?", audioUrl: "" },
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
  const getLLMresponse = async (transcribedText) => {
    const jsonBody = JSON.stringify({
      patientId,
      messages: [
        ...messages.map(({ role, text }) => ({ role, content: text })),
        { role: "user", content: transcribedText },
      ],
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/llm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      const cleanedData = data.replace(/<think>.*?<\/think>/gs, "");

      return cleanedData;
    } catch (error) {
      console.error("Fehler beim Abrufen der LLM-Antwort:", error);
      return null;
    }
  };

  const getTextToSpeach = async (text) => {
  try {
    // Clean formatting like Markdown (**bold**, *italic*, etc.)
    const cleanedText = text
      .replace(/\*\*(.*?)\*\*/g, "$1")      // remove **bold**
      .replace(/\*(.*?)\*/g, "$1")          // remove *italic*
      .replace(/#+\s?(.*)/g, "$1")          // remove markdown headings
      .replace(/`{1,3}(.*?)`{1,3}/g, "$1")  // remove inline code blocks
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // remove Markdown links but keep text
      .replace(/^\s+/gm, "")                // remove leading whitespace
      .replace(/\n{2,}/g, "\n")             // remove extra newlines
      .trim();

    const response = await fetch(`${API_BASE_URL}/api/tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(cleanedText),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    return audioUrl;
  } catch (error) {
    console.error("Error generating text-to-speech audio:", error);
    return null;
  }
};


  const saveMessage = async () => {
    setIsSending(true);
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
      const transcriptionResponse = await fetch(`${API_BASE_URL}/api/stt`, {
        method: "POST",
        body: formData,
      });      

      const transcriptionData = await transcriptionResponse.text();
      const transcribedText = transcriptionData || "Transcription failed";

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          text: transcribedText,
          audioUrl: lastAudioUrl,
        },
      ]);

      const llmResponse = await getLLMresponse(transcribedText);
      const ttsResponse = await getTextToSpeach(llmResponse);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          text: llmResponse,
          audioUrl: ttsResponse,
        },
      ]);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
    setIsRecording((prevState) => !prevState);
    setIsSending(false);
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
      <div className="contentArea">
        <div className="chat-area">
        <h1 className="chat-title">New Chat - Patient {patientId}</h1>
          <div className="chatArea" ref={chatAreaRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`text ${
                  msg.role === "user" ? "humanText" : "chatbotText"
                }`}
              >
                <p>{msg.text}</p>
                <audio controls onPlay={(e) => (e.target.playbackRate = 1.25)}>
                  <source src={msg.audioUrl} type="audio/wav" />
                </audio>
              </div>
            ))}
          </div>
        </div>

        <div className="lowerInteractionBar">
          {isRecording ? (
            <div className="interactionButtonArea">
              <button  className="interactionButton" onClick={toggleButton}>
                <img src={MicrophoneIcon} alt="Microphone Icon" />
              </button>
            </div>
          ) : isSending ? (
            <div className="loadingIndicator"></div>
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
};

export default Assistant;