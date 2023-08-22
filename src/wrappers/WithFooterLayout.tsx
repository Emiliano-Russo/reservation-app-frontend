import React from 'react';
import Footer from '../components/Footer';

export const withFooterLayout = (WrappedComponent) => {
  return (props) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '20px',
      }}
    >
      <WrappedComponent {...props} />
      <Footer />
    </div>
  );
};
