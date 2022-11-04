const formatCurrency = (value: string|number) => {
  const onlyNumbers = String(value).replace(/[^\d]/g, '')
  const valueWithPad = onlyNumbers.replace(/^0+/,'').padStart(3, '0')
  return `R$ ${valueWithPad.slice(0,-2)},${valueWithPad.slice(-2)}`
}

export default formatCurrency