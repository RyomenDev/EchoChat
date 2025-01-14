import { useState } from "react";
import conf from "../conf/conf";

// const backendUrl = "http://localhost:1337";
const backendUrl = conf.BACKEND_API_URL;

const providersNames = ["google", "github"];

const LoginButton = (props) => (
  <a href={`${backendUrl}/api/connect/${props.providerName}`}>
    <button className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
      Connect to {props.providerName}
    </button>
  </a>
);

const LogoutButton = (props) => (
  <button
    onClick={props.onClick}
    className="bg-red-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-red-600 focus:outline-none"
  >
    Logout
  </button>
);

const Home = (props) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("jwt"));

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    setIsLogged(false);
  };

  let buttons;

  if (isLogged) {
    buttons = <LogoutButton onClick={logout} />;
  } else {
    buttons = (
      <ul className="list-none space-y-4">
        {providersNames.map((providerName, i) => (
          <li key={providerName}>
            <LoginButton providerName={providerName} />
          </li>
        ))}
      </ul>
    );
  }

  let text;

  if (isLogged) {
    text = `Welcome ${localStorage.getItem("username")}, you are connected!`;
  } else {
    text = "You are not connected. Please log in.";
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to Strapi ChatRoom
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Join the conversation, meet new people, and make connections in one
          shared room.
        </p>
        <p className="text-lg font-medium text-gray-700 mb-6">{text}</p>
        {buttons}
      </div>
    </div>
  );
};

export default Home;
