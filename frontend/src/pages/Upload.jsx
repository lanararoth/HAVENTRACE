import React, { useState } from 'react';
import '../styles/Upload.css';

const Upload = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
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
                setImage(canvas.toDataURL('image/png'));
                stream.getTracks().forEach(track => track.stop());
                setError(null);
            }, 1000);
        } catch (error) {
            console.error('Error accessing camera:', error);
            setError('Failed to access camera. Please ensure you have granted the necessary permissions.');
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
        </div>
    );
};

export default Upload;