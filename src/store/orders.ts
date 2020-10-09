import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { forEach, pick } from 'lodash';
import { OrderEvent } from '../services/events';

export type OrderStatus =
  | 'CREATED'
  | 'COOKED'
  | 'DRIVER_RECEIVED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Order {
  id: string;
  status: OrderStatus;
  customer: string;
  destination: string;
  item: string;
  price: number;
  updatedAt: Date;
}

export interface OrderState {
  orders: { [id: string]: Order };
  filter: string;
}

const orderSlice = createSlice<OrderState, SliceCaseReducers<OrderState>>({
  name: 'orders',
  initialState: {
    orders: {},
    filter: '',
  },
  reducers: {
    upsertOrders(state, action) {
      forEach(action.payload, (event: OrderEvent) => {
        state.orders[event.id] = {
          ...pick(event, [
            'id',
            'customer',
            'destination',
            'item',
            'price',
            'updatedAt',
          ]),
          status: event.event_name,
        };
      });
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { upsertOrders, setFilter } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
