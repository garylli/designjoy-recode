import type { EventHandler, MouseEventHandler, ReactNode } from 'react';
import styles from './solid-button.module.css';
import { cn } from '@/lib/utils';

const SolidButton = (props: {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={cn(styles['button-container'], props.className)}
      onClick={props.onClick ?? (() => {})}
    >
      {props.children}
    </button>
  );
};

export { SolidButton };
