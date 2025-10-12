import { ChevronDown, ChevronUp, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { 
  useWebsiteReviews, 
  useSubmitWebsiteReview, 
  formatFirebaseDate 
} from "../services/services";
import WebsiteReviewForm from "./WebsiteReviewForm";

export default function WebsiteReviews({ darkMode }) {
  const { reviews, loading } = useWebsiteReviews();
  const { submitWebsiteReview, submitting, error: submitError } = useSubmitWebsiteReview();
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);

  const handleSubmitReview = async (reviewData) => {
    await submitWebsiteReview(reviewData);
    setShowReviewForm(false);
  };

  return (
    <div className={`mt-8 rounded-2xl overflow-hidden border ${
      darkMode 
        ? 'bg-gray-800/40 border-gray-700/50' 
        : 'bg-white/40 border-white/50'
    } backdrop-blur-xl`}>
      
      {/* Header Button */}
      <button
        onClick={() => setIsReviewsOpen(!isReviewsOpen)}
        className={`w-full p-6 flex items-center justify-between transition-all duration-300 ${
          darkMode 
            ? 'bg-purple-700/50 hover:bg-purple-600/50' 
            : 'bg-purple-100/50 hover:bg-purple-200/50'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${
            darkMode ? 'bg-purple-500/20' : 'bg-purple-500/10'
          }`}>
            <MessageCircle className={`w-6 h-6 ${
              darkMode ? 'text-purple-400' : 'text-purple-500'
            }`} />
          </div>
          <div className="text-left">
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🌟 Website Reviews
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Bagikan pendapat Anda tentang website ini
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            darkMode 
              ? 'bg-purple-900/50 text-purple-200' 
              : 'bg-purple-100 text-purple-700'
          }`}>
            {reviews.length} reviews
          </span>
          
          {isReviewsOpen ? 
            <ChevronUp className={darkMode ? "text-white" : "text-gray-700"} /> : 
            <ChevronDown className={darkMode ? "text-white" : "text-gray-700"} />
          }
        </div>
      </button>

      {/* Form Section */}
      <div className={`border-b ${
        darkMode ? 'border-gray-700 bg-gray-800/20' : 'border-gray-200 bg-white/20'
      } ${!isReviewsOpen ? 'hidden' : 'block'}`}>
        <div className="p-4 border-b border-gray-400/20">
          <div className="flex items-center justify-between">
            <span className={`font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {showReviewForm ? 'Tulis Review Website' : 'Ingin memberikan review?, tapi harus bagus😜'}
            </span>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                darkMode 
                  ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {showReviewForm ? 'Batal' : 'Tulis Review'}
            </button>
          </div>
        </div>

        {showReviewForm && (
          <WebsiteReviewForm
            darkMode={darkMode}
            onSubmit={handleSubmitReview}
            submitting={submitting}
            error={submitError}
          />
        )}
      </div>

      {/* Reviews List */}
      {isReviewsOpen && (
        <div className={`max-h-96 overflow-y-auto ${
          darkMode ? 'bg-gray-800/30' : 'bg-white/30'
        }`}>
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Memuat reviews website...
              </p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="p-4 space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`p-4 rounded-xl border backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] ${
                    darkMode 
                      ? 'bg-gray-700/30 border-gray-600/50 hover:bg-gray-700/50' 
                      : 'bg-white/50 border-gray-200/50 hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${review.userName || 'User'}&background=random`}
                      alt={review.userName || 'User'}
                      className="w-10 h-10 rounded-full border-2 border-purple-400/50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`font-semibold ${
                          darkMode ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                          {review.userName || 'Anonymous'}
                        </span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5, 6, 7].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= (review.rating || 5)
                                  ? 'text-yellow-400 fill-current'
                                  : darkMode 
                                    ? 'text-gray-500' 
                                    : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
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
                Belum ada review untuk website ini
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Jadilah yang pertama memberikan review!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}