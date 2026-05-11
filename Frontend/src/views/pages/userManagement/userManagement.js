import { useUsers } from '../../../controllers/hooks/useUsers';

export function useUserManagementLogic() {
  const { users, loading, error } = useUsers();

  const safeUsers = users || [];

  return {
    users: safeUsers,
    loading,
    error
  };
}
