from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import shutil
import search
from fastapi.staticfiles import StaticFiles


app = FastAPI()
app.mount("/images", StaticFiles(directory="data/images"), name="images")



# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Chấp nhận tất cả origin, có thể thay bằng ["http://localhost:3000"] nếu chỉ cho phép frontend
    allow_credentials=True,
    allow_methods=["*"],  # Chấp nhận tất cả method (GET, POST, PUT, DELETE,...)
    allow_headers=["*"],  # Chấp nhận tất cả headers
)

# Đảm bảo thư mục tồn tại
for folder in [search.UPLOADS_DIR, search.IMAGES_DIR, search.FEATURES_DIR]:
    os.makedirs(folder, exist_ok=True)

@app.post("/search/")
async def search_image(file: UploadFile = File(...)):
    """ Nhận ảnh từ frontend, lưu vào server tạm thời, rồi tìm 3 ảnh giống nhất trong dataset. """
    file_path = os.path.join(search.UPLOADS_DIR, file.filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        results = search.find_similar_images(file_path)
        if not results:
            return JSONResponse({"error": "Không có dữ liệu để tìm kiếm"}, status_code=400)

        return JSONResponse({"matches": results})

    except Exception as e:
        return JSONResponse({"error": f"Lỗi khi tìm ảnh: {str(e)}"}, status_code=500)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    """ Nhận ảnh từ frontend và lưu vào dataset để làm ảnh tham chiếu. """
    file_path = os.path.join(search.IMAGES_DIR, file.filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return JSONResponse({"message": f"Ảnh {file.filename} đã được lưu vào dataset."})

    except Exception as e:
        return JSONResponse({"error": f"Lỗi khi tải ảnh lên: {str(e)}"}, status_code=500)
