
// src/pages/ReviewData.jsx
import React, { useEffect, useState } from 'react'
import {
  getFromLocalStorage,
  overwriteLocalStorage,
} from '../utils/localStorage'
import SchoolEditForm from './SchoolEditForm'
import StudentEditForm from './StudentEditForm'
import './Review.css'

export default function ReviewData({ goHome }) {
  const [schools, setSchools]   = useState([])
  const [students, setStudents] = useState([])
  const [editingSchoolIdx, setEditingSchoolIdx]   = useState(null)
  const [editingStudentIdx, setEditingStudentIdx] = useState(null)

  useEffect(() => {
    setSchools(  getFromLocalStorage('schoolData')   )
    setStudents(getFromLocalStorage('studentData')  )
  }, [])

  // Delete handlers
  const deleteSchool = idx => {
    const next = schools.filter((_, i) => i !== idx)
    overwriteLocalStorage('schoolData', next)
    setSchools(next)
  }

  const deleteStudent = idx => {
    const next = students.filter((_, i) => i !== idx)
    overwriteLocalStorage('studentData', next)
    setStudents(next)
  }

  // Update handlers
  const updateSchool = (idx, updated) => {
    const next = [...schools]
    next[idx] = updated
    overwriteLocalStorage('schoolData', next)
    setSchools(next)
    setEditingSchoolIdx(null)
  }

  const updateStudent = (idx, updated) => {
    const next = [...students]
    next[idx] = updated
    overwriteLocalStorage('studentData', next)
    setStudents(next)
    setEditingStudentIdx(null)
  }

  return (
    <div className="review-container">
      <h2 className="review-title">📋 Review Your Entries</h2>

      {/* Schools */}
      {schools.map((s, i) => (
        <div key={i} className="review-card">
          <div className="card-title">
            🏫 School #{i + 1}
            <div className="card-actions">
              <button onClick={() => setEditingSchoolIdx(i)}>Edit</button>
              <button onClick={() => deleteSchool(i)}>Delete</button>
            </div>
          </div>
          <div className="card-body">
            {editingSchoolIdx === i ? (
              <SchoolEditForm
                initialData={s}
                onCancel={() => setEditingSchoolIdx(null)}
                onSave={updated => updateSchool(i, updated)}
              />
            ) : (
              <>
                <p><strong>Name:</strong> {s.schoolName}</p>
                <p><strong>Owner Name:</strong> {s.ownerName}</p>  {/* New */}
                <p><strong>Owner Number:</strong> {s.ownerNumber}</p> {/* New */}
                <p><strong>Motto:</strong> {s.motto}</p>
                <p><strong>Email:</strong> {s.email}</p>
                <p><strong>Phone 1:</strong> {s.phone1}</p>
                <p><strong>Phone 2:</strong> {s.phone2}</p>
                <p><strong>Website:</strong> {s.website}</p>
                <p><strong>HQ Address:</strong> {s.headquartersAddress}</p>
                <p><strong>Annex:</strong> {s.annexAddress}</p>
                <p><strong>Date Issued:</strong> {s.dateIssued}</p>
                <p><strong>Deadline:</strong> {s.deadline}</p>
                {s.logo && (
                  <div className="image-section">
                    <p><strong>Logo:</strong></p>
                    <img src={s.logo} alt="Logo" className="school-logo" />
                  </div>
                )}
                {s.signature && (
                  <div className="image-section">
                    <p><strong>Signature:</strong></p>
                    <img src={s.signature} alt="Signature" className="school-logo" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}

      {/* Students */}
      {students.map((st, i) => (
        <div key={i} className="review-card">
          <div className="card-title">
            👨‍🎓 Batch #{i + 1}
            <div className="card-actions">
              <button onClick={() => setEditingStudentIdx(i)}>Edit</button>
              <button onClick={() => deleteStudent(i)}>Delete</button>
            </div>
          </div>
          <div className="card-body">
            {editingStudentIdx === i ? (
              <StudentEditForm
                initialData={st}
                onCancel={() => setEditingStudentIdx(null)}
                onSave={updated => updateStudent(i, updated)}
              />
            ) : (
              <>
                <p><strong>Admission Year:</strong> {st.admissionYear}</p>
                <p><strong>Admission Class:</strong> {st.admissionClass}</p>
                <div className="tag-list">
                  {st.names.map((name, idx) => (
                    <span key={idx} className="review-tag">{name}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      <button className="back-button" onClick={goHome}>
        ⬅️ Back to Home
      </button>
    </div>
  )
}
