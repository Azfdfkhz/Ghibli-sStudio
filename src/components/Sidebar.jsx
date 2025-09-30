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

export default function Sidebar({ darkMode }) {
  const [currentLogo, setCurrentLogo] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logoImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const iconColor = darkMode ? "text-white" : "text-gray-900";
  const hoverBg = darkMode ? "hover:bg-white/20" : "hover:bg-gray-300/30";
  
  // Warna untuk state aktif
  const activeBg = darkMode ? "bg-blue-600" : "bg-blue-500";
  const activeText = "text-white";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex w-28 h-screen flex-col items-center py-6 space-y-8 shadow-2xl transition-all duration-500 relative z-20 bg-white/10 backdrop-blur-md border-r border-white/20`}
      >
        <div className="flex flex-col items-center py-4">
          <img
            key={currentLogo}
            src={logoImages[currentLogo]}
            alt="Logo"
            className="w-24 h-20 object-contain transition-all duration-500 ease-in-out"
          />
        </div>

        {/* Home */}
        <Link
          to="/"
          className={`hover:scale-110 transition p-2 rounded-lg ${hoverBg} flex flex-col items-center ${
            location.pathname === "/" ? `${activeBg} ${activeText}` : ""
          }`}
        >
          <Home size={35} className={location.pathname === "/" ? activeText : iconColor} />
          <span className={`text-xs mt-1 block ${location.pathname === "/" ? activeText : iconColor}`}>Home</span>
        </Link>

        {/* Character */}
        <Link
          to="/characters"
          className={`hover:scale-110 transition p-2 rounded-lg ${hoverBg} flex flex-col items-center ${
            location.pathname === "/characters" ? `${activeBg} ${activeText}` : ""
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

        {/* Films */}
        <Link
          to="/films"
          className={`hover:scale-110 transition p-2 rounded-lg ${hoverBg} flex flex-col items-center ${
            location.pathname === "/films" ? `${activeBg} ${activeText}` : ""
          }`}
        >
          <Film size={35} className={location.pathname === "/films" ? activeText : iconColor} />
          <span className={`text-xs mt-1 block ${location.pathname === "/films" ? activeText : iconColor}`}>Films</span>
        </Link>

        {/* User */}
        <button
          className={`mt-auto hover:scale-110 transition p-2 rounded-lg ${hoverBg} flex flex-col items-center`}
        >
          <User size={24} className={iconColor} />
          <span className={`text-xs mt-1 block ${iconColor}`}>User</span>
        </button>
      </aside>

      {/* Mobile Bottom Navigation - Mirip dengan Desktop */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-t border-white/20">
        <nav className="flex justify-around items-center py-3">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/" ? `${activeBg} ${activeText}` : hoverBg
            }`}
          >
            <Home size={28} className={location.pathname === "/" ? activeText : iconColor} />
            <span className={`text-xs mt-1 ${location.pathname === "/" ? activeText : iconColor}`}>Home</span>
          </Link>

          {/* Character */}
          <Link
            to="/characters"
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/characters" ? `${activeBg} ${activeText}` : hoverBg
            }`}
          >
            <div className="w-8 h-10">
              <img 
                src={icon} 
                alt="Character" 
                className={`w-full h-full object-cover ${location.pathname === "/characters" ? "brightness-0 invert" : ""}`}
              />
            </div>
            <span className={`text-xs mt-1 ${location.pathname === "/characters" ? activeText : iconColor}`}>Character</span>
          </Link>

          {/* Films */}
          <Link
            to="/films"
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
              location.pathname === "/films" ? `${activeBg} ${activeText}` : hoverBg
            }`}
          >
            <Film size={28} className={location.pathname === "/films" ? activeText : iconColor} />
            <span className={`text-xs mt-1 ${location.pathname === "/films" ? activeText : iconColor}`}>Films</span>
          </Link>

          {/* User */}
          <button
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${hoverBg}`}
          >
            <User size={24} className={iconColor} />
            <span className={`text-xs mt-1 ${iconColor}`}>User</span>
          </button>
        </nav>
      </div>
    </>
  );
}