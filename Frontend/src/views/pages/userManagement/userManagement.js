import { useUsers } from '../../../controllers/hooks/useUsers';

export function useUserManagementLogic() {
  const { users, loading, error } = useUsers();

  return {
    users,
    loading,
    error
  };
}
