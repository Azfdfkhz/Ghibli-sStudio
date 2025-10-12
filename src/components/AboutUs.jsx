import { User, LogOut } from "lucide-react";
import ReviewDropdown from "../components/ReviewDropdown";
import WebsiteReviews from "../components/WebsiteReviews";

export default function AboutUs({ darkMode, username = "Ghibli User", onLogout }) {
  return (
    <div className="h-full w-full flex items-center justify-center p-4 lg:p-8">
      <div className={`w-full max-w-4xl ${
        darkMode 
          ? 'bg-gray-900/40 backdrop-blur-xl border-gray-700/50' 
          : 'bg-white/40 backdrop-blur-xl border-white/50'
      } border rounded-3xl shadow-2xl p-8 lg:p-12`}>
        
        {/* Header dengan Foto, Nama User, dan Logout Button */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
          
          {/* Foto User */}
          <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'
          } backdrop-blur-lg border-4 ${
            darkMode ? 'border-blue-500' : 'border-blue-400'
          } shadow-xl`}>
            <User size={48} className={darkMode ? "text-white" : "text-gray-700"} />
          </div>

          {/* Nama User */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className={`text-3xl lg:text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {username}
            </h2>
            <p className={`text-sm mt-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Berdikari (Berdiri karena diri sendiri)
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Konten About Us */}
        <div className={`${
          darkMode 
            ? 'bg-gray-800/30 backdrop-blur-xl border-gray-700/30' 
            : 'bg-white/30 backdrop-blur-xl border-white/30'
        } border rounded-2xl p-6 lg:p-8`}>
          
          <h1 className={`text-2xl lg:text-3xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            ABOUT US
          </h1>

          <div className={`space-y-4 ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            <p className="text-base lg:text-lg leading-relaxed">
              Welcome to our <span className="font-bold text-blue-500">Studio Ghibli Web</span> Disini dibuat oleh <span className="font-bold text-blue-800">Azmi Fadhil Fakhrurrazi</span>
            </p>

            <p className="text-base lg:text-lg leading-relaxed">
              This application allows you to explore the enchanting universe of Studio Ghibli films, 
              discover beloved characters, and immerse yourself in the timeless stories that have 
              captured hearts around the world.
            </p>

            <div className="mt-6 pt-6 border-t border-gray-400/30">
              <h3 className={`text-lg font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Features:
              </h3>
              <ul className="space-y-2 text-sm lg:text-base">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✦</span>
                  Browse extensive collection of Studio Ghibli films
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✦</span>
                  Discover beloved characters and their stories
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✦</span>
                  Beautiful, responsive design for all devices
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✦</span>
                  Dark mode support for comfortable viewing
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✦</span>
                  Community reviews and discussions
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✦</span>
                  Website reviews and feedback system
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-400/30">
              <p className="text-sm italic text-center">
                "Always believe in yourself. Do this and no matter where you are, you will have nothing to fear." 
                <span className="block mt-2 font-semibold">— The Cat Returns</span>
              </p>
            </div>
          </div>

          {/* Website Reviews Section */}
          <WebsiteReviews darkMode={darkMode} />

          {/* Film Reviews Dropdown Section */}
          <ReviewDropdown darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}