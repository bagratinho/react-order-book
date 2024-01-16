import { BrowserRouter } from "react-router-dom";
import Router from "../pages/router";
import React from "react";
import OrderBook from "../features/OrderBook";

const App = () => {
  return (
    <OrderBook pair="BTCUSD"/>
  );
};

export default App;