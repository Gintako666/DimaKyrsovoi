import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';

import { useUser } from '~/contexts/user';

import handleClassName from '~/utils/className.util';

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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    ) {
      const errMessage = err.message;

      switch (errMessage) {
        case '"email" is not allowed to be empty':
        case '"email" must be a valid email':
          setIsUsernameErr(true);

          if (setIsPasswordErr) {
            setIsPasswordErr(true);
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
  };

  // Get modifier className
  interface IGetModifierClassName {
    (
      isActive: boolean,
      className: string
    ): string
  }
  const getModifierClassName: IGetModifierClassName = (isActive, className) => handleClassName(isActive, className, 'err');

  return (
    <form action="#" className="login__form" onSubmit={ handleSubmit }>
      <h1 className="login__title">Login</h1>
      <input
        className={ ` 'login__input' ${ getModifierClassName(isUsernameErr, 'login__input_username') }` }
        type="text"
        placeholder="Username"
        value={ username }
        onChange={ handleChange }
      />
      <input
        className={ `'login__input' ${ getModifierClassName(isPasswordErr, 'login__input_password') }` }
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
