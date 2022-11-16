/**
 * Turns cents to money with decimals, like: 399 => 3,99
 * @param value money in cents
 * @returns money with decimals
 */
export const centsToDecimal = (value: number) => {
  const numberCeiled = String(Math.ceil(value));
  const valueWithPad = numberCeiled.replace(/^0+/, '').padStart(3, '0');
  return `${valueWithPad.slice(0, -2)},${valueWithPad.slice(-2)}`;
};
