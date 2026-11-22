import FacultySubjectPage from './components/FacultySubjectPage'
import ProfilePage from './components/ProfilePage'
import QrScanner from './components/QrScanner'

function FacultyPage({ navBtn, userRole, user, userSubjects, currentSubject }) {
  return (
    <section className="w-full">
      {navBtn == 1 && <QrScanner navBtn={navBtn} user={user} currentSubject={currentSubject} />}
      {navBtn == 2 && (
        <FacultySubjectPage navBtn={navBtn} user={user} userSubjects={userSubjects} />
      )}
      {navBtn == 3 && <ProfilePage navBtn={navBtn} userRole={userRole} user={user} />}
    </section>
  )
}

export default FacultyPage
