import { cn } from "@utils/classnames";

export const Button = ({
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
        "rounded-lg bg-blue-700 font-bold text-white px-3 py-1 hover:brightness-90",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
