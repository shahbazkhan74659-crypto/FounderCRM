import type { PricingHistoryEntry } from './types'

interface PricingChartProps {
  pricingHistory: PricingHistoryEntry[]
  ourPrice: number
}

const PAD_L = 40
const PAD_R = 20
const PAD_T = 24
const PAD_B = 30
const CHART_W = 560
const CHART_H = 200
const INNER_W = CHART_W - PAD_L - PAD_R
const INNER_H = CHART_H - PAD_T - PAD_B

export function PricingChart({ pricingHistory, ourPrice }: PricingChartProps) {
  if (pricingHistory.length === 0) {
    return <p className="competitor-empty-state">No pricing history yet to chart.</p>
  }

  const allPrices = [...pricingHistory.map((h) => h.price), ourPrice]
  const priceMin = Math.min(...allPrices)
  const priceMax = Math.max(...allPrices)
  const padY = Math.max(6, (priceMax - priceMin) * 0.2)
  const scaleMin = priceMin - padY
  const scaleMax = priceMax + padY

  const xAt = (i: number) =>
    PAD_L + (pricingHistory.length === 1 ? INNER_W / 2 : i * (INNER_W / (pricingHistory.length - 1)))
  const yAt = (price: number) => PAD_T + INNER_H - ((price - scaleMin) / (scaleMax - scaleMin)) * INNER_H

  const points = pricingHistory.map((h, i) => ({
    cx: xAt(i),
    cy: yAt(h.price),
    priceLabel: `$${h.price}`,
    dateLabel: h.date,
    labelY: yAt(h.price) - 12,
  }))
  const chartPoints = points.map((p) => `${p.cx},${p.cy}`).join(' ')
  const futureY = yAt(ourPrice)

  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="competitor-chart" style={{ overflow: 'visible' }}>
      <line
        x1={PAD_L}
        y1={futureY}
        x2={CHART_W - PAD_R}
        y2={futureY}
        stroke="var(--accent)"
        strokeWidth={1.5}
        strokeDasharray="5,4"
      />
      <polyline points={chartPoints} fill="none" stroke="var(--text-muted)" strokeWidth={1.5} />
      {points.map((p, i) => (
        <g key={pricingHistory[i].id}>
          <circle cx={p.cx} cy={p.cy} r={3.5} fill="var(--text-muted)" />
          <text x={p.cx} y={p.labelY} textAnchor="middle" fontSize={11} fill="var(--text)">
            {p.priceLabel}
          </text>
          <text x={p.cx} y={185} textAnchor="middle" fontSize={10} fill="var(--text-faint)">
            {p.dateLabel}
          </text>
        </g>
      ))}
    </svg>
  )
}
