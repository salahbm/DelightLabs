export const capitalizeFirstLetter = (value: string): string => {
  if (!value) return '';

  const lowercaseWord = value.toLowerCase();
  return lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
};
