```markdown
# Hệ Thống Tìm Kiếm Khuôn Mặt Trẻ Em Tương Đồng

## 📌 Mục tiêu
Hệ thống cho phép người dùng nhập vào một ảnh khuôn mặt trẻ em và tìm ra **3 khuôn mặt tương đồng nhất** từ cơ sở dữ liệu ảnh đầu vào.

## ⚙️ Công nghệ sử dụng

- **Python**, **FastAPI** (xây dựng API backend)
- **LBP (Local Binary Pattern)** và **HOG (Histogram of Oriented Gradients)** để trích xuất đặc trưng ảnh
- **PCA** (Principal Component Analysis) để giảm chiều dữ liệu
- **Cosine Similarity** để so sánh độ tương đồng giữa các khuôn mặt
- **HTML + JavaScript** hoặc React (tùy frontend bạn chọn)

## 🗂 Cấu trúc thư mục
```
.
├── backend/
│   ├── main.py            # FastAPI server
│   ├── features/          # Chứa code trích xuất đặc trưng
│   ├── data/              # Ảnh và đặc trưng đã xử lý
│   └── ...
├── frontend/
│   ├── index.html         # Giao diện web
│   └── ...
├── requirements.txt       # Thư viện cần thiết
└── README.md              # File mô tả này
```

## 🚀 Cách chạy dự án

### 1. Clone repo
```bash
git clone https://github.com/yourusername/face-similarity-kids.git
cd face-similarity-kids
```

### 2. Cài đặt thư viện Python
```bash
pip install -r requirements.txt
```

### 3. Khởi chạy backend FastAPI
```bash
uvicorn backend.main:app --reload
```

### 4. Mở giao diện web (tuỳ thuộc vào bạn dùng HTML tĩnh hoặc React)

## 🧪 Cách sử dụng

- Truy cập trang web frontend.
- Chọn một ảnh khuôn mặt trẻ em từ máy tính.
- Gửi ảnh → server xử lý và trả về 3 ảnh tương đồng nhất cùng điểm số.

## 📝 Ghi chú

- Ảnh nên có kích thước cố định (ví dụ: 128x128).
- Hệ thống sử dụng ảnh xám để tính toán đặc trưng LBP.
- Nếu ảnh đầu vào quá lớn, sẽ tự động resize trước khi xử lý.

## 📄 Tài liệu tham khảo

- Ahonen et al., "Face description with local binary patterns"
- Zeng et al., "Face Recognition Algorithm based on Optimal Fusion of LBP and HOG Features"
- Chen et al., "A novel face recognition method based on fusion of LBP and HOG"
```
