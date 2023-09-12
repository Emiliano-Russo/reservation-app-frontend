import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function useRequireAuth() {
  const restrictedRoutes = ['/signin', '/signup'];
  const redirectUrl = '/business';
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    if (
      !user &&
      location.pathname !== '/signin' &&
      location.pathname !== '/signup'
    ) {
      navigate('/signin');
    } else if (user && restrictedRoutes.includes(location.pathname)) {
      navigate(redirectUrl);
    }
  }, [user, navigate, restrictedRoutes, redirectUrl, location]);

  return user;
}
