import numpy as np
import cv2
import os
from skimage.feature import local_binary_pattern, hog
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker
import json

# --- Cấu hình ---
radius = 1
n_points = 8 * radius
METHOD = 'uniform'

# Thư mục ảnh
IMAGE_DIR = "./data/images"

# Kết nối CSDL MySQL
DATABASE_URL = "mysql+pymysql://root:12345678@localhost:3306/mds"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

# --- ORM ---
class FaceFeature(Base):
    __tablename__ = 'face_features'
    id = Column(Integer, primary_key=True)
    filename = Column(String(255), unique=True)
    features = Column(Text)  # JSON string

Base.metadata.create_all(engine)

# --- Trích xuất đặc trưng kết hợp LBP + HOG ---

def extract_features(image):
    # Tách riêng hàm trích xuất đặc trưng
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, (128, 128))

    lbp = local_binary_pattern(gray, n_points, radius, METHOD)
    lbp_hist, _ = np.histogram(lbp.ravel(), bins=np.arange(0, n_points + 3), range=(0, n_points + 2))
    lbp_hist = lbp_hist.astype("float") / (lbp_hist.sum() + 1e-6)

    hog_feat, _ = hog(
        gray,
        orientations=9,
        pixels_per_cell=(8, 8),
        cells_per_block=(2, 2),
        visualize=True,
        channel_axis=None
    )

    feature_vector = np.hstack([lbp_hist, hog_feat])
    return feature_vector.reshape(1, -1)

# --- Chạy khối trích đặc trưng chỉ khi file được chạy trực tiếp ---
def main():
    for image_name in os.listdir(IMAGE_DIR):
        img_path = os.path.join(IMAGE_DIR, image_name)
        img = cv2.imread(img_path, cv2.IMREAD_COLOR)

        if img is None:
            print(f"⚠️ Không đọc được ảnh: {image_name}")
            continue

        feature_vector = extract_features(img)
        feature_json = json.dumps(feature_vector.tolist())

        record = FaceFeature(filename=image_name, features=feature_json)
        session.merge(record)
        print(f"✅ Lưu xong: {image_name}")

    session.commit()
    print("🎉 Trích xuất đặc trưng LBP + HOG và lưu MySQL hoàn tất!")

if __name__ == "__main__":
    main()

