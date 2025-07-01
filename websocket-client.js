// client.js
import WebSocket from "ws";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ws = new WebSocket("ws://localhost:8080");

let isRegistered = false;

ws.on("open", () => {
  console.log("✅ Conectado al servidor...");
});

ws.on("message", (message) => {
  const msg = message.toString();

  if (!isRegistered && msg.includes("Bienvenido al chat")) {
    // El servidor está pidiendo el nombre de usuario
    console.log("📝", msg);
    rl.question("👤 Ingresá tu nombre de usuario: ", (username) => {
      ws.send(username);
      isRegistered = true;
      console.log(
        `🙌 Conectado al chat como "${username}". Escribí y presioná Enter para enviar.`
      );

      // Ahora permitimos el envío normal de mensajes
      rl.on("line", (line) => {
        ws.send(line);
      });
    });
  } else {
    console.log(`📩 ${msg}`);
  }
});

ws.on("close", () => {
  console.log("❌ Conexión cerrada.");
  rl.close();
});
