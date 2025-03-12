import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/cameraView.css";
import Header from "../components/Header";

const FullScreenCamera = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate(); // React Router navigation
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const video = videoRef.current;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      canvas.width = 677;
      canvas.height = 677;

      const aspectRatio = videoWidth / videoHeight;
      let cropWidth, cropHeight, startX, startY;

      if (aspectRatio > 1) {
        cropHeight = videoHeight;
        cropWidth = videoHeight;
        startX = (videoWidth - cropWidth) / 2;
        startY = 0;
      } else {
        cropWidth = videoWidth;
        cropHeight = videoWidth;
        startX = 0;
        startY = (videoHeight - cropHeight) / 2;
      }

      context.drawImage(video, startX, startY, cropWidth, cropHeight, 0, 0, 677, 677);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  const rejectImage = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Function to pass the captured image back to BasicInforForm
  const saveImageAndGoBack = () => {
    navigate("/adduser", { state: { capturedImage } }); // Pass image via navigation state
  };

  return (
    <div>
      <Header />
      <div className="cameraFeed">
        {!capturedImage ? (
          <video className="camera" ref={videoRef} autoPlay playsInline width="677" height="677" />
        ) : (
          <img src={capturedImage} alt="Captured" />
        )}
      </div>
      <div className="buttonContainer">
        {!capturedImage ? (
          <button className="recordButton active" onClick={captureImage}></button>
        ) : (
          <div className="actionButtonGroup">
            <button className="actionbutton" onClick={rejectImage}>Erneut versuchen</button>
            <button className="recordButton passiv"></button>
            <button className="actionbutton" onClick={saveImageAndGoBack}>Hinzufügen</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullScreenCamera;
