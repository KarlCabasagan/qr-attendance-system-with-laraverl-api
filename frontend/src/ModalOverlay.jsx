import { useCallback, useContext, useEffect } from 'react'
import { IsModalOnContext, ModalIdContext } from './App'
import FacultySubjectModal from './components/FacultySubjectModal'
import StudentSubjectModal from './components/StudentSubjectModal'
import TodaySubjectModal from './components/TodaySubjectModal'

function ModalOverlay({ isModalOn, modalId, user, nextSubjects, currentSubject, subject }) {
  const [, setIsModalOnContext] = useContext(IsModalOnContext)
  const [, setModalIdContext] = useContext(ModalIdContext)

  const handleClose = useCallback(() => {
    setIsModalOnContext(false)
    setModalIdContext(1)
  }, [setIsModalOnContext, setModalIdContext])

  useEffect(() => {
    if (!isModalOn) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isModalOn, handleClose])

  if (!isModalOn) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        onClick={handleClose}
        aria-hidden="true"
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-fade-in"
      />
      {modalId == 1 && (
        <TodaySubjectModal
          modalId={modalId}
          nextSubjects={nextSubjects}
          currentSubject={currentSubject}
          onClose={handleClose}
        />
      )}
      {modalId == 2 && (
        <StudentSubjectModal
          modalId={modalId}
          subject={subject}
          onClose={handleClose}
        />
      )}
      {modalId == 3 && (
        <FacultySubjectModal
          modalId={modalId}
          user={user}
          subject={subject}
          onClose={handleClose}
        />
      )}
    </div>
  )
}

export default ModalOverlay
