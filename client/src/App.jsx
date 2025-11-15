import React, { useState } from "react";
import JoinRoom from "./components/JoinRoom";
import Chat from "./components/Chat";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useRef } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [joinRoomLoading, setJoinRoomLoading] = useState(false);
  const [joinRoomError, setJoinRoomError] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const socket = useRef(null);
  const [messages, setMessages] = React.useState([]);
  const typingTimeoutRef = useRef(null);
  const [usersTyping, setUsersTyping] = useState([]);
  const inputRef = useRef(null);

  // Focus input on join
  useEffect(() => {
    inputRef.current?.focus();
  }, [isJoined]);

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("connect", () => {
      console.log("Connected to server with ID:", socket.current.id);

      socket.current.on("user_joined", (username) => {
        console.log(`User joined: ${username}`);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "notification",
            content: `${username} has joined the chat.`,
          },
        ]);
      });

      socket.current.on("receive_message", (messageData) => {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });

      socket.current.on("user_typing", (username) => {
        setUsersTyping((prev) => {
          if (!prev.includes(username)) {
            return [...prev, username];
          }
          return prev;
        });
      });

      socket.current.on("user_stop_typing", (username) => {
        setUsersTyping((prev) => prev.filter((user) => user !== username));
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    setJoinRoomError("");
    setJoinRoomLoading(true);

    if (!username) {
      setJoinRoomError("Username is required");
      setJoinRoomLoading(false);
      return;
    }

    try {
      socket.current.emit("join_room", username);
      setIsJoined(true);
    } catch (error) {
      setJoinRoomError("Failed to join the room");
    } finally {
      setJoinRoomLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage) return;

    socket.current.emit("send_message", {
      role: "chat",
      sender: username,
      content: inputMessage,
    });
    setInputMessage("");
  };

  const handleTyping = (e) => {
    socket.current.emit("typing", { username });
    setInputMessage(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.current.emit("stop_typing", { username });
    }, 1000);
  };

  return (
    <div className="bg-zinc-200 h-screen flex items-center justify-center">
      {!isJoined && (
        <JoinRoom
          username={username}
          setUsername={setUsername}
          onJoinRoom={handleJoinRoom}
          joinRoomLoading={joinRoomLoading}
          joinRoomError={joinRoomError}
          inputRef={inputRef}
        />
      )}

      {isJoined && (
        <Chat
          username={username}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={handleSendMessage}
          messages={messages}
          onTyping={handleTyping}
          usersTyping={usersTyping}
          inputRef={inputRef}
        />
      )}
    </div>
  );
}

export default App;
