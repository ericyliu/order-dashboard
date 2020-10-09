import { map } from 'lodash';
import React, { FC } from 'react';
import { columns } from '.';
import { Order as IOrder } from '../../store/orders';

interface Props {
  order: IOrder;
}

export const Order: FC<Props> = ({ order }) => {
  return (
    <tr>
      {map(columns, (column) => (
        <td>
          {column.formatter
            ? column.formatter(order[column.key])
            : order[column.key]}
        </td>
      ))}
    </tr>
  );
};
