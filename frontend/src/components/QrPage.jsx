import { useContext } from 'react'
import QRCode from 'react-qr-code'
import { IsModalOnContext, ModalIdContext } from '../App'
import { ChevronRightIcon, QrIcon } from './Icons'

function QrPage({ navBtn, currentSubject }) {
  const [, setIsModalOn] = useContext(IsModalOnContext)
  const [, setModalId] = useContext(ModalIdContext)

  if (navBtn != 1) {
    return null
  }

  const handleClick = () => {
    setIsModalOn(true)
    setModalId(1)
  }

  const qrValue = currentSubject?.enrollments?.[0]?.qr_code
  const schedule = currentSubject?.schedules?.[0]
  const startTime = schedule?.time?.slice(0, 5)
  const endTime = schedule?.end?.slice(0, 5)
  const timeRange = startTime ? (endTime ? `${startTime} – ${endTime}` : startTime) : ''

  return (
    <div className="w-full">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">QR Code</h1>
        <p className="text-sm text-slate-500 mt-1 max-w-prose">
          Show your class QR pass to your instructor during an active session.
        </p>
      </div>

      <div className="max-w-md mx-auto mt-6 space-y-3">
        {qrValue ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" aria-hidden="true" />
              Live Class
            </span>

            <div className="mt-4 p-4 bg-white rounded-xl border border-slate-100 w-full max-w-[260px]">
              <QRCode
                value={qrValue}
                size={228}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              />
            </div>

            <p className="text-xs text-slate-500 text-center mt-4 max-w-prose">
              Hold steady while your instructor scans to mark you present.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
              <QrIcon className="w-6 h-6" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 mt-4">
              No active class right now
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-prose">
              Your attendance QR code appears automatically once a scheduled class begins.
            </p>
          </div>
        )}

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

export default QrPage
