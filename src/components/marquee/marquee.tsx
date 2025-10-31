import { Children, ReactNode } from 'react';
import styles from './marquee.module.css';
import { cn } from '@/lib/utils';

const Marquee = (props: { children: ReactNode; className?: string }) => {
  const childrenArray = Children.toArray(props.children);

  return (
    <div className={cn(styles['container'], props.className)}>
      {/* <div className={styles['line']}> */}
      <div className={styles['element']}>
        {childrenArray.map((child, idx) => (
          <div className={styles['item']} key={idx}>
            {child}
          </div>
        ))}
      </div>
      <div className={styles['element']}>
        {childrenArray.map((child, idx) => (
          <div className={styles['item']} key={idx}>
            {child}
          </div>
        ))}
      </div>
      <div className={styles['element']}>
        {childrenArray.map((child, idx) => (
          <div className={styles['item']} key={idx}>
            {child}
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export { Marquee as Marquee };
