import { ReactNode } from 'react';
import { cn } from '@/utils/classnames';

type IconButtonType = React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & { icon: ReactNode };

export function IconButton({
  icon,
  onClick,
  className,
  ...rest
}: IconButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-8 h-8 p-[6px] shrink-0 flex justify-center items-center rounded-full font-bold text-white',
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
