import React from 'react';
import { Box, Typography, Backdrop, CircularProgress, Paper, Container, Divider, Chip, useTheme } from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { motion } from 'framer-motion';
import { useImageUpload } from '../hooks/useImageUpload';
import DropZone from './DropZone';
import SearchButton from './SearchButton';
import ImageResults from './ImageResults';

const ModernImageSearch: React.FC = () => {
  const {
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
  } = useImageUpload();

  const theme = useTheme();

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{ width: '100%', maxWidth: 1100, mx: 'auto' }}
    >
      {/* Header with icon */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 4 }, 
          mb: { xs: 4, md: 5 }, 
          borderRadius: 4,
          background: 'linear-gradient(145deg, rgba(79, 70, 229, 0.08) 0%, rgba(79, 70, 229, 0.03) 100%)',
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Background pattern */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            opacity: 0.4,
            background: 'radial-gradient(circle at 90% 10%, rgba(79, 70, 229, 0.1) 0%, transparent 60%)',
            zIndex: 0,
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box 
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mb: 1,
            }}
          >
            <Chip 
              icon={<PhotoLibraryIcon />} 
              label="Công nghệ AI" 
              color="primary" 
              size="small"
              sx={{ 
                fontWeight: 600, 
                px: 1,
                mb: 2,
                background: 'linear-gradient(90deg, #4f46e5 0%, #6366f1 100%)',
                boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.2)',
              }} 
            />
          </Box>
          
          <Typography
            variant="h3"
            component={motion.h3}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
              textAlign: 'center',
              letterSpacing: '-0.01em',
              textShadow: '0 2px 4px rgba(79, 70, 229, 0.1)',
            }}
          >
            <ImageSearchIcon sx={{ mr: 1.5, fontSize: { xs: 32, sm: 40, md: 44 } }} />
            Tìm kiếm ảnh ngược
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            align="center"
            component={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              textShadow: '0 1px 2px rgba(15, 23, 42, 0.05)',
            }}
          >
            Tải lên một hình ảnh để tìm kiếm các hình ảnh tương tự trong cơ sở dữ liệu bằng công nghệ AI tiên tiến
          </Typography>
        </Box>
      </Paper>

      {/* Upload area */}
      <DropZone
        previewImage={previewImage}
        isDragging={isDragging}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onFileChange={handleFileChange}
        onReset={resetUpload}
      />

      {/* Search button */}
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <SearchButton
          loading={loading}
          disabled={!selectedFile}
          onClick={handleUpload}
        />
      </Box>

      {/* Results */}
      <ImageResults
        similarImages={similarImages}
        loading={loading}
        error={error}
      />

      {/* Loading overlay */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(4px)',
        }}
        open={loading}
      >
        <Box
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{ 
              color: 'primary.main',
              filter: 'drop-shadow(0 2px 4px rgba(79, 70, 229, 0.3))',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Đang tìm kiếm...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default ModernImageSearch;