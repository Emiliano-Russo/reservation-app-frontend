import { useNavigate } from 'react-router-dom';
import styles from './BusinessTypeCard.module.css';

interface Props {
  id: string;
  name: string;
  icon: string;
}

export const BusinessTypeCard = (val: Props) => {
  const nav = useNavigate();

  return (
    <div
      id={val.name}
      className={styles.card}
      onClick={() => {
        nav('/business/' + val.id);
      }}
    >
      <img className={styles.cardImage} src={val.icon} alt={val.name} />
      <p className={styles.cardText}>{val.name}</p>
    </div>
  );
};
