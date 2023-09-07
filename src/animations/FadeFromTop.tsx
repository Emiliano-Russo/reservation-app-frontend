import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: '-30px',
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: '30px',
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3,
};

interface AnimatedRouteWrapperProps {
  children: React.ReactNode;
}

export const FadeFromTop: React.FC<AnimatedRouteWrapperProps> = ({
  children,
}) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};
