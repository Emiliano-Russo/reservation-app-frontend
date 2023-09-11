import { useNavigate } from 'react-router-dom';
import styles from './BusinessTypeCard.module.css';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';

interface Props {
  id: string;
  name: string;
  icon: string;
  index: number; // Añade esto
}

export const BusinessTypeCard = (val: Props) => {
  const nav = useNavigate();

  return (
    <AnimatedFromLeft
      delay={val.index * 0.1}
      className={styles.card}
      id={val.name}
      onClick={() => {
        nav('/business/' + val.id);
      }}
    >
      <img className={styles.cardImage} src={val.icon} alt={val.name} />
      <p className={styles.cardText}>{val.name}</p>
    </AnimatedFromLeft>
  );
};
