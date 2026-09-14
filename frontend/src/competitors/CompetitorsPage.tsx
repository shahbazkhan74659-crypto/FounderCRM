import { useState } from 'react'
import type { ViewRole } from '../layout/TopBar'
import { CompetitorDetail } from './CompetitorDetail'
import { CompetitorList } from './CompetitorList'
import './competitors.css'
import { INITIAL_COMPETITORS } from './sample-data'
import type { CompetitorRecord, EditRequestField } from './types'

interface CompetitorsPageProps {
  viewRole: ViewRole
}

export function CompetitorsPage({ viewRole }: CompetitorsPageProps) {
  const [competitors, setCompetitors] = useState<CompetitorRecord[]>(INITIAL_COMPETITORS)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = competitors.find((c) => c.id === selectedId) ?? null

  function submitEditRequest(competitorId: string, field: EditRequestField, proposedValue: string, reason: string) {
    setCompetitors((prev) =>
      prev.map((c) =>
        c.id === competitorId
          ? {
              ...c,
              editRequests: [
                ...c.editRequests,
                {
                  id: `r${Date.now()}`,
                  field,
                  proposedValue,
                  reason,
                  status: 'pending',
                  staffId: 's2',
                  staffUsername: 'Jordan Lee',
                  resolvedBy: null,
                  resolvedAt: null,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : c,
      ),
    )
  }

  // Deliberately status-only, matching Phase 8's real (non-auto-applying) backend
  // behavior — approving/rejecting never touches positioning/pricingHistory here.
  // Admin must use separate direct-edit UI (not part of this phase) to actually
  // change the data. Do not "fix" this to auto-apply like the prototype does.
  function resolveEditRequest(competitorId: string, requestId: string, status: 'approved' | 'rejected') {
    setCompetitors((prev) =>
      prev.map((c) =>
        c.id === competitorId
          ? {
              ...c,
              editRequests: c.editRequests.map((r) =>
                r.id === requestId ? { ...r, status, resolvedAt: new Date().toISOString() } : r,
              ),
            }
          : c,
      ),
    )
  }

  if (selected) {
    return (
      <CompetitorDetail
        competitor={selected}
        viewRole={viewRole}
        onBack={() => setSelectedId(null)}
        onSubmitRequest={(field, value, reason) => submitEditRequest(selected.id, field, value, reason)}
        onResolveRequest={(requestId, status) => resolveEditRequest(selected.id, requestId, status)}
      />
    )
  }

  return <CompetitorList competitors={competitors} onSelect={setSelectedId} />
}
