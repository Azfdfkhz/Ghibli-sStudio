import React, { useState } from 'react';

function LoginCard({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    // State untuk feedback pengguna
    const [message, setMessage] = useState({ type: '', text: '' });
    
    // State untuk menyimpan data Ghibli
    const [ghibliFilms, setGhibliFilms] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault(); 
        setMessage({ type: 'loading', text: 'Memproses Login...' });
        setGhibliFilms([]); 

        // --- SIMULASI LOGIC LOGIN ---
        if (username === 'ghibli' && password === 'rahasia') {
            setMessage({ type: 'success', text: 'Login Berhasil! Mengambil data Studio Ghibli...' });
            
            try {
                // MENGGUNAKAN FETCH API (tanpa Axios)
                const response = await fetch('https://ghibliapi.dev/films');
                
                if (!response.ok) {
                    throw new Error('Gagal terhubung ke API Ghibli.');
                }
                
                const data = await response.json(); 
                
                const topFilms = data.slice(0, 5);
                setGhibliFilms(topFilms);
                setMessage({ type: 'success', text: `Login dan Pengambilan ${topFilms.length} Film Berhasil!` });

                // Redirect ke aplikasi setelah 1.5 detik
                setTimeout(() => {
                    if (onLoginSuccess) {
                        onLoginSuccess(username); // Kirim username ke App
                    }
                }, 1500);

            } catch (error) {
                console.error('Error API:', error);
                setMessage({ type: 'error', text: 'Gagal koneksi ke API Ghibli.' });
            }

        } else {
            setMessage({ type: 'error', text: 'Login Gagal. Username atau Password salah.' });
        }
    };

    const getMessageClasses = () => {
        switch (message.type) {
            case 'success': return 'bg-green-100 text-green-700';
            case 'error': return 'bg-red-100 text-red-700';
            case 'loading': return 'bg-blue-100 text-blue-700';
            default: return 'hidden';
        }
    };

    return (
        <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-sm">
            
            <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
                Login To Studio Ghibli
            </h1>
            
            <form onSubmit={handleLogin}>
                
                {/* Input Username */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username :</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </div>
                
                {/* Input Password */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password :</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                
                {/* Remember Me */}
                <div className="mb-8 flex items-center">
                    <input 
                        type="checkbox" 
                        id="remember" 
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                        checked={rememberMe} 
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember Me</label>
                </div>
                
                {/* Tombol Login */}
                <button 
                    type="submit" 
                    className="w-full py-3 bg-blue-400 text-white font-bold rounded-lg hover:bg-blue-500 transition duration-200 shadow-md" 
                    disabled={message.type === 'loading'}
                >
                    {message.type === 'loading' ? 'Loading...' : 'Login'}
                </button>
                
            </form>

            {/* Area Pesan/Feedback */}
            <div className={`mt-4 p-3 rounded-lg text-center ${message.type ? '' : 'hidden'} ${getMessageClasses()}`}>
                {message.text}
            </div>

            {/* Daftar Film dari API Ghibli */}
            {ghibliFilms.length > 0 && (
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Daftar Film (Dari API):</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm max-h-40 overflow-y-auto">
                        {ghibliFilms.map((film) => (
                            <li key={film.id} className="mb-1">
                                <strong>{film.title}</strong> ({film.release_date})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default LoginCard;