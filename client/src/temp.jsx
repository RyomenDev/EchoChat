import { useEffect, useRef, useState } from "react";
import axios from "axios";
import conf from "./conf/conf";
import ChatBox from "./Components/ChatBox";
import SendMessage from "./Components/SendMessage";

const App = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const chatContainerRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://${conf.SERVER_API_URL}`);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.current.onmessage = (event) => {
      console.log("Message received:", event.data);
      setResponses((prev) => [...prev, event.data]);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        try {
          console.log(`Sending message: ${message}`);
          ws.current.send(message);
          axios
            .post("http://localhost:1337/api/chat-messages", {
              data: {
                message: message,
              },
            })
            .then((response) => {
              console.log(
                "Message sent to the server successfully",
                response.data
              );
            })
            .catch((error) => {
              console.error("Error sending message to the server:", error);
            });
          setMessage("");
        } catch (error) {
          console.error("Error sending message:", error);
        }
      } else {
        console.error("WebSocket is not open.");
      }
    } else {
      console.warn("Message is empty, nothing to send.");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [responses]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">EchoChat</h1>
      <div className="flex flex-col w-full max-w-lg space-y-4 bg-white rounded-xl shadow-lg p-4">
        <ChatBox responses={responses} />

        <div className="text-gray-500 text-sm mb-2">
          Status:{" "}
          <span className={isConnected ? "text-green-500" : "text-red-500"}>
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <SendMessage
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default App;
