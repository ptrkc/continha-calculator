import { useState } from "react";
import { cn } from "@/utils/classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  format?: Function;
}

export const Input = ({
  value,
  onChange,
  format,
  className,
  ...rest
}: InputProps) => {
  const [internalValue, setInternalValue] = useState(
    format ? format(value) : value
  );
  const inputValue = format ? internalValue : value;

  const onChangeWithFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (format) {
      event.target.value = format(event.target.value);
      setInternalValue(event.target.value);
      return onChange(event);
    }
    onChange(event);
  };

  return (
    <input
      className={cn("border-black border-b-2 bg-white px-2", className)}
      value={inputValue}
      onChange={onChangeWithFormat}
      {...rest}
    />
  );
};
