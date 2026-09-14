export type ViewRole = 'admin' | 'staff'

interface TopBarProps {
  viewRole: ViewRole
  onViewRoleChange: (role: ViewRole) => void
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function TopBar({ viewRole, onViewRoleChange, sidebarOpen, onToggleSidebar }: TopBarProps) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="hamburger-btn"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? (
          <svg viewBox="0 0 20 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="2" y1="2" x2="18" y2="14" />
            <line x1="18" y1="2" x2="2" y2="14" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 16" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="1" y1="2" x2="19" y2="2" />
            <line x1="1" y1="8" x2="19" y2="8" />
            <line x1="1" y1="14" x2="19" y2="14" />
          </svg>
        )}
      </button>

      {/* Local-only demo toggle driving the Competitor page's edit-request view
          (Phase 9). Not tied to the real logged-in user's role — that's Phase 21. */}
      <div className="role-toggle">
        <button
          type="button"
          className={`role-toggle-btn${viewRole === 'admin' ? ' role-toggle-btn-active' : ''}`}
          onClick={() => onViewRoleChange('admin')}
        >
          Admin
        </button>
        <button
          type="button"
          className={`role-toggle-btn${viewRole === 'staff' ? ' role-toggle-btn-active' : ''}`}
          onClick={() => onViewRoleChange('staff')}
        >
          Staff
        </button>
      </div>

      <span className="topbar-title">FounderCRM</span>
    </header>
  )
}
