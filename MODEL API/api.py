from fastapi import FastAPI, UploadFile, File
import uvicorn
import numpy as np
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
from keras.models import load_model
from tensorflow.keras.models import Model
import os
import pandas as pd
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load datasets and model at the start
data_path = 'DATA.csv'
parent_path = 'PARENT.csv'
merged_df = pd.read_csv(data_path).merge(pd.read_csv(parent_path), on='Parent', how='left')
dataset_features = np.load("dataset_features.npy")

# Load the original model and update it to extract features from the `dense` layer
original_model = load_model("missing_children_model.keras")
feature_extractor = Model(
    inputs=original_model.input,
    outputs=original_model.get_layer('dense').output
)
print("Feature extractor model updated to use the 'dense' layer.")

# API Implementation
app = FastAPI()

def preprocess_image(image):
    """
    Preprocesses the uploaded image: resizes it, converts to RGB, normalizes pixel values, and adds batch dimension.
    """
    # Convert to RGB and resize
    image = image.resize((128, 128)).convert("RGB")
    # Convert image to a NumPy array and normalize
    image_array = np.array(image) / 255.0  # Scale pixel values to [0, 1]
    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)
    return image_array


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Open and preprocess the uploaded image
        try:
            image = Image.open(file.file).convert("RGB")
        except Exception:
            return {"error": "Invalid image file"}

        processed_image = preprocess_image(image)

        # Extract features of uploaded image
        uploaded_features = feature_extractor.predict(processed_image)

        # Calculate cosine similarity
        similarities = cosine_similarity(uploaded_features, dataset_features)[0]

        # Log the cosine similarities
        logging.debug(f"Cosine similarities: {similarities}")
        
        # Find the highest similarity score and index
        most_similar_index = int(np.argmax(similarities))
        similarity_score = float(similarities[most_similar_index])

        # Log the result for the most similar image
        logging.debug(f"Most similar index: {most_similar_index}, Score: {similarity_score}")

        # Define similarity threshold
        similarity_threshold = 0.999996  # Adjust as needed

        # Check if similarity score is below the threshold
        if similarity_score < similarity_threshold:
            return {
                "predicted_status": "No Match Found",
                "confidence": similarity_score,
                "details": "No image in the dataset exceeds the similarity threshold."
            }

        # Get details of the most similar match
        most_similar_row = merged_df.iloc[most_similar_index]
        details = {
            "name": most_similar_row["Name"],
            "gender": most_similar_row["Gender"],
            "parent": most_similar_row["Parent"],
            "similarity_score": similarity_score,
            "other_details": {
                k: (v if not isinstance(v, np.generic) else v.item())
                for k, v in most_similar_row.to_dict().items() if k != "Image URL"
            }
        }

        return {
            "predicted_status": "Missing",
            "confidence": similarity_score,
            "details": details
        }

    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
