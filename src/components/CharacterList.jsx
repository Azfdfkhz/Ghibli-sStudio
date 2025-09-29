import { useEffect, useState } from "react";

export default function CharacterList({ darkMode }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/people")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className={`flex-1 flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-900"
        }`}
      >
        Lagi loading characters...
      </div>
    );
  }

  return (
    <div
      className={`flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-900"
      }`}
    >
      {characters.map((char) => (
        <div
          key={char.id}
          className={`rounded-2xl shadow p-4 transition hover:scale-105 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-bold mb-2">{char.name}</h2>
          <p className="text-sm">Gender: {char.gender}</p>
          <p className="text-sm">Age: {char.age}</p>
          <p className="text-sm">Eye color: {char.eye_color}</p>
          <p className="text-sm">Hair color: {char.hair_color}</p>
        </div>
      ))}
    </div>
  );
}
