import type { Recommendation } from '../types'
import { formatCurrency, formatRatio } from '../format'
import {
  Card,
  CardTitle,
  EmptyRec,
  Eyebrow,
  MetricLabel,
  RecGrid,
  RecItem,
  RecValue,
  Subtitle,
  WhyBox,
} from '../styles'

interface RecommendationCardProps {
  recommendation?: Recommendation | null
  loading: boolean
}

function debtTypeLabel(type: string): string {
  if (type === 'Amortized') return 'Amortized Loan'
  if (type === 'CreditCard') return 'Credit Card'
  return type
}

export function RecommendationCard({ recommendation, loading }: RecommendationCardProps) {
  return (
    <Card>
      <div>
        <Eyebrow>Output</Eyebrow>
        <CardTitle>Recommended first move</CardTitle>
        <Subtitle>
          The model tests capacity and guardrails, then ranks the first conversion.
        </Subtitle>
      </div>

      {!recommendation && (
        <EmptyRec>
          <RecValue>{loading ? 'Running the optimizer…' : 'No recommendation yet'}</RecValue>
          <Subtitle>
            {loading
              ? 'The optimizer is ranking eligible debts.'
              : 'Add debts below, then run the optimizer to see the first recommended conversion.'}
          </Subtitle>
        </EmptyRec>
      )}

      {recommendation && (
        <>
          <RecGrid>
            <RecItem>
              <MetricLabel>Debt</MetricLabel>
              <RecValue>{recommendation.debtId}</RecValue>
            </RecItem>
            <RecItem>
              <MetricLabel>Type</MetricLabel>
              <RecValue>{debtTypeLabel(recommendation.debtType)}</RecValue>
            </RecItem>
            <RecItem>
              <MetricLabel>Amount to convert</MetricLabel>
              <RecValue>{formatCurrency(recommendation.amountToConvert)}</RecValue>
            </RecItem>
            <RecItem>
              <MetricLabel>DSCR / Divergence</MetricLabel>
              <RecValue>{formatRatio(recommendation.divergenceRatio)}</RecValue>
            </RecItem>
          </RecGrid>
          <WhyBox>{recommendation.why?.text}</WhyBox>
        </>
      )}
    </Card>
  )
}
