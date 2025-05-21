import { FC, FormEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/slices/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { restoreConstructor } from '../../services/slices/burgerConstructorSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector((state) => state.userData.error);
  const user = useSelector((state) => state.userData.user);

  // Получаем путь для возврата или используем '/' по умолчанию
  const from = location.state?.from || '/';
  const savedConstructor = location.state?.savedConstructor;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      login({
        email: email,
        password: password
      })
    );

    if (login.fulfilled.match(result)) {
      if (savedConstructor) {
        dispatch(restoreConstructor(savedConstructor));
      }
      navigate(from, { replace: true });
    }
  };

  return (
    <LoginUI
      errorText={error!}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
