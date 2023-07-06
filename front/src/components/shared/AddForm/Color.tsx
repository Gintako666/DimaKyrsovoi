import { ChangeEvent, FC } from 'react';

interface ColorProps {
  type: string;
  color: string;
  onChange: ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement>) => void;
}

const Color: FC<ColorProps> = ({ type, color, onChange }) => (
  <div className="add-form__field add-form__field_color">
    <span className="add-form__label">
      Choose
      {' '}
      {type}
      {' '}
      color
    </span>
    <input id="color" type="color" value={ color } onChange={ onChange } />
  </div>
);

export default Color;
