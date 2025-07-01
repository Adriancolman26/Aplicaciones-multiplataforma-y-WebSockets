// client.js
import WebSocket from "ws";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("✅ Conectado al chat. Escribí y presioná Enter para enviar.");

  rl.on("line", (line) => {
    ws.send(line);
  });
});

ws.on("message", (message) => {
  console.log(`📩 Mensaje recibido: ${message.toString()}`);
});

ws.on("close", () => {
  console.log("❌ Conexión cerrada.");
  rl.close();
});
