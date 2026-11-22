function CourseAndYear({ userRole, user }) {
  if (userRole != 1) {
    return null
  }

  return (
    <>
      <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Course</dt>
        <dd className="text-sm font-medium text-slate-900 break-words">
          {user?.course || '—'}
        </dd>
      </div>

      <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Year Level
        </dt>
        <dd className="text-sm font-medium text-slate-900 tabular-nums">
          {user?.year || '—'}
        </dd>
      </div>
    </>
  )
}

export default CourseAndYear
