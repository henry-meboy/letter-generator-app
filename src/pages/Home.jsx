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
  padding: '2rem',
  borderRadius: '24px',
  cursor: 'pointer',
  overflow: 'hidden',
  backgroundImage: `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
  backdropFilter: 'blur(20px)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
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
        p: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(to bottom right, #4c1d95, #1e3a8a, #312e81)',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Paper
          elevation={12}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '32px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <Box textAlign="center" mb={6}>
            <Avatar
              sx={{
                width: 96,
                height: 96,
                margin: '0 auto 1.5rem auto',
                backgroundImage: 'linear-gradient(to right, #facc15, #f97316)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                fontSize: '2rem',
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
                mb: 2,
              }}
            >
              School & Student App
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Choose your action to get started
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {actions.map(action => (
              <Grid item xs={12} md={4} key={action.title}>
                <ButtonBase
                  onClick={() => setPage(action.page)}
                  sx={{ width: '100%', height: '100%' }}
                >
                  <ActionCard
                    sx={{
                      backgroundImage: `linear-gradient(to bottom right, ${action.gradient[0]}, ${action.gradient[1]})`,
                      color: '#fff',
                    }}
                  >
                    <Fade in timeout={300}>
                      <Box textAlign="center">
                        <Typography variant="h3" mb={2}>
                          {action.emoji}
                        </Typography>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                          {action.title}
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.9)">
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
          <Box mt={8} display="flex" justifyContent="center" gap={2}>
            {[0, 0.2, 0.4].map((delay, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 12,
                  height: 12,
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

      {/* Floating Glows */}
      {[
        { top: 80, left: 80, bg: '#3b82f6' },
        { bottom: 80, right: 80, bg: '#8b5cf6' },
        { top: '50%', left: 40, bg: '#10b981' },
      ].map((bubble, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: 120 + i * 20,
            height: 120 + i * 20,
            borderRadius: '50%',
            backgroundColor: `${bubble.bg}33`,
            filter: 'blur(60px)',
            animation: 'pulse 4s infinite',
            ...bubble,
          }}
        />
      ))}

      {/* Keyframe for pulse */}
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
      `}</style>
    </Box>
  )
}

export default Home
