import { CalendarIcon, CloseIcon } from './Icons'

function formatTimeRange(schedule) {
  const start = schedule?.time?.slice(0, 5)
  const end = schedule?.end?.slice(0, 5)
  if (!start) return 'Time TBD'
  return end ? `${start} – ${end}` : start
}

function TodaySubjectModal({ modalId, nextSubjects, currentSubject, onClose }) {
  if (modalId != 1) {
    return null
  }

  const hasCurrent = Boolean(currentSubject?.name)
  const hasNext = Boolean(nextSubjects?.length)
  const hasSubjectToday = hasCurrent || hasNext

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="today-schedule-title"
      className="relative z-10 w-full sm:max-w-lg max-h-[85dvh] bg-white rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden animate-modal-in"
    >
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
        <h2 id="today-schedule-title" className="text-base font-semibold text-slate-900">
          Today’s Schedule
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close schedule"
          className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 btn-press"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 overflow-y-auto space-y-5">
        {hasCurrent && (
          <div className="rounded-xl border border-brand-border bg-brand-soft/40 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand bg-white border border-brand-border px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                In Progress
              </span>
              <span className="text-xs font-mono font-medium text-slate-700 tabular-nums">
                {formatTimeRange(currentSubject?.schedules?.[0])}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 min-w-0">
              <h3 className="text-base font-semibold text-slate-900 truncate">
                {currentSubject.name}
              </h3>
              {currentSubject.code && (
                <span className="font-mono text-xs font-medium uppercase tracking-wider bg-white text-brand border border-brand-border px-2 py-0.5 rounded-md tabular-nums shrink-0">
                  {currentSubject.code}
                </span>
              )}
            </div>
          </div>
        )}

        {hasNext && (
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              Up Next
            </h3>
            <ul className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              {nextSubjects.map((nextSubject) => (
                <li
                  key={nextSubject.id}
                  className="px-4 py-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900 truncate">
                      {nextSubject.name}
                    </span>
                    {nextSubject.code && (
                      <span className="font-mono text-xs font-medium uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md tabular-nums shrink-0">
                        {nextSubject.code}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-600 tabular-nums shrink-0">
                    {formatTimeRange(nextSubject?.schedules?.[0])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!hasSubjectToday && (
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mt-4">
              No classes scheduled for today
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-prose">
              Your upcoming classes for today will appear here when scheduled.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodaySubjectModal
