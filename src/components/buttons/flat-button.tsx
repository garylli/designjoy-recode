import type { MouseEventHandler, ReactNode } from 'react';
import styles from './flat-button.module.css';
import { cn } from '@/lib/utils';

const FlatButton = (props: {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button
      className={cn(styles['button-container'], props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export { FlatButton };
