import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import { 
  useAllReviews, 
  getFilmTitle, 
  formatFirebaseDate 
} from "../services/services";

export default function ReviewDropdown({ darkMode }) {
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
            ? 'bg-pink-600 hover:bg-pink-700' 
            : 'bg-pink-100/50 hover:bg-pink-200/50'
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
              📽 Film Reviews
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Lihat review film Ghibli dari komunitas
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            darkMode 
              ? 'bg-blue-900/50 text-blue-200' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {reviews.filter(review => review.type === 'film').length} reviews
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
          ) : reviews.filter(review => review.type === 'film').length > 0 ? (
            <div className="p-4 space-y-4">
              {reviews
                .filter(review => review.type === 'film')
                .map((review) => (
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
                      src={review.authorAvatar || `https://ui-avatars.com/api/?name=${review.author || 'User'}&background=random`}
                      alt={review.author || 'User'}
                      className="w-10 h-10 rounded-full border-2 border-blue-400/50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`font-semibold ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {review.author || 'Anonymous'}
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
                Belum ada review film dari komunitas
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Jadilah yang pertama menulis review film!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}