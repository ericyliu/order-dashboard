import { chain, round } from 'lodash';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Orders } from './components/Orders';
import { Search } from './components/Search';
import { listen } from './services/events';
import { State } from './store';
import { Order } from './store/orders';

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
    if (filter === '') return true;
    const priceFilter = parseFloat(filter);
    if (isNaN(priceFilter)) return true;
    return priceFilter === round(order.price / 100, 2);
  };
};

export default App;
