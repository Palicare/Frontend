import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";

export default function CameraView() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    // Kamera starten und live-Video anzeigen
    useEffect(() => {
        startCamera();

        // Verlassen der Seite
        return () => {
            stopCamera();
        };
    }, []);

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

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
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
            stopCamera(); // Kamera stoppen, nachdem das Bild aufgenommen wurde
        }
    };

    const deleteImage = () => {
        setCapturedImage(null);
        startCamera(); // Kamera nach dem Löschen des Bildes neu starten
    };

    const saveImage = () => {

        let imageIndex = localStorage.getItem('imageIndex');
        imageIndex = imageIndex ? parseInt(imageIndex, 10) : 1;
    
        const imageName = `new${imageIndex}.png`;
    
        const link = document.createElement("a");
        link.href = capturedImage; 
        link.download = imageName;
        link.click();
    
        localStorage.setItem('imageIndex', imageIndex + 1);
    };

    return (
        <>
            <Header />
            <div className="camera-container flex flex-col items-center p-4">
                {/* Live-Video direkt anzeigen*/}
                <video ref={videoRef} autoPlay className="w-full max-w-md mt-4" />

                {!capturedImage ? (
                    <>
                        <button 
                            onClick={captureImage} 
                            className="px-4 py-2 bg-green-500 text-white rounded-lg mt-4">
                            Bild aufnehmen
                        </button>
                    </>
                ) : (
                    <>
                        {/* Zeigt das aufgenommene Bild */}
                        <img src={capturedImage} alt="Captured" className="w-full max-w-md mt-4" />
                        <div className="button-container flex gap-4 mt-4">
                            <button 
                                onClick={saveImage} 
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                Bild speichern
                            </button>
                            <button 
                                onClick={deleteImage} 
                                className="px-4 py-2 bg-red-500 text-white rounded-lg">
                                Bild löschen
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
