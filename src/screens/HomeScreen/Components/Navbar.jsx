import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.jpg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isNgo = localStorage.getItem("isNgo");

  console.log(isNgo)
  const toggleMenu = () => {
    console.log("Toggling Menu");
    setIsOpen(!isOpen);
  };
  const currentTab = useSelector((e) => e.ct.tab);
  const navigate = useNavigate("/");
  return (
    <nav className="">
      <div className="flex justify-between px-8 py-4 items-center bg-zinc-950  ">
        <div
          onClick={() => navigate("/")}
          className="font-bold cursor-pointer text-2xl "
        >
          <img className="h-10" src={Logo}/>
        </div>
        <div className="flex gap-5 items-center   font-semibold">
          <div className="hidden md:flex gap-5">
            <p
              onClick={() => navigate("/")}
              className={`cursor-pointer transition-all duration-200 hover:text-primary ${
                currentTab != "home" ? "text-yellow-300" : "text-yellow-500"
              }`}
            >
              Home
            </p>
            <p
              onClick={() => navigate("/input")}
              className={`cursor-pointer transition-all duration-200 hover:text-primary ${
                currentTab != "input" ? "text-yellow-300" : "text-yellow-500"
              }`}
            >
              Inventory
            </p>
            <p
              onClick={() => navigate("/analytics")}
              className={`cursor-pointer transition-all duration-200 hover:text-primary ${
                currentTab != "analytics" ? "text-yellow-300" : "text-yellow-500"
              }`}
            >
              Analytics
            </p>
            <p
              onClick={() => navigate("/zassist")}
              className={`cursor-pointer transition-all duration-200 hover:text-primary ${
                currentTab != "zassist" ? "text-yellow-300" : "text-yellow-500"
              }`}
            >
              Z-assist
            </p>
            <p
              onClick={() => navigate("/chat")}
              className={`cursor-pointer transition-all duration-200 hover:text-primary ${
                currentTab != "chat" ? "text-yellow-300" : "text-yellow-500"
              }`}
            >
              Chat
            </p>
           
          </div>
          {
            isLoggedIn ? <button onClick={()=>navigate("/login")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>: <button onClick={()=>navigate("/login")} className="bg-yellow-600 hover:bg-secondary duration-300 transition-all ease-in-out text-white font-semibold px-2 py-1 rounded">Login</button>
          }
          
          <div className="md:hidden text-yellow-400   ">
            <button onClick={toggleMenu}>
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() => toggleMenu()}
        className={`flex flex-col bg-zinc-950 flex-1 h-screen  transition-all  duration-300 ease-in-out overflow-hidden relative top-0 z-10 lg:hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className={`bg-zinc-950  font-semibold backdrop-opacity-5  `}>
          <ul className="flex-col  text-white gap-10 ">
            <li onClick={() => navigate("/")} className="px-4 py-2 ">
              <p className="p-2 rounded-md bg-yellow-300 text-primary">Home</p>
            </li>

            <li onClick={() => navigate("/input")} className="px-4 py-2 ">
              <p className="p-2 rounded-md bg-yellow-300 text-primary">Inventory</p>
            </li>
            <li onClick={() => navigate("/analytics")} className="px-4 py-2 ">
              <p className="p-2 rounded-md bg-yellow-300 text-primary">Analytics</p>
            </li>
            <li onClick={() => navigate("/zassist")} className="px-4 py-2 ">
              <p className="p-2 rounded-md bg-yellow-300 text-primary">
                Zassist
              </p>
            </li>
            <li onClick={() => navigate("/chat")} className="px-4 py-2 ">
              <p className="p-2 rounded-md bg-yellow-300 text-primary">
                Chat
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
