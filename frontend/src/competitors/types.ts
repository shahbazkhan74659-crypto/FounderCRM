export interface PricingHistoryEntry {
  id: string
  date: string
  price: number
  plan: string
}

export interface Comparison {
  ourPlan: string
  ourPrice: number
  ourEffectiveDate: string
  theirLatestPrice: number | null
  theirLatestDate: string | null
  diff: number | null
  diffLabel: string
  captionFull: string
}

export type EditRequestStatus = 'pending' | 'approved' | 'rejected'
export type EditRequestField = 'Pricing' | 'Positioning'

export interface EditRequest {
  id: string
  field: EditRequestField
  proposedValue: string
  reason: string
  status: EditRequestStatus
  staffId: string
  staffUsername: string
  resolvedBy: string | null
  resolvedAt: string | null
  createdAt: string
}

// Local mutable record — same fields Phase 8's GET /api/competitors/:id returns,
// minus `comparison` (computed on the fly, see comparison.ts) and timestamps
// (not needed by any UI in this phase).
export interface CompetitorRecord {
  id: string
  name: string
  positioning: string
  pricingHistory: PricingHistoryEntry[]
  editRequests: EditRequest[]
}
