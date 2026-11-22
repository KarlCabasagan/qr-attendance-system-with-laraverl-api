function SubjectSchedule({ schedule }) {
  const start = schedule?.time?.slice(0, 5)
  const end = schedule?.end?.slice(0, 5)
  const timeRange = start ? (end ? `${start} – ${end}` : start) : 'Time TBD'

  return (
    <div className="rounded-lg bg-surface-subtle border border-slate-200/80 px-3.5 py-2.5 flex flex-col gap-0.5">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {schedule?.day || 'Day TBD'}
      </span>
      <span className="text-sm font-semibold text-slate-900 tabular-nums">{timeRange}</span>
    </div>
  )
}

export default SubjectSchedule
