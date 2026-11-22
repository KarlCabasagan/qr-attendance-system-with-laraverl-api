import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

function Authentication({ isLoggedIn }) {
  const [isLoginPage, setIsLoginPage] = useState(true)

  if (isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center px-4 py-10 bg-surface-canvas">
      <div className="max-w-[420px] w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="flex flex-col items-start">
          <img
            src="/logo-small.png"
            alt="Attendance"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 mt-4">
            {isLoginPage ? 'Sign in to Attendance' : 'Create your account'}
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-prose">
            {isLoginPage
              ? 'Use your school credentials to open your classes and QR pass.'
              : 'Register a new account to join subjects and track attendance.'}
          </p>
        </div>

        <div className="mt-6">
          {isLoginPage ? (
            <LoginForm isLoginPage={isLoginPage} />
          ) : (
            <RegistrationForm isLoginPage={isLoginPage} />
          )}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 mb-2">
            {isLoginPage ? 'New to the system?' : 'Already have an account?'}
          </p>
          <button
            type="button"
            onClick={() => setIsLoginPage((prev) => !prev)}
            className="w-full min-h-[44px] px-4 rounded-lg text-sm font-medium text-brand hover:bg-brand-soft btn-press"
          >
            {isLoginPage ? 'Create an account' : 'Sign in to an existing account'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Authentication
