// src/components/Header.jsx
import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Stack,
  useTheme,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Collapse,
} from '@mui/material'
import { styled } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { clearAllLocalStorage } from '../utils/localStorage'

const navItems = [
  { page: 'home', label: 'Home', icon: '🏠' },
  { page: 'school', label: 'School Info', icon: '🏫' },
  { page: 'student', label: 'Student Info', icon: '👨‍🎓' },
  { page: 'review', label: 'Review Data', icon: '📊' },
  { page: 'letter', label: 'Generate Letter', icon: '📝' },
  { page: 'print', label: 'Print Letters', icon: '🖨️' },
]

const Header = ({ setPage, currentPage }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleClearStorage = () => {
    clearAllLocalStorage()
    setMobileMenuOpen(false)
    // optional: give user feedback, then reload
    window.location.reload()
  }

  const handleNavigation = (page) => {
    setPage(page)
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <Box position="relative">
      {/* Gradient background */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #0f172a, #581c87, #0f172a)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Glass overlay */}
        <Box
          sx={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Container 
            maxWidth="lg" 
            sx={{ 
              py: { xs: 1, sm: 1.5, md: 2 },
              px: { xs: 2, sm: 3 }
            }}
          >
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center"
              minHeight={{ xs: 56, sm: 60, md: 64 }}
            >
              {/* Desktop Navigation */}
              {!isMobile && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '24px',
                    p: 1,
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                  }}
                >
                  {navItems.map(({ page, label, icon }) => {
                    const isActive = currentPage === page
                    return (
                      <StyledNavButton
                        key={page}
                        onClick={() => setPage(page)}
                        active={isActive ? 1 : 0}
                      >
                        {isActive && <ActiveBlur />}
                        <Box display="flex" alignItems="center" gap={1} zIndex={1}>
                          <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                            }}
                          >
                            {label}
                          </Typography>
                        </Box>
                        <HoverOverlay />
                      </StyledNavButton>
                    )
                  })}
                </Stack>
              )}

              {/* Mobile Brand/Logo */}
              {isMobile && (
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="h6"
                    sx={{
                      background: 'linear-gradient(to right, #fff, #dbeafe)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 700,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    🎓 School App
                  </Typography>
                </Box>
              )}

              {/* Right side buttons */}
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
                {/* Desktop Clear Storage Button */}
                {!isMobile && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleClearStorage}
                    startIcon={<DeleteIcon />}
                    sx={{
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.7)',
                      fontSize: '0.875rem',
                      px: 2,
                      '&:hover': {
                        borderColor: '#ff5252',
                        color: '#ff5252',
                        backgroundColor: 'rgba(255, 82, 82, 0.1)',
                      },
                    }}
                  >
                    Clear Storage
                  </Button>
                )}

                {/* Mobile Clear Storage Button (Compact) */}
                {isMobile && (
                  <IconButton
                    onClick={handleClearStorage}
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      width: { xs: 40, sm: 44 },
                      height: { xs: 40, sm: 44 },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 82, 82, 0.2)',
                        color: '#ff5252',
                        borderColor: 'rgba(255, 82, 82, 0.5)',
                      },
                    }}
                  >
                    🗑️
                  </IconButton>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                  <IconButton
                    onClick={toggleMobileMenu}
                    sx={{
                      color: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      width: { xs: 40, sm: 44 },
                      height: { xs: 40, sm: 44 },
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                      },
                    }}
                  >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '280px', sm: '320px' },
            background: 'linear-gradient(to bottom, #0f172a, #581c87, #312e81)',
            color: '#fff',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Mobile Drawer Header */}
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={3}
            pb={2}
            borderBottom="1px solid rgba(255,255,255,0.1)"
          >
            <Typography
              variant="h6"
              sx={{
                background: 'linear-gradient(to right, #fff, #dbeafe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              🎓 Navigation
            </Typography>
            <IconButton
              onClick={() => setMobileMenuOpen(false)}
              sx={{ color: 'rgba(255,255,255,0.8)' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Navigation List */}
          <List sx={{ p: 0 }}>
            {navItems.map(({ page, label, icon }) => {
              const isActive = currentPage === page
              return (
                <ListItem key={page} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => handleNavigation(page)}
                    sx={{
                      borderRadius: '12px',
                      py: 1.5,
                      px: 2,
                      background: isActive
                        ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
                        : 'transparent',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                      '&:hover': {
                        backgroundColor: isActive
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ 
                      minWidth: 40, 
                      color: 'inherit',
                      fontSize: '1.5rem'
                    }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '1rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>

          {/* Mobile Clear Storage Section */}
          <Box mt={4} pt={3} borderTop="1px solid rgba(255,255,255,0.1)">
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearStorage}
              startIcon={<DeleteIcon />}
              sx={{
                color: 'rgba(255,255,255,0.9)',
                borderColor: 'rgba(255,255,255,0.3)',
                py: 1.5,
                fontSize: '1rem',
                '&:hover': {
                  borderColor: '#ff5252',
                  color: '#ff5252',
                  backgroundColor: 'rgba(255, 82, 82, 0.1)',
                },
              }}
            >
              Clear All Data
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Decorative gradient border */}
      <Box
        sx={{
          height: { xs: 3, sm: 4 },
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
        }}
      />

      {/* Floating Orbs - Responsive */}
      <FloatingOrb 
        sx={{ 
          top: 0, 
          left: '25%', 
          width: { xs: 80, sm: 100, md: 128 }, 
          height: { xs: 80, sm: 100, md: 128 }, 
          backgroundColor: '#3b82f622',
          display: { xs: 'none', sm: 'block' } // Hide on very small screens
        }} 
      />
      <FloatingOrb 
        sx={{ 
          top: 0, 
          right: '25%', 
          width: { xs: 60, sm: 80, md: 96 }, 
          height: { xs: 60, sm: 80, md: 96 }, 
          backgroundColor: '#8b5cf622', 
          animationDelay: '1s',
          display: { xs: 'none', sm: 'block' } // Hide on very small screens
        }} 
      />

      {/* Keyframe animation */}
      <style>
        {`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }

        /* Prevent body scroll when drawer is open */
        .MuiDrawer-root .MuiBackdrop-root {
          backdrop-filter: blur(4px);
        }

        /* Mobile touch improvements */
        @media (max-width: 768px) {
          .MuiListItemButton-root {
            min-height: 48px;
          }
          
          .MuiIconButton-root {
            touch-action: manipulation;
          }
        }
      `}
      </style>
    </Box>
  )
}

export default Header

// Styled components with responsive updates
const StyledNavButton = styled(Button)(({ active, theme }) => ({
  position: 'relative',
  padding: '0.75rem 1.5rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '16px',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  minHeight: '44px', // Better touch target
  background: active
    ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
    : 'transparent',
  color: active ? '#fff' : 'rgba(255,255,255,0.8)',
  boxShadow: active ? '0 0 10px rgba(255,255,255,0.2)' : 'none',
  
  // Responsive padding
  [theme.breakpoints.down('lg')]: {
    padding: '0.6rem 1.2rem',
    fontSize: '0.8rem',
  },
  
  '&:hover': {
    transform: 'scale(1.05)',
    background: active
      ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
      : 'rgba(255,255,255,0.1)',
  },
  
  // Touch device optimizations
  '@media (hover: none)': {
    '&:hover': {
      transform: 'none',
    },
  },
}))

const HoverOverlay = styled('div')({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(255,255,255,0.08)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  borderRadius: '16px',
  zIndex: 0,
  '.MuiButton-root:hover &': {
    opacity: 1,
  },
})

const ActiveBlur = styled('div')({
  position: 'absolute',
  inset: 0,
  borderRadius: '16px',
  background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
  filter: 'blur(8px)',
  opacity: 0.5,
  zIndex: 0,
})

const FloatingOrb = styled(Box)(({ sx }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(40px)',
  animation: 'pulse 4s infinite',
  pointerEvents: 'none', // Prevent interference with touch
  ...sx,
}))