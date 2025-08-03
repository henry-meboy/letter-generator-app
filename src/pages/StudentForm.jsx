// src/components/StudentForm.jsx
import React, { useState, useRef, useEffect } from 'react'
import { saveToLocalStorage } from '../utils/localStorage'
import './StudentForm.css'

export default function StudentForm() {
  const [admissionYear, setAdmissionYear] = useState('')
  const [admissionClass, setAdmissionClass] = useState('')
  const [names, setNames] = useState([])
  const [currentName, setCurrentName] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleAdd = e => {
    e.preventDefault()
    const name = currentName.trim()
    if (name && !names.includes(name)) {
      setNames(n => [...n, name])
    }
    setCurrentName('')
    inputRef.current?.focus()
  }

  const handleDelete = idx => {
    setNames(n => n.filter((_, i) => i !== idx))
  }

  const handleEdit = idx => {
    const newName = prompt('Edit name:', names[idx])
    if (newName !== null) {
      const trimmed = newName.trim()
      if (trimmed) {
        setNames(n => n.map((x, i) => (i === idx ? trimmed : x)))
      }
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!admissionYear || !admissionClass || names.length === 0) {
      return alert('Please fill year, class, and add at least one name.')
    }
    saveToLocalStorage('studentData', {
      admissionYear,
      admissionClass,
      names,
    })
    alert('✅ Saved!')
    setAdmissionYear('')
    setAdmissionClass('')
    setNames([])
    setCurrentName('')
  }

  return (
    <div className="student-form-container">
      <h2>👨‍🎓 Student Information</h2>
      <form onSubmit={handleSubmit}>
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
              placeholder="Type name and hit Add"
              /* removed required so you can submit once names[] has items */
            />
            <button type="button" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>

        {names.length > 0 && (
          <ul className="name-list">
            {names.map((n, i) => (
              <li key={i}>
                {n}
                <button type="button" onClick={() => handleEdit(i)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(i)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <button type="submit">Save Students</button>
      </form>
    </div>
  )
}
