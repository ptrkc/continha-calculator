import { cn } from "@utils/classnames";
import { FocusEvent, useState } from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  maskFunction?: Function;
  onChange: Function;
  focus?: boolean;
}

export const Input = ({
  value = "",
  onChange,
  maskFunction,
  className,
  ...rest
}: InputProps) => {
  const [internalValue, setInternalValue] = useState(
    maskFunction ? maskFunction(value) : value
  );

  const onChangeWithMask = (value: string) => {
    const maskedValue = maskFunction ? maskFunction(value) : value;
    setInternalValue(maskedValue);
    return onChange(maskedValue);
  };

  return (
    <input
      className={cn("border-black border-b-2 bg-white px-2", className)}
      value={internalValue}
      onChange={(e) => onChangeWithMask(e.target.value)}
      {...rest}
    />
  );
};
