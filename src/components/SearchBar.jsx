import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ films, onFilmSelect }) {
  const [searchValue, setSearchValue] = useState("");
  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center pt-8 pb-4 relative w-full">
      <div
        className="flex items-center 
        bg-gradient-to-r from-white/20 to-white/10
        backdrop-blur-lg 
        backdrop-saturate-150
        px-6 py-3 
        rounded-full 
        w-96 
        shadow-xl 
        border border-white/30 
        transition-all duration-300"
      >
        <Search className="text-white/80 mr-3" size={20} />
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder-white/60"
        />
      </div>

      {searchValue && (
        <div className="absolute top-20 w-96 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
          {filteredFilms.length > 0 ? (
            filteredFilms.map((film) => (
              <div
                key={film.id}
                className="flex items-center gap-3 p-3 hover:bg-white/20 cursor-pointer transition"
                onClick={() => onFilmSelect(film)}
              >
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <span className="text-white font-medium">{film.title}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-white/80 p-3">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}
