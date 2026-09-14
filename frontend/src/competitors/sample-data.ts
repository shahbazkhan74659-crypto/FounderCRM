import type { CompetitorRecord } from './types'

export const OUR_PRICING = { plan: 'Pro', price: 79, effectiveDate: '2026-11-01' }

// Sample-only "logged in staff" identity for demo purposes — not tied to real
// auth (that's Phase 21). Only used to filter "Your requests" in the Staff view.
export const SAMPLE_CURRENT_STAFF = { id: 's2', username: 'Jordan Lee' }

export const INITIAL_COMPETITORS: CompetitorRecord[] = [
  {
    id: 'c1',
    name: 'CompeteIQ',
    positioning: 'Mid-market analytics suite bundled with onboarding support.',
    pricingHistory: [
      { id: 'h1', date: '2026-03-01', price: 49, plan: 'Standard' },
      { id: 'h2', date: '2026-05-15', price: 59, plan: 'Standard' },
      { id: 'h3', date: '2026-08-01', price: 69, plan: 'Standard' },
    ],
    editRequests: [
      {
        id: 'r1',
        field: 'Pricing',
        proposedValue: '75',
        reason: 'Northwind Labs said CompeteIQ quoted them $75/mo starting next quarter.',
        status: 'pending',
        staffId: 's2',
        staffUsername: 'Jordan Lee',
        resolvedBy: null,
        resolvedAt: null,
        createdAt: '2026-09-01T10:00:00Z',
      },
    ],
  },
  {
    id: 'c2',
    name: 'RivalStack',
    positioning: 'Budget-focused, self-serve only, no onboarding support.',
    pricingHistory: [
      { id: 'h4', date: '2026-02-01', price: 29, plan: 'Basic' },
      { id: 'h5', date: '2026-06-01', price: 35, plan: 'Basic' },
      { id: 'h6', date: '2026-08-15', price: 39, plan: 'Basic' },
    ],
    editRequests: [],
  },
]
