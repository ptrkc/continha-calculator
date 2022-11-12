import { ReactNode } from "react";
import { cn } from "@/utils/classnames";

type IconButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { icon: ReactNode };

export const IconButton = ({
  icon,
  onClick,
  className,
  ...rest
}: IconButtonType) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-8 h-8 p-[6px] shrink-0 flex justify-center items-center rounded-lg bg-blue-700 font-bold text-white hover:brightness-90",
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
};
