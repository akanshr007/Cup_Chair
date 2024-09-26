import { SOCKET_URL } from "../constant";
import { io } from "socket.io-client";
const socket = io.connect(SOCKET_URL, {
  path: "",
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 99999,
  transports: ["websocket"],
});

// const socket = io(SOCKET_URL);

// console.log("Scoket ", socket);

export default socket;
