import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaEnvelope, FaBell, FaSearch } from "react-icons/fa";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import profileImage from "./assets/profile.png";

const App = () => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Home", icon: <FaHome /> },
    { title: "About", icon: <FaInfoCircle /> },
    { title: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <div className="w-full flex">
      {/* Sidebar */}
      <div className={`${open ? "w-72 p-5" : "w-20 p-4"} bg-zinc-900 h-screen pt-8 relative duration-300 ease-in-out shadow-lg`}>
        {/* Toggle button */}
        <div
          className="absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center transition-all duration-300 ease-in-out"
          onClick={() => setOpen(!open)}
        >
          <TbLayoutSidebarLeftExpand
            className={`transition-transform duration-300 ease-in-out ${!open ? "rotate-180" : ""}`}
          />
        </div>

        {/* Logo & Title */}
        <div className="flex gap-x-4 items-center">
          <img
            src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_640.png"
            alt="logo"
            className={`w-10 h-10 rounded-full object-cover object-center cursor-pointer duration-300 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1 className={`text-zinc-50 origin-left font-semibold text-xl duration-200 ${!open && "scale-0"}`}>
            Dashboard
          </h1>
        </div>

        {/* Sidebar Menu */}
        <ul className="pt-6 space-y-1">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex items-center gap-4 rounded-md py-3 px-4 cursor-pointer hover:text-white text-zinc-50 hover:bg-zinc-800/50 transition-all duration-300 ease-in-out ${index === 0 && "bg-zinc-800/40"}`}
            >
              <span className="text-lg">{Menu.icon}</span>
              <span className={`${!open && "hidden"} origin-left ease-in-out duration-300`}>{Menu.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Dashboard Area */}
      <div className="h-screen flex-1 bg-zinc-100 space-y-6">
        {/* Top Navbar */}
        <div className="w-full h-[8ch] px-12 bg-zinc-50 shadow-md flex items-center justify-between">
          <div className="w-96 border border-zinc-300 rounded-full h-11 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 h-full rounded-full outline-none border-none bg-zinc-50 px-4"
            />
            <button className="px-4 h-full flex items-center justify-center text-base text-zinc-600 border-l border-zinc-300">
              <FaSearch />
            </button>
          </div>

          <div className="flex items-center gap-x-8">
            <button className="relative">
              <div className="w-5 h-5 bg-zinc-50 flex items-center justify-center absolute -top-1.5 -right-2.5 rounded-full p-0.5">
                <span className="bg-red-600 text-white rounded-full w-full h-full flex items-center justify-center text-xs">
                  3
                </span>
              </div>
              <FaBell className="text-xl" />
            </button>
            <img
              src={profileImage}
              alt="profile"
              className="w-11 h-11 rounded-full object-cover object-center cursor-pointer"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-12">
          <h1 className="text-xl text-zinc-800 font-medium">Welcome to Charusat</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
