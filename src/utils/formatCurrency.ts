const formatCurrency = (value: string|number) => {
  const valueWithPad = String(value).padStart(3, '0')
  return `R$ ${Number(valueWithPad.slice(0,-2))},${valueWithPad.slice(-2)}`
}

export default formatCurrency