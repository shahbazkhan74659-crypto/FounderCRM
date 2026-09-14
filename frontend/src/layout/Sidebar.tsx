import type { JSX, SVGProps } from 'react'

export type NavItemKey =
  | 'dashboard'
  | 'founders'
  | 'competitors'
  | 'analytics'
  | 'admin'

function iconProps(): SVGProps<SVGSVGElement> {
  return {
    viewBox: '0 0 18 18',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
}

function DashboardIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="2" y="2" width="6" height="6" rx="1" />
      <rect x="10" y="2" width="6" height="6" rx="1" />
      <rect x="2" y="10" width="6" height="6" rx="1" />
      <rect x="10" y="10" width="6" height="6" rx="1" />
    </svg>
  )
}

function FoundersIcon() {
  return (
    <svg {...iconProps()}>
      <circle cx="9" cy="6" r="3" />
      <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  )
}

function CompetitorsIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="4" y="3" width="10" height="13" rx="1" />
      <path d="M7 7h1M10 7h1M7 10h1M10 10h1M7 13h1M10 13h1" />
    </svg>
  )
}

function AnalyticsIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="3" y="9" width="3" height="7" rx="0.5" />
      <rect x="7.5" y="5" width="3" height="11" rx="0.5" />
      <rect x="12" y="11" width="3" height="5" rx="0.5" />
    </svg>
  )
}

function AdminIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M9 2l6 2v5c0 4-2.7 6.7-6 8-3.3-1.3-6-4-6-8V4l6-2z" />
    </svg>
  )
}

const NAV_ITEMS: { key: NavItemKey; label: string; icon: () => JSX.Element }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { key: 'founders', label: 'Founders', icon: FoundersIcon },
  { key: 'competitors', label: 'Competitors', icon: CompetitorsIcon },
  { key: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
  { key: 'admin', label: 'Admin', icon: AdminIcon },
]

interface SidebarProps {
  activeItem?: NavItemKey
}

export function Sidebar({ activeItem }: SidebarProps) {
  return (
    <nav className="sidebar">
      {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
        <a
          key={key}
          href="#"
          className={key === activeItem ? 'nav-item nav-item-active' : 'nav-item'}
        >
          <Icon />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  )
}
