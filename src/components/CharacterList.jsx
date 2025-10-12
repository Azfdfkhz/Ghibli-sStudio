import { useEffect, useState } from "react";
import { Heart, X, User, Cloud } from "lucide-react";

export default function CharacterList({ darkMode }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const loadingCharacters = [
    { 
      name: "Totoro", 
      shape: "rounded-full",
      bodyColor: darkMode ? "bg-gray-700" : "bg-gray-600",
      bellyColor: "bg-gray-400/40",
      accessories: [
        { position: "-top-8 -left-8", color: "bg-green-500/60" },
        { position: "-top-4 -right-6", color: "bg-green-400/60" },
        { position: "-bottom-6 -left-4", color: "bg-green-600/60" },
      ]
    },
    { 
      name: "No-Face", 
      shape: "rounded-full",
      bodyColor: darkMode ? "bg-black" : "bg-gray-800", 
      bellyColor: "bg-yellow-400/60",
      accessories: [
        { position: "-top-8 -left-8", color: "bg-yellow-500/60" },
        { position: "-top-4 -right-6", color: "bg-yellow-400/60" },
        { position: "-bottom-6 -left-4", color: "bg-yellow-600/60" },
      ]
    },
    { 
      name: "Calcifer", 
      shape: "rounded-lg",
      bodyColor: darkMode ? "bg-orange-500" : "bg-orange-400",
      bellyColor: "bg-yellow-300/60",
      accessories: [
        { position: "-top-8 -left-8", color: "bg-red-500/60" },
        { position: "-top-4 -right-6", color: "bg-orange-400/60" },
        { position: "-bottom-6 -left-4", color: "bg-yellow-500/60" },
      ]
    },
    { 
      name: "Jiji", 
      shape: "rounded-full",
      bodyColor: darkMode ? "bg-gray-800" : "bg-gray-700",
      bellyColor: "bg-gray-500/40",
      accessories: [
        { position: "-top-8 -left-8", color: "bg-purple-500/60" },
        { position: "-top-4 -right-6", color: "bg-purple-400/60" },
        { position: "-bottom-6 -left-4", color: "bg-purple-600/60" },
      ]
    }
  ];

  const currentChar = loadingCharacters[currentCharIndex];

  // Effect untuk animasi karakter loading
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentCharIndex(prev => (prev + 1) % loadingCharacters.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [loading, loadingCharacters.length]);

  const generateCharacterDescription = (name, film) => {
    const descriptions = {
      // Spirited Away characters
      "Chihiro Ogino": `A brave young girl who finds herself in the spirit world and must work at a bathhouse to save her parents and find her way back home.`,
      "Haku": `A mysterious boy who is actually the spirit of the Kohaku River. He helps Chihiro navigate the spirit world while working for Yubaba.`,
      "Yubaba": `The powerful and greedy witch who runs the bathhouse for spirits. She is known for taking people's names and turning them into her servants.`,
      "Zeniba": `Yubaba's twin sister who lives in a peaceful cottage. Unlike her sister, she is kind and wise.`,
      "No-Face": `A lonely spirit who can absorb the personalities and emotions of those around him. He becomes fascinated with Chihiro.`,
      
      // My Neighbor Totoro characters
      "Totoro": `A large, friendly forest spirit who can only be seen by children. He brings joy and magical adventures to those who believe.`,
      "Mei Kusakabe": `An energetic and curious young girl who first discovers Totoro in the forest near her new home.`,
      "Satsuki Kusakabe": `Mei's responsible older sister who takes care of her family while their mother is in the hospital.`,
      "Catbus": `A mysterious and magical creature that serves as transportation in the spirit world, with a body shaped like a cat and functioning as a bus.`,
      
      // Howl's Moving Castle characters
      "Howl": `A powerful and handsome wizard known for his magical moving castle and dramatic personality.`,
      "Sophie Hatter": `A young hat maker who gets cursed by a witch and turned into an old woman, leading her to Howl's magical castle.`,
      "Calcifer": `A fire demon who powers Howl's moving castle. He has a contract with Howl and loves eating bacon and eggs.`,
      "Markl": `Howl's young apprentice who helps maintain the magical castle and often disguises himself as an old man.`,
      
      // Kiki's Delivery Service characters
      "Kiki": `A 13-year-old witch in training who moves to a new town to start her own delivery service with her cat Jiji.`,
      "Jiji": `Kiki's sarcastic and loyal black cat who can talk to her and helps with her delivery service.`,
      "Ursula": `A kind-hearted artist who lives in the woods and becomes Kiki's friend and mentor.`,
      
      // Princess Mononoke characters
      "San": `A human girl raised by wolves who fights to protect the forest from human destruction. Known as Princess Mononoke.`,
      "Ashitaka": `A young prince cursed by a demon boar who journeys to find a cure and becomes involved in the forest's struggle.`,
      "Moro": `A giant wolf goddess who raised San as her own daughter and fiercely protects the forest.`,
      "Lady Eboshi": `The ambitious leader of Irontown who conflicts with the forest spirits while trying to build a better life for her people.`,
      
      // Ponyo characters
      "Ponyo": `A goldfish who dreams of becoming human after meeting a young boy named Sosuke. She possesses powerful magic.`,
      "Sosuke": `A kind-hearted five-year-old boy who befriends Ponyo and helps her achieve her dream of becoming human.`,
      "Fujimoto": `Ponyo's father, a once-human wizard who now lives underwater and is concerned about the balance of nature.`,
      
      // Porco Rosso characters
      "Porco Rosso": `An Italian World War I fighter pilot who has been cursed to look like a pig, making his living as a bounty hunter.`,
      "Fio Piccolo": `A talented young aircraft designer who helps Porco Rosso rebuild his plane and joins his adventures.`,
      
      // Castle in the Sky characters
      "Pazu": `A brave young orphan and engineer's apprentice who dreams of finding the legendary floating castle, Laputa.`,
      "Sheeta": `A girl with a mysterious crystal pendant who possesses the secret to finding the floating castle Laputa.`,
      "Muska": `A government agent who seeks to exploit Laputa's technology for his own power and ambitions.`,
      
      // Nausicaä characters
      "Nausicaä": `The princess of the Valley of the Wind who can communicate with animals and seeks to understand the Toxic Jungle.`,
      "Lord Yupa": `The greatest swordsman in the Valley of the Wind and a mentor to Nausicaä on her journeys.`,
      
      // Default description
      "default": `A memorable character from the enchanting world of Studio Ghibli, known for their unique personality and role in the story.`
    };

    return descriptions[name] || `A beloved character from ${film || 'Studio Ghibli films'}, known for their unique role in the story.`;
  };

  const toggleFavorite = (characterId) => {
    setFavorites(prev =>
      prev.includes(characterId)
        ? prev.filter(id => id !== characterId)
        : [...prev, characterId]
    );
  };

  const isFavorite = (characterId) => favorites.includes(characterId);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Tambahkan minimum loading time
        const startTime = Date.now();
        const minimumLoadingTime = 4000; // 4 detik minimum loading
        
        const response = await fetch('https://ghibliapi.vercel.app/people');
        
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        
        const data = await response.json();
        
        const validCharacters = data.filter(char => char.name && char.name.trim() !== '');
        
        // DATA ASLI - tidak dibatasi dan tidak di-skip detail
        const charactersWithDetails = await Promise.all(
          validCharacters.map(async (char) => {
            try {
              let filmDetails = [];
              let speciesName = 'Unknown';
              
              // FETCH DETAIL FILM SEPERTI SEMULA
              if (char.films && char.films.length > 0) {
                const filmPromises = char.films.map(async (filmUrl) => {
                  try {
                    const filmResponse = await fetch(filmUrl);
                    if (filmResponse.ok) {
                      const filmData = await filmResponse.json();
                      return filmData.title;
                    }
                  } catch (error) {
                    console.error('Error fetching film:', error);
                  }
                  return null;
                });
                
                filmDetails = (await Promise.all(filmPromises)).filter(Boolean);
              }

              // FETCH DETAIL SPECIES SEPERTI SEMULA
              if (char.species) {
                try {
                  const speciesResponse = await fetch(char.species);
                  if (speciesResponse.ok) {
                    const speciesData = await speciesResponse.json();
                    speciesName = speciesData.name || 'Unknown';
                  }
                } catch (error) {
                  console.error('Error fetching species:', error);
                }
              }

              const favoritesCount = Math.floor(Math.random() * 10000) + 1000;

              return {
                id: char.id,
                name: char.name,
                gender: char.gender || 'Unknown',
                age: char.age || 'Unknown',
                eye_color: char.eye_color || 'Unknown',
                hair_color: char.hair_color || 'Unknown',
                films: filmDetails,
                favorites: favoritesCount,
                about: generateCharacterDescription(char.name, filmDetails[0]),
                species: speciesName
              };
            } catch (error) {
              console.error('Error processing character:', char.name, error);
              return null;
            }
          })
        );

        const successfulCharacters = charactersWithDetails
          .filter(Boolean)
          .slice(0, 20); // Tetap batasi 20 karakter seperti semula

        // Hitung waktu yang sudah berlalu
        const elapsedTime = Date.now() - startTime;
        
        // Jika loading terlalu cepat, tunggu sampai minimum loading time tercapai
        if (elapsedTime < minimumLoadingTime) {
          const remainingTime = minimumLoadingTime - elapsedTime;
          console.log(`Waiting ${remainingTime}ms to show loading animation...`);
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        setCharacters(successfulCharacters);
      } catch (err) {
        console.error('Error fetching characters:', err);
        setError('Failed to load characters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen relative overflow-hidden">
        <div className="text-center relative z-10">
          
          <div className="relative mb-8">
            <div className={`w-32 h-32 ${currentChar.shape} ${currentChar.bodyColor} relative animate-bounce shadow-2xl mx-auto flex items-center justify-center`}>
              
              {currentChar.shape === "rounded-full" ? (
                <>
                  <div className="absolute top-8 left-6 w-6 h-6 bg-white rounded-full animate-pulse">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute top-8 right-6 w-6 h-6 bg-white rounded-full animate-pulse">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute top-10 left-8 w-5 h-5 bg-white rounded animate-pulse">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded"></div>
                  </div>
                  <div className="absolute top-10 right-8 w-5 h-5 bg-white rounded animate-pulse">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded"></div>
                  </div>
                </>
              )}
              
              {currentChar.name === "Calcifer" ? (
                <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 w-12 h-1 ${darkMode ? "bg-yellow-300" : "bg-yellow-400"} rounded-full`}></div>
              ) : (
                <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 ${
                  darkMode ? "border-gray-900" : "border-gray-800"
                } rounded-b-full`}></div>
              )}
              
              {(currentChar.name === "Totoro" || currentChar.name === "No-Face") && (
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-12 ${currentChar.bellyColor} rounded-full`}></div>
              )}
            </div>
            
            {currentChar.accessories.map((accessory, index) => (
              <div 
                key={index}
                className={`absolute ${accessory.position} w-6 h-6 ${accessory.color} rounded-full animate-ping`}
                style={{ animationDelay: `${index * 150}ms` }}
              ></div>
            ))}
          </div>

          <div className={`text-2xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          } animate-pulse`}>
            Loading sakedap {currentChar.name}...
          </div>
          
          <div className="flex justify-center space-x-2 mb-6">
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

          <div className={`w-64 h-2 mx-auto ${
            darkMode ? "bg-gray-700" : "bg-white/30"
          } rounded-full overflow-hidden backdrop-blur-sm`}>
            <div className={`h-full ${
              darkMode ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-600 to-purple-600"
            } rounded-full animate-progress`}></div>
          </div>

          <div className={`mt-4 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Mengambil data karakter dari Studio Ghibli API...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className={`text-center p-8 rounded-3xl ${
          darkMode ? "bg-red-900/50 text-red-200" : "bg-red-100 text-red-700"
        }`}>
          <div className="text-xl font-bold mb-2">Oops!</div>
          <div>{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
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
            {characters.length} magical characters from the Ghibli universe
          </p>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {characters.length === 0 ? (
            <div className={`text-center p-8 rounded-3xl ${
              darkMode ? "bg-white/5 text-white" : "bg-gray-100 text-gray-700"
            }`}>
              <User size={48} className="mx-auto mb-4 opacity-50" />
              <div className="text-xl">No characters found</div>
              <div className="text-sm mt-2">Try refreshing the page</div>
            </div>
          ) : (
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

                  {/* Species Badge */}
                  {char.species && char.species !== 'Unknown' && (
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 mx-auto justify-center ${
                      darkMode ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-700"
                    }`}>
                      {char.species}
                    </div>
                  )}

                  {/* Film Badge */}
                  {char.films?.[0] && (
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 mx-auto justify-center ${
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
                      <span className="font-semibold">Age:</span>
                      <span>{char.age || "Unknown"}</span>
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
          )}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Gender</h3>
                    <p>{selectedCharacter.gender || "Unknown"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Age</h3>
                    <p>{selectedCharacter.age || "Unknown"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Eye Color</h3>
                    <p>{selectedCharacter.eye_color || "Unknown"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Hair Color</h3>
                    <p>{selectedCharacter.hair_color || "Unknown"}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold opacity-75">Species</h3>
                  <p>{selectedCharacter.species || "Unknown"}</p>
                </div>

                {selectedCharacter.films && selectedCharacter.films.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold opacity-75">Films</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedCharacter.films.map((film, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {film}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold opacity-75 flex items-center gap-1">
                    <Heart size={16} className="text-red-500" />
                    Favorites
                  </h3>
                  <p>{selectedCharacter.favorites?.toLocaleString()}</p>
                </div>

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