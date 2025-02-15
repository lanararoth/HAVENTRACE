import mysql.connector
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model, Model
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

# Database Configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "haventrace@123",
    "database": "missing_persons_db"
}

def get_db_connection():
    """Establish a database connection."""
    return mysql.connector.connect(**db_config)

BASE_IMAGE_PATH = "C:/Users/shalu/Desktop/codes/PROJECT/backend/missing_person_system/media/"


def fetch_image_paths():
    """Fetch image paths and full database records."""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    query = "SELECT id, name, gender, parent_name, parent_phone_number, photo FROM missingcases_missingcase"
    cursor.execute(query)
    data = cursor.fetchall()  # This returns a list of dictionaries
    
    conn.close()

    # Append base path to relative database paths
    BASE_IMAGE_PATH = "C:/Users/shalu/Desktop/codes/PROJECT/backend/missing_person_system/media/"
    
    for record in data:
        record["photo"] = os.path.join(BASE_IMAGE_PATH, record["photo"])

    return data  # Returns full records, not just paths



# Load the trained model and set up feature extraction
model = load_model("missing_children_model.keras")
feature_extractor = Model(inputs=model.input, outputs=model.get_layer('dense').output)

def preprocess_image(image_path):
    """Load and preprocess an image for feature extraction."""
    if not os.path.exists(image_path):
        logging.warning(f"Image not found: {image_path}")
        return None
    
    try:
        image = Image.open(image_path).convert("RGB")
        image = image.resize((128, 128))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        return image_array
    except Exception as e:
        logging.error(f"Error processing image {image_path}: {e}")
        return None

def extract_features():
    """Extract features from all images in the database."""
    records = fetch_image_paths()  # Now gets full database records
    feature_list = []
    
    for record in records:
        image_path = record["photo"]  # Now this works correctly!
        if os.path.exists(image_path):
            processed_image = preprocess_image(image_path)
            if processed_image is not None:
                features = feature_extractor.predict(processed_image)
                feature_list.append(features.flatten())
    
    dataset_features = np.array(feature_list)
    np.save("dataset_features.npy", dataset_features)
    print(f"Feature extraction complete. Extracted {len(feature_list)} images.")

if __name__ == "__main__":
    extract_features()

