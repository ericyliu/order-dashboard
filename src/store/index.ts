import { createStore } from 'redux';
import { orderReducer, OrderState } from './orders';

export type State = OrderState;

export const store = createStore(orderReducer);
