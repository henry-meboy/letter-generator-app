// src/pages/SchoolInfoForm.jsx
import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Stack,
  Paper,
  Card,
  CardContent,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { saveToLocalStorage } from '../utils/localStorage'

export default function SchoolInfoForm() {
  const [formData, setFormData] = useState({
    schoolName: '',
    motto: '',
    headquartersAddress: '',
    annexAddress: '',
    email: '',
    phone1: '',
    phone2: '',
    website: '',
    dateIssued: '',
    deadline: '',
    logo: '',
    signature: '',
    ownerName: '',       // New field
    ownerNumber: '',     // New field
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = e => {
    const { name, files } = e.target
    if (!files[0]) return
    const reader = new FileReader()
    reader.onloadend = () =>
      setFormData(prev => ({ ...prev, [name]: reader.result }))
    reader.readAsDataURL(files[0])
  }

  const handleSubmit = e => {
    e.preventDefault()
    saveToLocalStorage('schoolData', formData)
    alert('✅ School info saved!')
  }

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" align="center" gutterBottom>
        🏫 School Information
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          {/* Text Inputs */}
          {[
            { label: 'School Name', name: 'schoolName', required: true },
            { label: 'Motto', name: 'motto' },
            { label: 'HQ Address', name: 'headquartersAddress' },
            { label: 'Annex Address', name: 'annexAddress' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Phone 1', name: 'phone1', type: 'tel' },
            { label: 'Phone 2', name: 'phone2', type: 'tel' },
            { label: 'Website', name: 'website', type: 'text' },
            { label: 'Owner Name', name: 'ownerName', required: true },     // New
            { label: 'Owner Number', name: 'ownerNumber', type: 'tel', required: true }, // New
          ].map(field => (
            <TextField
              key={field.name}
              label={field.label + (field.required ? ' *' : '')}
              name={field.name}
              type={field.type || 'text'}
              value={formData[field.name]}
              onChange={handleChange}
              required={!!field.required}
              fullWidth
            />
          ))}

          {/* Native Date Fields */}
          <TextField
            label="Date Issued"
            name="dateIssued"
            type="date"
            value={formData.dateIssued}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <TextField
            label="Deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />

          {/* Logo Upload */}
          <Card variant="outlined">
            <CardContent>
              <InputLabel shrink>Logo</InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                <Button variant="contained" component="label" size="small">
                  Choose Logo
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
                {formData.logo && (
                  <ImagePreview src={formData.logo} alt="Logo Preview" />
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Signature Upload */}
          <Card variant="outlined">
            <CardContent>
              <InputLabel shrink>Signature</InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                <Button variant="contained" component="label" size="small">
                  Choose Signature
                  <input
                    type="file"
                    name="signature"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
                {formData.signature && (
                  <ImagePreview src={formData.signature} alt="Signature Preview" />
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              ✅ Save School Info
            </Button>
          </Box>
        </Stack>
      </form>
    </StyledPaper>
  )
}

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 650,
  margin: '2rem auto',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
}))

// Show the image at its natural size
const ImagePreview = styled('img')({
  display: 'block',
  // no width/height constraints → original dimensions
})
