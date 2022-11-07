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
  value,
  onChange,
  maskFunction,
  focus,
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

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <input
      className={cn("border-black border-b-2 bg-white px-2", className)}
      value={internalValue}
      onChange={(e) => onChangeWithMask(e.target.value)}
      onFocus={focus ? handleFocus : undefined}
      {...rest}
    />
  );
};
