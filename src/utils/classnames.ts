export const cn = (...args: Array<String | Boolean | undefined>) => {
  const finalClasses = [];
  for (let i = 0; i < args.length; i++) {
    const currentClass = args[i];
    if (currentClass) finalClasses.push(currentClass);
  }
  return finalClasses.join(" ");
};
