import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/users/userSlice';

export default function PrivateRoute() {
  const location = useLocation();
  const user = useSelector(selectUser);

  return user.username ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
}
