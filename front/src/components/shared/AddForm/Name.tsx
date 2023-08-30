import {
  ChangeEvent, FC, useCallback, useRef,
} from 'react';

import Field from './Field';

interface NameProps {
  type: string;
  name: string;
  onChange: ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  select?: string[],
}

const Name: FC<NameProps> = ({
  type, name, onChange, select,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  const selectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);

    nameRef?.current?.focus();
  }, [ onChange ]);

  return (
    <Field modifier="name" label={ `Enter ${ type } name` }>
      <div className="add-form__input add-form__input_name">
        {select ? (
          <select
            name=""
            id="select"
            onChange={ selectChange }
          >
            <option value="" selected>/</option>
            {select.map((option) => (
              <option value={ `${ option } ` }>
                {`/${ option }`}
              </option>
            ))}
          </select>
        ) : <span>/</span>}
        <input ref={ nameRef } id="name" type="text" value={ name } onChange={ onChange } />
      </div>
    </Field>
  );
};

Name.defaultProps = {
  select: undefined,
};

export default Name;
