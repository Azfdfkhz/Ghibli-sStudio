import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Banner from "./components/Banner";
import Movie from "./components/Movie";
import FilmList from "./components/FilmList";
import CharacterList from "./components/CharacterList";
import LoginCard from "./components/LoginCard";
import AboutUs from "./components/AboutUs";

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
  const [checkingAuth, setCheckingAuth] = useState(true); // State baru untuk cek auth

  // Cek status login saat komponen mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedAuth = localStorage.getItem('ghibliAuth');
        if (savedAuth) {
          const authData = JSON.parse(savedAuth);
          if (authData.isLoggedIn && authData.username) {
            setIsLoggedIn(true);
            setUsername(authData.username);
            
            // Juga cek dark mode preference
            const savedDarkMode = localStorage.getItem('darkMode');
            if (savedDarkMode) {
              setDarkMode(JSON.parse(savedDarkMode));
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Simpan status login ke localStorage saat berubah
  useEffect(() => {
    if (isLoggedIn && username) {
      localStorage.setItem('ghibliAuth', JSON.stringify({
        isLoggedIn: true,
        username: username
      }));
    } else {
      localStorage.removeItem('ghibliAuth');
    }
  }, [isLoggedIn, username]);

  // Simpan dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch films (sama seperti sebelumnya)
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const startTime = Date.now();
        
        const endpoints = [
          '/api/films',
          'https://ghibliapi.vercel.app/films',
          'https://api.allorigins.win/raw?url=https://ghibliapi.vercel.app/films'
        ];

        let success = false;
        
        for (const endpoint of endpoints) {
          try {
            console.log(`Trying: ${endpoint}`);
            const response = await fetch(endpoint);
            
            if (response.ok) {
              const data = await response.json();
              if (Array.isArray(data) && data.length > 0) {
                setFilms(data);
                const totoroIndex = data.findIndex((film) =>
                  film.title.toLowerCase().includes("totoro")
                );
                setCurrent(totoroIndex !== -1 ? totoroIndex : 0);
                success = true;
                console.log(`Success with: ${endpoint}`);
                break;
              }
            }
          } catch (e) {
            console.log(`Failed: ${endpoint}`, e.message);
            continue;
          }
        }

        if (!success) {
          throw new Error("All API endpoints failed");
        }

        const elapsedTime = Date.now() - startTime;
        const minimumLoadingTime = 2500;
        
        if (elapsedTime < minimumLoadingTime) {
          await new Promise(resolve => setTimeout(resolve, minimumLoadingTime - elapsedTime));
        }

      } catch (err) {
        console.error("All fetch attempts failed:", err);
        setError("Gagal mengambil data film. Coba refresh halaman.");
        
        const fallbackFilms = [
          {
            id: "1",
            title: "My Neighbor Totoro",
            description: "Fallback film data",
            director: "Hayao Miyazaki",
            release_date: "1988",
            rt_score: "93",
            movie_banner: "https://via.placeholder.com/800x400"
          }
        ];
        setFilms(fallbackFilms);
        
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchFilms();
    }
  }, [isLoggedIn]);

  // autoplay carousel (sama seperti sebelumnya)
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

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setSelectedFilm(null);
    setIsAutoPlaying(true);
    setFilms([]);
    setLoading(true);
    // Jangan lupa hapus dari localStorage saat logout
    localStorage.removeItem('ghibliAuth');
  };

  // TAMPILKAN LOADING SAAT MASIH MENGECEK AUTH STATUS
  if (checkingAuth) {
    return (
      <div className={`flex h-screen ${
        darkMode ? "bg-gradient-to-br from-blue-950 via-blue-900 to-black" : "bg-gradient-to-br from-blue-500 via-blue-300 to-blue-200"
      }`}>
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Animated Totoro Loading */}
          <div className="relative">
            {/* Totoro Body */}
            <div className={`w-32 h-32 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-600"
            } relative animate-bounce shadow-2xl`}>
              {/* Eyes */}
              <div className="absolute top-10 left-6 w-6 h-6 bg-white rounded-full animate-pulse">
                <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-10 right-6 w-6 h-6 bg-white rounded-full animate-pulse">
                <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
              </div>
              {/* Mouth */}
              <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 ${
                darkMode ? "border-gray-900" : "border-gray-800"
              } rounded-b-full`}></div>
              {/* Belly Pattern */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gray-400/40 rounded-full"></div>
            </div>
            
            {/* Floating leaves */}
            <div className="absolute -top-8 -left-8 w-8 h-8 bg-green-500/60 rounded-full animate-ping"></div>
            <div className="absolute -top-4 -right-6 w-6 h-6 bg-green-400/60 rounded-full animate-ping delay-150"></div>
            <div className="absolute -bottom-6 -left-4 w-4 h-4 bg-green-600/60 rounded-full animate-ping delay-300"></div>
          </div>

          {/* Loading Text */}
          <div className="mt-12 text-center">
            <div className={`text-2xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            } animate-pulse`}>
              Checking Authentication...
            </div>
            
            {/* Animated Dots */}
            <div className="flex justify-center space-x-2">
              <div className={`w-3 h-3 ${
                darkMode ? "bg-blue-400" : "bg-blue-600"
              } rounded-full animate-bounce`}></div>
              <div className={`w-3 h-3 ${
                darkMode ? "bg-blue-400" : "bg-blue-600"
              } rounded-full animate-bounce delay-100`} style={{ animationDelay: '0.1s' }}></div>
              <div className={`w-3 h-3 ${
                darkMode ? "bg-blue-400" : "bg-blue-600"
              } rounded-full animate-bounce delay-200`} style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // JIKA BELUM LOGIN, TAMPILKAN LOGIN CARD
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

  // TAMPILKAN LOADING STATE UNTUK DATA FILM
  if (loading) {
    return (
      <div className={`flex h-screen ${
        darkMode ? "bg-gradient-to-br from-blue-950 via-blue-900 to-black" : "bg-gradient-to-br from-blue-500 via-blue-300 to-blue-200"
      }`}>
        <Sidebar darkMode={darkMode} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col items-center justify-center lg:ml-28">
          {/* Animated Totoro Loading */}
          <div className="relative">
            {/* Totoro Body */}
            <div className={`w-32 h-32 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-600"
            } relative animate-bounce shadow-2xl`}>
              {/* Eyes */}
              <div className="absolute top-10 left-6 w-6 h-6 bg-white rounded-full animate-pulse">
                <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-10 right-6 w-6 h-6 bg-white rounded-full animate-pulse">
                <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
              </div>
              {/* Mouth */}
              <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 ${
                darkMode ? "border-gray-900" : "border-gray-800"
              } rounded-b-full`}></div>
              {/* Belly Pattern */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gray-400/40 rounded-full"></div>
            </div>
            
            {/* Floating leaves */}
            <div className="absolute -top-8 -left-8 w-8 h-8 bg-green-500/60 rounded-full animate-ping"></div>
            <div className="absolute -top-4 -right-6 w-6 h-6 bg-green-400/60 rounded-full animate-ping delay-150"></div>
            <div className="absolute -bottom-6 -left-4 w-4 h-4 bg-green-600/60 rounded-full animate-ping delay-300"></div>
          </div>

          {/* Loading Text */}
          <div className="mt-12 text-center">
            <div className={`text-2xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            } animate-pulse`}>
              Loading Studio Ghibli Films...
            </div>
            
            {/* Animated Dots */}
            <div className="flex justify-center space-x-2">
              <div className={`w-3 h-3 ${
                darkMode ? "bg-blue-400" : "bg-blue-600"
              } rounded-full animate-bounce`}></div>
              <div className={`w-3 h-3 ${
                darkMode ? "bg-blue-400" : "bg-blue-600"
              } rounded-full animate-bounce delay-100`} style={{ animationDelay: '0.1s' }}></div>
              <div className={`w-3 h-3 ${
                darkMode ? "bg-blue-400" : "bg-blue-600"
              } rounded-full animate-bounce delay-200`} style={{ animationDelay: '0.2s' }}></div>
            </div>

            {/* Progress Bar */}
            <div className={`mt-6 w-64 h-2 ${
              darkMode ? "bg-gray-700" : "bg-white/30"
            } rounded-full overflow-hidden backdrop-blur-sm`}>
              <div className={`h-full ${
                darkMode ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-600 to-purple-600"
              } rounded-full animate-progress`}></div>
            </div>

            <div className={`mt-4 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Mengambil data dari API...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ... (sisa kode untuk error handling dan render utama tetap sama)
  if (error) {
    return (
      <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-blue-400"}`}>
        <Sidebar darkMode={darkMode} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:ml-28">
          <div className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Error: {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className={`mt-4 px-4 py-2 rounded ${
              darkMode 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Coba Lagi
          </button>
          <div className={`mt-4 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Jika error terus terjadi, coba:
            <ul className="list-disc list-inside mt-2">
              <li>Periksa koneksi internet nya woi...</li>
              <li>Buka console browser untuk detail error</li>
              <li>Coba akses API langsung: <a href="https://ghibliapi.vercel.app/films" className="underline">https://ghibliapi.vercel.app/films</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

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
          <Route
            path="/"
            element={
              selectedFilm ? (
                <div className="flex-1 animate-fade-in">
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
          <Route
            path="/films"
            element={
              selectedFilm ? (
                <div className="flex-1 animate-fade-in">
                  <Movie
                    film={selectedFilm}
                    onClose={handleCloseMovie}
                    darkMode={darkMode}
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

          <Route
            path="/characters"
            element={
              <div className="flex-1 animate-fade-in">
                <CharacterList darkMode={darkMode} />
              </div>  
            }
          />

          <Route
            path="/about"
            element={
              <div className="flex-1 animate-fade-in">
                <AboutUs darkMode={darkMode} username={username} onLogout={handleLogout} />
              </div>  
            }
          />
        </Routes>
      </div>
    </div>
  );
}
