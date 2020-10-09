import { map, startCase } from 'lodash';
import React, { CSSProperties, FC } from 'react';
import moment from 'moment';
import { Order } from './Order';
import { Order as IOrder, OrderStatus } from '../../store/orders';
import { formatPrice } from '../../utils/format';
import styled, { CSSObject } from '@emotion/styled';

const statusColors: { [id in OrderStatus]: string } = {
  CREATED: 'green',
  COOKED: 'orange',
  DRIVER_RECEIVED: 'orangered',
  DELIVERED: 'red',
  CANCELLED: 'darkred',
};

export const columns: {
  key: keyof IOrder;
  width: string;
  formatter?: (value: any) => string;
  style?: (value: any) => CSSProperties;
}[] = [
  {
    key: 'item',
    width: '15%',
  },
  {
    key: 'customer',
    width: '15%',
  },
  {
    key: 'status',
    width: '15%',
    formatter: (status: OrderStatus) => startCase(status),
    style: (value: OrderStatus) => ({
      color: statusColors[value],
      letterSpacing: 1,
      fontSize: '.8rem',
    }),
  },
  {
    key: 'destination',
    width: '30%',
  },
  {
    key: 'price',
    width: '10%',
    formatter: formatPrice,
  },
  {
    key: 'id',
    width: '5%',
  },
  {
    key: 'updatedAt',
    width: '10%',
    formatter: (date: Date) => moment(date).format('h:mm:ss M/D'),
  },
];

interface Props {
  orders: IOrder[];
}

export const Orders: FC<Props> = ({ orders }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {map(columns, (column) => (
            <StyledHeader key={column.key} width={column.width}>
              {startCase(column.key)}
            </StyledHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {map(orders, (order) => (
          <Order key={order.id} order={order} />
        ))}
      </tbody>
    </StyledTable>
  );
};

const cellCss: CSSObject = {
  textAlign: 'left',
  padding: '1rem .5rem',

  '&:last-child': {
    textAlign: 'right',
  },
};

const StyledTable = styled.table({
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',

  td: cellCss,

  tbody: {
    tr: {
      '&:nth-child(odd)': {
        backgroundColor: '#eee',
      },
    },
  },
});

const StyledHeader = styled.th<{ width: string }>(({ width }) => ({
  ...cellCss,
  width,
}));
