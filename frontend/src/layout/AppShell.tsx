import type { ReactNode } from 'react'
import { Sidebar, type NavItemKey } from './Sidebar'
import { TopBar } from './TopBar'
import './layout.css'

interface AppShellProps {
  activeNavItem?: NavItemKey
  children: ReactNode
}

export function AppShell({ activeNavItem, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <TopBar />
      <div className="app-shell-body">
        <Sidebar activeItem={activeNavItem} />
        <main className="content-area">{children}</main>
      </div>
    </div>
  )
}
