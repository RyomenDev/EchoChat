import "./styles.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import conf from "../conf/conf";
import ChatBox from "../Components/ChatBox";
import SendMessage from "../Components/SendMessage";
import { useSelector } from "react-redux";

const ChatConnect = () => {
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData.id;
  //   console.log("userData", userId);

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
          //   console.log(`Sending message: ${message}, ${userId}`);
          ws.current.send(message);
          axios
            .post("http://localhost:1337/api/chat-messages", {
              data: {
                message: message,
                uid: userId,
              },
            })
            .then((response) => {
            //   console.log(
            //     "Message sent to the server successfully",
            //     response.data
            //   );
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
    <>
      <section className="">
        <div className=""></div>
        {Array.from({ length: 200 }).map((_, index) => (
          <span key={index} className=""></span>
        ))}

        <div
          className="signin"
          style={{
            width: "36rem",
            border: "2px solid green",
            borderRadius: "4rem",
            opacity: "95",
            padding: "3rem",
            // margin: "8px 4px",
          }}
        >
          <div className="border-2 border-[#0f0] w-full rounded-[3rem] flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-green-100 p-4">
            <h1
              className="text-4xl font-semibold mb-6"
              style={{ color: "#0f0" }}
            >
              EchoChat
            </h1>
            <div className="flex flex-col w-full max-w-lg space-y-4 bg-white rounded-xl  p-4">
              <ChatBox responses={responses} />

              <div className=" text-gray-500 text-sm mb-2">
                Status:{" "}
                <div
                  className={isConnected ? "text-green-500" : "text-red-500"}
                >
                  {isConnected ? "Connected" : "Disconnected"}
                </div>
              </div>

              <SendMessage
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatConnect;
