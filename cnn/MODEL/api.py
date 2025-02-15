import mysql.connector
from fastapi import FastAPI, UploadFile, File
import uvicorn
import numpy as np
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
from keras.models import load_model
from tensorflow.keras.models import Model
import os
import logging
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# ✅ FIX: Allow full frontend access (not just "/upload")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5001"],  # Changed from "/upload" to full domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MySQL Connection Configuration
db_config = {
    "host": "localhost",       
    "user": "root",   
    "password": "haventrace@123", 
    "database": "missing_persons_db"
}

def get_db_connection():
    """Establish database connection."""
    return mysql.connector.connect(**db_config)

# Load the trained model and extract features
original_model = load_model("missing_children_model.keras")
feature_extractor = Model(inputs=original_model.input, outputs=original_model.get_layer('dense').output)

def preprocess_image(image):
    """Preprocess an image: resize, normalize, and expand dimensions."""
    image = image.resize((128, 128)).convert("RGB")
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

BASE_IMAGE_PATH = "C:/Users/shalu/Desktop/codes/PROJECT/backend/missing_person_system/media/"

def fetch_data_from_db():
    """Fetch images and details from MySQL database."""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    query = "SELECT id, name, gender, parent_name, parent_phone_number, photo FROM missingcases_missingcase"
    cursor.execute(query)
    data = cursor.fetchall()
    
    for record in data:
        if record["photo"]:  # Ensure there's a valid photo path
            record["photo"] = os.path.join(BASE_IMAGE_PATH, record["photo"])

    conn.close()
    return data


def extract_features():
    """Extract features from images stored in the database."""
    data = fetch_data_from_db()
    feature_dict = {}

    for row in data:
        image_path = row["photo"]
        if os.path.exists(image_path):  # Ensure the image file exists
            try:
                image = Image.open(image_path).convert("RGB")
                processed_image = preprocess_image(image)
                features = feature_extractor.predict(processed_image).flatten()
                feature_dict[row["id"]] = features  # Store features with ID
            except Exception as e:
                logging.error(f"Error processing image {image_path}: {e}")
        else:
            logging.warning(f"Image not found: {image_path}")

    return feature_dict, data  # Return extracted features and database records

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Open and preprocess the uploaded image
        try:
            image = Image.open(file.file).convert("RGB")
        except Exception:
            return {"error": "Invalid image file"}

        processed_image = preprocess_image(image)
        uploaded_features = feature_extractor.predict(processed_image)

        # Load dataset features dynamically from MySQL images
        feature_dict, data_records = extract_features()

        if not feature_dict:
            return {"error": "No valid images found in the database"}

        # Convert feature dictionary to array and maintain mapping
        image_ids = list(feature_dict.keys())
        dataset_features = np.array(list(feature_dict.values()))

        # Calculate cosine similarity
        similarities = cosine_similarity(uploaded_features, dataset_features)[0]

        # Find the highest similarity score
        most_similar_index = int(np.argmax(similarities))
        similarity_score = float(similarities[most_similar_index])

        # Define similarity threshold
        similarity_threshold = 0.999996

        if similarity_score < similarity_threshold:
            return {
                "predicted_status": "No Match Found",
                "confidence": similarity_score,
                "details": "No image in the database exceeds the similarity threshold."
            }

        # Find the matching record using image ID
        matching_id = image_ids[most_similar_index]
        most_similar_record = next(record for record in data_records if record["id"] == matching_id)

        details = {
            "name": most_similar_record["name"],
            "gender": most_similar_record["gender"],
            "parent": most_similar_record["parent_name"],
            "contact": most_similar_record["parent_phone_number"],  # ✅ Added contact field    
            "photo": most_similar_record["photo"],
            "similarity_score": similarity_score
        }

        return {
            "predicted_status": "Missing",
            "confidence": similarity_score,
            "details": details
        }

    except Exception as e:
        logging.error(f"Error in /predict: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8003, reload=True)  # ✅ Added --reload for dev mode
