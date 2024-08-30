import { motion } from 'framer-motion';

import styles from '@/styles/global.module.scss';

export default function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className={styles.pageContent}

      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.96, opacity: 0 }}

      transition={{ duration: 0.24, ease: 'easeInOut', bounce: 0.45, type: 'spring', stiffness: 100, opacity: { bounce: 0 } }}
    >
      <div className={styles.container}>
        {children}
      </div>
    </motion.main>
  );
}