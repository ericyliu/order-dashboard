import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/orders';

export const Search: FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <input onChange={(event) => dispatch(setFilter(event.target.value))} />
    </div>
  );
};
