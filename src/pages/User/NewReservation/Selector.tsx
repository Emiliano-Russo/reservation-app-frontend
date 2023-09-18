import { Select } from 'antd';
import styles from './NewReservation.module.css';

const { Option } = Select;

export const Selector = ({ label, options, onChange }) => {
  return (
    <div
      className={styles.verticalBox}
      style={{ width: '200px', margin: '0 auto' }}
    >
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
  );
};
