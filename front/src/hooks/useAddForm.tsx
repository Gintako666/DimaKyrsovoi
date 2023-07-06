import { useState } from 'react';

export interface IHandleChange {
  ({
    target: { id, value },
  }: any): void;
}

interface IUseAddForm {
  (): {
    name: string;
    description: string;
    color: string;
    handleChange: IHandleChange;
  };
}

const useAddForm: IUseAddForm = () => {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ color, setColor ] = useState('#4c44e4');

  const handleChange: IHandleChange = ({ target: { id, value } }) => {
    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'color':
        setColor(value);
        break;
      default:
        break;
    }
  };

  return {
    name,
    description,
    color,
    handleChange,
  };
};

export default useAddForm;
