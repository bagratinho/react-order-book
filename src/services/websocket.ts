import store, { deleteOrderBook, setChannelId, setConnectionStatus, updateOrderBook } from '../app/store'; // Assuming your store is exported from a file

class WebSocketService {
  socket: WebSocket;
  constructor() {
    this.socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    this.init();
  }

  init() {
    store.dispatch(setConnectionStatus("disconnected"));
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      // Dispatch Redux action to update the state
      // console.log(data);
      if (data.chanId) {
        store.dispatch(setChannelId(data.chanId));
      }
      if (data.length) {
        store.dispatch(updateOrderBook(data));
      }
    });
    this.socket.addEventListener('open', (event) => {
      store.dispatch(setConnectionStatus("connected"));
      console.log("ws-open")
    });
    this.socket.addEventListener('close', (event) => {
      store.dispatch(setConnectionStatus("disconnected"));
      console.log("ws-closed")
    });
  }

  send(message: any) {
    this.socket.send(JSON.stringify(message));
  }

  closeConnection() {
    if (this.socket.readyState === WebSocket.OPEN) {
      store.dispatch(setConnectionStatus("disconnected"));
      store.dispatch(deleteOrderBook());
      this.socket.close();
    }
  }

}

export default WebSocketService;
