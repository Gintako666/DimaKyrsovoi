export const getContrastColor = (background: string | undefined): string => {
  if (!background) {
    return '#000000';
  }

  const r = parseInt(background.substr(1, 2), 16);
  const g = parseInt(background.substr(3, 2), 16);
  const b = parseInt(background.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const textColor = brightness > 128 ? '#000000' : '#ffffff';

  return textColor;
};

export default getContrastColor;
