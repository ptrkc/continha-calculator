import { useState } from 'react';
import { cn } from '@/utils/classnames';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (value: string) => void;
  format?: (value: string | number) => string;
}

export function Input({
  value,
  onChange,
  format,
  className,
  ...rest
}: InputProps) {
  const [internalValue, setInternalValue] = useState(
    format ? format(value) : value,
  );
  const inputValue = format ? internalValue : value;

  const onChangeWithFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (format) {
      const receivedValue = format(event.target.value);
      setInternalValue(event.target.value);
      return onChange(receivedValue);
    }
    return onChange(event.target.value);
  };

  return (
    <input
      className={cn(
        'border border-black bg-white px-2 rounded-full h-8',
        className,
      )}
      value={inputValue}
      onChange={onChangeWithFormat}
      {...rest}
    />
  );
}
