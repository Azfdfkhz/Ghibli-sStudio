import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Star, Play } from "lucide-react";

export default function FilmList({ films, darkMode, onSelectFilm }) {
  return (
    <div
      className={`flex-1 h-full overflow-y-auto p-6 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-transparent text-gray-900"
      }`}
      style={{
        scrollbarWidth: "none",
      }}
    >
      {/* Sembunyikan scrollbar untuk Chrome, Safari, Opera */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold mb-8 text-center tracking-wide"
      >
        🎬 Daftar Film Ghibli
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {films.map((film, index) => (
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.3}
            glareColor={darkMode ? "#ffffff" : "#000000"}
            glarePosition="all"
            scale={1.05}
            transitionSpeed={1500}
            key={film.id}
            className="rounded-2xl"
          >
            <motion.div
              onClick={() => onSelectFilm(film)}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl 
                         border border-white/20 backdrop-blur-lg 
                         bg-white/10 dark:bg-gray-800/30 hover:shadow-2xl transition-all duration-300"
            >
              {/* Film Image */}
              <img
                src={film.movie_banner || film.image} // Fallback ke movie_banner
                alt={film.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x400/4A5568/FFFFFF?text=No+Image";
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="font-bold text-sm mb-2 line-clamp-2 leading-tight drop-shadow-lg"
                >
                  {film.title}
                </motion.h3>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold">{film.rt_score}/100</span>
                  </div>
                  <span className="text-xs bg-black/40 px-2 py-1 rounded-full">
                    {film.release_date}
                  </span>
                </motion.div>
              </div>

              {/* Hover Play Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="absolute bottom-4 text-white text-xs font-medium">
                  Klik untuk detail
                </span>
              </motion.div>

              {/* Director Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {film.director}
                </span>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>

      {/* Empty State */}
      {films.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-64 text-center"
        >
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold mb-2">Tidak ada film</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Film tidak ditemukan atau sedang loading...
          </p>
        </motion.div>
      )}
    </div>
  );
}
