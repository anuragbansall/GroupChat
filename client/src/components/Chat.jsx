import React from "react";

function Chat({ username, inputMessage, setInputMessage, onSendMessage }) {
  const [messages, setMessages] = React.useState([
    {
      role: "chat",
      sender: "Rahul",
      content: "Hello, how are you?",
    },
    {
      role: "chat",
      sender: "Guest",
      content: "Hello, how are you?",
    },
    {
      role: "notification",
      content: "Rahul has joined the chat.",
    },
    {
      role: "chat",
      sender: "Guest",
      content: "Hello, how are you?",
    },
    {
      role: "chat",
      sender: "Alice",
      content: "Hello, how are you?",
    },
  ]);

  return (
    <div className="h-full w-220 max-w-full bg-zinc-200 flex flex-col rounded-md shadow-md">
      <div className="p-4 border-b border-zinc-300 flex items-center justify-between">
        <h2 className="text-2xl">Chat Room</h2>

        <p className="text-zinc-600">
          Username: <strong>{username} </strong>
        </p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
        {messages.map((msg, index) => {
          if (msg.role === "notification") {
            return (
              <div
                key={index}
                className="text-center text-zinc-500 italic text-sm bg-zinc-100 p-2 rounded-md self-center"
              >
                {msg.content}
              </div>
            );
          }
          return (
            <div
              key={index}
              className={`p-2 rounded-md ${
                msg.sender === username
                  ? "bg-sky-500 text-white self-end"
                  : "bg-white self-start"
              }`}
            >
              <strong>{msg.sender}: </strong>
              {msg.content}
            </div>
          );
        })}
      </div>

      <form
        className="p-4 border-t border-zinc-300 flex space-x-2"
        onSubmit={onSendMessage}
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-zinc-300 p-2 rounded"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 px-4     rounded hover:bg-blue-600 cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
