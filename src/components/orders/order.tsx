import { map } from 'lodash';
import React, { FC } from 'react';
import { columns } from '.';
import { Order as IOrder } from '../../store/orders';

interface Props {
  order: IOrder;
}

export const Order: FC<Props> = ({ order, ...rest }) => {
  return (
    <tr {...rest}>
      {map(columns, (column) => (
        <td
          key={column.key}
          style={column.style && column.style(order[column.key])}
        >
          {column.formatter
            ? column.formatter(order[column.key])
            : order[column.key]}
        </td>
      ))}
    </tr>
  );
};
