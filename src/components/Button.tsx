export const Button = ({
  children,
  onClick,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md border-2 border-black bg-white  px-4"
      {...rest}
    >
      {children}
    </button>
  );
};
