import { useState } from "react";
import { searchImage } from "../services/api";

const ImageSearch = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [similarImages, setSimilarImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    try {
      console.log("Selected file:", selectedFile);

      const response = await searchImage(selectedFile);
      console.log('Response from server:', response)

      if (response.matches) {
        setSimilarImages(response.matches);
      } else {
        setSimilarImages([]);
        setError(response.err || "Không tìm thấy ảnh tương tự.");
      }
    } catch (err) {
      console.error('Request Failed', err)
      setError("Failed when send to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>🔎 Tìm kiếm ảnh</h2>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Đang tìm kiếm..." : "Tìm kiếm"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {similarImages.length > 0 && (
        <div>
          <h3>📸 Ảnh giống nhất:</h3>
          {similarImages.map((img, idx) => (
            <img key={idx} src={`http://localhost:8000/${img}`} alt="Similar" width={100} onError={(e) => e.currentTarget.src = "/fallback.jpg"} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
