// src/components/Header.jsx
import React from 'react'
import {
  Box,
  Button,
  Container,
  Stack,
  useTheme,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'
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

  const handleClearStorage = () => {
    clearAllLocalStorage()
    // optional: give user feedback, then reload
    window.location.reload()
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
          <Container maxWidth="lg" sx={{ py: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
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
                            display: { xs: 'none', sm: 'inline' },
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

              {/* Clear Storage Button */}
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearStorage}
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.7)',
                  '&:hover': {
                    borderColor: '#ff5252',
                    color: '#ff5252',
                  },
                }}
              >
                🗑️ Clear Storage
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Decorative gradient border */}
      <Box
        sx={{
          height: 4,
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
        }}
      />

      {/* Floating Orbs */}
      <FloatingOrb sx={{ top: 0, left: '25%', width: 128, height: 128, backgroundColor: '#3b82f622' }} />
      <FloatingOrb sx={{ top: 0, right: '25%', width: 96, height: 96, backgroundColor: '#8b5cf622', animationDelay: '1s' }} />

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
      `}
      </style>
    </Box>
  )
}

export default Header

// Styled components
const StyledNavButton = styled(Button)(({ active }) => ({
  position: 'relative',
  padding: '0.75rem 1.5rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '16px',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  background: active
    ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
    : 'transparent',
  color: active ? '#fff' : 'rgba(255,255,255,0.8)',
  boxShadow: active ? '0 0 10px rgba(255,255,255,0.2)' : 'none',
  '&:hover': {
    transform: 'scale(1.05)',
    background: active
      ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
      : 'rgba(255,255,255,0.1)',
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
  ...sx,
}))
