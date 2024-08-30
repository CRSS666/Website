import styles from '@/styles/Card.module.scss';

export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`${styles.card} ${className}`}>
      { children }
    </div>
  );

}