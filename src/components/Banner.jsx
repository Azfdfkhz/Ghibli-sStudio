import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Sun, Moon, Cloud } from "lucide-react";
import logo from "../Logo/logo.png";
import FilmCard from "./FilmCard";

export default function Banner({ film, films, onPrev, onNext, darkMode, setDarkMode, onSelectFilm }) {
  const [query, setQuery] = useState("");

  if (!film) return null;
  
  let filteredFilms = [];
  if (films) {
    filteredFilms = films.filter((f) =>
      f.title.toLowerCase().startsWith(query.toLowerCase())
    );
    if (filteredFilms.length === 0) {
      filteredFilms = films.filter((f) =>
        f.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  const activeFilm = film;

  return (
    <div className="relative z-10 h-full flex flex-col">
      {/* Dark Mode Button */}
      <div className="absolute top-3 right-4 md:top-5 md:right-8 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 md:p-3 rounded-full bg-white/30 hover:bg-white/50 
                     backdrop-blur-md shadow-lg transition-all"
        >
          {darkMode ? (
            <Sun className="text-yellow-300" size={18} />
          ) : (
            <Moon className="text-blue-900" size={18} />
          )}
        </button>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden flex flex-col h-full">
        {/* Navigation Buttons - Mobile (Fixed Position) */}
        <button
          onClick={onPrev}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white active:bg-gray-100 p-4 rounded-full transition-all duration-300 shadow-lg z-40"
        >
          <ChevronLeft className="text-gray-700" size={24} />
        </button>
        
        <button
          onClick={onNext}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white active:bg-gray-100 p-4 rounded-full transition-all duration-300 shadow-lg z-40"
        >
          <ChevronRight className="text-gray-700" size={24} />
        </button>

        {/* Header Logo + Search - Mobile */}
        <div className="relative flex flex-col items-center pt-4 pb-6 px-4">
          <div className="flex items-center mb-4">
            <img src={logo} alt="Logo" className="w-32 h-14" />
          </div>

          <div className="w-80 max-w-sm">
            <div className="flex items-center bg-white/20 backdrop-blur-lg px-4 py-2.5 rounded-full shadow-xl border border-white/30 relative z-50">
              <Search className="text-white/80 mr-3" size={18} />
              <input
                type="text"   
                placeholder="Search film..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-sm"
              />

              {query && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white/30 backdrop-blur-md rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                  {filteredFilms.length > 0 ? (
                    filteredFilms.map((f) => (
                      <div
                        key={f.id}
                        onClick={() => { onSelectFilm(f); setQuery(""); }}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white/40 active:bg-white/90 transition backdrop-blur-md rounded"
                      >
                        <img src={f.image} alt={f.title} className="w-8 h-10 object-cover rounded" />
                        <span className="text-gray-900 dark:text-black-100 font-medium text-sm">{f.title}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-black-600 text-sm">Nyari apa kocak...</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div> 

        {/* Main Content - Mobile */}
        <div className="flex-1 flex flex-col justify-center items-center text-white px-16 relative">
          <div className="text-center max-w-xs mb-8">
            <h1 className="text-2xl font-bold mb-3 drop-shadow-lg tracking-wider leading-tight">
              {activeFilm?.title?.toUpperCase() || "MY NEIGHBOR TOTORO"}
            </h1>
            <p className="text-sm leading-relaxed drop-shadow-md mx-auto opacity-90 line-clamp-4 max-w-sm">
              {activeFilm?.description
                ? activeFilm.description.length > 150
                  ? activeFilm.description.substring(0, 150) + "..."
                  : activeFilm.description
                : "Two sisters move to the country with their father..."}
            </p>
          </div>
        </div>

        {/* Film Cards Section - Mobile */}
        <div className="flex-none px-4 pb-50">
          <div className="space-y-7 ">
            {/* Featured Film Card - Larger */}
            <div 
              onClick={() => onSelectFilm(activeFilm)}
              onTouchStart={(e) => e.currentTarget.classList.add('touched')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
              className="group cursor-pointer transform active:scale-[0.98] transition-all duration-300"
            >
              <div className="bg-white/20 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-white/30 relative w-64 h-90 mx-auto">
                <img 
                  src={activeFilm?.image || activeFilm?.movie_banner} 
                  alt={activeFilm?.title}
                  className="w-full h-full object-cover"
                />
                {/* Touch/Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-active:opacity-100 touched:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="font-bold text-base text-white mb-2">
                    {activeFilm?.title}
                  </h3>
                  <p className="text-sm text-gray-200 line-clamp-3">
                    {activeFilm?.description}
                  </p>
                  <div className="text-xs text-gray-300 mt-2">
                    {activeFilm?.release_date} • {activeFilm?.director}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLET LAYOUT */}
      <div className="hidden md:flex lg:hidden flex-col h-full">
        {/* Header Logo + Search - Tablet */}
        <div className="relative flex items-center pt-6 pb-4 px-8">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-40 h-16" />
          </div>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-80">
            <div className="flex items-center bg-white/20 backdrop-blur-lg px-5 py-3 rounded-full shadow-xl border border-white/30 relative z-50">
              <Search className="text-white/80 mr-3" size={18} />
              <input
                type="text"
                placeholder="Search film..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-white/60"
              />

              {query && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white/60 backdrop-blur-md rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                  {filteredFilms.length > 0 ? (
                    filteredFilms.map((f) => (
                      <div
                        key={f.id}
                        onClick={() => { onSelectFilm(f); setQuery(""); }}
                        className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-white/40 transition backdrop-blur-md rounded"
                      >
                        <img src={f.image} alt={f.title} className="w-10 h-14 object-cover rounded" />
                        <span className="text-gray-900 dark:text-black-100 font-medium">{f.title}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-600">Nyari apa kocak...</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - Tablet */}
        <div className="flex-1 flex flex-col justify-center items-center text-white px-6 relative">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg tracking-wider">
              {activeFilm?.title?.toUpperCase() || "MY NEIGHBOR TOTORO"}
            </h1>
            <p className="text-base leading-relaxed drop-shadow-md mx-auto opacity-90 line-clamp-3 max-w-lg">
              {activeFilm?.description
                ? activeFilm.description.length > 180
                  ? activeFilm.description.substring(0, 180) + "..."
                  : activeFilm.description
                : "Two sisters move to the country with their father..."}
            </p>
          </div>

          {/* Navigation Buttons - Tablet */}
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronLeft className="text-gray-700" size={24} />
          </button>

          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronRight className="text-gray-700" size={24} />
          </button>
        </div>

        {/* Film Cards - Tablet Grid */}
        <div className="mt-auto pb-70 px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {films.slice(0, 4).map((film) => (
              <div 
                key={film.id} 
                onClick={() => onSelectFilm(film)}
                className="group cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="bg-white/20 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl border border-white/30 relative w-40 h-52">
                  <img 
                    src={film?.image || film?.movie_banner} 
                    alt={film?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="font-bold text-white text-sm mb-1">
                      {film?.title}
                    </h3>
                    <p className="text-xs text-gray-200 line-clamp-2">
                      {film?.description?.substring(0, 60)}...
                    </p>
                    <div className="text-xs text-gray-300 mt-1">
                      {film?.release_date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex flex-col h-full">
        {/* Header Logo + Search - Desktop */}
        <div className="relative flex items-center pt-8 pb-4 px-12">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-45 h-20" />
          </div>

          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 w-96">
            <div className="flex items-center bg-white/20 backdrop-blur-lg px-6 py-3 rounded-full shadow-xl border border-white/30 relative z-50">
              <Search className="text-white/80 mr-3" size={20} />
              <input
                type="text"
                placeholder="Search film..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-white/60"
              />

              {query && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white/30 backdrop-blur-md rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                  {filteredFilms.length > 0 ? (
                    filteredFilms.map((f) => (
                      <div
                        key={f.id}
                        onClick={() => { onSelectFilm(f); setQuery(""); }}
                        className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-white/40 transition backdrop-blur-md rounded"
                      >
                        <img src={f.image} alt={f.title} className="w-10 h-14 object-cover rounded" />
                        <span className="text-gray-900 dark:text-black-100 font-medium">{f.title}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-600">Nyari apa kocak...</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - Desktop */}
        <div className="flex-1 flex flex-col justify-center items-center text-white px-8 relative">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg tracking-wider">
              {activeFilm?.title?.toUpperCase() || "MY NEIGHBOR TOTORO"}
            </h1>
            <p className="text-base leading-relaxed drop-shadow-md max-w-xl mx-auto opacity-90 line-clamp-3">
              {activeFilm?.description
                ? activeFilm.description.length > 200
                  ? activeFilm.description.substring(0, 200) + "..."
                  : activeFilm.description
                : "Two sisters move to the country with their father..."}
            </p>
          </div>

          {/* Navigation Buttons - Desktop */}
          <button
            onClick={onPrev}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronLeft className="text-gray-700" size={28} />
          </button>

          <button
            onClick={onNext}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-4 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronRight className="text-gray-700" size={28} />
          </button>
        </div>

        {/* Film Cards - Desktop Row */}
        <div className="mt-auto pb-6 xl:pb-9">
          <div className="flex justify-center gap-4 xl:gap-6 px-4 xl:px-8">
            {films.slice(0, 4).map((film) => (
              <div 
                key={film.id} 
                onClick={() => onSelectFilm(film)} 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300 relative"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <FilmCard film={film} darkMode={darkMode} />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">
                      {film?.title}
                    </h3>
                    <p className="text-xs text-gray-200 line-clamp-3 mb-2">
                      {film?.description?.substring(0, 100)}...
                    </p>
                    <div className="text-xs text-gray-300">
                      {film?.release_date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!darkMode ? (
        <>
          <div className="absolute top-0 left-0 w-full h-32 md:h-40 overflow-hidden pointer-events-none">
            {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : 6)].map((_, i) => (
              <Cloud
                key={i}
                size={typeof window !== 'undefined' && window.innerWidth < 768 ? 40 + Math.random() * 20 : 60 + Math.random() * 30}
                className="absolute text-white/60 md:text-white/80"
                style={{
                  top: `${10 + Math.random() * 25}%`,
                  left: `${-20 + i * (typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 25)}%`,
                  animation: `driftCloud ${typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 30}s linear infinite, floatCloud 6s ease-in-out infinite`,
                  animationDelay: `${i * 4}s`,
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 25)].map((_, i) => (
            <span
              key={i}
              className="absolute text-sm md:text-lg animate-pulse"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              ⭐
            </span>
          ))}
        </div>
      )}
    </div>
  );
}