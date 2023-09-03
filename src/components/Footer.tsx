import React, { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPath } from '../redux/footerSlice';

const buttonsConfig = [
  {
    path: '/reservations',
    icon: 'https://img.icons8.com/ios-filled/100/FFFFFF/reservation-2.png',
  },
  {
    path: '/',
    icon: 'https://img.icons8.com/ios-filled/50/FFFFFF/home.png',
  },
  {
    path: '/profile',
    icon: 'https://img.icons8.com/material-sharp/96/FFFFFF/user.png',
  },
];

const Footer = ({ style = {} }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const selectedPath = useSelector((state: any) => state.footer.selectedPath);

  const handleNavigation = (path: string) => {
    nav(path);
    dispatch(setSelectedPath(path));
  };

  const defaultStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    padding: '20px',
    height: '68px',
    borderRadius: '30px',
    background: '#101323',
  };

  return (
    <div style={{ ...defaultStyle, ...style }}>
      {buttonsConfig.map((button) => (
        <Button
          style={{
            background:
              selectedPath === button.path ? '#FD6F8E' : 'transparent',
            border: 'none',
            borderRadius: '30px',
            width: '100px',
            height: '50px',
          }}
          onClick={() => handleNavigation(button.path)}
          icon={<img style={{ width: '27px' }} src={button.icon} alt="Icono" />}
        ></Button>
      ))}
    </div>
  );
};

export default Footer;
