import { useContext } from 'react'
import { EnrollmentDetailsContext } from './FacultySubjectModal'
import { ChevronRightIcon } from './Icons'

function Student({ student, enrollment }) {
  const [, setEnrollmentDetails] = useContext(EnrollmentDetailsContext)

  const initials = (student?.name || 'S')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <button
      type="button"
      onClick={() => setEnrollmentDetails(enrollment)}
      className="w-full min-h-[56px] px-5 py-3 flex items-center justify-between gap-3 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors duration-150"
    >
      <div className="min-w-0 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="w-8 h-8 rounded-full bg-brand-soft text-brand text-xs font-semibold flex items-center justify-center shrink-0"
        >
          {initials}
        </span>
        <span className="text-sm font-medium text-slate-900 truncate">
          {student?.name || 'Unnamed Student'}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {student?.year && (
          <span className="tabular-nums text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
            {student.year}
          </span>
        )}
        <ChevronRightIcon className="w-4 h-4 text-slate-400" />
      </div>
    </button>
  )
}

export default Student
