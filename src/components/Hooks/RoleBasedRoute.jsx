import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useUserRoles from '../Hooks/useUserRoles';
import { AuthContext } from '../../Context/Context';

const RoleBasedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);
  const { isAdmin, isTaskCreator, isWorker, isUsersLoading } = useUserRoles();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isUsersLoading) {
      setIsLoading(false);
    }
  }, [isUsersLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    if (role === 'Admin' && isAdmin) {
      return children;
    } else if (role === 'taskCreator' && isTaskCreator) {
      return children;
    } else if (role === 'worker' && isWorker) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <Navigate to="/" />;
};

export default RoleBasedRoute;
