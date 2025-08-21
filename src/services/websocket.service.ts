import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

export type MessageType = 'UPDATE';

export class WebSocketService {
  private clients = new Set<WebSocket>();
  private wss: WebSocketServer;

  constructor(server: http.Server) {
    this.wss = new WebSocketServer({ server });
    this.wss.on('connection', (ws) => this.handleConnection(ws));
  }

  private handleConnection(ws: WebSocket) {
    this.clients.add(ws);

    ws.on('close', () => this.clients.delete(ws));
  }

  public broadcast<T>(type: MessageType, data: T): void {
    const broadcastData = JSON.stringify({ type, data });
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(broadcastData);
      }
    });
  }
}
