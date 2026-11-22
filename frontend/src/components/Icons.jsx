function IconSvg({ className = 'w-5 h-5', children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

export function QrIcon({ className }) {
  return (
    <IconSvg className={className}>
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </IconSvg>
  )
}

export function ScanIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10" />
    </IconSvg>
  )
}

export function SubjectsIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
    </IconSvg>
  )
}

export function ProfileIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </IconSvg>
  )
}

export function CloseIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </IconSvg>
  )
}

export function ChevronRightIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="m9 18 6-6-6-6" />
    </IconSvg>
  )
}

export function ChevronDownIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="m6 9 6 6 6-6" />
    </IconSvg>
  )
}

export function EyeIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </IconSvg>
  )
}

export function EyeOffIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </IconSvg>
  )
}

export function CheckIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M20 6 9 17l-5-5" />
    </IconSvg>
  )
}

export const XMarkIcon = CloseIcon

export function CalendarIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </IconSvg>
  )
}

export function LogoutIcon({ className }) {
  return (
    <IconSvg className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </IconSvg>
  )
}

export function AlertCircleIcon({ className }) {
  return (
    <IconSvg className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </IconSvg>
  )
}

export function CheckCircleIcon({ className }) {
  return (
    <IconSvg className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </IconSvg>
  )
}
