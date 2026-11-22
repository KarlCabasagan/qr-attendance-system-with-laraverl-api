import { useContext, useState } from 'react'
import { SelectedNavBtnContext } from '../App'
import { ProfileIcon, QrIcon, ScanIcon, SubjectsIcon } from './Icons'

function Header({ dayName, navBtn, userRole }) {
  const [, setSelectedNavBtn] = useContext(SelectedNavBtnContext)

  const [currentDate] = useState(() =>
    new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  )

  const isStudent = userRole == 1
  const roleLabel = userRole === null ? null : isStudent ? 'Student' : 'Faculty'

  const navItems = [
    {
      id: 1,
      label: isStudent ? 'QR Code' : 'Scanner',
      Icon: isStudent ? QrIcon : ScanIcon,
    },
    {
      id: 2,
      label: 'Subjects',
      Icon: SubjectsIcon,
    },
    {
      id: 3,
      label: 'Profile',
      Icon: ProfileIcon,
    },
  ]

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/logo-small.png"
              alt="Attendance"
              className="w-8 h-8 object-contain shrink-0"
            />
            <span className="text-base font-semibold tracking-tight text-slate-900 truncate">
              Attendance
            </span>
            {roleLabel && (
              <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">
                {roleLabel}
              </span>
            )}
          </div>

          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label, Icon }) => {
              const active = navBtn == id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedNavBtn(id)}
                  aria-current={active ? 'page' : undefined}
                  className={
                    'min-h-[44px] px-3.5 rounded-lg text-sm inline-flex items-center gap-2 btn-press ' +
                    (active
                      ? 'bg-brand-soft text-brand font-semibold'
                      : 'text-slate-600 font-medium hover:bg-slate-100 hover:text-slate-900')
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </button>
              )
            })}
          </nav>

          <div className="text-xs sm:text-sm text-slate-500 tabular-nums text-right shrink-0">
            <span className="hidden sm:inline">{dayName}, </span>
            <span>{currentDate}</span>
          </div>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-3 max-w-lg mx-auto">
          {navItems.map(({ id, label, Icon }) => {
            const active = navBtn == id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedNavBtn(id)}
                aria-current={active ? 'page' : undefined}
                className={
                  'min-h-[56px] flex flex-col items-center justify-center gap-1 text-[11px] btn-press ' +
                  (active ? 'text-brand font-semibold' : 'text-slate-500 font-medium')
                }
              >
                <span
                  className={
                    'px-3.5 py-1 rounded-full transition-colors duration-150 ' +
                    (active ? 'bg-brand-soft' : 'bg-transparent')
                  }
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default Header
