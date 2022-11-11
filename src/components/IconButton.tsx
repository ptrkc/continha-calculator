import { cn } from "@/utils/classnames";

export const IconButton = ({
  children,
  onClick,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-8 h-8 p-[6px] shrink-0 flex justify-center items-center rounded-lg bg-blue-700 font-bold text-white hover:brightness-90",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
