export type DebtKind = 'creditCard' | 'amortizedLoan'
export type MessageSeverity = 'Information' | 'Warning' | 'Error'

export interface OptimizerInputs {
  assetValue: number
  debtBalance: number
  maxDta: number
  availableCredit: number
  defaultLocInterestRate: number
  minimumDivergenceRatio: number
  minimumMonthlyFlowImprovement: number
}

export interface CreditCardInput {
  id: string
  debtId: string
  currentBalance: number
  currentPayment: number
  minimumPaymentRatio: number
  locSource: string
  locInterestRate: number
  countsInDta: boolean
  proposedConversionAmount: number
}

export interface AmortizedLoanInput {
  id: string
  debtId: string
  currentBalance: number
  currentPayment: number
  locSource: string
  locInterestRate: number
  countsInDta: boolean
  proposedConversionAmount: number
}

export interface StatusMessage {
  id: string
  text: string
  severity: MessageSeverity
  values?: Record<string, number | string>
}

export interface Recommendation {
  debtId: string
  debtType: string
  amountToConvert: number
  divergenceRatio: number
  why: StatusMessage
}

export interface DebtEvaluation {
  debtId?: string
  rank: number
  paymentEliminated: number
  newLocPayment: number
  projectedDta: number
  status: StatusMessage
}

export interface DebtDiagnostics {
  invalidEntry: boolean
  nonPositive: boolean
  amountOutOfRange: boolean
  amountBalanceMismatch: boolean
  amountExceedsAvailableCredit: boolean
  isAmortized: boolean
  isCreditCard: boolean
  affectsDta: boolean
  guardrailsPass: boolean
  divergenceRatio: number
  debtIntensity: number
  recommendationScore: number
}

export interface OptimizerOutputs {
  currentDta: number
  recommendation?: Recommendation | null
  debtEvaluations: DebtEvaluation[]
  debtDiagnostics?: DebtDiagnostics[]
}

export interface OptimizerResponse {
  invocationId?: string
  outputs: OptimizerOutputs
}

export interface OptimizerRequest {
  inputs: OptimizerInputs
  creditCards: Omit<CreditCardInput, 'id'>[]
  amortizedLoans: Omit<AmortizedLoanInput, 'id'>[]
}

export interface LocalDebtMetrics {
  paymentEliminated: number
  newLocPayment: number
  flowImprovement: number
  divergenceRatio: number
  debtIntensity: number
  projectedDta: number
  flags: LocalFlags
}

export interface LocalFlags {
  invalidEntry: boolean
  nonPositive: boolean
  amountOutOfRange: boolean
  amountBalanceMismatch: boolean
  amountExceedsAvailableCredit: boolean
  affectsDta: boolean
  guardrailsPass: boolean
}
