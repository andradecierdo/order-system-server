import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

export type MessageType = 'UPDATE' | 'INIT';

export interface IWebSocketServive {
  onInitData?: () => any;
  broadcast<T>(type: MessageType, data: T): void;
}

export class WebSocketService implements IWebSocketServive {
  private clients = new Set<WebSocket>();
  private wss: WebSocketServer;

  constructor(server: http.Server) {
    this.wss = new WebSocketServer({ server });
    this.wss.on('connection', (ws) => this.handleConnection(ws));
  }

  private handleConnection(ws: WebSocket) {
    this.clients.add(ws);

    if (this.onInitData) {
      const initialData = this.onInitData();
      ws.send(JSON.stringify({ type: 'INIT', data: initialData }));
    }

    ws.on('close', () => this.clients.delete(ws));
  }

  public onInitData?: () => any;

  public broadcast<T>(type: MessageType, data: T): void {
    const broadcastData = JSON.stringify({ type, data });
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(broadcastData);
      }
    });
  }
}
