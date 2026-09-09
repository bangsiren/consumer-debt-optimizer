import type {
  AmortizedLoanInput,
  CreditCardInput,
  LocalDebtMetrics,
  LocalFlags,
  OptimizerInputs,
} from './types'

type AnyDebt = CreditCardInput | AmortizedLoanInput

export function currentDta(inputs: OptimizerInputs): number {
  if (!inputs.assetValue) return 0
  return inputs.debtBalance / inputs.assetValue
}

export function computeDebtMetrics(debt: AnyDebt, inputs: OptimizerInputs): LocalDebtMetrics {
  const proposed = debt.proposedConversionAmount
  const balance = debt.currentBalance
  const locRate = debt.locInterestRate
  const payment = debt.currentPayment

  const invalidEntry = !debt.debtId.trim() || !Number.isFinite(balance) || !Number.isFinite(proposed)
  const nonPositive = proposed <= 0 || balance <= 0 || payment < 0
  const amountOutOfRange = proposed > balance
  const amountBalanceMismatch = Math.abs(proposed - balance) > 0.009
  const amountExceedsAvailableCredit = proposed > inputs.availableCredit
  const newLocPayment = proposed > 0 ? (proposed * locRate) / 12 : 0
  const paymentEliminated = balance > 0 ? payment * (proposed / balance) : 0
  const flowImprovement = paymentEliminated - newLocPayment
  const divergenceRatio = newLocPayment > 0 ? paymentEliminated / newLocPayment : 0
  const debtIntensity = balance > 0 ? payment / (balance / 12) : 0
  const projectedDta = !inputs.assetValue
    ? 0
    : debt.countsInDta
      ? (inputs.debtBalance + proposed) / inputs.assetValue
      : inputs.debtBalance / inputs.assetValue

  const guardrailsPass =
    !invalidEntry &&
    !nonPositive &&
    !amountOutOfRange &&
    !amountExceedsAvailableCredit &&
    divergenceRatio >= inputs.minimumDivergenceRatio &&
    flowImprovement >= inputs.minimumMonthlyFlowImprovement &&
    projectedDta <= inputs.maxDta

  const flags: LocalFlags = {
    invalidEntry,
    nonPositive,
    amountOutOfRange,
    amountBalanceMismatch,
    amountExceedsAvailableCredit,
    affectsDta: debt.countsInDta,
    guardrailsPass,
  }

  return {
    paymentEliminated,
    newLocPayment,
    flowImprovement,
    divergenceRatio,
    debtIntensity,
    projectedDta,
    flags,
  }
}

export function flagLabels(flags: LocalFlags): { label: string; tone: 'warn' | 'ok' | 'info' }[] {
  const chips: { label: string; tone: 'warn' | 'ok' | 'info' }[] = []
  if (flags.invalidEntry) chips.push({ label: 'Invalid', tone: 'warn' })
  if (flags.nonPositive) chips.push({ label: 'Non-positive', tone: 'warn' })
  if (flags.amountOutOfRange) chips.push({ label: 'Over balance', tone: 'warn' })
  if (flags.amountBalanceMismatch) chips.push({ label: 'Partial convert', tone: 'info' })
  if (flags.amountExceedsAvailableCredit) chips.push({ label: 'Over credit', tone: 'warn' })
  if (flags.guardrailsPass) chips.push({ label: 'Rails pass', tone: 'ok' })
  else if (chips.length === 0) chips.push({ label: 'Check rails', tone: 'warn' })
  return chips
}
