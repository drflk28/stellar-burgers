import { FC, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import {
  newBurgerOrder,
  clearOrder,
  getNewOrderState
} from '../../services/slices/newOrderSlice';
import { clearConstructor, getBurgerConstructorSelector } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userIsAuth = useSelector((state) => state.userData.isAuthChecked);
  const constructorItems = useSelector(getBurgerConstructorSelector);
  const { orderRequest, order } = useSelector(getNewOrderState);

  const price = useMemo(() => {
    return (
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      )
    );
  }, [constructorItems]);

  const onOrderClick = useCallback(async () => {
    const accessToken = getCookie('accessToken');
    if (!accessToken || !userIsAuth) {
      navigate('/login', {
        state: {
          from: location.pathname,
          savedConstructor: constructorItems
        }
      });
      return;
    }

    try {
      if (!constructorItems.bun || constructorItems.ingredients.length === 0) {
        alert('Пожалуйста, соберите бургер полностью!');
        return;
      }

      const ingredients = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(i => i._id),
        constructorItems.bun._id
      ];

      const result = await dispatch(newBurgerOrder(ingredients));

      if (newBurgerOrder.rejected.match(result)) {
        // Безопасная проверка сообщения об ошибке
        const errorMessage = result.payload || result.error?.message || 'Ошибка заказа';
        if (typeof errorMessage === 'string' && errorMessage.includes('авторизация')) {
          navigate('/login', { state: { from: location.pathname } });
        }
      }
    } catch (error) {
      console.error('Order error:', error);
      if (error instanceof Error && error.message.includes('авторизация')) {
        navigate('/login', { state: { from: location.pathname } });
      }
    }
  }, [userIsAuth, constructorItems, dispatch, navigate, location.pathname]);

  const closeOrderModal = () => {
    console.log('Closing order modal');
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/');
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
