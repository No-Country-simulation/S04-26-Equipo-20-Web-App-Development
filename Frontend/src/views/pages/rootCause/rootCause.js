import { useRootCause } from '../../../controllers/hooks/useRootCause';

export function useRootCauseLogic() {
  const { analysis, loading, error } = useRootCause();

  return {
    analysis,
    loading,
    error
  };
}
