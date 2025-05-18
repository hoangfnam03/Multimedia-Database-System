from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np
import cv2
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sklearn.metrics.pairwise import cosine_similarity
import json

from extract_features import extract_features

router = APIRouter()

# --- Cấu hình DB ---
DATABASE_URL = "mysql+pymysql://root:12345678@localhost:3306/mds"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

# --- ORM ---
from sqlalchemy import Column, Integer, String, Text

class FaceFeature(Base):
    __tablename__ = 'face_features'
    id = Column(Integer, primary_key=True)
    filename = Column(String(255), unique=True)
    features = Column(Text)

# --- Response Model ---
class SearchResult(BaseModel):
    filename: str
    similarity: float

@router.post("/search", response_model=List[SearchResult])
async def search_image(file: UploadFile = File(...)):
    contents = await file.read()
    npimg = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    if img is None:
        raise HTTPException(status_code=400, detail="Không đọc được ảnh")

    # Trích xuất đặc trưng ảnh truy vấn
    query_feat = extract_features(img)

    # Tải tất cả đặc trưng trong DB
    records = session.query(FaceFeature).all()
    if not records:
        raise HTTPException(status_code=404, detail="Không có dữ liệu trong cơ sở dữ liệu")

    features = []
    filenames = []
    for rec in records:
        try:
            vec = np.array(json.loads(rec.features)).reshape(1, -1)
            features.append(vec)
            filenames.append(rec.filename)
        except Exception as e:
            print(f"Lỗi khi đọc vector của {rec.filename}: {e}")

    features_matrix = np.vstack(features)
    sims = cosine_similarity(query_feat, features_matrix)[0]

    top_indices = sims.argsort()[::-1][:3]
    results = [
        SearchResult(filename=filenames[idx], similarity=float(sims[idx]))
        for idx in top_indices
    ]
    for idx in top_indices:
        print(f"📸 Ảnh tương đồng: {filenames[idx]} | Similarity: {sims[idx]:.4f}")
    return results
