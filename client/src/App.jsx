import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginRedirect from "./pages/LoginRedirect";
import ChatConnect from "./pages/ChatConnect";
import Header from "./components/Header";

import conf from "./conf/conf";
const backendUrl = conf.BACKEND_API_URL;
// let backendUrl = "";

const App = () => {
  if (!backendUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-800 text-white p-4">
        <div className="bg-slate-700 p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-semibold mb-4">Configuration Missing</h2>
          <div className="text-lg mb-4">
            Please specify your backend URL with the{" "}
            <a
              href="https://create-react-app.dev/docs/adding-custom-environment-variables/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              environment variable
            </a>
            :
            <br />
            <b className="text-yellow-300">VITE_APP_BACKEND_URL</b>
            .<br />
            <br />
            For example, launch this app with:
            <br />
            <b className="text-green-400">
              <p>VITE_APP_BACKEND_URL=http://localhost:1337 </p>
              <p>npm start</p>
            </b>
          </div>
          <p className="text-lg mb-4">
            For Login setup, please refer to the{" "}
            <a
              href="https://docs.strapi.io/dev-docs/plugins/users-permissions#login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Login Provider setup{" "}
            </a>
            info.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/connect/:providerName/redirect"
            element={<LoginRedirect />}
          />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/chat" element={<ChatConnect />} />
          {/* <Route exact path="/" element={<ChatConnect />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
