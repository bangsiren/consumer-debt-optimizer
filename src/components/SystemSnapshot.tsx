import { Input } from '@jbaluch/components'
import type { OptimizerInputs } from '../types'
import { currentDta } from '../compute'
import { formatPercent, parseNumeric } from '../format'
import {
  Card,
  CardTitle,
  Eyebrow,
  Field,
  FieldGrid,
  MetricLabel,
  MetricStrip,
  MetricStripWarn,
  MetricValue,
} from '../styles'

const CURRENCY = {
  locale: 'en-US',
  currency: 'USD',
  maxDecimals: 2,
  allowNegative: false,
  thousandSeparator: true,
}

const PERCENT = {
  precision: 2,
  max: 100,
  min: 0,
}

interface SystemSnapshotProps {
  inputs: OptimizerInputs
  serverDta?: number | null
  onChange: (patch: Partial<OptimizerInputs>) => void
}

export function SystemSnapshot({ inputs, serverDta, onChange }: SystemSnapshotProps) {
  const liveDta = currentDta(inputs)
  const shownDta = serverDta ?? liveDta
  const overMax = shownDta > inputs.maxDta
  const Strip = overMax ? MetricStripWarn : MetricStrip

  return (
    <Card>
      <div>
        <Eyebrow>System snapshot</Eyebrow>
        <CardTitle>Capacity and guardrails</CardTitle>
      </div>

      <FieldGrid>
        <Field>
          <Input
            label="Engine Assets"
            type="currency"
            currency={CURRENCY}
            value={String(inputs.assetValue)}
            onChange={(value: unknown) => onChange({ assetValue: parseNumeric(value) })}
          />
        </Field>
        <Field>
          <Input
            label="Engine Debt"
            type="currency"
            currency={CURRENCY}
            value={String(inputs.debtBalance)}
            onChange={(value: unknown) => onChange({ debtBalance: parseNumeric(value) })}
          />
        </Field>
        <Field>
          <Input
            label="Max DTA"
            type="percentage"
            percentage={PERCENT}
            percentageFormat="decimal"
            value={String(inputs.maxDta)}
            onChange={(value: unknown) => onChange({ maxDta: parseNumeric(value) })}
          />
        </Field>
        <Field>
          <Input
            label="Available Credit"
            type="currency"
            currency={CURRENCY}
            value={String(inputs.availableCredit)}
            onChange={(value: unknown) => onChange({ availableCredit: parseNumeric(value) })}
          />
        </Field>
        <Field>
          <Input
            label="LOC/Margin Interest Rate"
            type="percentage"
            percentage={PERCENT}
            percentageFormat="decimal"
            value={String(inputs.defaultLocInterestRate)}
            onChange={(value: unknown) => onChange({ defaultLocInterestRate: parseNumeric(value) })}
          />
        </Field>
        <Field>
          <Input
            label="Minimum DSCR"
            type="numeric"
            numeric={{ min: 0, precision: 2, allowNegative: false }}
            value={String(inputs.minimumDivergenceRatio)}
            onChange={(value: unknown) => onChange({ minimumDivergenceRatio: parseNumeric(value) })}
          />
        </Field>
        <Field>
          <Input
            label="Minimum Monthly Flow Improvement"
            type="currency"
            currency={CURRENCY}
            value={String(inputs.minimumMonthlyFlowImprovement)}
            onChange={(value: unknown) =>
              onChange({ minimumMonthlyFlowImprovement: parseNumeric(value) })
            }
          />
        </Field>
      </FieldGrid>

      <Strip>
        <MetricLabel>Current DTA</MetricLabel>
        <MetricValue>{formatPercent(shownDta)}</MetricValue>
      </Strip>
    </Card>
  )
}
