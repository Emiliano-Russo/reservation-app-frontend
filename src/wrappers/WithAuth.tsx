import React from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
    return (props: P) => {
        const user = useRequireAuth();

        if (!user) {
            return null;
        }

        return <Component {...props} />;
    };
}