import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Banner from "./components/Banner";
import Movie from "./components/Movie";
import FilmList from "./components/FilmList";
import CharacterList from "./components/CharacterList";
import LoginCard from "./components/LoginCard";
import AboutUs from "./components/AboutUs";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";

import { api, FALLBACK_FILMS } from "./api/ghibli";
import { authService } from "./services/authService";
import { storage, STORAGE_KEYS } from "./utils/storage";

export default function App() {
  const [films, setFilms] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const authData = authService.getAuthData();
        
        if (authData.isLoggedIn && authData.username) {
          setIsLoggedIn(true);
          setUsername(authData.username);
        }
        
        // Load dark mode preference
        const savedDarkMode = storage.get(STORAGE_KEYS.DARK_MODE, false);
        setDarkMode(savedDarkMode);
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    storage.set(STORAGE_KEYS.DARK_MODE, darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchFilms = async () => {
      if (!isLoggedIn) return;

      try {
        setLoading(true);
        setError(null);
        
        const startTime = Date.now();
        
        // Fetch films from API
        const data = await api.getFilms();
        
        if (Array.isArray(data) && data.length > 0) {
          setFilms(data);
          
          // Set Totoro sebagai film awal
          const totoroIndex = data.findIndex((film) =>
            film.title.toLowerCase().includes("totoro")
          );
          setCurrent(totoroIndex !== -1 ? totoroIndex : 0);
        } else {
          throw new Error("No films data received");
        }

        // Minimum loading time untuk UX
        const elapsedTime = Date.now() - startTime;
        const minimumLoadingTime = 2500;
        
        if (elapsedTime < minimumLoadingTime) {
          await new Promise(resolve => 
            setTimeout(resolve, minimumLoadingTime - elapsedTime)
          );
        }

      } catch (err) {
        console.error("Fetch films failed:", err);
        setError("Gagal mengambil data film. Menggunakan data fallback.");
        
        // Use fallback data
        setFilms(FALLBACK_FILMS);
        setCurrent(0);
        
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isAutoPlaying || films.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % films.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, films.length]);

  const nextFilm = () => {
    setCurrent((prev) => (prev + 1) % films.length);
    pauseAutoPlay();
  };

  const prevFilm = () => {
    setCurrent((prev) => (prev - 1 + films.length) % films.length);
    pauseAutoPlay();
  };

  const pauseAutoPlay = () => {
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

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    authService.login(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setSelectedFilm(null);
    setIsAutoPlaying(true);
    setFilms([]);
    setLoading(true);
    authService.logout();
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  // Loading - Checking Auth
  if (checkingAuth) {
    return <LoadingScreen darkMode={darkMode} message="Checking Authentication..." />;
  }

  // Not Logged In - Show Login
  if (!isLoggedIn) {
    return (
      <div className={`flex min-h-screen items-center justify-center transition-colors duration-1000 ${
        darkMode
          ? "bg-gradient-to-br from-blue-950 via-blue-900 to-black"
          : "bg-gradient-to-br from-blue-500 via-blue-300 to-blue-200"
      }`}>
        <LoginCard onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Loading - Fetching Films
  if (loading) {
    return (
      <div className={`flex h-screen ${
        darkMode 
          ? "bg-gradient-to-br from-blue-950 via-blue-900 to-black" 
          : "bg-gradient-to-br from-blue-500 via-blue-300 to-blue-200"
      }`}>
        <Sidebar darkMode={darkMode} onLogout={handleLogout} />
        <div className="flex-1 lg:ml-28">
          <LoadingScreen darkMode={darkMode} message="Loading Studio Ghibli Films..." />
        </div>
      </div>
    );
  }

  // Error State
  if (error && films.length === 0) {
    return (
      <div className={`flex h-screen ${
        darkMode ? "bg-gray-900" : "bg-blue-400"
      }`}>
        <Sidebar darkMode={darkMode} onLogout={handleLogout} />
        <div className="flex-1 lg:ml-28">
          <ErrorScreen 
            darkMode={darkMode} 
            error={error} 
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  // No Films Found
  if (films.length === 0) {
    return (
      <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-blue-400"}`}>
        <Sidebar darkMode={darkMode} onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center lg:ml-28">
          <div className={`text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>
            Tidak ada film yang ditemukan
          </div>
        </div>
      </div>
    );
  }

  const currentFilm = films[current];

  return (
    <div className={`flex min-h-screen overflow-hidden transition-colors duration-1000 ${
      darkMode
        ? "bg-gradient-to-br from-blue-950 via-blue-900 to-black"
        : "bg-gradient-to-br from-blue-500 via-blue-300 to-blue-200"
    }`}>
      <Sidebar darkMode={darkMode} onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col lg:pb-0 pb-24 lg:ml-28 overflow-hidden">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              selectedFilm ? (
                <div className="flex-1 animate-fade-in">
                  <Movie
                    film={selectedFilm}
                    onClose={handleCloseMovie}
                    darkMode={darkMode}
                    username={username}
                  />
                </div>
              ) : (
                <main className="flex-1 relative overflow-hidden">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transition-all duration-1000 animate-fade-in"
                    style={{
                      backgroundImage: currentFilm?.movie_banner
                        ? `url(${currentFilm.movie_banner})`
                        : 'url("https://images.unsplash.com/photo-1578662996442-48f60103fc96")',
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

          {/* Films Route */}
          <Route
            path="/films"
            element={
              selectedFilm ? (
                <div className="flex-1 animate-fade-in">
                  <Movie
                    film={selectedFilm}
                    onClose={handleCloseMovie}
                    darkMode={darkMode}
                    username={username}
                  />
                </div>
              ) : (
                <div className="flex-1 animate-fade-in">
                  <FilmList 
                    films={films} 
                    darkMode={darkMode} 
                    onSelectFilm={handleFilmSelect}
                  />
                </div>
              )
            }
          />

          {/* Characters Route */}
          <Route
            path="/characters"
            element={
              <div className="flex-1 animate-fade-in">
                <CharacterList darkMode={darkMode} />
              </div>  
            }
          />

          {/* About Route */}
          <Route
            path="/about"
            element={
              <div className="flex-1 animate-fade-in">
                <AboutUs 
                  darkMode={darkMode} 
                  username={username} 
                  onLogout={handleLogout} 
                />
              </div>  
            }
          />
        </Routes>
      </div>
    </div>
  );
}