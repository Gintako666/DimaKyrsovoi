import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';

const Form: FC = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  // Handle change
  interface IHandleChange {
    ({ target: { type, value } }: ChangeEvent<HTMLInputElement>): void;
  }
  const handleChange: IHandleChange = ({ target: { type, value } }) => {
    if (type === 'text') {
      setUsername(value);
    } else if (type === 'password') {
      setPassword(value);
    }
  };

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }
  const handleSubmit: IHandleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form action="#" className="login__form" onSubmit={ handleSubmit }>
      <h1 className="login__title">Login</h1>
      <input
        className="login__input login__input_text"
        type="text"
        placeholder="Username"
        value={ username }
        onChange={ handleChange }
      />
      <input
        className="login__input login__input_password"
        type="password"
        placeholder="Password"
        value={ password }
        onChange={ handleChange }
      />
      <button className="login__submit" type="submit">
        Login
      </button>
    </form>
  );
};

export default Form;
