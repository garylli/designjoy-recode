import { cn } from '@/lib/utils';

const Gridlines = (props: { className?: string }) => {
  return (
    <>
      <Gridline className={cn('right-0', props.className)} />
      <Gridline className={cn('left-0', props.className)} />
    </>
  );
};

const Gridline = (props: { className?: string; color?: string }) => {
  return (
    <div
      className={cn(
        'w-[1px] absolute top-0 bottom-0 bg-[#d6cdc4]',
        props.className,
      )}
    ></div>
  );
};

export { Gridlines };
