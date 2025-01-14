// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import conf from "../conf/conf";

const GoogleLoginButton = () => {
  //  const handleLoginSuccess = async (response) => {
  const handleLogin = async () => {
    console.log("Trying to login");
    try {
      const res = await fetch("http://localhost:1337/api/connect/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   token: response.tokenId, // Use tokenId here if that's the correct one
        // }),
      });

      const data = await res.json();
      console.log(data);

      if (data.jwt) {
        // Store the JWT token in localStorage
        localStorage.setItem("jwt", data.jwt);
        alert("Login successful!");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed due to an error");
    }
  };

  return (
    <>
      {/* <GoogleOAuthProvider clientId={conf.GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => alert("Login Failed!")}
        />
      </GoogleOAuthProvider> */}
      <button onClick={handleLogin}>SignIn</button>
    </>
  );
};

export default GoogleLoginButton;
