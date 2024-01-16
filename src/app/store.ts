import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState: {
    connectionStatus: 'disconnected',
    channelId: null,
    asks: {},
    bids: {},
  },
  reducers: {
    updateOrderBook: (state, action) => {      
      const data = action.payload[1];
      if (data.length > 3) {
        const orderBook = data.reduce((acc, item) => {
          if (item[2] > 0) {
            return {
              ...acc,
              bids: {
                ...acc.bids,
                [item[0]]: item,
              }
            }
          } else {
            return {
              ...acc,
              asks: {
                ...acc.asks,
                [item[0]]: item,
              }
            }
          }
        }, { asks: {}, bids: {}});
        state.bids = orderBook.bids;
        state.asks = orderBook.asks;
      } else {
        const [ price, count, amount ] = data;
        if (count > 0) {
          state[amount > 0 ? "bids" : "asks" ][`${price}`] = data;
        } else if (count === 0) {
          state[amount === 1 ? "bids" : "asks" ][`${price}`] = undefined;
        }
      }
    },
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
    setChannelId: (state, action) => {
      state.channelId = action.payload;
    },
    deleteOrderBook: (state) => {
      state.asks = {};
      state.bids = {};
      state.channelId = null;
    }
  },
})

export const { setConnectionStatus, updateOrderBook, setChannelId, deleteOrderBook } = orderBookSlice.actions

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    [orderBookSlice.name]: orderBookSlice.reducer,
  },
})

export default store;