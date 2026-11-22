import FacultySubject from './FacultySubject'
import { SubjectsIcon } from './Icons'

function FacultySubjectPage({ navBtn, user, userSubjects }) {
  if (navBtn != 2) {
    return null
  }

  const count = userSubjects?.length ?? 0

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">My Subjects</h1>
          <p className="text-sm text-slate-500 mt-1 max-w-prose">
            Select a subject to view enrolled students and manage attendance.
          </p>
        </div>

        {userSubjects !== null && (
          <span className="text-xs font-medium tabular-nums bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full shrink-0">
            {count} {count === 1 ? 'subject' : 'subjects'}
          </span>
        )}
      </div>

      {userSubjects === null ? (
        <div
          role="status"
          aria-label="Loading subjects…"
          className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-pulse"
        >
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[104px] rounded-xl bg-white border border-slate-200 p-4"
            />
          ))}
        </div>
      ) : userSubjects.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
            <SubjectsIcon className="w-6 h-6" />
          </div>
          <h2 className="text-base font-semibold text-slate-900 mt-4">No subjects assigned</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-prose">
            Classes assigned to your faculty account will appear here once scheduled.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {userSubjects.map((userSubject) => (
            <FacultySubject key={userSubject.id} user={user} userSubject={userSubject} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FacultySubjectPage
