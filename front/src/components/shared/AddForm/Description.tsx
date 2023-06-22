import { ChangeEvent, FC } from 'react';

interface DescriptionProps {
  type: string;
  description: string;
  onChange: ({
    target: { id, value },
  }: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Description: FC<DescriptionProps> = ({ type, description, onChange }) => (
  <div className="add-form__field add-form__field_textarea">
    <span className="add-form__label">
      Description
    </span>
    <textarea
      className="add-form__input add-form__input_description"
      placeholder="Lorem ipsum dolor sit amet...."
      value={ description }
      onChange={ onChange }
    />
    <span className="add-form__sub-label">
      Brief description for your
      {' '}
      {type}
    </span>
  </div>
);

export default Description;
