// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

console.log("Servidor WebSocket en ws://localhost:8080");

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Nuevo cliente conectado.");

  ws.on("message", (message) => {
    const text = message.toString();
    console.log("Mensaje recibido:", text);

    // Reenviar a todos menos al emisor
    for (const client of clients) {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(text);
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Cliente desconectado.");
  });
});
