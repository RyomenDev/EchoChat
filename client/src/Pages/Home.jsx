import "./styles.css";
import { useState } from "react";
import conf from "../conf/conf";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

// const backendUrl = "http://localhost:1337";
const backendUrl = conf.BACKEND_API_URL;

const providersNames = ["google", "github"];

const LoginButton = (props) => (
  <a href={`${backendUrl}/api/connect/${props.providerName}`}>
    <button className="bg-[#0f0] opacity-100 text-white py-2 px-6 rounded-md hover:bg-[#0f5]">
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

// Reusable button component
const Button = ({ onClick, text, className }) => (
  <button
    onClick={onClick}
    className={`py-2 px-6 rounded-md shadow-md focus:outline-none ${className}`}
  >
    {text}
  </button>
);

const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("jwt"));

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    dispatch(logout());
    setIsLogged(false);
  };

  const ChatPageNavHandler = () => {
    navigate("./chat");
  };

  let buttons;

  if (isLogged) {
    buttons = (
      <>
        <div className="flex gap-4">
          <Button
            onClick={logoutHandler}
            text="Logout"
            className="bg-red-500 text-white hover:bg-red-600"
          />
          <Button
            onClick={ChatPageNavHandler}
            text="Go to Chat"
            className="bg-blue-500 text-white hover:bg-blue-600"
          />
        </div>
      </>
    );
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
    <>
      <section className="" style={{ maxHeight: "100vh" }}>
        <div className=""></div>
        {Array.from({ length: 200 }).map((_, index) => (
          <span key={index} className=""></span>
        ))}

        <div className="signin">
          <div className="content">
            <h2 className=" text-center "> Welcome to Strapi ChatRoom</h2>
            <p className=" text-center text-xl text-[#0f0]">{text}</p>
            {buttons}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
