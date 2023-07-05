import { FC } from 'react';

import handleClassName from '~/utils/className.util';
import { IHandleChange } from '~/hooks/useAddForm';
import Name from './Name';
import Description from './Description';

interface AddFormProps {
  className: string;
  modifier?: string;
  type: string;
  name: string;
  description?: string;
  onChange: IHandleChange;
}

const AddForm: FC<AddFormProps> = ({
  className,
  modifier,
  type,
  name,
  description,
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
    </div>
  );
};

AddForm.defaultProps = {
  modifier: undefined,
  description: undefined,
};

export default AddForm;
