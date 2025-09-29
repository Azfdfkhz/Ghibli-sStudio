import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Banner from "./components/Banner";
import Movie from "./components/Movie";
import FilmList from "./components/FilmList";
import CharacterList from "./components/CharacterList";

export default function App() {
  const [films, setFilms] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // fetch data
  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data);
        const totoroIndex = data.findIndex((film) =>
          film.title.toLowerCase().includes("totoro")
        );
        if (totoroIndex !== -1) setCurrent(totoroIndex);
      })
      .catch(console.error);
  }, []);

  // autoplay carousel
  useEffect(() => {
    if (!isAutoPlaying || films.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % films.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, films.length]);

  const nextFilm = () => {
    setCurrent((prev) => (prev + 1) % films.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevFilm = () => {
    setCurrent((prev) => (prev - 1 + films.length) % films.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleFilmSelect = (film) => {
    setSelectedFilm(film);
    setIsAutoPlaying(false);
  };

  const handleCloseMovie = () => {
    setSelectedFilm(null);
    setIsAutoPlaying(true);
  };

  if (films.length === 0) {
    return (
      <div
        className={`flex h-screen animate-pulse ${
          darkMode ? "bg-gray-900" : "bg-blue-400"
        }`}
      >
        <div className="hidden lg:block">
          <Sidebar darkMode={darkMode} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div
            className={`text-xl animate-bounce ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Loading films...
          </div>
        </div>
      </div>
    );
  }

  const currentFilm = films[current];

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-1000 ${
        darkMode
          ? "bg-gradient-to-br from-blue-950 via-blue-900 to-black"
          : "bg-gradient-to-br from-blue-500 via-blue-300 to-blue-200"
      }`}
    >
      <div className="hidden lg:block animate-slide-in-left">
        <Sidebar darkMode={darkMode} />
      </div>

      <Routes>
        {/* Halaman Utama */}
        <Route
          path="/"
          element={
            selectedFilm ? (
              <div className="animate-fade-in">
                <Movie
                  film={selectedFilm}
                  onClose={handleCloseMovie}
                  darkMode={darkMode}
                />
              </div>
            ) : (
              <main className="flex-1 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transition-all duration-1000 animate-fade-in"
                  style={{
                    backgroundImage: currentFilm?.movie_banner
                      ? `url(${currentFilm.movie_banner})`
                      : 'url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
                  }}
                />
                <div
                  className={`absolute inset-0 ${
                    darkMode ? "bg-black/50" : "bg-white/20"
                  } transition-all duration-1000`}
                />
                <Banner
                  film={currentFilm}
                  films={films}
                  onPrev={prevFilm}
                  onNext={nextFilm}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  onSelectFilm={handleFilmSelect}
                />
              </main>
            )
          }
        />

        {/* Halaman List Film */}
        <Route
          path="/films"
          element={
            <div className="animate-fade-in">
              <FilmList films={films} darkMode={darkMode} />
            </div>
          }
        />

        {/* Halaman List Character */}
        <Route
          path="/characters"
          element={
            <div className="animate-fade-in">
              <CharacterList darkMode={darkMode} />
            </div>  
          }
        />
      </Routes>
    </div>
  );
}


