import store, { deleteOrderBook, setChannelId, setConnectionStatus, updateOrderBook } from '../app/store'; // Assuming your store is exported from a file

class WebSocketService {
  socket: WebSocket;
  constructor() {
    this.socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    this.init();
  }

  init() {
    store.dispatch(setConnectionStatus("connecting"));
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.chanId) {
        store.dispatch(setChannelId(data.chanId));
      }
      if (data.length) {
        store.dispatch(updateOrderBook(data));
      }
    });
    this.socket.addEventListener('open', async (event) => {
      try {
        await this.waitForOpenConnection()
        store.dispatch(setConnectionStatus("connected"));
        console.log("ws-open")
      } catch (err) { console.error(err) }
    });
    this.socket.addEventListener('close', (event) => {
      console.log("ws-closed")
    });
  }

  waitForOpenConnection() {
    return new Promise((resolve, reject) => {
      const maxNumberOfAttempts = 100;
      const intervalTime = 200;
  
      let currentAttempt = 0
      const interval = setInterval(() => {
        if (currentAttempt > maxNumberOfAttempts - 1) {
          clearInterval(interval)
          reject(new Error('Maximum number of attempts exceeded'))
        } else if (this.socket.readyState === this.socket.OPEN) {
          clearInterval(interval)
          resolve(null);
        }
        currentAttempt++
      }, intervalTime)
    })
  }

  send(message: any) {
    this.socket.send(JSON.stringify(message));
  }

  closeConnection(dispatchDisconnect: boolean) {
    if (this.socket.readyState === WebSocket.OPEN) {
      store.dispatch(setConnectionStatus(dispatchDisconnect ? "disconnected" : "connecting"));
      store.dispatch(deleteOrderBook());
      this.socket.close();
    }
  }

}

export default WebSocketService;
