interface IHandleClassName {
  (
    isActive: boolean,
    className: string,
    modifier?: string,
    onlyModifier?: boolean
  ): string;
}

const handleClassName: IHandleClassName = (
  isActive,
  className,
  modifier = 'active',
  onlyModifier = false,
) => {
  const defaultClassName = onlyModifier ? '' : className;

  let splitter = '';
  if (isActive) {
    if (!onlyModifier) {
      splitter = ' ';
    }
  }

  let modifiedClassName = '';
  if (isActive) {
    modifiedClassName = `${ className }_${ modifier }`;
  }

  return defaultClassName + splitter + modifiedClassName;
};

export default handleClassName;
