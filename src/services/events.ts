import { Dispatch } from 'redux';
import io from 'socket.io-client';
import { OrderStatus, upsertOrders } from '../store/orders';

export interface OrderEvent {
  id: string;
  event_name: OrderStatus;
  customer: string;
  destination: string;
  item: string;
  price: number;
  updatedAt: Date;
}

export const listen = (dispatch: Dispatch) => {
  const socket = io('http://localhost:4000');
  socket.on('order_event', (data: OrderEvent[]) => {
    dispatch(upsertOrders(data));
  });
};
