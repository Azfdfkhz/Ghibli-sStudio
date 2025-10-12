export default function LoadingScreen({ darkMode, message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Animated Totoro */}
      <div className="relative">
        <div className={`w-32 h-32 rounded-full ${
          darkMode ? "bg-gray-700" : "bg-gray-600"
        } relative animate-bounce shadow-2xl`}>
          {/* Mata */}
          <div className="absolute top-10 left-6 w-6 h-6 bg-white rounded-full animate-pulse">
            <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
          </div>
          <div className="absolute top-10 right-6 w-6 h-6 bg-white rounded-full animate-pulse">
            <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
          </div>
          {/* Mulut */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 ${
            darkMode ? "border-gray-900" : "border-gray-800"
          } rounded-b-full`}></div>
          {/* Belly */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gray-400/40 rounded-full"></div>
        </div>
        
        {/* Floating leaves */}
        <div className="absolute -top-8 -left-8 w-8 h-8 bg-green-500/60 rounded-full animate-ping"></div>
        <div className="absolute -top-4 -right-6 w-6 h-6 bg-green-400/60 rounded-full animate-ping" style={{ animationDelay: '0.15s' }}></div>
        <div className="absolute -bottom-6 -left-4 w-4 h-4 bg-green-600/60 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
      </div>

      {/* Loading Text */}
      <div className="mt-12 text-center">
        <div className={`text-2xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        } animate-pulse`}>
          {message}
        </div>
        
        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          <div className={`w-3 h-3 ${
            darkMode ? "bg-blue-400" : "bg-blue-600"
          } rounded-full animate-bounce`}></div>
          <div className={`w-3 h-3 ${
            darkMode ? "bg-blue-400" : "bg-blue-600"
          } rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
          <div className={`w-3 h-3 ${
            darkMode ? "bg-blue-400" : "bg-blue-600"
          } rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Progress Bar */}
        <div className={`mt-6 w-64 h-2 ${
          darkMode ? "bg-gray-700" : "bg-white/30"
        } rounded-full overflow-hidden backdrop-blur-sm`}>
          <div className={`h-full ${
            darkMode 
              ? "bg-gradient-to-r from-blue-500 to-purple-500" 
              : "bg-gradient-to-r from-blue-600 to-purple-600"
          } rounded-full animate-progress`}></div>
        </div>
      </div>
    </div>
  );
}