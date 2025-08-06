// socket.ts
import { io } from "socket.io-client";
export const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
  auth: {
    token: localStorage.getItem("accessToken")
  }
});
