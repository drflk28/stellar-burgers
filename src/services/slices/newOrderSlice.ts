import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';
import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const newBurgerOrder = createAsyncThunk(
  'order/new',
  async (data: string[], { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (!state.userData.isAuthChecked) {
      return rejectWithValue('Требуется авторизация');
    }
    try {
      const response = await orderBurgerApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка сервера');
    }
  }
);

type TNewOrderState = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
  error: string | null;
};

export const initialState: TNewOrderState = {
  order: null,
  name: '',
  orderRequest: false,
  error: null
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.name = '';
      state.orderRequest = false;
      state.error = null;
    }
  },
  selectors: {
    getNewOrderState: createSelector(
      [(state: TNewOrderState) => state],
      (state) => state
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(newBurgerOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(newBurgerOrder.rejected, (state) => {
        state.orderRequest = false;
        state.error = null;
      })
      .addCase(newBurgerOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
        state.error = null;
      });
  }
});

export const newOrderReducer = newOrderSlice.reducer;
export const { clearOrder } = newOrderSlice.actions;
export const { getNewOrderState } = newOrderSlice.selectors;
