import { MouseEventHandler, ReactNode } from 'react';
import styles from './skeu-button.module.css';
import { cn } from '@/lib/utils';

const SkeuButton = (props: {
  className?: string;
  children?: ReactNode;
  onClick: MouseEventHandler;
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
export { SkeuButton };
