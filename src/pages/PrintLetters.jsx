// src/pages/PrintLetters.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { 
  Box, 
  Button, 
  Typography, 
  GlobalStyles, 
  Paper,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  LinearProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Container,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import { getFromLocalStorage } from '../utils/localStorage';

export default function PrintLetters() {
  const [school, setSchool] = useState({});
  const [logoUrl, setLogoUrl] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const printRef = useRef();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Load data
  useEffect(() => {
    const schools = getFromLocalStorage('schoolData') || [];
    if (schools[0]) {
      setSchool(schools[0]);
      if (schools[0].logo) setLogoUrl(schools[0].logo);
    }
    const batches = getFromLocalStorage('studentData') || [];
    const all = [];
    batches.forEach(batch => {
      const { admissionYear, admissionClass, names = [] } = batch;
      names.forEach(name => all.push({ name, admissionYear, admissionClass }));
    });
    setEntries(all);
  }, []);

  // Date helpers
  const getOrdinalSuffix = d => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  const formatDateWithOrdinal = dateString => {
    const date = new Date(dateString);
    return `${date.getDate()}${getOrdinalSuffix(date.getDate())} of ${date.toLocaleString('default',{month:'long'})} ${date.getFullYear()}`;
  };
  const formatDateWithWeekday = dateString => {
    const date = new Date(dateString);
    return `${date.toLocaleString('default',{weekday:'long'})} the ${date.getDate()}${getOrdinalSuffix(date.getDate())} of ${date.toLocaleString('default',{month:'long'})} ${date.getFullYear()}`;
  };

  const formattedDate = school.dateIssued
    ? formatDateWithOrdinal(school.dateIssued)
    : formatDateWithOrdinal(new Date().toISOString());
  const formattedDeadline = school.deadline
    ? formatDateWithWeekday(school.deadline)
    : 'Monday the 5th of February 2024';

  // School defaults
  const collegeName = school.schoolName || 'ECCOWAS (COSMOPOLITAN) COLLEGE';
  const motto = school.motto || 'Omo wa labake';
  const headOffice = school.headquartersAddress ||
    'Omolabake Avenue, G.R.A. off Stark/Gacool Rd. along Idiroko Rd. Sango-Ota, Ogun State.';
  const annex = school.annexAddress ||
    'Nascon Rd. Mascon Gate, Ijoko, Ijoko – Ota. P.O. Box 1147, Ota, Ogun State, Nigeria.';
  const phones = school.phone1
    ? school.phone2
      ? `${school.phone1}, ${school.phone2}`
      : school.phone1
    : '08033774645, 08051667070';
  const email = school.email || 'eccolabschools@gmail.com';
  const website = school.website || 'www.eccowascollege.com';

  // Print hook with loading state
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: '@page { size: A4; margin: 0 }',
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
  });

  // Group entries by class for better organization
  const entriesByClass = entries.reduce((acc, entry) => {
    const key = `${entry.admissionClass} - ${entry.admissionYear}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});

  if (!entries.length) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
        <Card elevation={3}>
          <CardContent sx={{ textAlign: 'center', py: { xs: 4, sm: 6 } }}>
            <SchoolIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="text.secondary">
              No Students Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Please add some student data first to print admission letters.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <>
      <GlobalStyles styles={{
        /* SCREEN preview */
        '@media screen': {
          '.letter-container': {
            position: 'relative',
            width: '21cm',
            height: '29.7cm',
            border: '1px dashed #999',
            boxSizing: 'border-box',
            margin: '1rem auto',
            background: '#fafafa',
            // Responsive scaling for mobile preview
            [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
              width: '100%',
              height: 'auto',
              minHeight: '29.7cm',
              transform: 'scale(0.6)',
              transformOrigin: 'top center',
              margin: '0 auto 2rem auto',
            },
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
              transform: 'scale(0.4)',
              margin: '0 auto 1rem auto',
            },
          },
        },
        /* PRINT overrides */
        '@media print': {
          'body *': { visibility: 'hidden' },
          '.letter-container, .letter-container *': { visibility: 'visible' },
          '.letter-container': {
            position: 'relative',
            width: '21cm',
            height: '29.7cm',
            pageBreakAfter: 'always',
            margin: '0 !important',
            paddingLeft: '1.5cm !important',
            paddingRight: '1.5cm !important',
            paddingTop: '40px !important',
            paddingBottom: '40px !important',
            boxSizing: 'border-box',
            transform: 'none !important',
          },
          '@page': { size: 'A4', margin: 0 },
          '.no-print': { display: 'none !important' },
        }
      }} />

      {/* Control Panel */}
      <Container maxWidth="lg" sx={{ mb: { xs: 2, sm: 3 } }} className="no-print">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
          {/* Header Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 3
          }}>
            <Box>
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                🖨️ Print All Letters
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Generate and print admission letters for all students
              </Typography>
            </Box>
            
            {/* Action Buttons */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2}
              sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
            >

              <Button
                variant="contained"
                startIcon={isPrinting ? null : <PrintIcon />}
                onClick={handlePrint}
                disabled={isPrinting}
                size={isSmallMobile ? 'small' : 'medium'}
                sx={{ 
                  minWidth: { xs: '100%', sm: 'auto' },
                  py: { xs: 1.5, sm: 1 }
                }}
              >
                {isPrinting ? 'Preparing Print...' : 'Print All Letters'}
              </Button>
            </Stack>
          </Box>

          {/* Loading Bar */}
          {isPrinting && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Preparing {entries.length} letters for printing...
              </Typography>
            </Box>
          )}

          {/* Statistics */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 2 },
            mb: 2
          }}>
            <Chip
              icon={<PeopleIcon />}
              label={`${entries.length} Students`}
              color="primary" 
              variant="outlined"
              size={isSmallMobile ? 'small' : 'medium'}
            />
            <Chip
              icon={<SchoolIcon />}
              label={`${Object.keys(entriesByClass).length} Classes`}
              color="secondary" 
              variant="outlined"
              size={isSmallMobile ? 'small' : 'medium'}
            />
            <Chip
              label={collegeName}
              color="success" 
              variant="outlined"
              size={isSmallMobile ? 'small' : 'medium'}
            />
          </Box>

          {/* Class Breakdown */}
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
              Letters will be printed for:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(entriesByClass).map(([classInfo, students]) => (
                <Chip
                  key={classInfo}
                  label={`${classInfo} (${students.length})`}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Alert>

          {/* Print Tips for Mobile */}
          {isMobile && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Mobile Print Tip:</strong> For best results, use landscape orientation 
                and enable "Print backgrounds" in your browser settings.
              </Typography>
            </Alert>
          )}
        </Paper>
      </Container>

      {/* Letters Content */}
      <Box 
        ref={printRef} 
        className="print-wrapper" 
        sx={{ 
          p: 0,
          // Hide preview by default on mobile to save performance
          display: isMobile && !previewMode ? 'none' : 'block',
        }}
      >
        {entries.map(({ name, admissionYear, admissionClass }, idx) => (
          <Box
            key={idx}
            className="letter-container"
            sx={{
              maxWidth: '100%',
              mx: 'auto',
              mt: idx === 0 ? 0 : '1cm',
              bgcolor: 'common.white',
              pt: 6,
              px: 3,
              pb: 4,
              fontFamily: 'Poppins, sans-serif',
              color: '#000',
              // Mobile responsive adjustments
              [theme.breakpoints.down('md')]: {
                px: 2,
                pt: 4,
              },
              [theme.breakpoints.down('sm')]: {
                px: 1.5,
                pt: 3,
              },
            }}
          >
            {/* TOP SVG */}
            <Box
              component="svg"
              width="947"
              height="40"
              viewBox="0 0 947 40"
              xmlns="http://www.w3.org/2000/svg"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '34px',
              }}
            >
              <path d="M947 13.6V0H182L172.48 13.6H215.24H224H258H947Z" fill="url(#paint0_linear_0_1)"/>
              <path d="M0 13.6V40H154L172.48 13.6H0Z" fill="#55FF4C" fillOpacity="0.88"/>
              <path d="M0 0V13.6H172.48L182 0H91H0Z" fill="#55FF4C" fillOpacity="0.88"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M204 40H154L172.48 13.6H215.24H224L204 40Z" fill="#32EBFF" fillOpacity="0.19"/>
              <defs>
                <linearGradient id="paint0_linear_0_1" x1="0" y1="20" x2="947" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0.774038" stopColor="#55FF4C" stopOpacity="0.82"/>
                  <stop offset="0.903846" stopColor="#ADFF2F" stopOpacity="0.9"/>
                </linearGradient>
              </defs>
            </Box>

            {/* LETTER CONTENT */}
            <Box sx={{ mt: 2 }}>
              {/* HEADER */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                mb: 0.5,
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: { xs: 'center', sm: 'left' },
              }}>
                {logoUrl && (
                  <Box 
                    component="img" 
                    src={logoUrl} 
                    alt="School Logo"
                    sx={{ 
                      width: { xs: 100, sm: 120, md: 140 }, 
                      height: 'auto', 
                      mr: { xs: 0, sm: 0.5 },
                      mb: { xs: 1, sm: 0 },
                      mx: { xs: 'auto', sm: 0 },
                    }} 
                  />
                )}
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography 
                    variant="h4"
                    sx={{ 
                      fontWeight: 500, 
                      color: '#55FF4C', 
                      mb: 0.2, 
                      fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                      lineHeight: 1.2,
                    }}
                  >
                    {collegeName.toUpperCase()}
                  </Typography>
                  <Box sx={{
                    bgcolor: '#55FF4C', 
                    color: '#FFF',
                    px: 1, 
                    py: 0.2, 
                    borderRadius: 1,
                    fontWeight: 600, 
                    fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                    display: 'inline-block', 
                    mb: 0.2,
                  }}>
                    Motto: {motto}
                  </Box>
                  <Typography sx={{ 
                    fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, 
                    mb: 0.3 
                  }}>
                    (WAEC, NECO, JAMB APPROVED)
                  </Typography>
                  <Typography 
                    variant="body2" 
                    align="center"
                    sx={{ 
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, 
                      mb: 0.2,
                      lineHeight: 1.3,
                    }}
                  >
                    <strong>HEADQUARTERS:</strong> {headOffice}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    align="center"
                    sx={{ 
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, 
                      mb: 0.2,
                      lineHeight: 1.3,
                    }}
                  >
                    <strong>ANNEX:</strong> {annex}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    align="center"
                    sx={{ 
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, 
                      mb: 0.2,
                      lineHeight: 1.3,
                    }}
                  >
                    Tel: {phones} • e-mail: {email}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    align="center"
                    sx={{ 
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, 
                      mb: 0.3,
                      lineHeight: 1.3,
                    }}
                  >
                    {website}
                  </Typography>
                </Box>
              </Box>

              {/* DATE */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                mt: { xs: 2, sm: 3, md: 4 }, 
                mb: 2 
              }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  {formattedDate}
                </Typography>
              </Box>

              {/* BODY */}
              <Box sx={{ 
                mt: { xs: 2, sm: 3, md: 4 }, 
                textAlign: 'left',
                '& p': {
                  fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                  lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                }
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: { xs: 3, sm: 4, md: 5 },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  }}
                >
                  Dear {name},
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: { xs: 4, sm: 5, md: 6 },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    fontWeight: 600,
                  }}
                >
                  OFFER OF PROVISIONAL ADMISSION
                </Typography>
                <Typography 
                  paragraph 
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                    lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                  }}
                >
                  Sequel to the entrance examination you wrote in this school, I am
                  directed to inform you that you have been offered a provisional
                  admission into <strong>{admissionClass || 'S.S.S 1'}</strong> for
                  the <strong>{admissionYear || '2023/2024'}</strong> academic
                  session.
                </Typography>
                <Typography 
                  paragraph 
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                    lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                  }}
                >
                  You are expected to demonstrate a high sense of discipline and
                  sterling qualities while you make obedience to rules, hard and
                  independent work your watchwords.
                </Typography>
                <Typography 
                  paragraph 
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                    lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                  }}
                >
                  To secure this admission, you are to pay 100% of the total fees on
                  or before <strong>{formattedDeadline}</strong> to enhance the
                  completion of all the registration formalities.
                </Typography>
                <Typography 
                  paragraph 
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                    lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                  }}
                >
                  All relevant fees are to be paid into bank using an attached
                  teller and the copy brought to school in exchange for school
                  receipt.
                </Typography>
                <Typography 
                  paragraph 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                    lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                  }}
                >
                  Congratulations on your brilliant performance as I wish you a happy
                  stay in ECCOWAS academic community.
                </Typography>
              </Box>

              {/* SIGNATURE */}
              <Box sx={{ 
                mt: { xs: 6, sm: 8, md: 9 }, 
                textAlign: 'left' 
              }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontStyle: 'italic', 
                    mb: 0.3,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  Registrar
                </Typography>
                {school.signature ? (
                  <Box 
                    component="img" 
                    src={school.signature} 
                    alt="Registrar Signature"
                    sx={{ 
                      height: { xs: 40, sm: 45, md: 50 }, 
                      width: { xs: 68, sm: 77, md: 85 }, 
                      mb: 1 
                    }} 
                  />
                ) : (
                  <Typography sx={{ 
                    fontFamily: 'cursive', 
                    fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.5rem' },
                    fontWeight: 700, 
                    mb: 1 
                  }}>
                    __________________
                  </Typography>
                )}
              </Box>
            </Box>

            {/* BOTTOM SVG */}
            <Box
              component="svg"
              width="947"
              height="37"
              viewBox="0 0 947 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '32px',
              }}
            >
              <path d="M665 14L652 37H947V0H674L665 14Z" fill="#7FFEFE" fillOpacity="0.52"/>
              <path d="M674 0H560L549 14H665L674 0Z" fill="#32EBFF" fillOpacity="0.19"/>
              <path d="M0 14V37H652L665 14H549H0Z" fill="#55FF4C"/>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Mobile Bottom Actions */}
      {isMobile && (
        <Box 
          className="no-print"
          sx={{ 
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
            p: 2,
            zIndex: 1000,
            boxShadow: 3,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={() => setPreviewMode(!previewMode)}
              fullWidth
              disabled={isPrinting}
            >
              {previewMode ? 'Hide' : 'Preview'}
            </Button>
            <Button
              variant="contained"
              startIcon={isPrinting ? null : <PrintIcon />}
              onClick={handlePrint}
              disabled={isPrinting}
              fullWidth
            >
              {isPrinting ? 'Printing...' : 'Print All'}
            </Button>
          </Stack>
        </Box>
      )}

      {/* Add bottom padding for mobile bottom bar */}
      {isMobile && <Box sx={{ height: 80 }} className="no-print" />}
    </>
  );
}