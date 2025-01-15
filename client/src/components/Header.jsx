import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const userName = userData?.username;

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 flex flex-wrap items-center justify-between py-3 px-4 md:px-6 bg-black text-white shadow-lg border-b-4 border-[#0f0]">
      {/* Logo Section */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleLogoClick}
      >
        <img
          src={Logo}
          alt="EchoChat logo"
          className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 hover:scale-105 hover:opacity-80"
        />
        <div className="text-lg font-semibold md:text-2xl hover:text-indigo-400 transition-all duration-300">
          EchoChat
        </div>
      </div>

      {/* User Greeting */}
      {authStatus && (
        <div className="hidden md:block text-sm md:text-base font-medium">
          Hi, {userName}
        </div>
      )}

      {/* Search Bar */}
      <div className="w-full mt-3 md:mt-0 md:w-1/4 flex justify-center">
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

      {/* Mobile User Greeting */}
      {authStatus && (
        <div className="block md:hidden text-sm font-medium mt-2">
          Hi, {userName}
        </div>
      )}
    </header>
  );
};

export default Header;
