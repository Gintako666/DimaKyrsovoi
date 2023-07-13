import { useState } from 'react';

export interface IHandleChange {
  ({
    target: { id, value },
  }: any): void;
}

interface IUseAddForm {
  (
    defaultName?: string,
    defaultColor?: string
  ): {
    name: string;
    description: string;
    color: string;
    handleChange: IHandleChange;
  };
}

const useAddForm: IUseAddForm = (defaultName = '', defaultColor = '#4c44e4') => {
  const [ name, setName ] = useState(defaultName);
  const [ description, setDescription ] = useState('');
  const [ color, setColor ] = useState(defaultColor);

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
