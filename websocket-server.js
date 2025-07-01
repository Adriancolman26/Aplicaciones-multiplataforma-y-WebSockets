// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const clients = new Map(); // Mapeamos ws -> username

console.log("Servidor WebSocket en ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado.");
  ws.send("Bienvenido al chat. Por favor, ingresa tu nombre de usuario:");

  let isRegistered = false;

  ws.on("message", (message) => {
    const text = message.toString().trim();

    if (!isRegistered) {
      // Primer mensaje: lo tomamos como nombre de usuario
      clients.set(ws, text);
      isRegistered = true;
      ws.send(`Conectado al chat como "${text}".`);
      return;
    }

    const username = clients.get(ws) || "Anónimo";
    const fullMessage = `${username}: ${text}`;

    console.log("Mensaje recibido:", fullMessage);

    // Reenviar a todos los demás clientes
    for (const [client, _] of clients) {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(fullMessage);
      }
    }
  });

  ws.on("close", () => {
    const username = clients.get(ws) || "Un usuario";
    console.log(`Cliente desconectado: ${username}`);
    clients.delete(ws);
  });
});
