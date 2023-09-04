import Footer from '../components/Footer/Footer';
import React from 'react';

export const withPageLayout = (WrappedComponent, padding = '20px') => {
  return (props) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: padding,
      }}
    >
      <WrappedComponent {...props} />
    </div>
  );
};
