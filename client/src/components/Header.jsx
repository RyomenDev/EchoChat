import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const userName = userData?.username;

  console.log(userData);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 flex items-center justify-between py-2 px-6 bg-black text-white shadow-lg border-b-4 border-[#0f0]">
      {/* Logo Section */}
      <div
        className="flex items-center justify-center cursor-pointer gap-3 hover:shadow-lg rounded-lg transition-all duration-300"
        onClick={handleLogoClick}
      >
        <img
          src={Logo}
          alt="EchoChat logo"
          className="w-auto h-12 md:h-16 transition-transform duration-300 hover:scale-105 hover:opacity-80"
        />

        <div className="ml-2 text-2xl font-semibold text-white md:text-3xl hover:text-indigo-400 transition-all duration-300">
          EchoChat
        </div>
      </div>

      {authStatus && <div> Hi {userName}</div>}

      {/* Search Bar */}
      <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
        <form className="relative w-full max-w-lg">
          <input
            id="search"
            type="text"
            className="w-full py-2 pl-4 pr-12 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white transition duration-300 ease-in-out"
            name="s"
            autoComplete="off"
            placeholder="Search..."
            aria-label="Search"
          />
          <button
            id="search-submit"
            type="submit"
            className="absolute right-2 top-2 text-indigo-500 hover:text-indigo-700 transition duration-300 ease-in-out"
            title="Search"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 17a6 6 0 1111-6 6 6 0 01-11 6zm0 0l-3 3m3-3l3 3"
              />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
