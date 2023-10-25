import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPath } from '../../redux/footerSlice';
import styles from './Footer.module.css';
import { RootState } from '../../redux/store';

const Footer = ({ isBusiness = false, style = {} }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user.user);
  const selectedPath = useSelector((state: any) => state.footer.selectedPath);

  const handleNavigation = (path) => {
    nav(path);
    dispatch(setSelectedPath(path));
  };

  const userButtonsConfig = [
    {
      path: '/reservations',
      icon: 'https://img.icons8.com/ios-filled/100/FFFFFF/reservation-2.png',
    },
    {
      path: userState ? '/business' : '/',
      icon: 'https://img.icons8.com/ios-filled/50/FFFFFF/home.png',
    },
    {
      path: '/profile',
      icon: 'https://img.icons8.com/material-sharp/96/FFFFFF/user.png',
    },
  ];

  const businessButtonsConfig = [
    {
      path: '/businessReservation',
      icon: 'https://img.icons8.com/ios-filled/100/FFFFFF/reservation-2.png',
    },
    {
      path: '/businessHome',
      icon: 'https://img.icons8.com/ios-filled/50/FFFFFF/home.png',
    },
    {
      path: '/businessPrivateProfile',
      icon: 'https://img.icons8.com/material-sharp/96/FFFFFF/user.png',
    },
  ];

  const currentButtonsConfig = isBusiness
    ? businessButtonsConfig
    : userButtonsConfig;

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    padding: '20px',
    height: '68px',
    borderRadius: '30px',
    background: '#101323',
    ...style,
  };

  const buttonStyle = {
    border: 'none',
    borderRadius: '30px',
    width: '100px',
    height: '50px',
    background: 'transparent',
  };

  const selectedColor = isBusiness ? '#1677ff' : '#ffa500';

  const buttonSelectedStyle = {
    ...buttonStyle,
    background: selectedColor,
  };

  const iconStyle = {
    width: '27px',
  };

  return (
    <div style={footerStyle}>
      {currentButtonsConfig.map((button) => (
        <Button
          key={button.path}
          style={
            selectedPath === button.path ? buttonSelectedStyle : buttonStyle
          }
          onClick={() => handleNavigation(button.path)}
          icon={<img style={iconStyle} src={button.icon} alt="Icono" />}
        ></Button>
      ))}
    </div>
  );
};

export default Footer;
