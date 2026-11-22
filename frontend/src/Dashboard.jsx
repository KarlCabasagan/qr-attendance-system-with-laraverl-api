import { useState } from 'react'
import Header from './components/Header'
import StudentPage from './StudentPage'
import FacultyPage from './FacultyPage'

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function Dashboard({ userRole, navBtn, isLoggedIn, user, userSubjects, currentSubject }) {
  const [dayName] = useState(() => DAY_NAMES[new Date().getDay()])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-[100dvh] w-full flex flex-col">
      <Header dayName={dayName} navBtn={navBtn} userRole={userRole} />
      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-24 md:pb-10 flex-1">
        {userRole === null ? (
          <div role="status" aria-label="Loading dashboard…" className="space-y-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-6 w-36 rounded-md bg-slate-200/80" />
              <div className="h-4 w-64 rounded-md bg-slate-200/60" />
            </div>
            <div className="max-w-md mx-auto h-72 rounded-2xl bg-white border border-slate-200" />
            <div className="max-w-md mx-auto h-16 rounded-xl bg-white border border-slate-200" />
          </div>
        ) : userRole == 1 ? (
          <StudentPage
            navBtn={navBtn}
            userRole={userRole}
            user={user}
            userSubjects={userSubjects}
            currentSubject={currentSubject}
          />
        ) : (
          <FacultyPage
            navBtn={navBtn}
            userRole={userRole}
            user={user}
            userSubjects={userSubjects}
            currentSubject={currentSubject}
          />
        )}
      </main>
    </div>
  )
}

export default Dashboard
