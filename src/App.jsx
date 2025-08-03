// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './pages/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SchoolInfoForm from './pages/SchoolInfoForm';
import StudentForm from './pages/StudentForm';
import ReviewData from './pages/ReviewData';
import GenerateLetter from './pages/GenerateLetter';
import PrintLetters from './pages/PrintLetters';
import { getFromLocalStorage } from "./utils/localStorage";

export default function App() {
  const [page, setPage] = useState('home');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // We no longer need allNames/selectedName in App,
  // GenerateLetter will handle its own sidebar.

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home setPage={setPage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'school':
        return <SchoolInfoForm />;
      case 'student':
        return <StudentForm />;
      case 'review':
        return <ReviewData goHome={() => setPage('home')} />;
      case 'letter':
        // Just render GenerateLetter — it has its own sidebar now
        return <GenerateLetter />;
      case 'print':
        return <PrintLetters />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  // Calculate dynamic header height based on device
  const getHeaderHeight = () => {
    if (isMobile) return 56; // Standard mobile app bar height
    if (isTablet) return 60; // Slightly taller for tablets
    return 64; // Desktop height
  };

  const headerHeight = getHeaderHeight();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        // Prevent horizontal scroll on mobile
        overflowX: 'hidden',
        // Ensure proper box model
        boxSizing: 'border-box',
      }}
    >
      {/* Header Component */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: theme.zIndex.appBar,
          // Ensure header doesn't shrink
          flexShrink: 0,
          width: '100%',
        }}
      >
        <Header setPage={setPage} currentPage={page} />
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          // Responsive padding
          p: {
            xs: 1, // 8px on mobile
            sm: 1.5, // 12px on small tablets
            md: 2, // 16px on larger screens
          },
          // Dynamic height calculation
          minHeight: `calc(100vh - ${headerHeight}px)`,
          // Flexible growth
          flex: 1,
          // Responsive container
          width: '100%',
          maxWidth: '100%',
          // Proper box model
          boxSizing: 'border-box',
          // Background for consistency
          backgroundColor: {
            xs: 'transparent', // Let page handle background on mobile
            sm: 'transparent',
          },
          // Better scrolling on mobile
          overflowY: 'auto',
          overflowX: 'hidden',
          // Smooth scrolling
          scrollBehavior: 'smooth',
          // iOS momentum scrolling
          WebkitOverflowScrolling: 'touch',
          
          // Handle safe areas for mobile devices (notches, etc.)
          paddingTop: {
            xs: 'env(safe-area-inset-top, 0px)',
            sm: 0,
          },
          paddingBottom: {
            xs: 'env(safe-area-inset-bottom, 0px)',
            sm: 0,
          },
          paddingLeft: {
            xs: 'env(safe-area-inset-left, 8px)',
            sm: '1.5rem',
            md: '2rem',
          },
          paddingRight: {
            xs: 'env(safe-area-inset-right, 8px)',
            sm: '1.5rem',
            md: '2rem',
          },
        }}
      >
        {renderPage()}
      </Box>

      {/* Global Mobile Optimizations */}
      <style jsx global>{`
        /* Reset and mobile optimizations */
        * {
          box-sizing: border-box;
        }
        
        html {
          /* Prevent zoom on iOS */
          -webkit-text-size-adjust: 100%;
          /* Smooth scrolling */
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
          /* Prevent horizontal scroll */
          overflow-x: hidden;
          /* Better font rendering on mobile */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          /* Prevent pull-to-refresh on mobile */
          overscroll-behavior-y: contain;
        }
        
        /* Remove tap highlight on mobile */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Improve button touch targets on mobile */
        button, 
        [role="button"],
        input[type="submit"],
        input[type="button"] {
          /* Prevent zoom on double tap */
          touch-action: manipulation;
          /* Minimum touch target size (44px recommended) */
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Better form inputs on mobile */
        input, 
        textarea, 
        select {
          /* Prevent zoom on focus in iOS */
          font-size: 16px;
          /* Better touch handling */
          touch-action: manipulation;
        }
        
        @media (max-width: 600px) {
          input, 
          textarea, 
          select {
            font-size: 16px !important;
          }
        }
        
        /* Responsive images */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Better scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 600px) {
          /* Reduce motion for better performance */
          * {
            animation-duration: 0.3s !important;
            transition-duration: 0.3s !important;
          }
          
          /* Better text selection on mobile */
          * {
            -webkit-user-select: none;
            user-select: none;
          }
          
          input, 
          textarea, 
          [contenteditable] {
            -webkit-user-select: text;
            user-select: text;
          }
        }
        
        /* Tablet optimizations */
        @media (min-width: 601px) and (max-width: 960px) {
          /* Slightly faster animations for tablets */
          * {
            animation-duration: 0.25s !important;
            transition-duration: 0.25s !important;
          }
        }
        
        /* Desktop optimizations */
        @media (min-width: 961px) {
          /* Full animation speeds for desktop */
          * {
            animation-duration: 0.3s !important;
            transition-duration: 0.3s !important;
          }
        }
        
        /* Focus management for accessibility */
        .focus-visible {
          outline: 2px solid #1976d2;
          outline-offset: 2px;
        }
        
        /* Hide focus ring for mouse users */
        .js-focus-visible :focus:not(.focus-visible) {
          outline: none;
        }
      `}</style>
    </Box>
  );
}