const { Kafka } = require("kafkajs");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Kafka configuration
const kafka = new Kafka({
  clientId: "pacemaker-app",
  brokers: ["localhost:9092"], // Replace with your Kafka broker's address
});

const producer = kafka.producer();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true, // Replace with your frontend's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"], // Allow custom headers
  },
});

const corsOptions = {
  origin: "http://localhost:5174", // Replace with your frontend's URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true, // if you need to send cookies across domains
};

app.use(cors(corsOptions));

console.log("🚀 ~ io:", io);

// WebSocket connection
// io.on("connection", (socket) => {
//   console.log("A client connected:", socket.id);

//   // Simulate sending commands every few seconds
//   setInterval(() => {
//     const command = Math.random() > 0.5 ? "up" : "down";
//     console.log(`Sending command: ${command}`);
//     socket.emit("move", command);
//   }, 1000); // Sends a command every 3 seconds

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("A client disconnected:", socket.id);
//   });
// });

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("move", (direction) => {
    console.log(`Rover moving ${direction}`);
    let message = io.emit("move", direction);
    console.log("🚀 ~ socket.on ~ message:", message)
    // Process rover movement logic if needed
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
