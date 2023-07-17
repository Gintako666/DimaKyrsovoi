import { FC } from 'react';

import handleClassName from '~/utils/className.util';
import { IHandleChange } from '~/hooks/useAddForm';
import Name from './Name';
import Description from './Description';
import Color from './Color';

interface AddFormProps {
  className: string;
  modifier?: string;
  type: string;
  name: string;
  description?: string;
  color?: string;
  onChange: IHandleChange;
}

const AddForm: FC<AddFormProps> = ({
  className,
  modifier,
  type,
  name,
  description,
  color,
  onChange: handleChange,
}) => {
  const modifiedClassName = handleClassName(
    !!modifier,
    `${ className }__add-form`,
    modifier,
  );

  return (
    <div className={ `${ modifiedClassName } add-form` }>
      <Name type={ type } name={ name } onChange={ handleChange } />
      {(typeof description === 'string') && (
      <Description
        type={ type }
        description={ description }
        onChange={ handleChange }
      />
      )}
      {(typeof color === 'string') && (
      <Color
        type={ type }
        color={ color }
        onChange={ handleChange }
      />
      )}
      <button type="submit" className="add-form__button button">
        Save
      </button>
    </div>
  );
};

AddForm.defaultProps = {
  modifier: undefined,
  description: undefined,
  color: undefined,
};

export default AddForm;
