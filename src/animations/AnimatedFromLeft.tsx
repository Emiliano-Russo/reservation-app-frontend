// AnimatedFromLeft.tsx
import React from 'react';
import styles from './animations.module.css';

interface AnimatedFromLeftProps extends React.HTMLProps<HTMLDivElement> {
  delay?: number; // Tiempo de retraso para la animación
}

const AnimatedFromLeft: React.FC<AnimatedFromLeftProps> = ({
  children,
  delay = 0,
  className = '', // por defecto será una cadena vacía
  ...rest
}) => {
  return (
    <div
      className={`${styles.animatedFromLeft} ${className}`} // combina className prop con la clase de animación
      style={{ animationDelay: `${delay}s` }}
      {...rest} // Propaga todas las propiedades adicionales
    >
      {children}
    </div>
  );
};

export default AnimatedFromLeft;
