import { FC, ChangeEvent } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { ResetPasswordUIProps } from './type';

export const ResetPasswordUI: FC<ResetPasswordUIProps> = ({
                                                            errorText,
                                                            password,
                                                            setPassword,
                                                            handleSubmit,
                                                            token,
                                                            setToken
                                                          }) => {
  // Обработчик для pointer-событий
  const handlePointerEvent = () => {};

  // Обработчики изменения полей
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  return (
    <main className={styles.container}>
      <div className={`pt-6 ${styles.wrapCenter}`}>
        <h3 className='pb-6 text text_type_main-medium'>Восстановление пароля</h3>
        <form
          className={`pb-15 ${styles.form}`}
          name='login'
          onSubmit={handleSubmit}
        >
          <div className='pb-6'>
            <PasswordInput
              onChange={handlePasswordChange}
              value={password}
              name='password'
            />
          </div>
          <div className='pb-6'>
            <Input
              type='text'
              placeholder='Введите код из письма'
              onChange={handleTokenChange}
              value={token}
              name='token'
              error={false}
              errorText=''
              size='default'
              onPointerEnterCapture={handlePointerEvent}
              onPointerLeaveCapture={handlePointerEvent}
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button type='primary' size='medium' htmlType='submit'>
              Сохранить
            </Button>
          </div>
          {errorText && (
            <p className={`${styles.error} text text_type_main-default pb-6`}>
              {errorText}
            </p>
          )}
        </form>
        <div className={`${styles.question} text text_type_main-default pb-6`}>
          Вспомнили пароль?
          <Link to='/login' className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};
