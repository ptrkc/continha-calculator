import { MouseEventHandler, PropsWithChildren } from "react";

const Button = ({
  children,
  onClick,
  ...rest
}: PropsWithChildren<{ onClick: MouseEventHandler<HTMLButtonElement> }>) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      className="rounded-md border-black border-2 px-4 mx-auto"
    >
      {children}
    </button>
  );
};
export default Button;
