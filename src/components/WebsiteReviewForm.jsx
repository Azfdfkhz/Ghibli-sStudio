import { Star } from "lucide-react";
import { useState } from "react";
import { validateReview } from "../services/services";

export default function WebsiteReviewForm({ 
  darkMode, 
  onSubmit, 
  submitting, 
  error 
}) {
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateReview(reviewText);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError('');

    try {
      await onSubmit({
        text: reviewText,
        userName: userName || 'Anonymous',
        rating: rating
      });
      
      // Reset form setelah submit berhasil
      setReviewText('');
      setUserName('');
      setRating(5);
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        {/* Nama Input */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Nama (opsional)
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nama Anda"
            className={`w-full p-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        {/* Rating */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5, 6, 7].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? 'text-yellow-400 fill-current'
                      : darkMode 
                        ? 'text-gray-500' 
                        : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Review Website
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
              setFormError('');
            }}
            placeholder="Bagaimana pendapat Anda tentang website ini? Fitur apa yang paling Anda sukai?"
            rows="4"
            className={`w-full p-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
          />
          <div className={`text-xs mt-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {reviewText.length}/500 karakter, gabener awas aja!
          </div>
        </div>

        {/* Error Messages */}
        {formError && (
          <div className={`p-3 rounded-lg ${
            darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-700'
          }`}>
            {formError}
          </div>
        )}

        {error && (
          <div className={`p-3 rounded-lg ${
            darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-700'
          }`}>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting || !reviewText.trim()}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            submitting || !reviewText.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : darkMode
                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          {submitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Mengirim...</span>
            </div>
          ) : (
            'Kirim Review'
          )}
        </button>
      </div>
    </div>
  );
}