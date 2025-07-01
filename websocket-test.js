import { WebSocketServer } from "ws";
import WebSocket from "ws";

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function runTest() {
  console.log("Iniciando prueba...");

  const server = new WebSocketServer({ port: 8080 });

  server.on("connection", (socket) => {
    socket.on("message", (message) => {
      socket.send(`Echo: ${message}`);
    });
  });

  const client = new WebSocket("ws://localhost:8080");

  client.on("open", () => {
    console.log("Cliente conectado, enviando mensaje...");
    client.send("Test Message");
  });

  client.on("message", (message) => {
    const text = message.toString(); // Convertir el Buffer a string

    if (text === "Echo: Test Message") {
      console.log("✅ Prueba pasada: Mensaje de eco recibido correctamente.");
    } else {
      console.error("❌ Prueba fallida: Mensaje incorrecto:", text);
    }

    client.close();
  });

  // Cierre forzado por timeout si algo falla
  await delay(5000);
}

// Ejecutar prueba
runTest();
