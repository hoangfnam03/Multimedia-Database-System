from deepface import DeepFace
import numpy as np
import os

# Đường dẫn đến thư mục ảnh
IMAGE_DIR = "backend/data/images/"
FEATURE_DIR = "backend/data/features/"

# Duyệt tất cả ảnh trong thư mục
for image_name in os.listdir(IMAGE_DIR):
    img_path = os.path.join(IMAGE_DIR, image_name)
    
    # Trích xuất vector đặc trưng
    embedding = DeepFace.represent(img_path, model_name="Facenet", enforce_detection=False)[0]["embedding"]
    
    # Lưu vector vào file .npy
    np.save(os.path.join(FEATURE_DIR, image_name.replace(".jpg", ".npy")), embedding)

print("✅ Trích xuất đặc trưng hoàn tất!")
