import { centsToDecimal } from '@/utils/centsToDecimal';

const format = (initialValue: string | number) => {
  if (typeof initialValue === 'number') {
    if (initialValue === 0) return '';
    return centsToDecimal(initialValue);
  }
  const matches =
    initialValue
      .replace('.', ',')
      .replace(/\^d\,/g, '')
      .match(/(\d+)?(\,)?(\d{1,2})?/) ?? []; // should always return on any string but TS complains
  const [, int = '', comma = '', dec = ''] = matches;
  return `${int}${comma}${dec}`;
};

const toCents = (value: string) => {
  if (value === '') return 0;

  if (value === String(parseInt(value))) return Number(`${value}00`);

  const [int, dec = ''] = value.split(',');
  return Number(`${int}${dec.padEnd(2, '0')}`);
};

export const currencyInput = { format, toCents };
