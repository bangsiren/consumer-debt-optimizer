import type { OptimizerRequest, OptimizerResponse } from './types'

const OPTIMIZER_URL = import.meta.env.DEV
  ? '/api/flow/optimizer'
  : 'https://velocity-navigator-backend-dev.azurewebsites.net/api/flow/optimizer'

export async function runOptimizer(request: OptimizerRequest): Promise<OptimizerResponse> {
  const response = await fetch(OPTIMIZER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(detail || `Optimizer request failed (${response.status})`)
  }

  return response.json() as Promise<OptimizerResponse>
}
