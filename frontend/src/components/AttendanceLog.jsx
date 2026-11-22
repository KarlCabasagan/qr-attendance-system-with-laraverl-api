import { CheckIcon, XMarkIcon } from './Icons'

function AttendanceLog({ attendance }) {
  const present = Boolean(attendance?.time)
  const formattedTime = attendance?.time ? attendance.time.slice(0, 5) : '—'

  return (
    <div className="py-2.5 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <span className="block text-sm font-medium text-slate-900 tabular-nums">
          {attendance?.date || '—'}
        </span>
        <span className="block text-xs font-mono text-slate-500 tabular-nums mt-0.5">
          {formattedTime}
        </span>
      </div>

      <span
        className={
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ' +
          (present
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-rose-50 text-rose-700 border-rose-200')
        }
      >
        {present ? <CheckIcon className="w-3.5 h-3.5" /> : <XMarkIcon className="w-3.5 h-3.5" />}
        <span>{present ? 'Present' : 'Absent'}</span>
      </span>
    </div>
  )
}

export default AttendanceLog
