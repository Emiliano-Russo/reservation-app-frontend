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

  return (
    <div className={styles.footer} style={style}>
      {buttonsConfig.map((button) => (
        <Button
          className={`${styles.buttonStyle} ${
            selectedPath === button.path ? styles.buttonSelected : ''
          }`}
          onClick={() => handleNavigation(button.path)}
          icon={
            <img className={styles.iconStyle} src={button.icon} alt="Icono" />
          }
        ></Button>
      ))}
    </div>
  );
};

export default Footer;
