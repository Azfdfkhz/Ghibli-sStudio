import Tilt from "react-parallax-tilt";

export default function FilmCard({ film, onClick, size = "w-48 h-72", tiltMax = 15, scale = 1.05 }) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      scale={scale}
      transitionSpeed={400}
      tiltMaxAngleX={tiltMax}
      tiltMaxAngleY={tiltMax}
      className={`${size} cursor-pointer`}
      onClick={onClick}
    >
      <div className="relative group rounded-xl overflow-hidden shadow-lg border border-white/30 backdrop-blur-sm bg-white/10">
        <img
          src={film.image || film.movie_banner}
          alt={film.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 text-center px-3">
          <h3 className="text-white font-semibold text-sm drop-shadow">{film.title}</h3>
          <div className="flex items-center justify-center mt-1">
            <span className="text-yellow-400 text-xs mr-1">⭐</span>
            <span className="text-white text-xs">{film.rt_score}/100 Rating</span>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
