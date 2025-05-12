import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserState } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userState = useSelector(getUserState);
  const userName = userState.user?.name; // автоматически будет string | undefined

  return <AppHeaderUI userName={userName} />;
};
