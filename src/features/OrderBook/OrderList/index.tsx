
import React from 'react';
import styled from 'styled-components';

interface IOrderListProps {
  list: number[][] | null;
  revert?: boolean;
}

const OrderList = (props: IOrderListProps) => {
  const headers = [ "price", "amount", "count" ];
  const list = props.list ? props.revert ? props.list.slice().reverse() : props.list : null;
  return (
    <StyledRoot>
      <StyledRow>
        {headers.map((item: string) => <StyledHeaderCell key={item}>{item}</StyledHeaderCell>)}
      </StyledRow>   
      {list ? list.map((item: any) => {
        if (!item) return null;
        const [ price, count, amount ] = item;
        return (
          <StyledRow key={price}>
            <StyledDataCell>{price}</StyledDataCell>
            <StyledDataCell>{Math.abs(amount)}</StyledDataCell>
            <StyledDataCell>{count}</StyledDataCell>
          </StyledRow>
        );
      }) : null}
    </StyledRoot>
  );
};

export default OrderList;

const StyledRoot = styled.div`
  width: 100%;
  & > div:nth-child(even) {
    background: rgba(0,0,0,0.2)
  }
`

const StyledHeaderCell = styled.div`
  width: 33.33%;
  padding: 5px;
`

const StyledDataCell = styled.div`
  width: 33.33%;
  line-height: 20px;
  padding: 5px;
`

const StyledRow = styled.div`
  display: flex;
  height: 30px;
  font-size: 12px;
`
