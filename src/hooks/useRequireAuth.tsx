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
    console.log('use effect del hook auth', user);
    if (
      !user &&
      location.pathname !== '/signin' &&
      location.pathname !== '/signup'
    ) {
      console.log('#1');
      navigate('/signin');
    } else if (user && restrictedRoutes.includes(location.pathname)) {
      console.log('#2');
      navigate(redirectUrl);
    }
  }, [user, navigate, restrictedRoutes, redirectUrl, location]);

  return user;
}
