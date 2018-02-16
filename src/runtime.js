import { BranchInterface } from './interfaces'
import { parse } from './parser'

export default function runtime(expression: string, context?: mixed): ?string {
  return resolveExpression((parse(expression): BranchInterface))
}

function resolveExpression(branch: ?BranchInterface): ?string {
  if (!branch) {
    return branch
  }

  const { els, cond, result } = branch

  return eval(`${cond.left} ${cond.op} ${cond.right}`)
    ? result
    : resolveExpression(els)
}
