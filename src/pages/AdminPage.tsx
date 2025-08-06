import React from "react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:4000", {
   auth: {
      token: localStorage.getItem("accessToken"), // token của admin
   },
});

interface ChatMessage {
   from: "user" | "admin";
   message: string;
   timestamp: string;
}

export default function AdminChat() {
   const [message, setMessage] = useState<string>("");

   // Admin nhận thông báo khi có user tạo room mới

   return (
      <div style={{ display: "flex", padding: "20px" }}>
         <div style={{ width: "200px", borderRight: "1px solid #ccc" }}>
            <h4>Phòng chat</h4>
         </div>

         <div style={{ flex: 1, paddingLeft: "20px" }}>
            <div
               style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  height: "300px",
                  overflowY: "auto",
                  marginBottom: "10px",
               }}
            ></div>
         </div>
      </div>
   );
}
