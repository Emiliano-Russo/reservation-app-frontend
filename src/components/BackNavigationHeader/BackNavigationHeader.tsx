import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './BackNavigationHeader.module.css';

export const BackNavigationHeader = ({ title }) => {
  const nav = useNavigate();

  return (
    <header className={styles.header}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => nav(-1)}
      />
      <h1>{title}</h1>
      <Button
        style={{
          visibility: 'hidden',
        }}
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => nav(-1)}
      />
    </header>
  );
};
