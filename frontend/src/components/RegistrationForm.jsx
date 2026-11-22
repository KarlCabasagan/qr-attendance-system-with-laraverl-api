import { useContext, useState } from 'react'
import { TokenContext } from '../App'
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from './Icons'

function RegistrationForm({ isLoginPage }) {
  const [, setToken] = useContext(TokenContext)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoginPage) {
    return null
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.token) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        setFormData({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        })
        return
      }

      const errorMessage =
        data?.errors?.name?.[0] ||
        data?.errors?.email?.[0] ||
        data?.errors?.password?.[0] ||
        data?.message ||
        'Unable to create account. Please review your details.'

      setError(errorMessage)
    } catch {
      setError('Unable to connect to the server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4" noValidate>
      {error && (
        <div
          role="alert"
          className="bg-rose-50 border border-rose-200 text-rose-700 rounded-lg px-3.5 py-2.5 text-sm flex items-start gap-2.5"
        >
          <AlertCircleIcon className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="register-name" className="block text-sm font-medium text-slate-700 mb-1.5">
          Full name
        </label>
        <input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Jane Doe"
          className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-slate-700 mb-1.5">
          Email address
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="you@school.edu"
          className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div>
        <label htmlFor="register-password" className="block text-sm font-medium text-slate-700 mb-1.5">
          Password
        </label>
        <div className="relative flex items-center">
          <input
            id="register-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Create a password"
            className="w-full h-11 rounded-lg border border-slate-300 bg-white pl-3.5 pr-12 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute right-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900"
          >
            {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="register-password-confirm"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Confirm password
        </label>
        <div className="relative flex items-center">
          <input
            id="register-password-confirm"
            name="password_confirmation"
            type={showConfirm ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password_confirmation: e.target.value }))
            }
            placeholder="Re-enter your password"
            className="w-full h-11 rounded-lg border border-slate-300 bg-white pl-3.5 pr-12 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            aria-pressed={showConfirm}
            className="absolute right-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900"
          >
            {showConfirm ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 w-full min-h-[44px] rounded-lg bg-brand hover:bg-brand-hover text-white text-sm font-semibold btn-press disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  )
}

export default RegistrationForm
