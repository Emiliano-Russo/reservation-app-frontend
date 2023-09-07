import { motion } from 'framer-motion';

interface AnimatedRouteWrapperProps {
  children: React.ReactNode;
}

export const GrowsFromLeft: React.FC<AnimatedRouteWrapperProps> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0, scale: 0.3 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ ease: 'easeOut', duration: 0.2, delay: 0.2 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      {children}
    </motion.div>
  );
};
