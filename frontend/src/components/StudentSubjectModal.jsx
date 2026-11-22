import { CloseIcon } from './Icons'
import SubjectSchedule from './SubjectSchedule'

function StudentSubjectModal({ modalId, subject, onClose }) {
  if (modalId != 2) {
    return null
  }

  const teacherName = subject?.teacher?.name || 'Unassigned'
  const teacherEmail = subject?.teacher?.email
  const teacherInitials = teacherName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-subject-title"
      className="relative z-10 w-full sm:max-w-lg max-h-[85dvh] bg-white rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden animate-modal-in"
    >
      <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3 shrink-0">
        <div className="min-w-0 flex-1">
          {subject?.code && (
            <span className="inline-block font-mono text-xs font-medium uppercase tracking-wider bg-brand-soft text-brand px-2 py-0.5 rounded-md tabular-nums">
              {subject.code}
            </span>
          )}
          <h2
            id="student-subject-title"
            className="text-base font-semibold text-slate-900 truncate mt-1.5"
          >
            {subject?.name || 'Subject Details'}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close subject details"
          className="min-w-[44px] min-h-[44px] -mr-2 -mt-1 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 btn-press shrink-0"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 overflow-y-auto space-y-5">
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2.5">
            Schedule
          </h3>
          {subject?.schedules?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {subject.schedules.map((schedule) => (
                <SubjectSchedule key={schedule.id} schedule={schedule} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No schedule assigned yet.</p>
          )}
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2.5">
            Instructor
          </h3>
          <div className="rounded-xl border border-slate-200 bg-surface-subtle/50 px-4 py-3 flex items-center gap-3">
            <div
              aria-hidden="true"
              className="w-10 h-10 rounded-full bg-brand-soft text-brand text-xs font-semibold flex items-center justify-center shrink-0"
            >
              {teacherInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 truncate">{teacherName}</p>
              {teacherEmail ? (
                <a
                  href={`mailto:${teacherEmail}`}
                  className="inline-flex items-center min-h-[44px] -my-2 text-sm text-brand underline underline-offset-2 hover:text-brand-hover break-all"
                >
                  {teacherEmail}
                </a>
              ) : (
                <p className="text-sm text-slate-500 mt-0.5">No email on file</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentSubjectModal
