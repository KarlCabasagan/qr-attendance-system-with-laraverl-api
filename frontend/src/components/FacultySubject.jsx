import { useContext } from 'react'
import { IsModalOnContext, ModalIdContext, SelectedSubjectContext } from '../App'
import { ChevronRightIcon } from './Icons'

function FacultySubject({ userSubject }) {
  const [, setIsModalOn] = useContext(IsModalOnContext)
  const [, setModalId] = useContext(ModalIdContext)
  const [, setSelectedSubject] = useContext(SelectedSubjectContext)

  const handleSubjectClick = () => {
    setSelectedSubject(userSubject)
    setIsModalOn(true)
    setModalId(3)
  }

  return (
    <button
      type="button"
      onClick={handleSubjectClick}
      className="w-full min-h-[88px] bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 text-left flex items-center justify-between gap-3 btn-press"
    >
      <div className="min-w-0 flex-1">
        {userSubject?.code && (
          <span className="inline-block font-mono text-xs font-medium uppercase tracking-wider bg-brand-soft text-brand px-2 py-0.5 rounded-md tabular-nums">
            {userSubject.code}
          </span>
        )}
        <h2 className="text-base font-semibold text-slate-900 truncate mt-1.5">
          {userSubject?.name}
        </h2>
        {userSubject?.schedules?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {userSubject.schedules.map((schedule) => (
              <span
                key={schedule.id}
                className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-md"
              >
                {schedule.day?.slice(0, 3)}
              </span>
            ))}
          </div>
        )}
      </div>

      <ChevronRightIcon className="w-5 h-5 text-slate-400 shrink-0" />
    </button>
  )
}

export default FacultySubject
