import { BackIcon } from '@/components/Icons';
import { cn } from '@/utils/classnames';

type BackButtonType = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'onClick'
> & { onClick: () => void };

export function BackButton({ onClick, className }: BackButtonType) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'bg-blue-500 h-8 p-[6px] shrink-0 flex justify-center items-center rounded-full font-bold text-white transition-[width] duration-[.3s] text-base overflow-hidden w-8',
        className,
      )}
    >
      <span className="w-5">
        <BackIcon />
      </span>
    </button>
  );
}
