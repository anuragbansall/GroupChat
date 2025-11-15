import React, { useState } from "react";
import JoinRoom from "./components/JoinRoom";
import Chat from "./components/Chat";

function App() {
  const [username, setUsername] = useState("");
  const [joinRoomLoading, setJoinRoomLoading] = useState(false);
  const [joinRoomError, setJoinRoomError] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const [inputMessage, setInputMessage] = useState("");

  const handleJoinRoom = () => {
    setJoinRoomError("");

    if (!username) {
      setJoinRoomError("Username is required");
      return;
    }
    // Logic to join the room can be added here
    console.log(`User ${username} is trying to join the room.`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Logic to send the message can be added here
    console.log(`User ${username} sent message: ${inputMessage}`);
    setInputMessage("");
  };

  return (
    <div className="bg-zinc-300 h-screen flex items-center justify-center">
      {!isJoined && (
        <JoinRoom
          username={username}
          setUsername={setUsername}
          onJoinRoom={handleJoinRoom}
          joinRoomLoading={joinRoomLoading}
          joinRoomError={joinRoomError}
        />
      )}

      {isJoined && (
        <Chat
          username={username}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default App;
