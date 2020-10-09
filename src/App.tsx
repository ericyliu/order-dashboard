import styled from '@emotion/styled';
import { chain, round } from 'lodash';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Orders } from './components/Orders';
import { Search } from './components/Search';
import { listen } from './services/events';
import { State } from './store';
import { Order } from './store/orders';
import { formatPrice } from './utils/format';

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    listen(dispatch);
  }, [dispatch]);
  const { filter, orders } = useSelector((state: State) => state);
  const filteredOrders = chain(orders)
    .filter(createFilterFn(filter))
    .sortBy((order) => -order.updatedAt)
    .value();
  return (
    <Container>
      <Header>
        <Search />
        <div>
          Showing <b>{filteredOrders.length}</b> Order
          {filteredOrders.length === 1 ? '' : 's'}
        </div>
      </Header>
      <Orders orders={filteredOrders} />
    </Container>
  );
};

const createFilterFn = (filter: string): ((order: Order) => boolean) => {
  return (order) => {
    return formatPrice(order.price).indexOf(filter) > -1;
  };
};

const Container = styled.div({
  padding: '4rem 4rem',
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '2rem',
});

export default App;
