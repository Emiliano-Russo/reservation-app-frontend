import Footer from '../components/Footer/Footer';
import React from 'react';
import AnimatedRouteWrapper from './AnimatedRouteWrapper';

export const withPageLayout = (
  WrappedComponent,
  padding = '20px',
  footer: boolean = true,
) => {
  return (props) => (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          padding: padding,
        }}
      >
        <WrappedComponent {...props} />
        {footer && <Footer style={{ margin: 'auto 20px 20px 20px' }} />}
      </div>
    </>
  );
};
