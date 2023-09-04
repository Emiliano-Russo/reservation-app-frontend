import styles from './BusinessTypeCard.module.css';

interface Props {
  name: string;
  icon: string;
}

export const BusinessTypeCard = (val: Props) => {
  return (
    <div id={val.name} className={styles.card}>
      <img className={styles.cardImage} src={val.icon} alt={val.name} />
      <p className={styles.cardText}>{val.name}</p>
    </div>
  );
};
