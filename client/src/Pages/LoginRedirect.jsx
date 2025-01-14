import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import conf from "../conf/conf";

// const backendUrl = "http://localhost:1337";
const backendUrl = conf.BACKEND_API_URL;

const LoginRedirect = (props) => {
  const [text, setText] = useState("Loading...");
  const [loading, setLoading] = useState(true); // State for loading screen
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle login with Strapi
    const loginWithStrapi = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/auth/${params.providerName}/callback${location.search}`
        );

        console.log(response);
        

        if (response.status === 200) {
          // Successfully logged in with Strapi
          const { jwt, user } = response.data;

          // Save JWT and user data to local storage
          localStorage.setItem("jwt", jwt);
          localStorage.setItem("username", user.username);

          setText(
            "You have been successfully logged in. You will be redirected in a few seconds..."
          );
          setLoading(false); // Hide loading screen

          // Redirect to the homepage after 3 seconds
          setTimeout(() => navigate("/"), 3000);
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-700">Logging in...</h2>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-700">{text}</h2>
      </div>
    </div>
  );
};

export default LoginRedirect;
