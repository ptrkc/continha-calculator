import { useEffect, useState } from "react";
import { cn } from "@/utils/classnames";
import { TrashIcon } from "@/components/Icons";

type DeleteButtonType = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClick"
> & { onClick: Function };

export const DeleteButton = ({ onClick, className }: DeleteButtonType) => {
  const [waitingConfirmation, setWaitingConfirmation] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setWaitingConfirmation(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [waitingConfirmation]);

  const buttonClick = () => {
    if (waitingConfirmation) return onClick();

    setWaitingConfirmation(true);
  };
  return (
    <button
      onClick={buttonClick}
      className={cn(
        "h-8 p-[6px] shrink-0 flex justify-center items-center rounded-lg bg-red-700 font-bold text-white hover:brightness-90 transition-[width]",
        waitingConfirmation ? "w-24" : "w-8",
        className
      )}
    >
      {waitingConfirmation ? (
        "CERTEZA?"
      ) : (
        <span className="w-5">
          <TrashIcon />
        </span>
      )}
    </button>
  );
};
