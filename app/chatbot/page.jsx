"use client";
import { useState } from "react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://demoproj-3491.vercel.app/api/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();
      setChat([...newChat, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChat([
        ...newChat,
        { sender: "bot", text: "Error connecting to chatbot." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>Simple Chatbot</h1>
      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={msg.sender === "user" ? styles.userMsg : styles.botMsg}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.botMsg}>Typing...</div>}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

// Basic CSS styles for the chat UI
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
  },
  chatBox: {
    height: "300px",
    overflowY: "auto",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "10px",
    background: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  userMsg: {
    alignSelf: "flex-end",
    background: "#007bff",
    color: "#fff",
    padding: "8px",
    borderRadius: "10px",
    maxWidth: "75%",
  },
  botMsg: {
    alignSelf: "flex-start",
    background: "#28a745",
    color: "#fff",
    padding: "8px",
    borderRadius: "10px",
    maxWidth: "75%",
  },
  inputContainer: {
    display: "flex",
    gap: "5px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    padding: "8px 12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
