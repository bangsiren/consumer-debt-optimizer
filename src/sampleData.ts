import type { AmortizedLoanInput, CreditCardInput, OptimizerInputs } from './types'

export const SAMPLE_INPUTS: OptimizerInputs = {
  assetValue: 200000,
  debtBalance: 40000,
  maxDta: 0.4,
  availableCredit: 50000,
  defaultLocInterestRate: 0.06,
  minimumDivergenceRatio: 2,
  minimumMonthlyFlowImprovement: 0,
}

export const SAMPLE_CREDIT_CARDS: CreditCardInput[] = [
  {
    id: 'cc-visa',
    debtId: 'Visa Card',
    currentBalance: 10000,
    currentPayment: 100,
    minimumPaymentRatio: 0.01,
    locSource: 'M1 Margin',
    locInterestRate: 0.06,
    countsInDta: true,
    proposedConversionAmount: 5000,
  },
  {
    id: 'cc-mastercard',
    debtId: 'Mastercard',
    currentBalance: 8000,
    currentPayment: 200,
    minimumPaymentRatio: 0.025,
    locSource: 'M1 Margin',
    locInterestRate: 0.06,
    countsInDta: true,
    proposedConversionAmount: 8000,
  },
]

export const SAMPLE_LOANS: AmortizedLoanInput[] = [
  {
    id: 'loan-personal',
    debtId: 'Personal Loan',
    currentBalance: 12000,
    currentPayment: 350,
    locSource: 'M1 Margin',
    locInterestRate: 0.06,
    countsInDta: true,
    proposedConversionAmount: 12000,
  },
  {
    id: 'loan-auto',
    debtId: 'Auto Loan',
    currentBalance: 25000,
    currentPayment: 525,
    locSource: 'External LOC',
    locInterestRate: 0.06,
    countsInDta: false,
    proposedConversionAmount: 25000,
  },
]
