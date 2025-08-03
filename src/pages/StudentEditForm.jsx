import React, { useState, useEffect, useRef } from 'react'
import './StudentForm.css' // reuse your existing simple–list styles

export default function StudentEditForm({ initialData, onSave, onCancel }) {
  const [admissionYear, setAdmissionYear]   = useState(initialData.admissionYear)
  const [admissionClass, setAdmissionClass] = useState(initialData.admissionClass)
  const [names, setNames]                   = useState([...initialData.names])
  const [currentName, setCurrentName]       = useState('')
  const inputRef = useRef(null)

  // autofocus the “add name” input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // add a new name (or on Enter)
  const handleAdd = e => {
    e.preventDefault()
    const name = currentName.trim()
    if (name && !names.includes(name)) {
      setNames(n => [...n, name])
    }
    setCurrentName('')
    inputRef.current?.focus()
  }

  // delete a name—can do this as many times as you like
  const handleDelete = idx => {
    setNames(n => n.filter((_, i) => i !== idx))
  }

  // edit a name via prompt
  const handleEdit = idx => {
    const updated = prompt('Edit name:', names[idx])
    if (updated !== null) {
      const t = updated.trim()
      if (t) {
        setNames(n => n.map((x,i) => (i === idx ? t : x)))
      }
    }
  }

  // save everything
  const handleSubmit = e => {
    e.preventDefault()
    if (!admissionYear || !admissionClass || names.length === 0) {
      return alert('Please fill year, class, and add at least one name.')
    }
    onSave({ admissionYear, admissionClass, names })
  }

  return (
    <form onSubmit={handleSubmit} className="student-form-container">
      <h2>Edit Student Batch</h2>

      <label>
        Admission Year:
        <input
          type="number"
          value={admissionYear}
          onChange={e => setAdmissionYear(e.target.value)}
          required
        />
      </label>

      <label>
        Admission Class:
        <input
          type="text"
          value={admissionClass}
          onChange={e => setAdmissionClass(e.target.value)}
          required
        />
      </label>

      <label>
        Add Name:
        <div className="name-add">
          <input
            ref={inputRef}
            type="text"
            value={currentName}
            onChange={e => setCurrentName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd(e)}
            placeholder="Type name, then Add"
            required={names.length === 0}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      </label>

      {names.length > 0 && (
        <ul className="name-list">
          {names.map((n, i) => (
            <li key={i}>
              {n}
              <button type="button" onClick={() => handleEdit(i)}>Edit</button>
              <button type="button" onClick={() => handleDelete(i)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <div className="form-actions">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
