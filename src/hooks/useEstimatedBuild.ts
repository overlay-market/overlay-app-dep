import { useMemo } from "react";

export function useEstimatedBuild(
  selectedLeverage: number,
  collateral?: number | undefined,
  buildFee?: number | undefined,
  impactFee?: number | undefined,
) {
  const preAdjustedOi = collateral ? (collateral * selectedLeverage) : undefined;
  
  const calculatedBuildFee = preAdjustedOi && buildFee ? (preAdjustedOi * buildFee) : undefined;
  const calculatedImpactFee = preAdjustedOi && impactFee ? (preAdjustedOi * impactFee) : undefined;

  const adjustedCollateral = collateral && calculatedBuildFee && calculatedImpactFee ? (collateral - calculatedBuildFee - calculatedImpactFee) : undefined;
  const adjustedOi = adjustedCollateral ? (adjustedCollateral * selectedLeverage) : undefined;

  return useMemo(() => {
    return {
      preAdjustedOi,
      calculatedBuildFee,
      calculatedImpactFee,
      adjustedCollateral,
      adjustedOi
    };
  }, [adjustedCollateral, adjustedOi, preAdjustedOi, calculatedBuildFee, calculatedImpactFee]);
};