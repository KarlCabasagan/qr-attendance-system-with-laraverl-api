/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  CurrentSubjectContext,
  NextSubjectsContext,
  TokenContext,
  UserSubjectsContext,
} from '../App'
import AttendanceLog from './AttendanceLog'
import { EnrollmentDetailsContext } from './FacultySubjectModal'
import {
  AlertCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  XMarkIcon,
} from './Icons'

function SubjectStudentDetails({ user, subject, enrollment }) {
  const [enrollmentDetailsContext, setEnrollmentDetailsContext] = useContext(
    EnrollmentDetailsContext
  )
  const [token] = useContext(TokenContext)
  const [, setNextSubjects] = useContext(NextSubjectsContext)
  const [, setCurrentSubject] = useContext(CurrentSubjectContext)
  const [, setUserSubjects] = useContext(UserSubjectsContext)

  const [viewAttendance, setViewAttendance] = useState(false)
  const [isPresent, setIsPresent] = useState(() => Boolean(enrollment?.attendances?.[0]?.time))
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState('')

  const handleOverlayClick = useCallback(() => {
    setEnrollmentDetailsContext(null)
  }, [setEnrollmentDetailsContext])

  useEffect(() => {
    if (!enrollment) {
      return
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        handleOverlayClick()
      }
    }

    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [enrollment, handleOverlayClick])

  const getUserSubjects = async (id) => {
    if (!id || !token) return

    try {
      const res = await fetch(`/api/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) return
      const data = await res.json()
      if (Array.isArray(data)) {
        setCurrentSubject(data[0] ?? null)
        setNextSubjects(data[1] ?? [])
        setUserSubjects(data[2] ?? [])
      }
    } catch {
      // Keep cached subjects on transient error
    }
  }

  const getCurrentAttendanceStatus = async (attendanceId, isCancelled) => {
    try {
      const res = await fetch(`/api/attendances/${attendanceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok || isCancelled?.()) return
      const data = await res.json()
      if (!isCancelled?.()) {
        setIsPresent(Boolean(data?.time))
      }
    } catch {
      // Retain default status
    }
  }

  useEffect(() => {
    const todayAttendance = enrollmentDetailsContext?.attendances?.[0]
    setIsPresent(Boolean(todayAttendance?.time))
    if (!todayAttendance?.id) {
      return
    }

    let cancelled = false
    setUpdateError('')
    getCurrentAttendanceStatus(todayAttendance.id, () => cancelled)

    return () => {
      cancelled = true
    }
  }, [enrollmentDetailsContext?.attendances?.[0]?.id])

  const recordData = async (status, id) => {
    setUpdateError('')
    setIsUpdating(true)

    try {
      const res = await fetch(`/api/attendances/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setIsPresent(status === 'present')
        await getUserSubjects(user?.id)
        return
      }

      setUpdateError('Could not update attendance status.')
    } catch {
      setUpdateError('Unable to reach the server. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleStatusClick = async (present, id) => {
    if (!id || isUpdating) return
    await recordData(present ? 'present' : 'absent', id)
  }

  if (!enrollment) {
    return null
  }

  const todayAttendanceId = enrollmentDetailsContext?.attendances?.[0]?.id
  const pastAttendances = enrollment?.attendances?.slice(1) ?? []
  const activePresent = Boolean(todayAttendanceId) && isPresent
  const activeAbsent = Boolean(todayAttendanceId) && !isPresent

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        onClick={handleOverlayClick}
        aria-hidden="true"
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] animate-fade-in"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-details-title"
        className="relative z-[70] w-full sm:max-w-md max-h-[85dvh] bg-white rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden animate-modal-in"
      >
        <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0 flex-1">
            <h2
              id="student-details-title"
              className="text-base font-semibold text-slate-900 truncate"
            >
              {enrollment?.user?.name || 'Student Details'}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              {enrollment?.user?.course && (
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  {enrollment.user.course}
                </span>
              )}
              {enrollment?.user?.year && (
                <span className="text-xs font-medium tabular-nums bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  Year {enrollment.user.year}
                </span>
              )}
              {subject?.code && (
                <span className="font-mono text-xs font-medium uppercase tracking-wider bg-brand-soft text-brand px-2 py-0.5 rounded-md tabular-nums">
                  {subject.code}
                </span>
              )}
            </div>
            {subject?.name && (
              <p className="text-xs text-slate-500 truncate mt-1.5">{subject.name}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleOverlayClick}
            aria-label="Close student details"
            className="min-w-[44px] min-h-[44px] -mr-2 -mt-1 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 btn-press shrink-0"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          <div>
            <span className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2.5">
              Today’s Attendance
            </span>

            {updateError && (
              <div
                role="alert"
                className="mb-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg px-3 py-2 text-xs flex items-start gap-2"
              >
                <AlertCircleIcon className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{updateError}</span>
              </div>
            )}

            <div role="group" aria-label="Today’s attendance status" className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={isUpdating || !todayAttendanceId}
                aria-pressed={activePresent}
                onClick={() => handleStatusClick(true, todayAttendanceId)}
                className={
                  'min-h-[44px] rounded-xl border px-3 text-sm inline-flex items-center justify-center gap-2 btn-press disabled:opacity-50 disabled:cursor-not-allowed ' +
                  (activePresent
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                    : 'bg-white text-slate-600 border-slate-200 font-medium hover:bg-slate-50')
                }
              >
                <CheckIcon className="w-4 h-4 shrink-0" />
                <span>Present</span>
              </button>

              <button
                type="button"
                disabled={isUpdating || !todayAttendanceId}
                aria-pressed={activeAbsent}
                onClick={() => handleStatusClick(false, todayAttendanceId)}
                className={
                  'min-h-[44px] rounded-xl border px-3 text-sm inline-flex items-center justify-center gap-2 btn-press disabled:opacity-50 disabled:cursor-not-allowed ' +
                  (activeAbsent
                    ? 'bg-rose-50 text-rose-800 border-rose-300 font-semibold'
                    : 'bg-white text-slate-600 border-slate-200 font-medium hover:bg-slate-50')
                }
              >
                <XMarkIcon className="w-4 h-4 shrink-0" />
                <span>Absent</span>
              </button>
            </div>

            {!todayAttendanceId && (
              <p className="text-xs text-slate-500 mt-2">
                No attendance record exists for today’s session yet.
              </p>
            )}
          </div>

          <div>
            <button
              type="button"
              aria-expanded={viewAttendance}
              onClick={() => setViewAttendance((prev) => !prev)}
              className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-200 bg-surface-subtle/60 hover:bg-slate-100 flex items-center justify-between gap-2 text-sm font-medium text-slate-700 btn-press"
            >
              <span className="inline-flex items-center gap-2">
                <span>Attendance History</span>
                <span className="text-xs tabular-nums bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                  {pastAttendances.length}
                </span>
              </span>
              <ChevronDownIcon
                className={
                  'w-4 h-4 text-slate-500 transition-transform duration-200 ease-out ' +
                  (viewAttendance ? 'rotate-180' : '')
                }
              />
            </button>

            {viewAttendance && (
              <div className="mt-2.5 animate-fade-in">
                {pastAttendances.length > 0 ? (
                  <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl px-3.5 bg-white">
                    {pastAttendances.map((attendance) => (
                      <AttendanceLog key={attendance.id} attendance={attendance} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4 border border-slate-200 rounded-xl bg-white">
                    No previous attendance records.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectStudentDetails
