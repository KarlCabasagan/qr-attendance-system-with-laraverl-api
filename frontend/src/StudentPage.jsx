import ProfilePage from './components/ProfilePage'
import QrPage from './components/QrPage'
import StudentSubjectPage from './components/StudentSubjectPage'

function StudentPage({ navBtn, userRole, user, userSubjects, currentSubject }) {
  return (
    <section className="w-full">
      {navBtn == 1 && <QrPage navBtn={navBtn} currentSubject={currentSubject} />}
      {navBtn == 2 && <StudentSubjectPage navBtn={navBtn} userSubjects={userSubjects} />}
      {navBtn == 3 && <ProfilePage navBtn={navBtn} userRole={userRole} user={user} />}
    </section>
  )
}

export default StudentPage
