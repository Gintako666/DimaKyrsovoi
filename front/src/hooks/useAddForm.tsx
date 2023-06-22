import { ChangeEvent, useState } from 'react';

export interface IHandleChange {
  ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

interface IUseAddForm {
  (): {
    name: string;
    description: string;
    handleChange: IHandleChange;
  };
}

const useAddForm: IUseAddForm = () => {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');

  const handleChange: IHandleChange = ({ target: { id, value } }) => {
    if (id === 'name') {
      setName(value);
    } else if (id === 'description') {
      setDescription(value);
    }
  };

  return {
    name,
    description,
    handleChange,
  };
};

export default useAddForm;
