import { FC, ReactNode } from 'react';

interface FieldProps {
  modifier: string,
  label: string,
  children: ReactNode
}

const Field: FC<FieldProps> = ({ modifier, label, children }) => (
  <div className={ `add-form__field add-form__field_${ modifier }` }>
    <span className="add-form__label">
      {label}
    </span>
    {children}
  </div>
);

export default Field;
