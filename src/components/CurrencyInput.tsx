import { useState } from "react";
import formatCurrency from "../utils/formatCurrency";

const CurrencyInput = ({ price }: { price: string | number }) => {
  const [value, setValue] = useState(formatCurrency(price));

  const formatInput = (val: string) => {
    setValue(formatCurrency(val.replace(/[^\d]/g, "")));
  };

  return <input value={value} onChange={(e) => formatInput(e.target.value)} />;
};
export default CurrencyInput;
