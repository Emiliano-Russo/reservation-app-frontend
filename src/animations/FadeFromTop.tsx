import styles from './animations.module.css';

interface AnimatedRouteWrapperProps {
  children: React.ReactNode;
}

export const FadeFromTop: React.FC<AnimatedRouteWrapperProps> = ({
  children,
}) => {
  return <div className={styles.animatedFadeFromTop}>{children}</div>;
};
