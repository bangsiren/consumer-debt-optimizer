import { useState } from 'react'
import { AttentionCircle, Button } from '@jbaluch/components'
import { runOptimizer } from './api'
import { RecommendationCard } from './components/RecommendationCard'
import { DebtTable } from './components/DebtTable'
import { SystemSnapshot } from './components/SystemSnapshot'
import { createRowId } from './format'
import { SAMPLE_CREDIT_CARDS, SAMPLE_INPUTS, SAMPLE_LOANS } from './sampleData'
import {
  ErrorBanner,
  HeaderCopy,
  HeaderRow,
  InputStack,
  Page,
  PageInner,
  ResultsStack,
  RunBar,
  Subtitle,
  Title,
} from './styles'
import type {
  AmortizedLoanInput,
  CreditCardInput,
  DebtEvaluation,
  OptimizerInputs,
  OptimizerRequest,
  Recommendation,
} from './types'

function emptyCard(rate: number): CreditCardInput {
  return {
    id: createRowId('cc'),
    debtId: '',
    currentBalance: 0,
    currentPayment: 0,
    minimumPaymentRatio: 0.01,
    locSource: 'M1 Margin',
    locInterestRate: rate,
    countsInDta: true,
    proposedConversionAmount: 0,
  }
}

function emptyLoan(rate: number): AmortizedLoanInput {
  return {
    id: createRowId('loan'),
    debtId: '',
    currentBalance: 0,
    currentPayment: 0,
    locSource: 'M1 Margin',
    locInterestRate: rate,
    countsInDta: true,
    proposedConversionAmount: 0,
  }
}

function toRequest(
  inputs: OptimizerInputs,
  cards: CreditCardInput[],
  loans: AmortizedLoanInput[],
): OptimizerRequest {
  return {
    inputs,
    creditCards: cards.map(({ id, ...card }) => {
      void id
      return card
    }),
    amortizedLoans: loans.map(({ id, ...loan }) => {
      void id
      return loan
    }),
  }
}

function App() {
  const [inputs, setInputs] = useState<OptimizerInputs>(SAMPLE_INPUTS)
  const [cards, setCards] = useState<CreditCardInput[]>(SAMPLE_CREDIT_CARDS)
  const [loans, setLoans] = useState<AmortizedLoanInput[]>(SAMPLE_LOANS)
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [evaluations, setEvaluations] = useState<DebtEvaluation[]>([])
  const [serverDta, setServerDta] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const patchInputs = (patch: Partial<OptimizerInputs>) => {
    setInputs((current) => ({ ...current, ...patch }))
    setServerDta(null)
  }

  const patchCard = (id: string, patch: Record<string, string | number | boolean>) => {
    setCards((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  }

  const patchLoan = (id: string, patch: Record<string, string | number | boolean>) => {
    setLoans((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  }

  const handleOptimize = async () => {
    const namedCards = cards.filter((card) => card.debtId.trim())
    const namedLoans = loans.filter((loan) => loan.debtId.trim())
    if (namedCards.length + namedLoans.length === 0) {
      setError('Add at least one named credit card or loan before running the optimizer.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await runOptimizer(toRequest(inputs, namedCards, namedLoans))
      const outputs = response.outputs
      setRecommendation(outputs.recommendation ?? null)
      setEvaluations(outputs.debtEvaluations ?? [])
      setServerDta(outputs.currentDta ?? null)
    } catch (err) {
      setRecommendation(null)
      setEvaluations([])
      setServerDta(null)
      setError(err instanceof Error ? err.message : 'The optimizer request failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <PageInner>
        <HeaderRow>
          <HeaderCopy>
            <Title>Capital Flow Optimizer</Title>
            <Subtitle>
              Unlock trapped cash flow and put your capital to work more efficiently.
            </Subtitle>
            <Subtitle>
              Add your credit cards and amortized loans, set your capacity and guardrails, then
              run the optimizer to find the best sequence of moves to improve monthly cash flow.
            </Subtitle>
          </HeaderCopy>
        </HeaderRow>

        {error && (
          <ErrorBanner>
            <AttentionCircle color="#ff7f50" width={16} height={16} />
            <span>{error}</span>
          </ErrorBanner>
        )}

        <InputStack>
          <SystemSnapshot inputs={inputs} serverDta={serverDta} onChange={patchInputs} />

          <DebtTable
            kind="creditCard"
            rows={cards}
            evaluations={evaluations}
            onChange={patchCard}
            onAdd={() => setCards((current) => [...current, emptyCard(inputs.defaultLocInterestRate)])}
            onRemove={(id) => setCards((current) => current.filter((row) => row.id !== id))}
          />

          <DebtTable
            kind="amortizedLoan"
            rows={loans}
            evaluations={evaluations}
            onChange={patchLoan}
            onAdd={() => setLoans((current) => [...current, emptyLoan(inputs.defaultLocInterestRate)])}
            onRemove={(id) => setLoans((current) => current.filter((row) => row.id !== id))}
          />

          <RunBar>
            <Button
              type="primary"
              icon="iconless"
              interaction={loading ? 'disabled' : 'default'}
              justified="right"
              iconComponent={undefined}
              onClick={handleOptimize}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              name="run-optimizer"
              form=""
              ariaLabel="Run optimizer"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? 'Optimizing…' : 'Run optimizer'}
            </Button>
          </RunBar>
        </InputStack>

        <ResultsStack>
          <RecommendationCard recommendation={recommendation} loading={loading} />
        </ResultsStack>
      </PageInner>
    </Page>
  )
}

export default App
