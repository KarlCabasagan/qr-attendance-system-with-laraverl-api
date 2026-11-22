import { useContext, useEffect, useRef, useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import {
  CurrentSubjectContext,
  IsModalOnContext,
  ModalIdContext,
  NextSubjectsContext,
  TokenContext,
  UserSubjectsContext,
} from '../App'
import { AlertCircleIcon, CheckCircleIcon, ChevronRightIcon } from './Icons'

function QrScanner({ navBtn, user, currentSubject }) {
  const [, setIsModalOn] = useContext(IsModalOnContext)
  const [, setModalId] = useContext(ModalIdContext)
  const [token] = useContext(TokenContext)
  const [, setNextSubjects] = useContext(NextSubjectsContext)
  const [, setCurrentSubjectContext] = useContext(CurrentSubjectContext)
  const [, setUserSubjects] = useContext(UserSubjectsContext)

  const [status, setStatus] = useState(null)
  const [cameraError, setCameraError] = useState('')
  const lastScanRef = useRef({ code: '', at: 0 })
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  if (navBtn != 1) {
    return null
  }

  const showStatus = (type, message) => {
    setStatus({ type, message })
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setStatus(null), 4000)
  }

  const handleClick = () => {
    setIsModalOn(true)
    setModalId(1)
  }

  const getUserSubjects = async (id) => {
    if (!id || !token) {
      return
    }

    try {
      const res = await fetch(`/api/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) return
      const data = await res.json()
      if (Array.isArray(data)) {
        setCurrentSubjectContext(data[0] ?? null)
        setNextSubjects(data[1] ?? [])
        setUserSubjects(data[2] ?? [])
      }
    } catch {
      // Retain existing subjects on transient network failure
    }
  }

  const recordAttendance = async (id) => {
    try {
      const res = await fetch(`/api/attendance/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.ok
    } catch {
      return false
    }
  }

  const handleScan = async (detectedCodes) => {
    const qrCode = detectedCodes?.[0]?.rawValue
    if (!qrCode) {
      return
    }

    const now = Date.now()
    if (lastScanRef.current.code === qrCode && now - lastScanRef.current.at < 2500) {
      return
    }
    lastScanRef.current = { code: qrCode, at: now }

    const enrollments = currentSubject?.enrollments ?? []
    if (!currentSubject || enrollments.length === 0) {
      showStatus('error', 'No active class session to record attendance for.')
      return
    }

    const match = enrollments.find((enrollment) => enrollment.qr_code === qrCode)
    if (!match) {
      showStatus('error', 'QR code not recognized for this class.')
      return
    }

    const recorded = await recordAttendance(match.id)
    if (!recorded) {
      showStatus('error', 'Could not record attendance. Please try again.')
      return
    }

    await getUserSubjects(user?.id)
    showStatus(
      'success',
      match.user?.name ? `Attendance recorded for ${match.user.name}.` : 'Attendance recorded.'
    )
  }

  const schedule = currentSubject?.schedules?.[0]
  const startTime = schedule?.time?.slice(0, 5)
  const endTime = schedule?.end?.slice(0, 5)
  const timeRange = startTime ? (endTime ? `${startTime} – ${endTime}` : startTime) : ''

  return (
    <div className="w-full">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">QR Scanner</h1>
        <p className="text-sm text-slate-500 mt-1 max-w-prose">
          Point the camera at a student’s QR pass to record attendance for the active class.
        </p>
      </div>

      <div className="max-w-md mx-auto mt-6 space-y-3">
        {status && (
          <div
            role="status"
            aria-live="polite"
            className={
              'rounded-xl border px-4 py-3 text-sm flex items-start gap-2.5 animate-fade-in ' +
              (status.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-700')
            }
          >
            {status.type === 'success' ? (
              <CheckCircleIcon className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircleIcon className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl p-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
            {cameraError ? (
              <div role="alert" className="p-6 text-center max-w-xs space-y-3">
                <p className="text-sm text-slate-200">{cameraError}</p>
                <button
                  type="button"
                  onClick={() => setCameraError('')}
                  className="min-h-[44px] px-4 rounded-lg bg-white text-slate-900 text-sm font-semibold btn-press"
                >
                  Retry camera
                </button>
              </div>
            ) : (
              <>
                <Scanner
                  onScan={handleScan}
                  onError={() =>
                    setCameraError(
                      'Camera access is unavailable. Allow camera permissions to scan QR passes.'
                    )
                  }
                  styles={{
                    container: { width: '100%', height: '100%' },
                    video: { width: '100%', height: '100%', objectFit: 'cover' },
                  }}
                  components={{ finder: false }}
                />
                <div className="pointer-events-none absolute inset-6">
                  <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-white/85 rounded-tl-lg" />
                  <span className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-white/85 rounded-tr-lg" />
                  <span className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-white/85 rounded-bl-lg" />
                  <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-white/85 rounded-br-lg" />
                </div>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="w-full min-h-[64px] bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3.5 flex items-center justify-between gap-3 text-left btn-press"
        >
          <div className="min-w-0 flex-1">
            {currentSubject?.name ? (
              <>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-semibold text-slate-900 truncate">
                    {currentSubject.name}
                  </span>
                  {currentSubject.code && (
                    <span className="font-mono text-xs font-medium uppercase tracking-wider bg-brand-soft text-brand px-2 py-0.5 rounded-md tabular-nums shrink-0">
                      {currentSubject.code}
                    </span>
                  )}
                </div>
                <span className="block text-xs text-slate-500 mt-0.5">
                  View today’s schedule
                </span>
              </>
            ) : (
              <>
                <span className="block text-sm font-semibold text-slate-900">
                  Today’s Schedule
                </span>
                <span className="block text-xs text-slate-500 mt-0.5">
                  Check upcoming classes for today
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {timeRange && (
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                {timeRange}
              </span>
            )}
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </div>
        </button>
      </div>
    </div>
  )
}

export default QrScanner
