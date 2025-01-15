import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import conf from "../conf/conf";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";

// const backendUrl = "http://localhost:1337";
const backendUrl = conf.BACKEND_API_URL;

const LoginRedirect = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const [text, setText] = useState("Loading...");
  const [loading, setLoading] = useState(true); // State for loading screen

  useEffect(() => {
    // Function to handle login with Strapi
    const loginWithStrapi = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/auth/${params.providerName}/callback${location.search}`
        );

        // console.log("response", response);

        if (response.status === 200) {
          // Successfully logged in with Strapi
          const { jwt, user } = response.data;
          //   console.log("user", user);

          dispatch(authLogin(user));

          // Save JWT and user data to local storage
          localStorage.setItem("jwt", jwt);
          localStorage.setItem("username", user.username);

          setText(
            "You have been successfully logged in. You will be redirected in a few seconds..."
          );
          setLoading(false); // Hide loading screen

          //   Redirect to the homepage after 2 seconds
          setTimeout(() => navigate("/"), 2000);
        } else {
          throw new Error(
            `Couldn't log in to Strapi. Status: ${response.status}`
          );
        }
      } catch (err) {
        console.error(err);
        setText("An error occurred, please see the developer console.");
        setLoading(false); // Hide loading screen on error
      }
    };

    loginWithStrapi();
  }, [navigate, location.search, params.providerName]);

  if (loading) {
    // Display loading screen while fetching data
    return (
      <>
        <section className="">
          <div className=""></div>
          {Array.from({ length: 200 }).map((_, index) => (
            <span key={index} className=""></span>
          ))}

          <div className="signin" style={{ border: "", borderRadius: "999px" }}>
            <div className="content ">
              <div className="mt-4 flex justify-center items-center ">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid mx-auto shadow-lg"></div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="">
        <div className=""></div>
        {Array.from({ length: 200 }).map((_, index) => (
          <span key={index} className=""></span>
        ))}

        <div className="signin" style={{ border: "", borderRadius: "999px" }}>
          <div className="content ">
            <p className=" text-center text-xl text-[#0f0] ">{text}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginRedirect;
