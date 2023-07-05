import { ChangeEvent, FC } from 'react';

interface NameProps {
  type: string;
  name: string;
  onChange: ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => void;
}

const Name: FC<NameProps> = ({ type, name, onChange }) => (
  <div className="add-form__field add-form__field_name">
    <span className="add-form__label">
      Enter
      {' '}
      {type}
      {' '}
      name
    </span>
    <div className="add-form__input add-form__input_name">
      <span>/</span>
      <input id="name" type="text" value={ name } onChange={ onChange } />
    </div>
  </div>
);

export default Name;
