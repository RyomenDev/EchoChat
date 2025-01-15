const ChatBox = ({ responses }) => {
  return (
    <div
      className=" border-gray-300 rounded-3xl p-4 bg-white h-96 overflow-y-auto shadow-lg space-y-4 flex flex-col-reverse"
      aria-live="polite"
    >
      {responses.map((res, idx) => (
        <div
          key={idx}
          className={`flex ${
            idx % 2 === 0 ? "justify-end" : "justify-start"
          } space-x-2`}
        >
          <div
            className={`${
              idx % 2 === 0
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } p-3 rounded-lg max-w-xs break-words shadow-sm transform transition duration-200 ease-in-out`}
          >
            {res}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
