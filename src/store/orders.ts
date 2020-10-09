import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';

export interface Order {
  id: string;
  status: 'CREATED' | 'COOKED' | 'DRIVER_RECEIVED' | 'DELIVERED';
  customer: string;
  destination: string;
  item: string;
  price: number;
  updatedAt: Date;
}

export interface OrderState {
  [id: string]: Order;
}

const orderSlice = createSlice<OrderState, SliceCaseReducers<OrderState>>({
  name: 'orders',
  initialState: {},
  reducers: {
    upsertOrder(state, action) {
      state[action.payload.id] = {
        ...action.payload,
        updatedAt: Date.now(),
      };
    },
  },
});

export const { upsertOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
