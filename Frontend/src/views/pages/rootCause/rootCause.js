import { useRootCause } from '../../../controllers/hooks/useRootCause';

export function useRootCauseLogic() {
  const { analysis, loading, error } = useRootCause();

  const safeAnalysis = analysis || [];

  return {
    analysis: safeAnalysis,
    loading,
    error
  };
}
