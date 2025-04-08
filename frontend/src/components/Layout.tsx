import React, { ReactNode } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Link, useTheme, useMediaQuery, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1.5, md: 2 } }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 4px rgba(79, 70, 229, 0.1)',
                }}
              >
                <SearchIcon sx={{ fontSize: 28 }} />
                {!isMobile && 'Hệ thống tìm kiếm ảnh'}
              </Typography>
            </motion.div>
            
            {isMobile ? (
              <IconButton
                onClick={toggleMobileMenu}
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(79, 70, 229, 0.04)',
                  },
                }}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Button
                    startIcon={<HomeIcon />}
                    href="#" 
                    color="inherit"
                    sx={{ 
                      fontWeight: 600,
                      '&:hover': { 
                        color: 'primary.main',
                        backgroundColor: 'rgba(79, 70, 229, 0.04)',
                      } 
                    }}
                  >
                    Trang chủ
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button 
                    startIcon={<InfoIcon />}
                    href="#" 
                    color="inherit"
                    sx={{ 
                      fontWeight: 600,
                      '&:hover': { 
                        color: 'primary.main',
                        backgroundColor: 'rgba(79, 70, 229, 0.04)',
                      } 
                    }}
                  >
                    Giới thiệu
                  </Button>
                </motion.div>
              </Box>
            )}
          </Toolbar>

          {/* Mobile Menu */}
          {isMobile && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  py: 2,
                  px: 2,
                }}
              >
                <Button
                  startIcon={<HomeIcon />}
                  href="#"
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(79, 70, 229, 0.04)',
                    },
                  }}
                >
                  Trang chủ
                </Button>
                <Button
                  startIcon={<InfoIcon />}
                  href="#"
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(79, 70, 229, 0.04)',
                    },
                  }}
                >
                  Giới thiệu
                </Button>
              </Box>
            </motion.div>
          )}
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          py: { xs: 4, md: 6 },
          backgroundColor: 'background.default',
          backgroundImage: 'radial-gradient(at 50% 0%, rgba(79, 70, 229, 0.08) 0px, transparent 75%)',
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 4,
          mt: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderTop: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Container maxWidth="lg">
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                fontWeight: 500,
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              © {new Date().getFullYear()} Hệ thống tìm kiếm ảnh | Đồ án Cơ sở dữ liệu đa phương tiện
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link 
                href="#" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  '&:hover': { 
                    color: 'primary.main',
                  } 
                }}
              >
                Điều khoản
              </Link>
              <Link 
                href="#" 
                underline="hover" 
                color="text.secondary"
                sx={{ 
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  '&:hover': { 
                    color: 'primary.main',
                  } 
                }}
              >
                Bảo mật
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;