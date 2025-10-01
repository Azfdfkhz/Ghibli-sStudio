import { ArrowLeft, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Movie({ film, onClose, darkMode }) {
  const [newReview, setNewReview] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviews, setReviews] = useState(film.reviews || []);

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    setReviews([
      ...reviews,
      { user: "Kamu", rating: newReviewRating, comment: newReview.trim() },
    ]);
    setNewReview("");
    setNewReviewRating(5);
  };

  return (
    <div className={`relative p-6 h-full overflow-y-auto bg-gradient-to-b ${darkMode ? "from-gray-900 to-gray-800" : "from-blue-200 to-blue-400"}`}>
      
      {/* Back Button */}
      <motion.button
        onClick={onClose}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 px-5 py-2 bg-white/100 dark:bg-white-800/60 backdrop-blur-md shadow-lg rounded-2xl hover:scale-105 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-transform"
      >
        <ArrowLeft className="w-5 h-5 text-white-100 dark:text-white-100" /> back
      </motion.button>

      {/* Grid */}
      <div className="mt-8 px-4 md:px-8 max-w-[1200px] mx-auto grid md:grid-cols-[320px_1fr] gap-10 items-start">
        {/* Poster */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden shadow-2xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 hover:scale-105 transition-transform"
        >
          <img
            src={film.image}
            alt={film.title}
            className="w-full h-auto object-cover"
          />
          <div className="flex items-center justify-center gap-2 py-3 bg-white/30 dark:bg-gray-800/40 backdrop-blur-md">
            <Star className="text-yellow-400 w-5 h-5" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {film.rt_score}/100 Rating
            </span>
          </div>
        </motion.div>

        {/* Detail + Review */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="p-6 rounded-3xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-600/30"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100"
          >
            {film.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-4 text-gray-800 dark:text-gray-200 leading-relaxed"
          >
            {film.description}
          </motion.p>

          <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <span className="font-semibold">Release:</span> {film.release_date}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <span className="font-semibold">Director:</span> {film.director}
            </motion.p>
          </div>

          {/* Streaming */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-8"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Layanan Streaming
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                { name: "Vidio", icon: "/vidio-logo.png" },
                { name: "Netflix", icon: "/netflix-logo.png" },
                { name: "Disney+", icon: "/disney-plus.png" },
              ].map((service, i) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + i * 0.2 }}
                  className="flex flex-col items-center gap-2 hover:scale-110 transition-transform"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {service.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Review */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5 }}
            className="mt-10 p-6 rounded-3xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-gray-600/30"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Review & Komentar
            </h2>
            <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
              {reviews.length > 0 ? (
                reviews.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="p-4 rounded-xl bg-white/30 dark:bg-gray-700/40 backdrop-blur-md shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{review.user}</span>
                      <span className="flex items-center gap-1 text-yellow-400">
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4" />
                        ))}
                      </span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">{review.comment}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-700 dark:text-gray-300">Belum ada review untuk film ini.</p>
              )}
            </div>

            {/* Input review baru */}
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-start">
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map(num => (
                  <Star
                    key={num}
                    className={`w-6 h-6 cursor-pointer transition-colors ${
                      num <= newReviewRating ? "text-yellow-400" : "text-gray-400 dark:text-gray-500"
                    }`}
                    onClick={() => setNewReviewRating(num)}
                  />
                ))}
              </div>
              <input
                type="text"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Tulis review kamu..."
                className="flex-1 p-3 rounded-xl outline-none bg-white/30 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-300 backdrop-blur-md"
              />
              <button
                onClick={handleAddReview}
                className="px-5 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
