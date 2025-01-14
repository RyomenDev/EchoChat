import { useEffect, useRef, useState } from "react";
import conf from "./conf/conf";

const App = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const chatContainerRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws:${conf.SERVER_API_URL}`);

    ws.current.onopen = () => setIsConnected(true);
    ws.current.onclose = () => setIsConnected(false);
    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.current.onmessage = (event) => {
      setResponses((prev) => [...prev, event.data]);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
      setMessage("");
    } else if (ws.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [responses]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">EchoChat</h1>
      <div className="flex flex-col w-full max-w-lg space-y-4">
        <div
          className="border border-gray-300 rounded-lg p-4 bg-white h-80 overflow-y-auto shadow"
          ref={chatContainerRef}
        >
          {responses.map((res, idx) => (
            <p key={idx} className="text-gray-700 break-words">
              {res}
            </p>
          ))}
        </div>
        <div className="text-gray-500 text-sm">
          Status:{" "}
          <span className={isConnected ? "text-green-500" : "text-red-500"}>
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 flex-1"
            placeholder="Type your message..."
            aria-label="Message input"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
