import { useState } from "react";

const SendMessage = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="flex space-x-2 mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-300 rounded-full p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
        aria-label="Message input"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out"
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessage;
