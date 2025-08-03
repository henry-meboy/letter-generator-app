// src/pages/GenerateLetter.jsx
import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  GlobalStyles,
  Divider
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useReactToPrint } from 'react-to-print';
import { getFromLocalStorage } from '../utils/localStorage';

export default function GenerateLetter() {
  const [school, setSchool] = useState({});
  const [logoUrl, setLogoUrl] = useState(null);
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState('');
  const printRef = useRef();

  // Load data once
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
    if (all.length) setSelected(all[0].name);
  }, []);

  // React-to-print hook
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: '@page { size: A4; margin: 0 }',
  });

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

  // School fallbacks
  const collegeName = school.schoolName || 'ECCOWAS (COSMOPOLITAN) COLLEGE';
  const motto       = school.motto      || 'Omo wa labake';
  const headOffice  = school.headquartersAddress ||
    'Omolabake Avenue, G.R.A. off Stark/Gacool Rd. along Idiroko Rd. Sango-Ota, Ogun State.';
  const annex       = school.annexAddress ||
    'Nascon Rd. Mascon Gate, Ijoko, Ijoko – Ota. P.O. Box 1147, Ota, Ogun State, Nigeria.';
  const phones      = school.phone1
    ? school.phone2
       ? `${school.phone1}, ${school.phone2}`
       : school.phone1
    : '08033774645, 08051667070';
  const email       = school.email   || 'eccolabschools@gmail.com';
  const website     = school.website || 'www.eccowascollege.com';

  // find the current entry
  const entry = entries.find(e => e.name === selected);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* Sidebar with download icons */}
      <Box
        component="nav"
        sx={{
          width: 260,
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Choose & Download
        </Typography>
        <Divider />
        <List dense>
          {entries.map(e => (
            <ListItemButton
              key={e.name}
              selected={e.name === selected}
              onClick={() => setSelected(e.name)}
            >
              <ListItemText primary={e.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => {
                    setSelected(e.name);
                    // tiny delay to ensure selected updates
                    setTimeout(handlePrint, 100);
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Letter preview & print-capture area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
        <GlobalStyles styles={{
          /* dashed preview frame */
          '@media screen': {
            '.letter-container': {
              position: 'relative',
              width: '21cm',
              height: '29.7cm',
              border: '1px dashed #999',
              boxSizing: 'border-box',
              margin: '1rem auto',
              background: '#fafafa',
            },
          },
          /* print overrides */
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
              paddingRight:'1.5cm !important',
              paddingTop:  '40px !important',
              paddingBottom: '40px !important',
              boxSizing: 'border-box',
            },
            '@page': { size: 'A4', margin: 0 },
          }
        }} />

        {entry && (
          <Box
            ref={printRef}
            className="letter-container"
            sx={{
              pt: 6,   // leave space for top SVG
              px: 3,
              pb: 4,   // content padding above bottom SVG
              fontFamily: 'Poppins, sans-serif',
              color: '#000',
            }}
          >
            {/* Top SVG (identical to PrintLetters) */}
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
              <path d="M947 13.6V0H182L172.48 13.6H215.24H224H258H947Z" fill="url(#paint0_linear)"/>
              <path d="M0 13.6V40H154L172.48 13.6H0Z" fill="#55FF4C" fillOpacity="0.88"/>
              <path d="M0 0V13.6H172.48L182 0H91H0Z" fill="#55FF4C" fillOpacity="0.88"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M204 40H154L172.48 13.6H215.24H224L204 40Z" fill="#32EBFF" fillOpacity="0.19"/>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="20" x2="947" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0.774038" stopColor="#55FF4C" stopOpacity="0.82"/>
                  <stop offset="0.903846" stopColor="#ADFF2F" stopOpacity="0.9"/>
                </linearGradient>
              </defs>
            </Box>

            {/* Letter content */}
            <Box sx={{ mt: 2 }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                {logoUrl && (
                  <Box component="img" src={logoUrl} alt="Logo"
                       sx={{ width: 140, height: 'auto', mr: 0.5 }} />
                )}
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="h4"
                    sx={{ fontWeight: 500, color: '#55FF4C', mb: 0.2, fontSize: '1.8rem' }}>
                    {collegeName.toUpperCase()}
                  </Typography>
                  <Box sx={{
                    bgcolor: '#55FF4C', color: '#FFF',
                    px:1, py:0.2, borderRadius:1,
                    fontWeight:600, fontSize:'0.75rem',
                    display:'inline-block', mb:0.2,
                  }}>
                    Motto: {motto}
                  </Box>
                  <Typography sx={{ fontSize:'0.7rem', mb:0.3 }}>
                    (WAEC, NECO, JAMB APPROVED)
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ fontSize:'0.75rem', mb:0.2 }}>
                    <strong>HEADQUARTERS:</strong> {headOffice}
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ fontSize:'0.75rem', mb:0.2 }}>
                    <strong>ANNEX:</strong> {annex}
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ fontSize:'0.75rem', mb:0.2 }}>
                    Tel: {phones} • e-mail: {email}
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ fontSize:'0.75rem', mb:0.3 }}>
                    {website}
                  </Typography>
                </Box>
              </Box>

              {/* Issue Date */}
              <Box sx={{ display:'flex', justifyContent:'flex-end', mt:4, mb:2 }}>
                <Typography variant="body1" sx={{ fontWeight:700 }}>
                  {formattedDate}
                </Typography>
              </Box>

              {/* Salutation & Offer */}
              <Box sx={{ mt:4, textAlign:'left' }}>
                <Typography variant="h6" sx={{ mb:5 }}>Dear {entry.name},</Typography>
                <Typography variant="h6" sx={{ mb:6 }}>OFFER OF PROVISIONAL ADMISSION</Typography>
                <Typography paragraph sx={{ mb:1 }}>
                  Sequel to the entrance examination you wrote in this school, I am directed to inform you that you have been offered a provisional admission into <strong>{entry.admissionClass}</strong> for the <strong>{entry.admissionYear}</strong> academic session.
                </Typography>
                <Typography paragraph sx={{ mb:1 }}>
                  You are expected to demonstrate a high sense of discipline and sterling qualities while you make obedience to rules, hard and independent work your watchwords.
                </Typography>
                <Typography paragraph sx={{ mb:1 }}>
                  To secure this admission, you are to pay 100% of the total fees on or before <strong>{formattedDeadline}</strong> to enhance the completion of all the registration formalities.
                </Typography>
                <Typography paragraph sx={{ mb:1 }}>
                  All relevant fees are to be paid into bank using an attached teller and the copy brought to school in exchange for school receipt.
                </Typography>
                <Typography paragraph sx={{ mb:2 }}>
                  Congratulations on your brilliant performance as I wish you a happy stay in ECCOWAS academic community.
                </Typography>
              </Box>

              {/* Signature */}
              <Box sx={{ mt:9, textAlign:'left' }}>
                <Typography variant="body1" sx={{ fontStyle:'italic', mb:0.3 }}>Registrar</Typography>
                {school.signature ? (
                  <Box component="img" src={school.signature} alt="Signature" sx={{ height:50, width:85, mb:1 }}/>
                ) : (
                  <Typography sx={{ fontFamily:'cursive', fontSize:'1.5rem', fontWeight:700, mb:1 }}>
                    __________________
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Bottom SVG */}
            <Box
              component="svg"
              width="947"
              height="37"
              viewBox="0 0 947 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              sx={{
                position:'absolute',
                bottom:0,
                left:0,
                width:'100%',
                height:'32px',
              }}
            >
              <path d="M665 14L652 37H947V0H674L665 14Z" fill="#7FFEFE" fillOpacity="0.52"/>
              <path d="M674 0H560L549 14H665L674 0Z" fill="#32EBFF" fillOpacity="0.19"/>
              <path d="M0 14V37H652L665 14H549H0Z" fill="#55FF4C"/>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
