import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Orders } from './components/orders';
import { listen } from './services/events';

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    listen(dispatch);
  }, [dispatch]);
  return (
    <div>
      <Orders />;
    </div>
  );
};

export default App;
