interface IGetFirstLetters {
  (string: string): string
}

const getFirstLetters: IGetFirstLetters = (string) => {
  const words = string.split(' ');

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  const firstLetters = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase());

  return firstLetters.join('');
};

export default getFirstLetters;
