import { Button, EditableCell, Table, TextButton } from '@jbaluch/components'
import { parseNumeric } from '../format'
import type { AmortizedLoanInput, CreditCardInput, DebtEvaluation } from '../types'
import { AlignedTable, Card, CardTitle, Eyebrow, TableToolbar } from '../styles'

const CURRENCY = {
  locale: 'en-US',
  currency: 'USD',
  maxDecimals: 0,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  allowNegative: false,
  thousandSeparator: true,
}

const PERCENT = {
  precision: 1,
  max: 1,
  min: 0,
  alreadyDecimal: true,
}

type DebtRow = (CreditCardInput | AmortizedLoanInput) & {
  evaluation?: DebtEvaluation
}

interface DebtTableProps {
  kind: 'creditCard' | 'amortizedLoan'
  rows: Array<CreditCardInput | AmortizedLoanInput>
  evaluations?: DebtEvaluation[]
  onChange: (id: string, patch: Record<string, string | number | boolean>) => void
  onAdd: () => void
  onRemove: (id: string) => void
}

export function DebtTable({
  kind,
  rows,
  evaluations = [],
  onChange,
  onAdd,
  onRemove,
}: DebtTableProps) {
  const isCard = kind === 'creditCard'
  const data: DebtRow[] = rows.map((row) => ({
    ...row,
    evaluation: evaluations.find((item) => item.debtId === row.debtId),
  }))

  const columns = [
    {
      key: 'debtId',
      label: 'Account',
      flexGrow: 1,
      minWidth: '140px',
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
      label: 'Monthly Payment',
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
            label: 'Min Payment %',
            width: '140px',
            sortable: false,
            cellComponent: EditableCell,
            getCellProps: (row: DebtRow) => ({
              value: 'minimumPaymentRatio' in row ? row.minimumPaymentRatio : 0,
              type: 'percentage',
              percentage: PERCENT,
              field: 'minimumPaymentRatio',
              rowId: row.id,
              onChange: (value: unknown) => {
                const parsed = parseNumeric(value)
                onChange(row.id, {
                  minimumPaymentRatio: parsed >= 1 ? parsed / 100 : parsed,
                })
              },
            }),
          },
        ]
      : []),
    {
      key: 'proposedConversionAmount',
      label: 'Transfer Amount',
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
      key: 'priority',
      label: 'Priority',
      width: '100px',
      sortable: false,
      alignment: 'center',
      render: (_value: unknown, row: DebtRow) =>
        row.evaluation?.rank != null ? `#${row.evaluation.rank}` : '—',
    },
    {
      key: 'actions',
      label: 'Action',
      width: '96px',
      sortable: false,
      alignment: 'center',
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

      <AlignedTable $columns={columns.length}>
        <Table columns={columns} data={data} hoverableRows disableSorting />
      </AlignedTable>
    </Card>
  )
}
