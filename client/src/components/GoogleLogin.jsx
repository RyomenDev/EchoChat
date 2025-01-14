// const GoogleLoginButton = () => {
//   const handleLogin = async () => {
//     console.log("Trying to login");
//     try {
//       const res = await fetch("http://localhost:1337/api/connect/google", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();
//       console.log(data);

//       if (data.jwt) {
//         localStorage.setItem("jwt", data.jwt);
//         alert("Login successful!");
//       } else {
//         alert("Login failed!");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert("Login failed due to an error");
//     }
//   };

//   return (
//     <>
//       <button onClick={handleLogin}>SignIn</button>
//     </>
//   );
// };

// export default GoogleLoginButton;

import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

const backendUrl = "http://localhost:1337/";

const GoogleLoginButton = (props) => {
  const [text, setText] = useState("Loading...");
  const location = useLocation();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(
      `${backendUrl}/api/auth/${params.providerName}/callback${location.search}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem("jwt", res.jwt);
        localStorage.setItem("username", res.user.username);
        setText(
          "You have been successfully logged in. You will be redirected in a few seconds..."
        );
        setTimeout(() => history.push("/"), 3000); // Redirect to homepage after 3 sec
      })
      .catch((err) => {
        console.log(err);
        setText("An error occurred, please see the developer console.");
      });
  }, [history, location.search, params.providerName]);

  return <p>{text}</p>;
};

export default GoogleLoginButton;
