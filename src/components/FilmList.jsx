import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function FilmList({ films, darkMode, onSelectFilm }) {
  return (
    <div
      className={`flex-1 h-full overflow-y-auto p-6 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-transparent text-gray-900"
      }`}
      style={{
        scrollbarWidth: "none", // Firefox
      }}
    >
      {/* Sembunyikan scrollbar untuk Chrome, Safari, Opera */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <h1 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
        🎬 Daftar Film Ghibli
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {films.map((film, index) => (
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.4}
            glareColor="#ffffff"
            glarePosition="all"
            scale={1.05}
            transitionSpeed={1500}
            key={film.id}
          >
            <motion.div
              onClick={() => onSelectFilm(film)}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg 
                         border border-white/20 backdrop-blur-lg 
                         bg-white/10 dark:bg-gray-800/30"
            >
              <img
                src={film.image}
                alt={film.title}
                className="w-full h-72 object-cover group-hover:brightness-110 transition duration-500"
              />

              {/* Overlay muncul saat hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center 
                           bg-black/50 backdrop-blur-md text-center px-3 transition"
              >
                <h3 className="text-white font-bold text-sm md:text-base drop-shadow mb-2">
                  {film.title}
                </h3>
                <div className="flex items-center justify-center">
                  <span className="text-yellow-400 text-xs mr-1">⭐</span>
                  <span className="text-white text-xs">{film.rt_score}/100</span>
                </div>
              </motion.div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </div>
  );
}
