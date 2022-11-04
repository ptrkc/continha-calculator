import { FocusEvent, useState } from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  maskFunction?: Function;
  onChange: Function;
  focus?: boolean;
}

const Input = ({
  value,
  onChange,
  maskFunction,
  focus,
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
      className="border-black border-b-2 w-24"
      value={internalValue}
      onChange={(e) => onChangeWithMask(e.target.value)}
      onFocus={focus ? handleFocus : undefined}
      {...rest}
    />
  );
};
export default Input;
