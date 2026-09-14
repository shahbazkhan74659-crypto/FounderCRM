import { useState, type ReactNode } from 'react'
import { Sidebar, type NavItemKey } from './Sidebar'
import { TopBar, type ViewRole } from './TopBar'
import './layout.css'

interface AppShellProps {
  activeNavItem?: NavItemKey
  viewRole: ViewRole
  onViewRoleChange: (role: ViewRole) => void
  onLogout: () => void
  children: ReactNode
}

export function AppShell({ activeNavItem, viewRole, onViewRoleChange, onLogout, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <TopBar
        viewRole={viewRole}
        onViewRoleChange={onViewRoleChange}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
      />
      <div className="app-shell-body">
        <Sidebar activeItem={activeNavItem} isOpen={sidebarOpen} onLogout={onLogout} />
        {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
        <main className="content-area">{children}</main>
      </div>
    </div>
  )
}
