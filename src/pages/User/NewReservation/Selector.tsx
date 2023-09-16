import { Select } from 'antd';
import styles from './NewReservation.module.css';

const { Option } = Select;

export const Selector = ({ label, options, onChange }) => {
  return (
    <div className={styles.fieldsContainer}>
      <div className={styles.selectContainer}>
        <label>{label}</label>
        <Select
          placeholder="Seleccione una preferencia"
          className={styles.fullWidth}
          onChange={(value) => onChange(label, value)}
        >
          {options.map((val) => (
            <Option key={val} value={val}>
              {val}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
