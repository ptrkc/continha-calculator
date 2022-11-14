export const formatCurrency = (value: number) => {
  const numberCeiled = String(Math.ceil(value));
  const valueWithPad = numberCeiled.replace(/^0+/, "").padStart(3, "0");
  return `R$ ${valueWithPad.slice(0, -2)},${valueWithPad.slice(-2)}`;
};
