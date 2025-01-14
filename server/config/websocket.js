const WebSocket = require("ws");

module.exports = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on("connection", (ws) => {
    console.log("WebSocket connection established.");

    ws.on("message", (message) => {
      console.log(`Received: ${message}`);
      ws.send(`Echo: ${message}`);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed.");
    });
  });

  console.log("WebSocket server is running on ws://localhost:8080");
};
