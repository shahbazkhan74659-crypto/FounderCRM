import { useEffect, useState } from 'react'
import { LoginPage } from './auth/LoginPage'
import { AppShell } from './layout/AppShell'
import type { ViewRole } from './layout/TopBar'
import { CompetitorsPage } from './competitors/CompetitorsPage'

type AuthState = 'checking' | 'authenticated' | 'unauthenticated'

function App() {
  const [authState, setAuthState] = useState<AuthState>('checking')
  const [viewRole, setViewRole] = useState<ViewRole>('admin')

  useEffect(() => {
    let cancelled = false

    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then((res) => {
        if (!cancelled) setAuthState(res.ok ? 'authenticated' : 'unauthenticated')
      })
      .catch(() => {
        if (!cancelled) setAuthState('unauthenticated')
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (authState === 'checking') {
    return <div className="login-page" />
  }

  if (authState === 'unauthenticated') {
    return <LoginPage onLoginSuccess={() => setAuthState('authenticated')} />
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' })
    } catch {
      // ignore network errors — clear client-side auth state regardless
    }
    setAuthState('unauthenticated')
  }

  return (
    <AppShell
      activeNavItem="competitors"
      viewRole={viewRole}
      onViewRoleChange={setViewRole}
      onLogout={handleLogout}
    >
      <CompetitorsPage viewRole={viewRole} />
    </AppShell>
  )
}

export default App
