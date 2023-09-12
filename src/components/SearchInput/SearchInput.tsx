import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({ placeholder = 'Buscar algo...', ...props }) => {
  return (
    <input
      placeholder={placeholder}
      className={`${styles.animatedGrowsFromLeft} ${styles.inputStyle}`}
      {...props}
    />
  );
};

export default SearchInput;
