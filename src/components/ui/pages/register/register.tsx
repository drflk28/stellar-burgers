import { FC, ChangeEvent } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { RegisterUIProps } from './type';

export const RegisterUI: FC<RegisterUIProps> = ({
                                                  errorText,
                                                  email,
                                                  setEmail,
                                                  handleSubmit,
                                                  password,
                                                  setPassword,
                                                  userName,
                                                  setUserName
                                                }) => {
  // Обработчики pointer-событий
  const handlePointerEvent = () => {};

  // Обработчики изменения полей
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <main className={styles.container}>
      <div className={`pt-6 ${styles.wrapCenter}`}>
        <h3 className='pb-6 text text_type_main-medium'>Регистрация</h3>
        <form
          className={`pb-15 ${styles.form}`}
          name='register'
          onSubmit={handleSubmit}
        >
          <div className='pb-6'>
            <Input
              type='text'
              placeholder='Имя'
              onChange={handleNameChange}
              value={userName}
              name='name'
              error={false}
              errorText=''
              size='default'
              onPointerEnterCapture={handlePointerEvent}
              onPointerLeaveCapture={handlePointerEvent}
            />
          </div>
          <div className='pb-6'>
            <Input
              type='email'
              placeholder='E-mail'
              onChange={handleEmailChange}
              value={email}
              name='email'
              error={false}
              errorText=''
              size='default'
              onPointerEnterCapture={handlePointerEvent}
              onPointerLeaveCapture={handlePointerEvent}
            />
          </div>
          <div className='pb-6'>
            <PasswordInput
              onChange={handlePasswordChange}
              value={password}
              name='password'
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button type='primary' size='medium' htmlType='submit'>
              Зарегистрироваться
            </Button>
          </div>
          {errorText && (
            <p className={`${styles.error} text text_type_main-default pb-6`}>
              {errorText}
            </p>
          )}
        </form>
        <div className={`${styles.question} text text_type_main-default pb-6`}>
          Уже зарегистрированы?
          <Link to='/login' className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};
