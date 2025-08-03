import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Avatar,
  Stack
} from '@mui/material'

export default function SchoolEditForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({ ...initialData })

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleImageChange = e => {
    const { name, files } = e.target
    if (!files[0]) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(f => ({ ...f, [name]: reader.result }))
    }
    reader.readAsDataURL(files[0])
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSave(form)
  }

  const fields = [
    { label: 'School Name', name: 'schoolName', type: 'text', required: true },
    { label: 'Motto', name: 'motto', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone 1', name: 'phone1', type: 'tel' },
    { label: 'Phone 2', name: 'phone2', type: 'tel' },
    { label: 'Website', name: 'website', type: 'text' },
    { label: 'HQ Address', name: 'headquartersAddress', type: 'text' },
    { label: 'Annex Address', name: 'annexAddress', type: 'text' },
    { label: 'Date Issued', name: 'dateIssued', type: 'date' },
    { label: 'Deadline', name: 'deadline', type: 'date' }
  ]

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>Edit School Details</Typography>

      <Grid container spacing={2}>
        {fields.map(field => (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextField
              label={field.label}
              name={field.name}
              type={field.type}
              value={form[field.name] || ''}
              onChange={handleChange}
              fullWidth
              required={field.required || false}
            />
          </Grid>
        ))}

        {/* Logo Upload */}
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" component="label" fullWidth>
            Upload Logo
            <input type="file" name="logo" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          {form.logo && (
            <Avatar
              src={form.logo}
              alt="Logo"
              variant="rounded"
              sx={{ width: 100, height: 100, mt: 1 }}
            />
          )}
        </Grid>

        {/* Signature Upload */}
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" component="label" fullWidth>
            Upload Signature
            <input type="file" name="signature" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          {form.signature && (
            <Avatar
              src={form.signature}
              alt="Signature"
              variant="rounded"
              sx={{ width: 100, height: 100, mt: 1 }}
            />
          )}
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    </Box>
  )
}
