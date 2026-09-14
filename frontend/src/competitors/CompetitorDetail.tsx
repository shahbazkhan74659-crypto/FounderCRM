import type { ViewRole } from '../layout/TopBar'
import { computeComparison } from './comparison'
import { EditRequestsPanel } from './EditRequestsPanel'
import { PricingChart } from './PricingChart'
import { OUR_PRICING } from './sample-data'
import type { CompetitorRecord, EditRequestField } from './types'

interface CompetitorDetailProps {
  competitor: CompetitorRecord
  viewRole: ViewRole
  onBack: () => void
  onSubmitRequest: (field: EditRequestField, proposedValue: string, reason: string) => void
  onResolveRequest: (requestId: string, status: 'approved' | 'rejected') => void
}

export function CompetitorDetail({
  competitor,
  viewRole,
  onBack,
  onSubmitRequest,
  onResolveRequest,
}: CompetitorDetailProps) {
  const comparison = computeComparison(OUR_PRICING, competitor.pricingHistory)

  return (
    <div className="competitor-detail">
      <button type="button" className="competitor-back-btn" onClick={onBack}>
        ← Back to Competitors
      </button>

      <h1 className="competitor-detail-title">{competitor.name}</h1>
      <p className="competitor-detail-positioning">{competitor.positioning}</p>

      <div className="competitor-detail-grid">
        <div className="card competitor-chart-card">
          <h3 className="competitor-panel-title">Pricing over time</h3>
          <p className="competitor-panel-subtitle-text">Dashed line is our own planned price for comparison.</p>
          <PricingChart pricingHistory={competitor.pricingHistory} ourPrice={OUR_PRICING.price} />
          <p className="competitor-chart-caption">{comparison.captionFull}</p>

          <div className="competitor-history-list">
            {competitor.pricingHistory.map((entry) => (
              <div key={entry.id} className="competitor-history-row">
                <span className="competitor-history-date">{entry.date}</span>
                <span className="competitor-history-price">
                  ${entry.price} · {entry.plan}
                </span>
              </div>
            ))}
          </div>
        </div>

        <EditRequestsPanel
          viewRole={viewRole}
          requests={competitor.editRequests}
          onSubmitRequest={onSubmitRequest}
          onResolveRequest={onResolveRequest}
        />
      </div>
    </div>
  )
}
