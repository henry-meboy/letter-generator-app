import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Fade,
  ButtonBase,
} from '@mui/material'
import { styled } from '@mui/system'

const ActionCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: '1.5rem',
  borderRadius: '20px',
  cursor: 'pointer',
  overflow: 'hidden',
  backgroundImage: `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
  backdropFilter: 'blur(20px)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  minHeight: '160px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  
  // Mobile-specific styles
  [theme.breakpoints.down('sm')]: {
    padding: '1.25rem',
    borderRadius: '16px',
    minHeight: '140px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
  },
  
  // Tablet styles
  [theme.breakpoints.between('sm', 'md')]: {
    padding: '1.75rem',
    borderRadius: '18px',
    minHeight: '150px',
  },
  
  // Desktop styles
  [theme.breakpoints.up('md')]: {
    padding: '2rem',
    borderRadius: '24px',
    minHeight: '180px',
  },
  
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
    
    // Reduced hover effect on mobile for better touch experience
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(1.01)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    },
  },
  
  '&:active': {
    transform: 'scale(0.98)',
    transition: 'transform 0.1s ease',
  },
}))

const Home = ({ setPage }) => {
  const actions = [
    {
      emoji: '🏫',
      title: 'School Info',
      desc: 'Enter and manage school details',
      gradient: ['#3b82f6', '#2563eb'],
      page: 'school',
    },
    {
      emoji: '👨‍🎓',
      title: 'Student Info',
      desc: 'Add and edit student records',
      gradient: ['#10b981', '#059669'],
      page: 'student',
    },
    {
      emoji: '📊',
      title: 'Review Data',
      desc: 'View and analyze all information',
      gradient: ['#8b5cf6', '#7c3aed'],
      page: 'review',
    },
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(to bottom right, #4c1d95, #1e3a8a, #312e81)',
        // Prevent horizontal scroll on mobile
        overflowX: 'hidden',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px' } }}>
        <Paper
          elevation={12}
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            borderRadius: { xs: '24px', sm: '28px', md: '32px' },
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.2)',
            // Ensure paper doesn't overflow on small screens
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box textAlign="center" mb={{ xs: 4, sm: 5, md: 6 }}>
            <Avatar
              sx={{
                width: { xs: 64, sm: 80, md: 96 },
                height: { xs: 64, sm: 80, md: 96 },
                margin: { xs: '0 auto 1rem auto', sm: '0 auto 1.25rem auto', md: '0 auto 1.5rem auto' },
                backgroundImage: 'linear-gradient(to right, #facc15, #f97316)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              }}
            >
              🎓
            </Avatar>
            <Typography
              variant="h3"
              sx={{
                background: 'linear-gradient(to right, #fff, #dbeafe, #ede9fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                mb: { xs: 1, sm: 1.5, md: 2 },
                fontSize: { 
                  xs: '1.75rem', 
                  sm: '2.25rem', 
                  md: '3rem' 
                },
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                // Prevent text from breaking awkwardly
                hyphens: 'none',
                wordBreak: 'keep-all',
              }}
            >
              School & Student App
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                px: { xs: 1, sm: 2 },
                lineHeight: 1.4,
              }}
            >
              Choose your action to get started
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {actions.map((action, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={action.title}
                sx={{
                  // Ensure consistent spacing on mobile
                  '&:last-child': {
                    mb: { xs: 0, sm: 'auto' }
                  }
                }}
              >
                <ButtonBase
                  onClick={() => setPage(action.page)}
                  sx={{ 
                    width: '100%', 
                    height: '100%',
                    // Improve touch target size for mobile
                    minHeight: { xs: '140px', sm: '150px', md: '180px' },
                    borderRadius: { xs: '16px', sm: '18px', md: '24px' },
                    // Add ripple effect for better feedback
                    '&:focus-visible': {
                      outline: '2px solid rgba(255,255,255,0.5)',
                      outlineOffset: '2px',
                    }
                  }}
                >
                  <ActionCard
                    sx={{
                      backgroundImage: `linear-gradient(to bottom right, ${action.gradient[0]}, ${action.gradient[1]})`,
                      color: '#fff',
                    }}
                  >
                    <Fade in timeout={300 + index * 100}>
                      <Box textAlign="center">
                        <Typography 
                          variant="h3" 
                          mb={{ xs: 1, sm: 1.5, md: 2 }}
                          sx={{ 
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            lineHeight: 1,
                          }}
                        >
                          {action.emoji}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          fontWeight={700} 
                          gutterBottom
                          sx={{
                            fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
                            mb: { xs: 0.5, sm: 1, md: 1 },
                            lineHeight: 1.3,
                          }}
                        >
                          {action.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="rgba(255,255,255,0.9)"
                          sx={{
                            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.875rem' },
                            lineHeight: 1.4,
                            px: { xs: 0.5, sm: 1, md: 0 },
                          }}
                        >
                          {action.desc}
                        </Typography>
                      </Box>
                    </Fade>
                  </ActionCard>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>

          {/* Animated Pulse Dots */}
          <Box 
            mt={{ xs: 4, sm: 6, md: 8 }} 
            display="flex" 
            justifyContent="center" 
            gap={{ xs: 1.5, sm: 2 }}
          >
            {[0, 0.2, 0.4].map((delay, idx) => (
              <Box
                key={idx}
                sx={{
                  width: { xs: 8, sm: 10, md: 12 },
                  height: { xs: 8, sm: 10, md: 12 },
                  borderRadius: '50%',
                  animation: 'pulse 1.5s infinite',
                  backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6'][idx],
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Floating Glows - Adjusted for mobile */}
      {[
        { 
          top: { xs: 60, sm: 80 }, 
          left: { xs: 20, sm: 40, md: 80 }, 
          bg: '#3b82f6',
          size: { xs: 80, sm: 100, md: 120 }
        },
        { 
          bottom: { xs: 60, sm: 80 }, 
          right: { xs: 20, sm: 40, md: 80 }, 
          bg: '#8b5cf6',
          size: { xs: 100, sm: 120, md: 140 }
        },
        { 
          top: '50%', 
          left: { xs: 10, sm: 20, md: 40 }, 
          bg: '#10b981',
          size: { xs: 120, sm: 140, md: 160 }
        },
      ].map((bubble, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            backgroundColor: `${bubble.bg}33`,
            filter: { xs: 'blur(40px)', sm: 'blur(50px)', md: 'blur(60px)' },
            animation: 'pulse 4s infinite',
            // Reduce opacity on mobile to prevent distraction
            opacity: { xs: 0.6, sm: 0.8, md: 1 },
            // Position properties
            ...(bubble.top !== undefined && { top: bubble.top }),
            ...(bubble.bottom !== undefined && { bottom: bubble.bottom }),
            ...(bubble.left !== undefined && { left: bubble.left }),
            ...(bubble.right !== undefined && { right: bubble.right }),
            // Prevent glows from causing horizontal scroll on mobile
            zIndex: -1,
          }}
        />
      ))}

      {/* Enhanced Keyframes for better mobile performance */}
      <style>{`
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
        
        /* Smooth scrolling for better mobile experience */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Prevent zoom on double tap for better UX */
        button, input, select, textarea {
          touch-action: manipulation;
        }
      `}</style>
    </Box>
  )
}

export default Home