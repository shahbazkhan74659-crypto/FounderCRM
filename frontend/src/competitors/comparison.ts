import type { Comparison, PricingHistoryEntry } from './types'

interface OurPricing {
  plan: string
  price: number
  effectiveDate: string
}

// Client-side port of server/app/api/competitors/[id]/route.ts's buildComparison —
// same diff/caption phrasing, so this can be deleted once Phase 10 consumes the
// real `comparison` field from the API instead.
export function computeComparison(ourPricing: OurPricing, pricingHistory: PricingHistoryEntry[]): Comparison {
  const latest = pricingHistory[pricingHistory.length - 1]

  if (!latest) {
    return {
      ourPlan: ourPricing.plan,
      ourPrice: ourPricing.price,
      ourEffectiveDate: ourPricing.effectiveDate,
      theirLatestPrice: null,
      theirLatestDate: null,
      diff: null,
      diffLabel: 'No competitor pricing history yet to compare against.',
      captionFull: `Our planned price: $${ourPricing.price}/mo from ${ourPricing.effectiveDate} — no competitor pricing history yet to compare against.`,
    }
  }

  const diff = ourPricing.price - latest.price
  const diffLabel =
    diff > 0
      ? `Our planned price is $${diff} higher than their current price`
      : diff < 0
        ? `Our planned price is $${Math.abs(diff)} lower than their current price`
        : 'Our planned price matches their current price'

  return {
    ourPlan: ourPricing.plan,
    ourPrice: ourPricing.price,
    ourEffectiveDate: ourPricing.effectiveDate,
    theirLatestPrice: latest.price,
    theirLatestDate: latest.date,
    diff,
    diffLabel,
    captionFull: `Our planned price: $${ourPricing.price}/mo from ${ourPricing.effectiveDate} — ${diffLabel.charAt(0).toLowerCase()}${diffLabel.slice(1)}`,
  }
}
