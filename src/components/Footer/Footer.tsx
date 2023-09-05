import React, { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPath } from '../../redux/footerSlice';
import styles from './Footer.module.css';

const buttonsConfig = [
  {
    path: '/reservations',
    icon: 'https://img.icons8.com/ios-filled/100/FFFFFF/reservation-2.png',
  },
  {
    path: '/business',
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

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    padding: '20px',
    height: '68px',
    borderRadius: '30px',
    background: '#101323',
    ...style, // para agregar cualquier otro estilo que desees pasar al componente
  };

  const buttonStyle = {
    border: 'none',
    borderRadius: '30px',
    width: '100px',
    height: '50px',
    background: 'transparent',
  };

  const buttonSelectedStyle = {
    ...buttonStyle, // para heredar los estilos del botón
    background: '#fd6f8e',
  };

  const iconStyle = {
    width: '27px',
  };

  return (
    <div style={footerStyle}>
      {buttonsConfig.map((button) => (
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
