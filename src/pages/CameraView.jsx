import { useState, useRef } from "react";
import Header from "../components/Header";

export default function CameraView() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
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

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            setCapturedImage(canvas.toDataURL("image/png"));
        }
    };

    const deleteImage = () => {
        setCapturedImage(null);
    };

    return (
        <>
            <Header />
            <div className="camera-container flex flex-col items-center p-4">
                <video ref={videoRef} autoPlay className="w-full max-w-md" onCanPlay={startCamera}></video>
                <canvas ref={canvasRef} className="hidden"></canvas>
                {capturedImage && <img src={capturedImage} alt="Captured" className="w-full max-w-md mt-4" />}
                <div className="button-container flex gap-4 mt-4">
                    <button 
                        onClick={deleteImage} 
                        className="px-4 py-2 bg-red-500 text-white rounded-lg">
                        Bild löschen
                    </button>
                    <button 
                        onClick={captureImage} 
                        className="px-4 py-2 bg-green-500 text-white rounded-lg">
                        Bild speichern
                    </button>
                </div>
            </div>
        </>
    );
}