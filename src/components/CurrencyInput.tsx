import { useState } from "react";
import formatCurrency from "../utils/formatCurrency";

const CurrencyInput = ({
  value,
  onChange,
}: {
  value: string | number;
  onChange: Function;
}) => {
  const [internalValue, setInternalValue] = useState(formatCurrency(value));

  const formatInput = (val: string) => {
    setInternalValue(formatCurrency(val.replace(/[^\d]/g, "")));
  };

  const onInternalChange = (val: string) => {
    onChange(val);
    formatInput(val);
  };

  return (
    <input
      className="border-black border-b-2 w-24"
      value={internalValue}
      onChange={(e) => onInternalChange(e.target.value)}
    />
  );
};
export default CurrencyInput;
