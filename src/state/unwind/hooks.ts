import { useAppSelector } from "../hooks";
import { AppState } from "../state";

export function useUnwindState(): AppState['unwind'] {
  return useAppSelector((state) => state.unwind);
};