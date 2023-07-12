import { ChangeEvent, FC } from 'react';

import Field from './Field';

interface DescriptionProps {
  type: string;
  description: string;
  onChange: ({
    target: { id, value },
  }: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Description: FC<DescriptionProps> = ({ type, description, onChange }) => (
  <Field modifier="description" label="Description">
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
  </Field>
);

export default Description;
