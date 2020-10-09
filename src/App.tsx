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
    <div>
      <Search />
      <div>
        Showing {filteredOrders.length} Order
        {filteredOrders.length === 1 ? '' : 's'}
      </div>
      <Orders orders={filteredOrders} />
    </div>
  );
};

const createFilterFn = (filter: string): ((order: Order) => boolean) => {
  return (order) => {
    return formatPrice(order.price).indexOf(filter) > -1;
  };
};

export default App;
