import React, { useState } from 'react';
import '../styles/Upload.css';

const Upload = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setFile(file);
            setError(null);
        }
    };

    const captureImageFromCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            setTimeout(() => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(blob => {
                    const file = new File([blob], "captured_image.png", { type: "image/png" });
                    setImage(URL.createObjectURL(file));
                    setFile(file);
                }, "image/png");

                stream.getTracks().forEach(track => track.stop());
                setError(null);
            }, 1000);
        } catch (error) {
            console.error('Error accessing camera:', error);
            setError('Failed to access camera. Please ensure you have granted the necessary permissions.');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please upload or capture an image first.');
            return;
        }

        setLoading(true);
        setPrediction(null);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8003/predict", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setPrediction(result);
        } catch (error) {
            console.error("Error uploading image:", error);
            setError("Failed to process the image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <h1 className="upload-title">Upload Image</h1>
            <div className="input-group">
                <input type="file" accept="image/*" onChange={handleFileChange} className="upload-input" />
                <button onClick={captureImageFromCamera} className="camera-button">
                    <i className="bi bi-camera-fill"></i>
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {image && <img src={image} alt="Uploaded Preview" className="upload-preview" />}
            <button 
                onClick={prediction ? () => window.location.reload() : handleUpload} 
                className="upload-button" 
                disabled={loading}
            >
                {loading ? "Processing..." : prediction ? "Reset" : "Predict"}
            </button>



            {prediction && (
                <div className="prediction-result">
                    <h2>Prediction Result:</h2>
                    {prediction.predicted_status === "Missing" ? (
                        <div>
                            <p><strong>Name:</strong> {prediction.details.name}</p>
                            <p><strong>Gender:</strong> {prediction.details.gender}</p>
                            <p><strong>Parent:</strong> {prediction.details.parent}</p>
                            <p><strong>Contact:</strong> {prediction.details.contact}</p> {/* ✅ Added Contact */}
                            <p><strong>Match Score:</strong> {prediction.details.similarity_score.toFixed(6)}</p>
                        </div>
                    ) : (
                        <p>{prediction.details}</p>
                    )}
                </div>
            )}

        </div>
    );
};

export default Upload;
