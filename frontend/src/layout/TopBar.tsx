export function TopBar() {
  return (
    <header className="topbar">
      <span className="topbar-title">FounderCRM</span>
      {/* Static placeholder — real role-switching is Phase 21 */}
      <div className="role-toggle">
        <button type="button" className="role-toggle-btn role-toggle-btn-active">
          Admin
        </button>
        <button type="button" className="role-toggle-btn">
          Staff
        </button>
      </div>
    </header>
  )
}
