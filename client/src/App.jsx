import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginRedirect from "./pages/LoginRedirect";

import conf from "./conf/conf";
const backendUrl = conf.BACKEND_API_URL;

const App = () => {
  if (!backendUrl) {
    return (
      <>
        <p>
          Please specify your backend url with the{" "}
          <a
            href="https://create-react-app.dev/docs/adding-custom-environment-variables/"
            target="_blank"
            rel="noopener noreferrer"
          >
            environment variable
          </a>
          :<br />
          <b>VITE_APP_BACKEND_URL</b>.<br />
          <br />
          For example launch this app with:
          <br />
          <b>VITE_APP_BACKEND_URL=http://localhost:1337 yarn start</b>
        </p>
        <p>
          For Login setup
          <a
            href="https://docs.strapi.io/dev-docs/plugins/users-permissions#login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login Provider setup
          </a>
          info:
        </p>
      </>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/connect/:providerName/redirect"
          element={<LoginRedirect />}
        />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
