import { useState, type FormEvent } from 'react'
import './auth.css'

interface FieldErrors {
  username?: string
  password?: string
}

interface LoginPageProps {
  onLoginSuccess: () => void
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [usernameReadOnly, setUsernameReadOnly] = useState(true)
  const [passwordReadOnly, setPasswordReadOnly] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next: FieldErrors = {}
    if (!username.trim()) next.username = 'Username is required.'
    if (!password) next.password = 'Password is required.'
    setErrors(next)
    setFormError(null)
    if (next.username || next.password) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        onLoginSuccess()
        return
      }
      const data = await res.json().catch(() => null)
      setFormError(data?.error ?? 'Something went wrong. Please try again.')
    } catch {
      setFormError('Unable to reach the server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">FounderCRM</h1>
        <p className="login-subtitle">Sign in to your account</p>
        <form className="login-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              autoComplete="off"
              readOnly={usernameReadOnly}
              onFocus={(e) => {
                e.target.readOnly = false
                setUsernameReadOnly(false)
              }}
              className={errors.username ? 'login-input-error' : ''}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={errors.username ? true : undefined}
              aria-describedby={errors.username ? 'login-username-error' : undefined}
            />
            {errors.username && (
              <p id="login-username-error" className="login-error">
                {errors.username}
              </p>
            )}
          </div>
          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="off"
              readOnly={passwordReadOnly}
              onFocus={(e) => {
                e.target.readOnly = false
                setPasswordReadOnly(false)
              }}
              className={errors.password ? 'login-input-error' : ''}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
            />
            {errors.password && (
              <p id="login-password-error" className="login-error">
                {errors.password}
              </p>
            )}
            <button type="button" className="login-forgot-btn">
              Forgot password?
            </button>
          </div>
          {formError && <p className="login-form-error">{formError}</p>}
          <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
