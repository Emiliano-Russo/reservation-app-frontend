import styles from './animations.module.css';

interface AnimatedRouteWrapperProps {
  children: React.ReactNode;
}

export const GrowsFromLeft: React.FC<AnimatedRouteWrapperProps> = ({
  children,
}) => {
  return (
    <div
      className={styles.animatedGrowsFromLeft}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      {children}
    </div>
  );
};
