import io from 'socket.io-client';

interface OrderEvent {
  customer: string;
  destination: string;
  event_name: 'CREATED' | 'COOKED' | 'DRIVER_RECEIVED' | 'DELIVERED';
  id: string;
  item: string;
  price: number;
}

export const listen = () => {
  const socket = io('http://localhost:4000');
  socket.on('order_event', (data: OrderEvent) => {
    console.log('Received order event', data);
  });
}