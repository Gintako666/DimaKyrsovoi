import { ChangeEvent, FC } from 'react';

import Field from './Field';

interface NameProps {
  type: string;
  name: string;
  onChange: ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement>) => void;
}

const Name: FC<NameProps> = ({ type, name, onChange }) => (
  <Field modifier="name" label={ `Enter ${ type } name` }>
    <div className="add-form__input add-form__input_name">
      <span>/</span>
      <input id="name" type="text" value={ name } onChange={ onChange } />
    </div>
  </Field>
);

export default Name;
