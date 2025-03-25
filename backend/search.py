import os
import numpy as np
from deepface import DeepFace
from scipy.spatial.distance import cosine
import glob

# 🔹 Lấy đường dẫn tuyệt đối để tránh lỗi trên Windows/Linux
BASE_DIR = os.path.abspath("./data")
FEATURES_DIR = os.path.join(BASE_DIR, "features")
IMAGES_DIR = os.path.join(BASE_DIR, "images")
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")

# 🔹 1. Load tất cả vector đặc trưng đã lưu
def load_features():
    features = {}
    for file in glob.glob(os.path.join(FEATURES_DIR, "*.npy")):
        img_name = os.path.basename(file).replace(".npy", "")
        features[img_name] = np.load(file)
    return features

# 🔹 2. Hàm tìm kiếm 3 ảnh giống nhất
def find_similar_images(input_image_path, image_folder=IMAGES_DIR):
    """
    Tìm kiếm 3 ảnh giống nhất với ảnh input trong `image_folder`.
    """
    input_image_path = os.path.abspath(input_image_path)
    image_folder = os.path.abspath(image_folder)
    
    if not os.path.exists(input_image_path):
        print(f'⚠️ Ảnh không tồn tại: {input_image_path}')
        return []
    else:
        print(f'🔍 Đang tìm ảnh giống với: {input_image_path}')
    
    # Trích xuất vector đặc trưng của ảnh input
    try:
        input_vector = DeepFace.represent(input_image_path, model_name="Facenet")[0]["embedding"]
    except Exception as e:
        print(f'❌ Lỗi khi trích xuất đặc trưng ảnh: {e}')
        return []

    # Load tập vector đã có
    dataset_features = load_features()
    if not dataset_features:
        print("⚠️ Không có dữ liệu đặc trưng nào được tải.")
        return []
    
    # Tính toán độ tương đồng
    similarities = []
    for img_name, feature in dataset_features.items():
        try:
            similarity = 1 - cosine(input_vector, feature)  # Giá trị càng gần 1 càng giống
            similarities.append((img_name, similarity))
        except Exception as e:
            print(f'⚠️ Lỗi khi tính độ tương đồng với {img_name}: {e}')

    # Sắp xếp theo độ tương đồng giảm dần
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    # Lấy 3 ảnh giống nhất
    top_matches = similarities[:3]
    print("Top matches:", top_matches)
    
    # Chuyển đổi tên ảnh thành đường dẫn
    return [f"images/{img_name}.jpg" for img_name, _ in top_matches]
# 🔹 Test thử
if __name__ == "__main__":
    test_image = os.path.join(UPLOADS_DIR, "test.png")  # Đổi thành ảnh test có sẵn
    results = find_similar_images(test_image)
    print("🔎 Ảnh giống nhất:")
    for img in results:
        print(f"- {img}")