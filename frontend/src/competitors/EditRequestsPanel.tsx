import { useState } from 'react'
import type { ViewRole } from '../layout/TopBar'
import { SAMPLE_CURRENT_STAFF } from './sample-data'
import type { EditRequest, EditRequestField } from './types'

interface EditRequestsPanelProps {
  viewRole: ViewRole
  requests: EditRequest[]
  onSubmitRequest: (field: EditRequestField, proposedValue: string, reason: string) => void
  onResolveRequest: (requestId: string, status: 'approved' | 'rejected') => void
}

const FIELD_OPTIONS: EditRequestField[] = ['Pricing', 'Positioning']

function StatusPill({ status }: { status: EditRequest['status'] }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1)
  return <span className={`competitor-status-pill competitor-status-${status}`}>{label}</span>
}

export function EditRequestsPanel({ viewRole, requests, onSubmitRequest, onResolveRequest }: EditRequestsPanelProps) {
  const [showForm, setShowForm] = useState(false)
  const [field, setField] = useState<EditRequestField>('Pricing')
  const [value, setValue] = useState('')
  const [reason, setReason] = useState('')

  function handleSubmit() {
    if (!value.trim() || !reason.trim()) return
    onSubmitRequest(field, value.trim(), reason.trim())
    setShowForm(false)
    setValue('')
    setReason('')
    setField('Pricing')
  }

  if (viewRole === 'staff') {
    const myRequests = requests.filter((r) => r.staffId === SAMPLE_CURRENT_STAFF.id)

    return (
      <div className="card competitor-edit-requests-card">
        <h3 className="competitor-panel-title">Edit requests</h3>

        {!showForm && (
          <button type="button" className="competitor-btn-secondary" onClick={() => setShowForm(true)}>
            Request an edit
          </button>
        )}

        {showForm && (
          <div className="competitor-edit-form">
            <div className="competitor-field-picker">
              {FIELD_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`competitor-field-pill${field === option ? ' competitor-field-pill-active' : ''}`}
                  onClick={() => setField(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <label className="competitor-form-label" htmlFor="competitor-request-value">
              Proposed value
            </label>
            <input
              id="competitor-request-value"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <label className="competitor-form-label" htmlFor="competitor-request-reason">
              Reason for this change
            </label>
            <textarea
              id="competitor-request-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="competitor-form-actions">
              <button type="button" className="competitor-btn-primary" onClick={handleSubmit}>
                Submit request
              </button>
              <button type="button" className="competitor-btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <h4 className="competitor-panel-subtitle">Your requests</h4>
        {myRequests.length === 0 && (
          <p className="competitor-empty-state">You haven&apos;t requested any edits for this competitor.</p>
        )}
        {myRequests.map((r) => (
          <div key={r.id} className="competitor-request-row">
            <span>
              {r.field} → {r.proposedValue}
            </span>
            <StatusPill status={r.status} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="card competitor-edit-requests-card">
      <h3 className="competitor-panel-title">Edit requests</h3>
      {requests.length === 0 && <p className="competitor-empty-state">No edit requests for this competitor yet.</p>}
      {requests.map((r) => (
        <div key={r.id} className="competitor-request-row competitor-request-row-admin">
          <div className="competitor-request-row-main">
            <span>
              {r.field} → {r.proposedValue}
            </span>
            <StatusPill status={r.status} />
          </div>
          <p className="competitor-request-reason">
            {r.staffUsername}: &quot;{r.reason}&quot;
          </p>
          {r.status === 'pending' && (
            <div className="competitor-form-actions">
              <button type="button" className="competitor-btn-primary" onClick={() => onResolveRequest(r.id, 'approved')}>
                Approve
              </button>
              <button type="button" className="competitor-btn-secondary" onClick={() => onResolveRequest(r.id, 'rejected')}>
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
