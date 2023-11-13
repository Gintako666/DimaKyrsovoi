import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';

import { useUser } from '~/contexts/user';

const Form: FC = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ isUsernameErr, setIsUsernameErr ] = useState(false);
  const [ isPasswordErr, setIsPasswordErr ] = useState(false);

  const { login } = useUser();

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
  const handleSubmit: IHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
    } catch (
      /* eslint-disable @typescript-eslint/no-explicit-any */
      err: any
    ) {
      if (!username && !password) {
        setIsUsernameErr(true);
        setIsPasswordErr(true);
      } else {
        const errMessage = err.message;

        switch (errMessage) {
          case '"email" is not allowed to be empty':
          case '"email" must be a valid email':
            setIsUsernameErr(true);

            if (isPasswordErr) {
              setIsPasswordErr(false);
            }
            break;

          case '"password" is not allowed to empty':
            setIsPasswordErr(true);

            if (isUsernameErr) {
              setIsUsernameErr(false);
            }
            break;

          // case 'Invalid user credentials.':
          default:
            setIsUsernameErr(true);
            setIsPasswordErr(true);
            break;
        }
      }
    }
  };

  return (
    <form action="#" onSubmit={ handleSubmit }>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={ username }
        onChange={ handleChange }
      />
      <input
        type="password"
        placeholder="Password"
        value={ password }
        onChange={ handleChange }
      />
      <button type="submit">
        Login
      </button>
    </form>
  );
};

export default Form;
