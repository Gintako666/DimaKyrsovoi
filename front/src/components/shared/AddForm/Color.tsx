import { ChangeEvent, FC } from 'react';

import Field from './Field';

interface ColorProps {
  type: string;
  color: string;
  onChange: ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement>) => void;
}

const Color: FC<ColorProps> = ({ type, color, onChange }) => (
  <Field modifier="color" label={ `Choose ${ type } color` }>
    <input type="color" id="color" className="add-form__input_color" value={ color } onChange={ onChange } />
  </Field>
);

export default Color;
