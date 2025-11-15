import React from "react";

function JoinRoom({
  username,
  setUsername,
  onJoinRoom,
  joinRoomLoading,
  joinRoomError,
}) {
  return (
    <div className="bg-zinc-200/80 p-12 rounded-md shadow-md">
      <h2 className="text-2xl mb-4 text-center">Join a Room</h2>

      <input
        type="text"
        placeholder="Enter Your Name"
        className="border border-zinc-300 p-2 w-full mb-4 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 cursor-pointer"
        onClick={onJoinRoom}
        disabled={joinRoomLoading}
      >
        Join Room
      </button>
      {joinRoomError && <p className="text-red-500 mt-2">{joinRoomError}</p>}
    </div>
  );
}

export default JoinRoom;
