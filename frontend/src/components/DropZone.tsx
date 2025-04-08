import React from 'react';
import { Box, Typography, IconButton, Card, CardMedia, Paper, Tooltip, Chip, alpha } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import PhotoIcon from '@mui/icons-material/Photo';
import BackupIcon from '@mui/icons-material/Backup';
import { motion, AnimatePresence } from 'framer-motion';

interface DropZoneProps {
  previewImage: string | null;
  isDragging: boolean;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  previewImage,
  isDragging,
  onDrop,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onFileChange,
  onReset,
}) => {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      elevation={2}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        textAlign: 'center',
        backgroundColor: isDragging ? 'rgba(67, 97, 238, 0.08)' : 'rgba(255, 255, 255, 0.8)',
        border: isDragging ? '2px dashed #4361ee' : '2px dashed #cbd5e1',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          borderColor: '#4361ee',
          backgroundColor: 'rgba(67, 97, 238, 0.04)',
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
        },
      }}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        id="upload-input"
        style={{ display: 'none' }}
        onChange={onFileChange}
        accept="image/*"
      />

      {!previewImage ? (
        <Box
          component={motion.div}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Background pattern */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.5,
              background: 'radial-gradient(circle at 80% 80%, rgba(67, 97, 238, 0.05) 0%, transparent 50%)',
              zIndex: 0,
            }}
          />
          
          <label htmlFor="upload-input">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                position: 'relative',
                zIndex: 1,
                py: { xs: 3, md: 4 },
              }}
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <IconButton
                  component="span"
                  color="primary"
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    border: '2px dashed #4361ee',
                    borderRadius: 3,
                    backgroundColor: 'rgba(67, 97, 238, 0.04)',
                    boxShadow: '0 4px 20px rgba(67, 97, 238, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(67, 97, 238, 0.08)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(67, 97, 238, 0.15)',
                    }
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
                </IconButton>
              </motion.div>
              
              <Box>
                <Typography 
                  variant="h5" 
                  color="primary"
                  component={motion.h5}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                  }}
                >
                  {isDragging ? 'Thả ảnh vào đây' : 'Chọn hoặc kéo thả ảnh vào đây'}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  component={motion.p}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Hỗ trợ định dạng: JPG, PNG, GIF
                </Typography>
              </Box>
              
              <Box 
                component={motion.div}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  mt: 1,
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                <Chip 
                  icon={<ImageIcon />} 
                  label="JPG" 
                  size="small" 
                  variant="outlined" 
                  sx={{ borderRadius: 2 }} 
                />
                <Chip 
                  icon={<ImageIcon />} 
                  label="PNG" 
                  size="small" 
                  variant="outlined" 
                  sx={{ borderRadius: 2 }} 
                />
                <Chip 
                  icon={<ImageIcon />} 
                  label="GIF" 
                  size="small" 
                  variant="outlined" 
                  sx={{ borderRadius: 2 }} 
                />
              </Box>
            </Box>
          </label>
        </Box>
      ) : (
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          sx={{ 
            mt: 2, 
            position: 'relative', 
            maxWidth: 400, 
            mx: 'auto',
            p: 2
          }}
        >
          <Typography 
            variant="subtitle1" 
            color="primary.main"
            component={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            sx={{ 
              mb: 2, 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <ImageIcon fontSize="small" />
            Ảnh đã chọn
          </Typography>
          
          <Card
            component={motion.div}
            whileHover={{ y: -5 }}
            sx={{
              width: '100%',
              boxShadow: '0 10px 30px rgba(67, 97, 238, 0.15)',
              borderRadius: 3,
              overflow: 'hidden',
              border: '3px solid white',
            }}
          >
            <CardMedia
              component="img"
              src={previewImage}
              alt="Selected preview"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '350px',
                objectFit: 'cover',
                transition: 'transform 0.6s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
            />
          </Card>
          
          <Tooltip title="Xóa ảnh">
            <IconButton
              component={motion.button}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: 'white',
                boxShadow: '0 4px 8px rgba(15, 23, 42, 0.15)',
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'white',
                },
                transition: 'all 0.2s ease',
                border: '2px solid white',
                p: 1,
              }}
              onClick={onReset}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Paper>
  );
};

export default DropZone;