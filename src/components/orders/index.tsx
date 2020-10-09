import { chain, map, startCase } from 'lodash';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { State } from '../../store';
import { Order } from './order';
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
    key: 'item',
  },
  {
    key: 'price',
  },
  {
    key: 'id',
  },
  {
    key: 'updatedAt',
    formatter: (date: Date) => moment(date).format('HH:MM M/D/Y'),
  },
];

export const Orders: FC = () => {
  const orders = useSelector((state: State) => state);
  return (
    <table>
      <tr>
        {map(columns, (column) => (
          <th>{startCase(column.key)}</th>
        ))}
      </tr>
      {chain(orders)
        .sortBy((order) => order.updatedAt)
        .map((order) => <Order order={order} />)
        .value()}
    </table>
  );
};
