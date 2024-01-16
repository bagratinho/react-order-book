
import React from 'react';
import styled from 'styled-components';


interface IHeaderProps {
  pair: string;
  onPrecisionHigher: () => void; 
  onPrecisionLower: () => void; 
  onConnect: () => void;
  onDisonnect: () => void;
}

const Header = (props: IHeaderProps) => {
  return (
    <StyledRoot>
      <div>Order book <b>{props.pair}</b></div>
      <div className="actions">
        <button onClick={props.onConnect}>Connect</button>
        <button onClick={props.onDisonnect}>Disconnect</button>
        <button onClick={props.onPrecisionHigher}>.0</button>
        <button onClick={props.onPrecisionLower}>.00</button>
      </div>
    </StyledRoot>
  );
};

export default Header;

const StyledRoot = styled.div`
  display: flex;
  & > i {
    
  }
  span {
    
  }
  .actions {
    margin-left: auto;
    > i {

    }
  }
`
