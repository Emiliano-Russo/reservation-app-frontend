import { Input } from 'antd';
import styles from './NewReservation.module.css';

export const Counter = ({ min, max, label, onChange }) => {
  return (
    <div
      style={{ width: '200px' }}
      className={`${styles.inputContainer} ${styles.verticalBox}`}
    >
      <label>{label}</label>
      <Input
        type="number"
        min={min.toString()}
        max={max.toString()}
        onChange={(e) => onChange(label, e.target.value)}
      />
    </div>
  );
};
