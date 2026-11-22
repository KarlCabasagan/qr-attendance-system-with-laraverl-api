import { useContext, useState } from 'react'
import { IsLoggedInContext, SelectedNavBtnContext, TokenContext, UserContext } from '../App'
import CourseAndYear from './CourseAndYear'
import { AlertCircleIcon, LogoutIcon } from './Icons'

function ProfilePage({ navBtn, userRole, user }) {
  const [token, setToken] = useContext(TokenContext)
  const [, setContextUser] = useContext(UserContext)
  const [, setIsLoggedIn] = useContext(IsLoggedInContext)
  const [, setSelectedNavBtn] = useContext(SelectedNavBtnContext)

  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  if (navBtn != 3) {
    return null
  }

  const initials = (user?.name || 'U')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  const roleLabel = userRole == 1 ? 'Student' : 'Faculty'

  const handleLogout = async (e) => {
    e.preventDefault()
    setLogoutError('')
    setIsLoggingOut(true)

    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setIsLoggedIn(false)
        setToken(null)
        setContextUser(null)
        setSelectedNavBtn(1)
        localStorage.removeItem('token')
        return
      }

      setLogoutError('Unable to sign out right now. Please try again.')
    } catch {
      setLogoutError('Unable to reach the server. Please try again.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="w-full">
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 mb-5">
          Personal Information
        </h1>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-5 sm:p-6 flex items-center gap-4 border-b border-slate-100">
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-full bg-brand-soft text-brand text-sm font-semibold flex items-center justify-center shrink-0"
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 min-w-0">
                <h2 className="text-base font-semibold text-slate-900 truncate">
                  {user?.name || '—'}
                </h2>
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">
                  {roleLabel}
                </span>
              </div>
              <p className="text-sm text-slate-500 truncate mt-0.5">{user?.email || '—'}</p>
            </div>
          </div>

          <dl className="divide-y divide-slate-100">
            <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Full Name
              </dt>
              <dd className="text-sm font-medium text-slate-900 break-words">
                {user?.name || '—'}
              </dd>
            </div>

            <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Email Address
              </dt>
              <dd className="text-sm font-medium text-slate-900 break-all sm:break-words">
                {user?.email || '—'}
              </dd>
            </div>

            <CourseAndYear userRole={userRole} user={user} />
          </dl>

          <div className="px-5 sm:px-6 py-4 bg-surface-subtle/60 border-t border-slate-100 space-y-3">
            {logoutError && (
              <div
                role="alert"
                className="bg-rose-50 border border-rose-200 text-rose-700 rounded-lg px-3.5 py-2.5 text-sm flex items-start gap-2.5"
              >
                <AlertCircleIcon className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{logoutError}</span>
              </div>
            )}

            <form onSubmit={handleLogout}>
              <button
                type="submit"
                disabled={isLoggingOut}
                className="min-h-[44px] px-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 btn-press disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <LogoutIcon className="w-4 h-4 shrink-0" />
                <span>{isLoggingOut ? 'Signing out…' : 'Sign Out'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
