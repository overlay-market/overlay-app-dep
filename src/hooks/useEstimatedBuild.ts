import {useMemo} from 'react'

export function useEstimatedBuild(selectedLeverage: string, collateral?: number | undefined, buildFee?: number | undefined) {
  const preAdjustedOi = collateral ? collateral * Number(selectedLeverage) : undefined

  const calculatedBuildFee = preAdjustedOi && buildFee ? preAdjustedOi * buildFee : undefined

  const adjustedCollateral = collateral && calculatedBuildFee ? collateral + calculatedBuildFee : undefined
  const adjustedOi = adjustedCollateral ? adjustedCollateral * Number(selectedLeverage) : undefined
  const adjustedDebt = adjustedCollateral && adjustedOi ? adjustedOi - adjustedCollateral : undefined

  return useMemo(() => {
    return {
      preAdjustedOi,
      calculatedBuildFee,
      adjustedCollateral,
      adjustedOi,
      adjustedDebt,
    }
  }, [adjustedCollateral, adjustedOi, adjustedDebt, preAdjustedOi, calculatedBuildFee])
}
