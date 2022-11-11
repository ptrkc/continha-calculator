import { ReactNode } from "react";
import { cn } from "@/utils/classnames";

type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: ReactNode;
};

export const Button = ({
  children,
  onClick,
  className,
  icon,
  ...rest
}: ButtonType) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex justify-center items-center rounded-lg bg-blue-700 font-bold text-white px-3 py-1 hover:brightness-90",
        icon ? "pl-0 pr-3" : "px-2",
        className
      )}
      {...rest}
    >
      {icon && <span className="w-5 h-5 ml-2 mr-1">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
