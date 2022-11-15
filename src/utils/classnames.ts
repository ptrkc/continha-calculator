export const cn = (...args: (string | boolean | undefined)[]) => {
  const finalClasses = [];
  for (const currentClass of args) {
    if (currentClass) finalClasses.push(currentClass);
  }
  return finalClasses.join(' ');
};
