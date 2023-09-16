import { Tabs, List, Avatar, Rate, Typography } from 'antd';
import Footer from '../../../components/Footer/Footer';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import styles from './Home.module.css';
import {
  BasicProfileInfoWidget,
  SectionLine,
} from '../../User/Profile/Profile';
import { FeedbackCard } from '../../../components/FeedbackCard/FeedBackCard';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { useEffect, useState } from 'react';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const Summary = () => {
  const [innerHeight, setInnerHeight] = useState<number>(0);

  useEffect(() => {
    console.log('setting inner height');
    setInnerHeight(window.innerHeight);
  }, []);

  const icons = [
    {
      icon: <p style={{ fontSize: '18px', color: 'red' }}>02</p>,
      label: 'Promociones',
      value: 'Promociones Activas',
    },
    {
      icon: <p style={{ fontSize: '18px', color: 'red' }}>900 XP</p>,
      label: 'XP',
      value: 'Punto de Experiencia',
    },
  ];

  return (
    <div className={styles.summary}>
      <AnimatedFromLeft>
        <div
          id="amount"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px',
            padding: '0px 10px',
          }}
        >
          <p
            style={{
              fontSize: innerHeight > 700 ? '60px' : '40px',
              margin: '0px',
              marginRight: '30px',
              color: ' #fd6f8e',
            }}
          >
            2
          </p>
          <div id="verticalBar"></div>
          <p style={{ margin: '0px' }}>Reservas para el dia de hoy</p>
        </div>
      </AnimatedFromLeft>
      <GrowsFromLeft>
        <BasicProfileInfoWidget icons={icons} />
      </GrowsFromLeft>
      <AnimatedFromLeft>
        <SectionLine title={'Feedback'} />
      </AnimatedFromLeft>
      <GrowsFromLeft>
        <FeedbackCard
          avatarUrl={''}
          name={'Pepito'}
          rating={3}
          comment={'El lugar es normal, pero lindo'}
        />
      </GrowsFromLeft>
    </div>
  );
};

export const BusinessHome = withPageLayout(
  () => {
    return (
      <div style={{ padding: '0px 10px' }}>
        <GrowsFromLeft>
          <Tabs
            defaultActiveKey="1"
            style={{
              height: '80vh',
              marginTop: '30px',
              padding: '10px',
            }}
          >
            <TabPane tab="Resumen" key="1">
              <Summary />
            </TabPane>

            <TabPane tab="Estadística" key="2">
              <Paragraph>{'raw alejandro'}</Paragraph>
            </TabPane>
          </Tabs>
        </GrowsFromLeft>
      </div>
    );
  },
  '0px',
  true,
  true,
);
