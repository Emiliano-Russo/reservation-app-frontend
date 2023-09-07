import { useNavigate } from 'react-router-dom';
import styles from './BusinessTypeCard.module.css';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  name: string;
  icon: string;
  index: number; // Añade esto
}

export const BusinessTypeCard = (val: Props) => {
  const nav = useNavigate();

  return (
    <motion.div
      initial={{ x: -400, opacity: 0, scale: 0.8 }} // Configuración inicial: movido hacia la izquierda, casi invisible y ligeramente reducido
      animate={{ x: 0, opacity: 1, scale: 1 }} // Configuración final: posición original, completamente visible y a tamaño original
      transition={{ ease: 'easeOut', duration: 0.8, delay: val.index * 0.1 }} // Retraso basado en el id para dar un efecto en cascada
      id={val.name}
      className={styles.card}
      onClick={() => {
        nav('/business/' + val.id);
      }}
    >
      <img className={styles.cardImage} src={val.icon} alt={val.name} />
      <p className={styles.cardText}>{val.name}</p>
    </motion.div>
  );
};
