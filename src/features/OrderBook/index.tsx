
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from './Header';
import OrderList from './OrderList';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import WebSocketService from '../../services/websocket';


interface IOrderBookProps {
  pair: string;

}

const OrderBook = (props: IOrderBookProps) => {
  const precisionPointsMap = [
    "P4",
    "P3",
    "P2",
    "P1",
    "P0",
  ];

  const [precisionPoints, setPrecisionPoints] = React.useState<number>(5);
  let webSocketService = useRef<any>(null);

  const connectionStatus = useSelector((state: RootState) => state.orderBook.connectionStatus);
  const channelId = useSelector((state: RootState) => state.orderBook.channelId);
  const asks = useSelector((state: RootState) => state.orderBook.asks);
  const bids = useSelector((state: RootState) => state.orderBook.bids);

  useEffect(() => {
    console.log("web socket init");
    if (!webSocketService.current) {
      webSocketService.current = new WebSocketService();
    }
  }, [])

  useEffect(() => {
    if (connectionStatus === "connected" && !channelId) {
      console.log("subscribe");
      webSocketService.current.send({
        event:"subscribe", 
        channel:"book", 
        symbol: `tBTCUSD`, 
        prec: precisionPointsMap[precisionPoints], 
        len:"25" ,
        frec: "F1",
      })
    }
  })
  const handlePrecisionHigher = () => {
    handleDisconnect();
    setPrecisionPoints(state => state < 4 ? state + 1 : state) 
    handleConnect();
  }
  const handlePrecisionLower = () => {
    handleDisconnect();
    setPrecisionPoints((state => state > 0 ? state - 1 : state) ) 
    handleConnect();
  }

  const handleConnect = () => {
    webSocketService.current = new WebSocketService();
  }

  const handleDisconnect = () => {
    webSocketService.current.closeConnection();
  }

  return (
    <StyledRoot>
      <Header 
        pair={props.pair} 
        onPrecisionHigher={handlePrecisionHigher}
        onPrecisionLower={handlePrecisionLower}
        onConnect={handleConnect}
        onDisonnect={handleDisconnect}
      />
      <div className="list-wrapper">
        <div className="bid-list">
          <OrderList 
            list={Object.values(bids)}
            revert
          />
        </div>
        <div className="ask-list">
          <OrderList 
            list={Object.values(asks)}
          />
        </div>
      </div>
    </StyledRoot>
  );
};

export default OrderBook;

const StyledRoot = styled.div`
  font-family: arial;
  width: calc(100% - 40px);
  background: #02ca9b;
  color: #fff;
  padding: 20px;
  & .list-wrapper {
    display: flex;
    & > div {
      flex: 1;
    }
  }

`
