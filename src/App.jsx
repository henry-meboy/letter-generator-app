// src/App.jsx
import React, { useState, useEffect } from 'react';
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

  return (
    <>
      <Header setPage={setPage} currentPage={page} />
      <main style={{ padding: '1rem', height: 'calc(100vh - 64px)' }}>
        {renderPage()}
      </main>
    </>
  );
}
