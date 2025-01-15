const ChatBox = ({ responses, userId }) => {
  return (
    <div
      className="border-gray-300 rounded-3xl p-4 bg-white h-96 overflow-y-auto shadow-lg space-y-4 flex flex-col"
      aria-live="polite"
    >
      {responses.map((res, idx) => (
        <div
          key={idx}
          className={`flex ${
            res.sender == userId ? "justify-end" : "justify-start"
          } space-x-2`}
        >
          <div
            className={`${
              res.sender == userId
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } p-3 rounded-lg max-w-xs break-words shadow-sm transform transition duration-200 ease-in-out`}
          >
            {res.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
