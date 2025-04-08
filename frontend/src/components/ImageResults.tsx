import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

interface ImageResultsProps {
  similarImages: string[];
  loading: boolean;
  error: string | null;
}

const ImageResults: React.FC<ImageResultsProps> = ({ similarImages, loading, error }) => {
  // If there are no images and no error, don't render anything
  if (similarImages.length === 0 && !error && !loading) return null;

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Box 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ mt: 4 }}
    >
      {/* Error message */}
      {error && (
        <Typography
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: error === "Không tìm thấy ảnh tương tự." 
              ? 'rgba(0, 0, 0, 0.04)' 
              : 'rgba(244, 67, 54, 0.08)',
            color: error === "Không tìm thấy ảnh tương tự." 
              ? 'text.secondary' 
              : 'error.main',
            textAlign: 'center',
          }}
        >
          {error}
        </Typography>
      )}

      {/* Results heading */}
      {similarImages.length > 0 && (
        <Typography 
          variant="h5" 
          component={motion.h5}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          sx={{ 
            mb: 3, 
            display: 'flex', 
            alignItems: 'center',
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          <span role="img" aria-label="camera" style={{ marginRight: '8px' }}>📸</span>
          Ảnh tương tự ({similarImages.length})
        </Typography>
      )}

      {/* Image grid */}
      <Grid container spacing={2} justifyContent="center">
        {similarImages.map((img, idx) => (
          <Grid item xs={6} sm={4} md={3} key={idx}>
            <Card
              component={motion.div}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
              }}
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <CardMedia
                component="img"
                src={`http://localhost:8000/${img}`}
                alt={`Similar image ${idx + 1}`}
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150?text=Image+Not+Found")}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Card>
          </Grid>
        ))}

        {/* Loading skeletons */}
        {loading &&
          Array.from(new Array(8)).map((_, idx) => (
            <Grid item xs={6} sm={4} md={3} key={`skeleton-${idx}`}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: 2,
                }}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ImageResults;