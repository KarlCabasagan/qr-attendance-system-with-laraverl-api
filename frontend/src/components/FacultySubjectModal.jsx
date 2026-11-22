/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'
import { CloseIcon } from './Icons'
import Student from './Student'
import SubjectStudentDetails from './SubjectStudentDetails'

export const EnrollmentDetailsContext = createContext(null)

function FacultySubjectModal({ modalId, user, subject, onClose }) {
  const [enrollmentDetails, setEnrollmentDetails] = useState(null)

  if (modalId != 3) {
    return null
  }

  const enrollments = subject?.enrollments ?? []
  const count = enrollments.length

  return (
    <EnrollmentDetailsContext.Provider value={[enrollmentDetails, setEnrollmentDetails]}>
      {enrollmentDetails && (
        <SubjectStudentDetails user={user} subject={subject} enrollment={enrollmentDetails} />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="faculty-subject-title"
        className="relative z-10 w-full sm:max-w-lg max-h-[85dvh] bg-white rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden animate-modal-in"
      >
        <div className="px-5 py-4 flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {subject?.code && (
                <span className="font-mono text-xs font-medium uppercase tracking-wider bg-brand-soft text-brand px-2 py-0.5 rounded-md tabular-nums">
                  {subject.code}
                </span>
              )}
              <span className="text-xs font-medium tabular-nums bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {count} {count === 1 ? 'student' : 'students'}
              </span>
            </div>
            <h2
              id="faculty-subject-title"
              className="text-base font-semibold text-slate-900 truncate mt-1.5"
            >
              {subject?.name || 'Subject Roster'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close subject roster"
            className="min-w-[44px] min-h-[44px] -mr-2 -mt-1 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 btn-press shrink-0"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-2.5 bg-surface-subtle border-y border-slate-100 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-slate-500 shrink-0">
          <span>Student</span>
          <span>Year</span>
        </div>

        <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
          {count > 0 ? (
            enrollments.map((enrollment) => (
              <Student key={enrollment?.id} student={enrollment?.user} enrollment={enrollment} />
            ))
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-slate-900">No students enrolled</p>
              <p className="text-sm text-slate-500 mt-1 max-w-prose mx-auto">
                Enrolled students for this subject will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </EnrollmentDetailsContext.Provider>
  )
}

export default FacultySubjectModal
