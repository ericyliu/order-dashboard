import styled from '@emotion/styled';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/orders';

export const Search: FC = () => {
  const dispatch = useDispatch();
  return (
    <StyledInput
      placeholder="Search"
      onChange={(event) => dispatch(setFilter(event.target.value))}
    />
  );
};

const StyledInput = styled.input({
  padding: '.7rem 1rem',
  fontSize: '1.5rem',
});
