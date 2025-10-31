import { Children, ReactNode, useRef } from 'react';
import styles from './marquee.module.css';

const Marquee2 = (props: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={styles['marquee-container']}>
      <div
        className={styles['marquee']}
        style={
          { '--items': Children.count(props.children) } as React.CSSProperties
        }
      >
        {Children.map(props.children, (node, idx) => {
          return (
            <div
              style={{ '--item-position': idx + 1 } as React.CSSProperties}
              className={`${styles['item']}`}
            >
              {node}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Marquee2 };
