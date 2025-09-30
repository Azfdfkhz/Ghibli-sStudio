import { useEffect, useState } from "react";
import { Heart, X, User } from "lucide-react";

export default function CharacterList({ darkMode }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Data tanpa gambar eksternal
    const mockCharacters = [
      {
        id: 1,
        name: "Totoro",
        name_kanji: "トトロ",
        nicknames: ["Totoro", "King of the Forest"],
        favorites: 15642,
        about: "A large, friendly forest spirit who can only be seen by children. He helps Satsuki and Mei when they need him most.",
        gender: "Male",
        films: ["My Neighbor Totoro"]
      },
      {
        id: 2,
        name: "Chihiro Ogino",
        name_kanji: "荻野 千尋",
        nicknames: ["Chihiro", "Sen"],
        favorites: 12895,
        about: "A brave 10-year-old girl who gets trapped in the spirit world and must work in a bathhouse to save her parents.",
        gender: "Female",
        films: ["Spirited Away"]
      },
      {
        id: 3,
        name: "Haku",
        name_kanji: "ハク",
        nicknames: ["Nigi Hayama", "White Dragon", "Kohaku River"],
        favorites: 11234,
        about: "A mysterious boy who is actually the spirit of the Kohaku River. He works for Yubaba and helps Chihiro.",
        gender: "Male",
        films: ["Spirited Away"]
      },
      {
        id: 4,
        name: "Kiki",
        name_kanji: "キキ",
        nicknames: ["Kiki", "Witch"],
        favorites: 9876,
        about: "A 13-year-old witch in training who moves to a new town to start her own delivery service with her cat Jiji.",
        gender: "Female",
        films: ["Kiki's Delivery Service"]
      },
      {
        id: 5,
        name: "Howl Jenkins Pendragon",
        name_kanji: "ハウル・ジェンキンス・ペンドラゴン",
        nicknames: ["Howl", "Wizard", "Howl the Great"],
        favorites: 13456,
        about: "A powerful and handsome wizard who lives in a magical moving castle. He's known for being quite dramatic.",
        gender: "Male",
        films: ["Howl's Moving Castle"]
      },
      {
        id: 6,
        name: "Sophie Hatter",
        name_kanji: "ソフィー・ハッター",
        nicknames: ["Sophie", "Old Woman", "Grandma"],
        favorites: 8765,
        about: "A young hat maker who gets cursed by a witch and turned into an old woman. She becomes Howl's cleaning lady.",
        gender: "Female",
        films: ["Howl's Moving Castle"]
      },
      {
        id: 7,
        name: "Ponyo",
        name_kanji: "ポニョ",
        nicknames: ["Ponyo", "Brunhilde", "Goldfish"],
        favorites: 7654,
        about: "A goldfish who escapes from the ocean and becomes human after tasting human blood. She wants to be with Sosuke.",
        gender: "Female",
        films: ["Ponyo"]
      },
      {
        id: 8,
        name: "Satsuki Kusakabe",
        name_kanji: "草壁 サツキ",
        nicknames: ["Satsuki"],
        favorites: 6543,
        about: "Mei's responsible older sister who takes care of her while their mother is in the hospital.",
        gender: "Female",
        films: ["My Neighbor Totoro"]
      },
      {
        id: 9,
        name: "Mei Kusakabe",
        name_kanji: "草壁 メイ",
        nicknames: ["Mei", "Little Mei"],
        favorites: 5432,
        about: "Satsuki's energetic and curious little sister who first discovers Totoro in the forest.",
        gender: "Female",
        films: ["My Neighbor Totoro"]
      },
      {
        id: 10,
        name: "No-Face",
        name_kanji: "カオナシ",
        nicknames: ["No-Face", "Faceless", "Kaonashi"],
        favorites: 11987,
        about: "A lonely spirit who can absorb the personalities and emotions of those around him. He becomes attached to Chihiro.",
        gender: "Unknown",
        films: ["Spirited Away"]
      }
    ];

    setCharacters(mockCharacters);
    setLoading(false);
  }, []);

  const toggleFavorite = (characterId) => {
    setFavorites(prev =>
      prev.includes(characterId)
        ? prev.filter(id => id !== characterId)
        : [...prev, characterId]
    );
  };

  const isFavorite = (characterId) => favorites.includes(characterId);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className={`text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>
          Loading characters...
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className={`p-6 border-b ${
        darkMode ? "border-white/20 bg-white/5" : "border-gray-200 bg-white/50"
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-4xl font-bold text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Studio Ghibli Characters
          </h1>
          <p className={`text-center mt-2 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            {characters.length} magical characters
          </p>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((char) => (
              <div
                key={char.id}
                onClick={() => setSelectedCharacter(char)}
                className={`group cursor-pointer rounded-3xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  darkMode 
                    ? "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40" 
                    : "bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md border border-gray-200 hover:border-gray-300"
                } relative overflow-hidden`}
              >
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(char.id);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 z-10 ${
                    isFavorite(char.id)
                      ? "bg-red-500 text-white"
                      : darkMode
                      ? "bg-white/20 text-white/60 hover:bg-white/30"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <Heart size={18} fill={isFavorite(char.id) ? "currentColor" : "none"} />
                </button>

                {/* Character Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-4 border-white/50 shadow-lg">
                    <User size={32} className="text-white" />
                  </div>
                </div>

                {/* Character Info */}
                <h2 className="text-xl font-bold mb-2 text-center group-hover:text-blue-500 transition-colors duration-300">
                  {char.name}
                </h2>
                
                {char.name_kanji && (
                  <p className="text-sm text-center mb-3 opacity-75">
                    {char.name_kanji}
                  </p>
                )}

                {/* Film Badge */}
                {char.films?.[0] && (
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"
                  }`}>
                    {char.films[0]}
                  </div>
                )}

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">Gender:</span>
                    <span>{char.gender || "Unknown"}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold flex items-center gap-1">
                      <Heart size={12} />
                      Favorites:
                    </span>
                    <span>{char.favorites?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`max-w-2xl w-full rounded-3xl p-8 max-h-[90vh] overflow-y-auto ${
            darkMode 
              ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white" 
              : "bg-gradient-to-br from-white to-gray-100 text-gray-900"
          } shadow-2xl`}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold">{selectedCharacter.name}</h2>
              <button
                onClick={() => setSelectedCharacter(null)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode ? "hover:bg-white/20" : "hover:bg-gray-200"
                }`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                  <User size={64} className="text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                {selectedCharacter.name_kanji && (
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Japanese Name</h3>
                    <p className="text-xl">{selectedCharacter.name_kanji}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Gender</h3>
                    <p>{selectedCharacter.gender || "Unknown"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Favorites</h3>
                    <p className="flex items-center gap-1">
                      <Heart size={16} className="text-red-500" />
                      {selectedCharacter.favorites?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {selectedCharacter.films?.[0] && (
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Film</h3>
                    <p>{selectedCharacter.films[0]}</p>
                  </div>
                )}

                {selectedCharacter.nicknames && selectedCharacter.nicknames.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Also Known As</h3>
                    <p>{selectedCharacter.nicknames.join(", ")}</p>
                  </div>
                )}

                {selectedCharacter.about && (
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">About</h3>
                    <p className="leading-relaxed">{selectedCharacter.about}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}