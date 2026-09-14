import type { CompetitorRecord } from './types'

interface CompetitorListProps {
  competitors: CompetitorRecord[]
  onSelect: (id: string) => void
}

function computeDelta(competitor: CompetitorRecord) {
  const history = competitor.pricingHistory
  const latest = history[history.length - 1]
  const previous = history[history.length - 2]

  if (!latest) {
    return { priceLabel: 'No pricing on record', deltaLabel: '', deltaClass: '' }
  }

  const priceLabel = `$${latest.price}/mo · ${latest.plan}`

  if (!previous) {
    return { priceLabel, deltaLabel: 'First price on record', deltaClass: '' }
  }

  const diff = latest.price - previous.price
  if (diff > 0) {
    return { priceLabel, deltaLabel: `▲ +$${diff} since last update`, deltaClass: 'competitor-delta-up' }
  }
  if (diff < 0) {
    return { priceLabel, deltaLabel: `▼ -$${Math.abs(diff)} since last update`, deltaClass: 'competitor-delta-down' }
  }
  return { priceLabel, deltaLabel: 'No change since last update', deltaClass: '' }
}

export function CompetitorList({ competitors, onSelect }: CompetitorListProps) {
  return (
    <div className="competitor-grid">
      {competitors.map((competitor) => {
        const { priceLabel, deltaLabel, deltaClass } = computeDelta(competitor)
        return (
          <div
            key={competitor.id}
            className="card competitor-card"
            onClick={() => onSelect(competitor.id)}
          >
            <h3 className="competitor-card-name">{competitor.name}</h3>
            <p className="competitor-card-positioning">{competitor.positioning}</p>
            <p className="competitor-card-price">{priceLabel}</p>
            {deltaLabel && <p className={`competitor-card-delta ${deltaClass}`}>{deltaLabel}</p>}
          </div>
        )
      })}
    </div>
  )
}
