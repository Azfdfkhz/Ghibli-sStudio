import { User, LogOut, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAllReviews, getFilmTitle, formatFirebaseDate } from "/src/services/services";

// ReviewDropdown Component
function ReviewDropdown({ darkMode }) {
  const { reviews, loading } = useAllReviews();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mt-8 rounded-2xl overflow-hidden border ${
      darkMode 
        ? 'bg-gray-800/40 border-gray-700/50' 
        : 'bg-white/40 border-white/50'
    } backdrop-blur-xl`}>
      
      {/* Dropdown Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-6 flex items-center justify-between transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-700/50 hover:bg-gray-600/50' 
            : 'bg-gray-100/50 hover:bg-gray-200/50'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${
            darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
          }`}>
            <MessageCircle className={`w-6 h-6 ${
              darkMode ? 'text-blue-400' : 'text-blue-500'
            }`} />
          </div>
          <div className="text-left">
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              💬 Community Reviews
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Lihat apa kata komunitas tentang film Ghibli
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            darkMode 
              ? 'bg-blue-900/50 text-blue-200' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {reviews.length} reviews
          </span>
          {isOpen ? 
            <ChevronUp className={darkMode ? "text-white" : "text-gray-700"} /> : 
            <ChevronDown className={darkMode ? "text-white" : "text-gray-700"} />
          }
        </div>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className={`max-h-96 overflow-y-auto ${
          darkMode ? 'bg-gray-800/30' : 'bg-white/30'
        }`}>
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Memuat reviews...
              </p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="p-4 space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`p-4 rounded-xl ${
                    darkMode 
                      ? 'bg-gray-700/30 border-gray-600/50' 
                      : 'bg-white/50 border-gray-200/50'
                  } border backdrop-blur-lg`}
                >
                  <div className="flex items-start space-x-3">
                    <img 
                      src={review.authorAvatar || `https://ui-avatars.com/api/?name=${review.author}&background=random`}
                      alt={review.author}
                      className="w-10 h-10 rounded-full border-2 border-blue-400/50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`font-semibold ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {review.author}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          darkMode 
                            ? 'bg-gray-600 text-gray-300' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {getFilmTitle(review.filmId)}
                        </span>
                        <span className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {formatFirebaseDate(review.createdAt)}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <MessageCircle className={`w-12 h-12 mx-auto mb-3 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Belum ada review dari komunitas
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Jadilah yang pertama menulis review!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// AboutUs Component
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
              Welcome to our <span className="font-bold text-blue-500">Studio Ghibli Web</span> Disini dibuat oleh 4 orang + bang AI yaitu <span className="font-bold text-blue-800">Azmi,Kevin,Risma,Revan</span>
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
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-400/30">
              <p className="text-sm italic text-center">
                "Always believe in yourself. Do this and no matter where you are, you will have nothing to fear." 
                <span className="block mt-2 font-semibold">— The Cat Returns</span>
              </p>
            </div>
          </div>

          {/* Review Dropdown Section */}
          <ReviewDropdown darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}