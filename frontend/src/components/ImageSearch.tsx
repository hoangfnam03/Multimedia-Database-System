import { useState } from "react";
import { searchImage } from "../services/api";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardMedia,
  Paper,
  IconButton,
  Backdrop,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Fade from "@mui/material/Fade";

const ImageSearch = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    try {
      const response = await searchImage(selectedFile);
      if (response.matches) {
        setSimilarImages(response.matches);
        setError(null);
      } else {
        setSimilarImages([]);
        setError("Không tìm thấy ảnh tương tự.");
      }
    } catch (err) {
      setError("Lỗi khi gửi yêu cầu đến server.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, textAlign: "center" }}>
      {/* Tiêu đề với icon */}
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ImageSearchIcon sx={{ mr: 1 }} />
        Tìm kiếm ảnh ngược
      </Typography>

      {/* Khu vực tải ảnh */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: isDragging ? "#e3f2fd" : "#f9f9f9",
          border: isDragging ? "2px dashed #1976d2" : "2px dashed #aaa",
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="upload-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <label htmlFor="upload-input">
          <IconButton
            component="span"
            color="primary"
            sx={{ p: 2, border: "2px dashed #aaa", borderRadius: 2 }}
          >
            <CloudUploadIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </label>

        {/* Hiển thị hướng dẫn hoặc ảnh xem trước */}
        {!previewImage && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {isDragging ? "Thả ảnh vào đây" : "Chọn hoặc kéo thả ảnh vào đây"}
          </Typography>
        )}

        <Fade in={!!previewImage} timeout={300}>
          <Box sx={{ mt: 2, position: "relative" }}>
            <Card sx={{ width: 200, mx: "auto", boxShadow: 3 }}>
              <CardMedia
                component="img"
                src={previewImage || ""}
                alt="Selected preview"
                sx={{ width: "100%", height: "auto" }}
              />
            </Card>
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "white",
              }}
              onClick={() => {
                setSelectedFile(null);
                setPreviewImage(null);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Fade>

        {/* Nút tìm kiếm */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          sx={{ mt: 2 }}
          startIcon={
            loading ? <CircularProgress size={24} color="inherit" /> : null
          }
        >
          {loading ? "Đang tìm kiếm..." : "Tìm kiếm"}
        </Button>
      </Paper>

      {/* Thông báo lỗi */}
      {error && (
        <Typography
          sx={{
            mt: 2,
            color:
              error === "Không tìm thấy ảnh tương tự."
                ? "text.secondary"
                : "error",
          }}
        >
          {error}
        </Typography>
      )}

      {/* Khu vực hiển thị ảnh tương tự */}
      <Fade in={similarImages.length > 0} timeout={500}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            📸 Ảnh tương tự:
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {similarImages.map((img, idx) => (
              <Grid item xs={6} sm={4} md={3} key={idx}>
                <Card
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    src={`http://localhost:8000/${img}`}
                    alt="Similar"
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/150")
                    }
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>

      {/* Hiệu ứng loading toàn màn hình */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ImageSearch;