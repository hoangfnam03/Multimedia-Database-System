import { useState } from 'react';
import { searchImage } from '../services/api';

type SimilarImage = {
  filename: string;
  similarity: number;
};

interface UseImageUploadReturn {
  selectedFile: File | null;
  previewImage: string | null;
  similarImages: SimilarImage[];
  loading: boolean;
  error: string | null;
  isDragging: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnter: () => void;
  handleDragLeave: () => void;
  handleUpload: () => Promise<void>;
  resetUpload: () => void;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<SimilarImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    try {
    const response = await searchImage(selectedFile);

    if (Array.isArray(response)) {
      setSimilarImages(response);
      setError(null);
    } else {
      setSimilarImages([]);
      setError("Không tìm thấy ảnh tương tự.");
    }
  } catch (err) {
    setError("Lỗi khi gửi yêu cầu đến server.");
  }
  finally {
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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewImage(null);
  };

  return {
    selectedFile,
    previewImage,
    similarImages,
    loading,
    error,
    isDragging,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleUpload,
    resetUpload,
  };
};
