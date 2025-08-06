import { io, Socket } from "socket.io-client";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import React from "react";

const socket: Socket = io("http://localhost:4000", {
   auth: {
      token: localStorage.getItem("accessToken"),  // Hoặc từ cookie/session
   },
});

interface ChatBoxProps {
   onClose: () => void;
}

interface ChatMessage {
   from: "user" | "admin";
   message: string;
   timestamp: string;
}

export default function ChatBox({ onClose }: ChatBoxProps) {
   const [message, setMessage] = useState<string>("");
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [roomId, setRoomId] = useState<string>("");

   // Khi mở ChatBox => user yêu cầu bắt đầu cuộc trò chuyện
   useEffect(() => {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);
      const generatedRoomId = `room_${user._id}`;
      setRoomId(generatedRoomId);

      // Gửi sự kiện bắt đầu trò chuyện
      socket.emit("user:startChat");

      // Lắng nghe tin nhắn chung
      const handleMessage = (data: ChatMessage) => {
         setMessages((prev) => [...prev, data]);
      };

      socket.on("chat:message", handleMessage);

      return () => {
         socket.off("chat:message", handleMessage);
      };
   }, []);

   const sendMessage = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!message.trim() || !roomId) return;

      socket.emit("user:sendMessage", {
         roomId,
         message,
      });

      setMessages((prev) => [
         ...prev,
         { from: "user", message, timestamp: new Date().toISOString() },
      ]);

      setMessage("");
   };

   return (
      <div
         style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 999,
            padding: "10px",
         }}
      >
         <div
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <strong>💬 Hỗ trợ</strong>
            <button onClick={onClose}>✖</button>
         </div>

         <ul style={{ maxHeight: "200px", overflowY: "auto", padding: "10px 0" }}>
            {messages.map((msg, index) => (
               <li key={index}>
                  <strong>{msg.from === "admin" ? "🎧 Admin" : "🙋‍♂️ Bạn"}:</strong> {msg.message}
               </li>
            ))}
         </ul>

         <form
            onSubmit={sendMessage}
            style={{ display: "flex", marginTop: "10px" }}
         >
            <input
               type="text"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Nhập tin nhắn..."
               style={{
                  flex: 1,
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginRight: "5px",
               }}
            />
            <button
               type="submit"
               style={{
                  padding: "8px 12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
               }}
            >
               Gửi
            </button>
         </form>
      </div>
   );
}
