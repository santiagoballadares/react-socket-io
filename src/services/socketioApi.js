import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

export const subscribeToTimer = (interval, cb) => {
  socket.on("timer", (timestamp) => cb(null, timestamp));
  socket.emit("subscribeToTimer", interval);
};

export const subscribeToReceiveMessage = (cb) => {
  socket.on("receiveMessage", (message) => cb(message));
};

export const publishToSendMessage = (message) => {
  socket.emit("sendMessage", message);
};
