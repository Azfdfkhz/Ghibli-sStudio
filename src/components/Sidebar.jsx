import { useState, useEffect } from "react";
import { Home, User, Film } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import l1 from "../Logo/1.png";
import l2 from "../Logo/2.png";
import l3 from "../Logo/3.png";
import l4 from "../Logo/4.png";
import l5 from "../Logo/5.png";
import l6 from "../Logo/6.png";
import icon from "../Logo/icon.png";

const logoImages = [l1, l2, l3, l4, l5, l6];

export default function Sidebar({ darkMode, onLogout }) {
  const [currentLogo, setCurrentLogo] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logoImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const iconColor = darkMode ? "text-white" : "text-gray-900";
  const activeBg = darkMode ? "bg-blue-600" : "bg-blue-500";
  const activeText = "text-white";

  return (
    <>
      {/* 🖥️ Desktop Sidebar - GLASSMORPHISM */}
      <aside className={`hidden lg:flex fixed left-0 top-0 w-28 h-screen flex-col items-center py-6 space-y-8 shadow-xl z-40 ${
        darkMode 
          ? 'bg-gray-900/40 backdrop-blur-xl border-gray-700/50' 
          : 'bg-white/40 backdrop-blur-xl border-white/50'
      } border-r`}>
        <div className="flex flex-col items-center py-4">
          <img
            key={currentLogo}
            src={logoImages[currentLogo]}
            alt="Logo"
            className="w-24 h-20 object-contain transition-all duration-500 ease-in-out drop-shadow-lg"
          />
        </div>

        <Link
          to="/"
          className={`hover:scale-110 transition-all duration-300 p-2 rounded-xl flex flex-col items-center ${
            location.pathname === "/" 
              ? `${activeBg} ${activeText} shadow-lg` 
              : darkMode 
                ? "hover:bg-white/10" 
                : "hover:bg-gray-900/10"
          }`}
        >
          <Home size={35} className={location.pathname === "/" ? activeText : iconColor} />
          <span className={`text-xs mt-1 block ${location.pathname === "/" ? activeText : iconColor}`}>Home</span>
        </Link>

        <Link
          to="/characters"
          className={`hover:scale-110 transition-all duration-300 p-2 rounded-xl flex flex-col items-center ${
            location.pathname === "/characters" 
              ? `${activeBg} ${activeText} shadow-lg` 
              : darkMode 
                ? "hover:bg-white/10" 
                : "hover:bg-gray-900/10"
          }`}
        >
          <div className="w-12 h-15">
            <img 
              src={icon} 
              alt="Character" 
              className={`w-full h-full object-cover ${location.pathname === "/characters" ? "brightness-0 invert" : ""}`}
            />
          </div>
          <span className={`text-xs mt-1 ${location.pathname === "/characters" ? activeText : iconColor}`}>Character</span>
        </Link>

        <Link
          to="/films"
          className={`hover:scale-110 transition-all duration-300 p-2 rounded-xl flex flex-col items-center ${
            location.pathname === "/films" 
              ? `${activeBg} ${activeText} shadow-lg` 
              : darkMode 
                ? "hover:bg-white/10" 
                : "hover:bg-gray-900/10"
          }`}
        >
          <Film size={35} className={location.pathname === "/films" ? activeText : iconColor} />
          <span className={`text-xs mt-1 block ${location.pathname === "/films" ? activeText : iconColor}`}>Films</span>
        </Link>

        <Link
          to="/about"
          className={`mt-auto hover:scale-110 transition-all duration-300 p-2 rounded-xl flex flex-col items-center ${
            location.pathname === "/about" 
              ? `${activeBg} ${activeText} shadow-lg` 
              : darkMode 
                ? "hover:bg-white/10" 
                : "hover:bg-gray-900/10"
          }`}
        >
          <User size={24} className={location.pathname === "/about" ? activeText : iconColor} />
          <span className={`text-xs mt-1 block ${location.pathname === "/about" ? activeText : iconColor}`}>User</span>
        </Link>
      </aside>

      {/* 📱 Mobile Floating Bottom Nav - GLASSMORPHISM */}
      <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <nav className={`flex justify-around items-center py-3 px-6 
          ${darkMode ? 'bg-gray-900/30' : 'bg-white/30'}
          backdrop-blur-2xl 
          ${darkMode ? 'border-gray-700/30' : 'border-white/30'}
          border rounded-3xl shadow-2xl min-w-[280px]`}>
          
          <Link
            to="/"
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 mx-1 ${
              location.pathname === "/" 
                ? "bg-blue-500 text-white shadow-lg" 
                : darkMode 
                  ? "hover:bg-white/10 text-white" 
                  : "hover:bg-gray-900/10 text-gray-900"
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            to="/characters"
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 mx-1 ${
              location.pathname === "/characters" 
                ? "bg-blue-500 text-white shadow-lg" 
                : darkMode 
                  ? "hover:bg-white/10 text-white" 
                  : "hover:bg-gray-900/10 text-gray-900"
            }`}
          >
            <div className="w-6 h-8">
              <img 
                src={icon} 
                alt="Character" 
                className={`w-full h-full object-cover ${
                  location.pathname === "/characters" ? "brightness-0 invert" : ""
                }`}
              />
            </div>
            <span className="text-xs mt-1">Character</span>
          </Link>

          <Link
            to="/films"
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 mx-1 ${
              location.pathname === "/films" 
                ? "bg-blue-500 text-white shadow-lg" 
                : darkMode 
                  ? "hover:bg-white/10 text-white" 
                  : "hover:bg-gray-900/10 text-gray-900"
            }`}
          >
            <Film size={24} />
            <span className="text-xs mt-1">Films</span>
          </Link>

          <Link
            to="/about"
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 mx-1 ${
              location.pathname === "/about" 
                ? "bg-blue-500 text-white shadow-lg" 
                : darkMode 
                  ? "hover:bg-white/10 text-white" 
                  : "hover:bg-gray-900/10 text-gray-900"
            }`}
          >
            <User size={20} />
            <span className="text-xs mt-1">User</span>
          </Link>
        </nav>
      </div>
    </>
  );
}