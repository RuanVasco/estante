import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import type { JSX } from 'react';

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;