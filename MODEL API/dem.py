import os
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
import urllib.request
from PIL import Image
import numpy as np

# Load datasets
data_path = 'DATA.csv'
parent_path = 'PARENT.csv'

data_df = pd.read_csv(data_path)
parent_df = pd.read_csv(parent_path)

# Integrate datasets
merged_df = data_df.merge(parent_df, on='Parent', how='left')

# Directory setup
image_dir = './images'
os.makedirs(image_dir, exist_ok=True)

# Download images from URLs and save them locally
def download_images(data_df, image_dir):
    image_paths = []
    labels = []

    # Get total number of images
    total_images = len(data_df)
    print(f"Total images to download: {total_images}")

    for index, row in data_df.iterrows():
        url = row['Image URL']
        label = 'Missing'  # Static label for all images
        image_name = f"{row['Name'].replace(' ', '_')}.jpg"
        image_path = os.path.join(image_dir, image_name)

        try:
            print(f"Processing image: {url}") 

            urllib.request.urlretrieve(url, image_path)
            # Validate and preprocess the image
            with Image.open(image_path) as img:
                img = img.resize((128, 128))
                img.save(image_path)

            image_paths.append(image_path)
            labels.append(label)
        except Exception as e:
            print(f"Error downloading or processing image {url}: {e}")

    print(f"Total images downloaded: {len(image_paths)}") 
    return image_paths, labels

image_paths, labels = download_images(merged_df, image_dir)

# Ensure sufficient samples for train-test split
if len(image_paths) < 2:
    raise ValueError("Not enough samples for train-test split. Ensure at least two valid images.")

# Split the data into training and testing sets
train_paths, test_paths, train_labels, test_labels = train_test_split(
    image_paths, labels, test_size=0.2, random_state=42
)

# Preprocessing and data augmentation pipeline
def preprocess_image_with_augmentation(image_path, label):
    image = tf.io.read_file(image_path)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, [128, 128])
    image = image / 255.0
    image = tf.image.random_flip_left_right(image)
    image = tf.image.random_brightness(image, max_delta=0.2)
    image = tf.image.random_contrast(image, lower=0.8, upper=1.2)
    label = 1 if label == 'Missing' else 0
    return image, label

train_dataset = tf.data.Dataset.from_tensor_slices((train_paths, train_labels))
train_dataset = train_dataset.map(preprocess_image_with_augmentation).batch(32).shuffle(buffer_size=1000)

test_dataset = tf.data.Dataset.from_tensor_slices((test_paths, test_labels))
test_dataset = test_dataset.map(preprocess_image_with_augmentation).batch(32)

# Define a CNN model using the Functional API
def create_model():
    inputs = tf.keras.Input(shape=(128, 128, 3))  # Define the input layer
    x = tf.keras.layers.Conv2D(32, (3, 3), activation='relu')(inputs)  # Conv layer
    x = tf.keras.layers.MaxPooling2D((2, 2))(x)  # MaxPooling layer

    x = tf.keras.layers.Conv2D(64, (3, 3), activation='relu')(x)  # Conv layer
    x = tf.keras.layers.MaxPooling2D((2, 2))(x)  # MaxPooling layer

    x = tf.keras.layers.Flatten()(x)  # Flatten layer
    x = tf.keras.layers.Dense(128, activation='relu')(x)  # Fully connected layer
    x = tf.keras.layers.Dropout(0.5)(x)  # Dropout layer

    outputs = tf.keras.layers.Dense(1, activation='sigmoid')(x)  # Output layer

    # Define the model with inputs and outputs
    model = tf.keras.Model(inputs=inputs, outputs=outputs)
    
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
                  loss='binary_crossentropy',
                  metrics=['accuracy'])
    
    return model

# Call the model with a dummy input to ensure it's built
dummy_input = tf.random.normal([1, 128, 128, 3])  # A dummy tensor with the same shape as input
model = create_model()
model(dummy_input)  # This ensures the model is built

# Now the model is built, and we can extract features
feature_extractor = tf.keras.Model(inputs=model.input, outputs=model.layers[-2].output)

log_dir = "./logs"
tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir, histogram_freq=1)

history = model.fit(train_dataset, epochs=15, validation_data=test_dataset, callbacks=[tensorboard_callback])

test_loss, test_accuracy = model.evaluate(test_dataset)
print(f"Test Accuracy: {test_accuracy * 100:.2f}%")

# Save the model
model.save('missing_children_model.keras')

# Feature extraction
def extract_features(image_paths):
    features = []
    for image_path in image_paths:
        image = Image.open(image_path).resize((128, 128)).convert("RGB")
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        feature = feature_extractor.predict(image_array)[0]
        features.append(feature)
    return np.array(features)

dataset_features = extract_features(image_paths)
features_path = "dataset_features.npy"
np.save(features_path, dataset_features)

# Update the dataframe with features
merged_df["feature_index"] = range(len(dataset_features))
merged_df.to_csv("merged_with_features.csv", index=False)

# Print success message
print("Model and features saved successfully.")





