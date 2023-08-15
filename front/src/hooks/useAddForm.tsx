import { useState } from 'react';

interface ITarget {
  id: string;
  value: string;
}

export interface IHandleChange {
  (e: { target: ITarget }): void;
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
      case 'select':
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
