import React from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';

export function withGuest<P extends object>(Component: React.ComponentType<P>) {
  return (props: P) => {
    const user = useRequireAuth();

    // Si hay un usuario autenticado, no mostramos el componente
    if (user !== null) {
      return null;
    }

    return <Component {...props} />;
  };
}
