import { Dispatch } from 'redux';
import io from 'socket.io-client';
import { upsertOrder } from '../store/orders';

interface OrderEvent {
  id: string;
  event_name: 'CREATED' | 'COOKED' | 'DRIVER_RECEIVED' | 'DELIVERED';
  customer: string;
  destination: string;
  item: string;
  price: number;
}

export const listen = (dispatch: Dispatch) => {
  const socket = io('http://localhost:4000');
  socket.on('order_event', (data: OrderEvent) => {
    dispatch(upsertOrder(data));
  });
};
