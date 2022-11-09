const format = (initalValue: string | number) => {
  const value = String(initalValue);
  if (value === "0" || value === "") return "";
  if (value === String(parseInt(value))) return value;

  console.log(value);

  const [int, dec] = value
    .replace(".", ",")
    .replace(/[^\d,]/g, "")
    .split(",");
  return `${int},${dec.slice(0, 2)}`;
};

const toCents = (value: string) => {
  if (!value) return 0;

  if (value === String(parseInt(value))) return Number(`${value}00`);

  const [int, dec] = value.split(",");
  if (dec === "") return Number(`${int}00`);

  return Number(`${int}${dec.padEnd(2, "0")}`);
};

export const currencyInput = { format, toCents };
