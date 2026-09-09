import { Button, EditableCell, Table, TagCell, TextButton } from '@jbaluch/components'
import { parseNumeric } from '../format'
import type {
  AmortizedLoanInput,
  CreditCardInput,
  DebtEvaluation,
  OptimizerInputs,
} from '../types'
import { Card, CardTitle, Eyebrow, Subtitle, TableToolbar } from '../styles'

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

type DebtRow = (CreditCardInput | AmortizedLoanInput) & {
  evaluation?: DebtEvaluation
}

interface DebtTableProps {
  kind: 'creditCard' | 'amortizedLoan'
  rows: Array<CreditCardInput | AmortizedLoanInput>
  inputs: OptimizerInputs
  evaluations: DebtEvaluation[]
  recommendedDebtId?: string | null
  onChange: (id: string, patch: Record<string, string | number | boolean>) => void
  onAdd: () => void
  onRemove: (id: string) => void
}

export function DebtTable({
  kind,
  rows,
  evaluations,
  recommendedDebtId,
  onChange,
  onAdd,
  onRemove,
}: DebtTableProps) {
  const isCard = kind === 'creditCard'
  const data: DebtRow[] = rows.map((row, index) => ({
    ...row,
    evaluation: evaluations.find((item) => item.debtId === row.debtId) ?? evaluations[index],
  }))

  const columns = [
    {
      key: 'debtId',
      label: 'Account',
      flexGrow: 1,
      minWidth: '160px',
      cellComponent: EditableCell,
      getCellProps: (row: DebtRow) => ({
        value: row.debtId,
        type: 'text',
        field: 'debtId',
        rowId: row.id,
        onChange: (value: unknown) => onChange(row.id, { debtId: String(value ?? '') }),
      }),
    },
    {
      key: 'currentBalance',
      label: 'Balance',
      width: '150px',
      cellComponent: EditableCell,
      getCellProps: (row: DebtRow) => ({
        value: row.currentBalance,
        type: 'currency',
        currency: CURRENCY,
        field: 'currentBalance',
        rowId: row.id,
        onChange: (value: unknown) => onChange(row.id, { currentBalance: parseNumeric(value) }),
      }),
    },
    {
      key: 'currentPayment',
      label: 'Payment / mo',
      width: '150px',
      cellComponent: EditableCell,
      getCellProps: (row: DebtRow) => ({
        value: row.currentPayment,
        type: 'currency',
        currency: CURRENCY,
        field: 'currentPayment',
        rowId: row.id,
        onChange: (value: unknown) => onChange(row.id, { currentPayment: parseNumeric(value) }),
      }),
    },
    ...(isCard
      ? [
          {
            key: 'minimumPaymentRatio',
            label: 'Min pay %',
            width: '130px',
            cellComponent: EditableCell,
            getCellProps: (row: DebtRow) => ({
              value: 'minimumPaymentRatio' in row ? row.minimumPaymentRatio : 0,
              type: 'percentage',
              percentage: PERCENT,
              percentageFormat: 'decimal',
              field: 'minimumPaymentRatio',
              rowId: row.id,
              onChange: (value: unknown) =>
                onChange(row.id, { minimumPaymentRatio: parseNumeric(value) }),
            }),
          },
        ]
      : []),
    {
      key: 'proposedConversionAmount',
      label: 'Convert',
      width: '150px',
      cellComponent: EditableCell,
      getCellProps: (row: DebtRow) => ({
        value: row.proposedConversionAmount,
        type: 'currency',
        currency: CURRENCY,
        field: 'proposedConversionAmount',
        rowId: row.id,
        onChange: (value: unknown) =>
          onChange(row.id, { proposedConversionAmount: parseNumeric(value) }),
      }),
    },
    {
      key: 'status',
      label: 'Status',
      width: '110px',
      alignment: 'center',
      cellComponent: TagCell,
      getCellProps: (row: DebtRow) => {
        if (!row.evaluation) {
          return { label: '—', alignment: 'center' }
        }
        const ok = row.evaluation.status.severity === 'Information'
        const rank = row.evaluation.rank != null ? `#${row.evaluation.rank} ` : ''
        return {
          label: `${rank}${row.evaluation.status.text}`,
          alignment: 'center',
          backgroundColor: ok ? 'var(--surface-green-light, #e6f6f5)' : 'var(--surface-red-light, #fff1e8)',
          textColor: ok ? 'var(--text-green, #0b6b67)' : 'var(--text-red, #a15c07)',
        }
      },
    },
    {
      key: 'actions',
      label: '',
      width: '88px',
      render: (_value: unknown, row: DebtRow) => (
        <TextButton ariaLabel={`Remove ${row.debtId || 'debt'}`} onClick={() => onRemove(row.id)}>
          Remove
        </TextButton>
      ),
    },
  ]

  return (
    <Card>
      <TableToolbar>
        <div>
          <Eyebrow>{isCard ? 'Consumer revolving' : 'Installment'}</Eyebrow>
          <CardTitle>{isCard ? 'Credit cards' : 'Amortized loans'}</CardTitle>
          <Subtitle>
            {isCard
              ? 'Minimum payment % applies here. Partial conversions are allowed.'
              : 'Full or partial conversion of fixed payment loans.'}
          </Subtitle>
        </div>
        <Button
          type="secondary"
          icon="iconless"
          interaction="default"
          justified="right"
          iconComponent={undefined}
          onClick={onAdd}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          name={`add-${kind}`}
          form=""
          ariaLabel={isCard ? 'Add credit card' : 'Add loan'}
        >
          {isCard ? 'Add card' : 'Add loan'}
        </Button>
      </TableToolbar>

      <Table
        columns={columns}
        data={data}
        hoverableRows
        isRowHighlighted={(row: DebtRow) =>
          Boolean(recommendedDebtId && row.debtId === recommendedDebtId)
        }
      />
    </Card>
  )
}
