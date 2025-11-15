import React from "react";

function Chat({
  username,
  inputMessage,
  setInputMessage,
  onSendMessage,
  messages,
  onTyping,
  usersTyping,
  inputRef,
}) {
  return (
    <div className="h-full w-220 max-w-full bg-zinc-100 flex flex-col rounded-md shadow-md">
      <div className="p-4 border-b border-zinc-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">Chat Room</h2>

          <p className="text-zinc-600">
            Username: <strong>{username} </strong>
          </p>
        </div>
        {usersTyping.length > 0 && (
          <p className="text-zinc-600 italic text-sm">
            {usersTyping.join(", ")} {usersTyping.length === 1 ? "is" : "are"}{" "}
            typing...
          </p>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
        {messages.map((msg, index) => {
          if (msg.role === "notification") {
            return (
              <div
                key={index}
                className="text-center text-zinc-500 italic text-sm bg-zinc-200 p-2 rounded-md self-center"
              >
                {msg.content}
              </div>
            );
          }
          return (
            <div
              key={index}
              className={`p-2 rounded-md max-w-xs whitespace-normal wrap-break-word break-all ${
                msg.sender === username
                  ? "bg-sky-500 text-white self-end"
                  : "bg-white self-start"
              }`}
            >
              <strong>{msg.sender === username ? "You" : msg.sender}: </strong>
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
          onChange={onTyping}
          ref={inputRef}
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
