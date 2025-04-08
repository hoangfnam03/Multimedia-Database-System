import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

interface SearchButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ loading, disabled, onClick }) => {
  return (
    <Button
      component={motion.button}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={loading || disabled}
      sx={{
        mt: 3,
        px: 4,
        py: 1.5,
        borderRadius: 8,
        fontSize: '1rem',
        fontWeight: 600,
        boxShadow: '0 4px 14px rgba(63, 81, 181, 0.4)',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(63, 81, 181, 0.6)',
        },
      }}
      startIcon={
        loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <SearchIcon />
        )
      }
    >
      {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
    </Button>
  );
};

export default SearchButton;