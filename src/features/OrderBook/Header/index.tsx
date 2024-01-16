
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../app/store';


interface IHeaderProps {
  pair: string;
  onPrecisionHigher: () => void; 
  onPrecisionLower: () => void; 
  onConnect: () => void;
  onDisonnect: () => void;
}

const Header = (props: IHeaderProps) => {
  const connectionStatus = useSelector((state: RootState) => state.orderBook.connectionStatus);
  return (
    <StyledRoot>
      <div>Order book <b>{props.pair}</b></div>
      <div className="actions">
        <button disabled={connectionStatus !== "disconnected" ? true : false} onClick={props.onConnect}>Connect</button>
        <button disabled={connectionStatus !== "connected"} onClick={props.onDisonnect}>Disconnect</button>
        <button disabled={connectionStatus !== "connected"} onClick={props.onPrecisionLower}>.0</button>
        <button disabled={connectionStatus !== "connected"} onClick={props.onPrecisionHigher}>.00</button>
      </div>
    </StyledRoot>
  );
};

export default Header;

const StyledRoot = styled.div`
  display: flex;
  .actions {
    margin-left: auto;
  }
`
