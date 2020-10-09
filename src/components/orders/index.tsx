import { map, startCase } from 'lodash';
import React, { FC } from 'react';
import moment from 'moment';
import { Order } from './Order';
import { Order as IOrder } from '../../store/orders';

export const columns: {
  key: keyof IOrder;
  formatter?: (value: any) => string;
}[] = [
  {
    key: 'item',
  },
  {
    key: 'customer',
  },
  {
    key: 'status',
  },
  {
    key: 'destination',
  },
  {
    key: 'price',
    formatter: (price: number) => `$${(price / 100).toFixed(2)}`,
  },
  {
    key: 'id',
  },
  {
    key: 'updatedAt',
    formatter: (date: Date) => moment(date).format('h:mm:ss M/D'),
  },
];

interface Props {
  orders: IOrder[];
}

export const Orders: FC<Props> = ({ orders }) => {
  return (
    <table>
      <thead>
        <tr>
          {map(columns, (column) => (
            <th key={column.key}>{startCase(column.key)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {map(orders, (order) => (
          <Order key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};
