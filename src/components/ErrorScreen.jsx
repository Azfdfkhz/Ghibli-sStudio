export default function ErrorScreen({ darkMode, error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className={`text-xl font-bold mb-4 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}>
        ⚠️ Error: {error}
      </div>
      
      <button
        onClick={onRetry}
        className={`mt-4 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          darkMode 
            ? "bg-blue-600 hover:bg-blue-700 text-white" 
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        🔄 Coba Lagi
      </button>
      
      <div className={`mt-6 max-w-md text-sm ${
        darkMode ? "text-gray-300" : "text-gray-700"
      }`}>
        <p className="font-semibold mb-2">Jika error terus terjadi, coba:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Periksa koneksi internet</li>
          <li>Refresh halaman (F5)</li>
          <li>Clear browser cache</li>
          <li>Coba browser lain</li>
        </ul>
        
        <div className="mt-4 p-3 rounded-lg bg-gray-500/20">
          <p className="text-xs">
            API Endpoint: 
            <a 
              href="https://ghibliapi.vercel.app/films" 
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1"
            >
              https://ghibliapi.vercel.app/films
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}