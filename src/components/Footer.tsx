import React, { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPath } from '../redux/footerSlice';

const Footer = () => {
  console.log('rendering footer');
  const nav = useNavigate();
  const dispatch = useDispatch();
  const selectedPath = useSelector((state: any) => state.footer.selectedPath);

  const buttons = [
    {
      path: '/reservations',
      style: {
        background:
          selectedPath === '/reservations' ? '#FD6F8E' : 'transparent',
        border: 'none',
        borderRadius: '30px',
        width: '100px',
        height: '50px',
      },
      icon: 'https://img.icons8.com/external-flat-icons-inmotus-design/67/FFFFFF/external-booking-booking-flat-icons-inmotus-design.png',
    },
    {
      path: '/',
      style: {
        background: selectedPath === '/' ? '#FD6F8E' : 'transparent',
        border: 'none',
        borderRadius: '30px',
        width: '100px',
        height: '50px',
      },
      icon: 'https://img.icons8.com/ios-filled/50/FFFFFF/home.png',
    },
    {
      path: '/profile',
      style: {
        background: selectedPath === '/profile' ? '#FD6F8E' : 'transparent',
        border: 'none',
        borderRadius: '30px',
        width: '100px',
        height: '50px',
      },
      icon: 'https://img.icons8.com/material-sharp/96/FFFFFF/user.png',
    },
  ];

  const handleNavigation = (path: string) => {
    nav(path);
    dispatch(setSelectedPath(path));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        padding: '10px',
        height: '68px',
        borderRadius: '30px',
        background: '#101323',
      }}
    >
      {buttons.map((button) => (
        <Button
          style={button.style}
          onClick={() => handleNavigation(button.path)}
          icon={<img style={{ width: '27px' }} src={button.icon} alt="Icono" />}
        ></Button>
      ))}
    </div>
  );
};

export default Footer;
