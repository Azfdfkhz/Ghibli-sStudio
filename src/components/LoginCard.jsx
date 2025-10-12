import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Plus } from 'lucide-react';

export default function LoginCard({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getUsers = () => {
    const savedUsers = localStorage.getItem('ghibliUsers');
    const defaultUsers = {
      ghibli: { password: 'rahasia', name: 'Ghibli Fan', email: 'ghibli@demo.com' },
      totoro: { password: 'myneighbor', name: 'Totoro Lover', email: 'totoro@demo.com' },
    };
    return savedUsers ? { ...defaultUsers, ...JSON.parse(savedUsers) } : defaultUsers;
  };

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setMessage({ type: 'error', text: 'Username dan password harus diisi!' });
      return;
    }

    const users = getUsers();
    const user = users[username.trim().toLowerCase()];
    
    if (user && user.password === password.trim()) {
      setMessage({ 
        type: 'success', 
        text: `Login Berhasil! Selamat datang ${user.name}...` 
      });
      setTimeout(() => {
        onLoginSuccess(user.name);
      }, 1500);
    } else {
      setMessage({ type: 'error', text: 'Username atau password salah!' });
    }
  };

  const handleRegister = () => {
    if (!username.trim() || !password.trim() || !email.trim()) {
      setMessage({ type: 'error', text: 'Semua field harus diisi!' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Password dan konfirmasi password tidak cocok!' });
      return;
    }

    if (password.length < 3) {
      setMessage({ type: 'error', text: 'Password minimal 3 karakter!' });
      return;
    }

    const users = getUsers();
    const usernameLower = username.trim().toLowerCase();

    if (users[usernameLower]) {
      setMessage({ type: 'error', text: 'Username sudah digunakan!' });
      return;
    }

    const newUser = {
      password: password.trim(),
      name: username.trim(),
      email: email.trim().toLowerCase()
    };

    users[usernameLower] = newUser;
    localStorage.setItem('ghibliUsers', JSON.stringify(users));

    setMessage({ 
      type: 'success', 
      text: 'Registrasi berhasil! Silakan login.' 
    });
    
    setTimeout(() => {
      setIsRegistering(false);
      setEmail('');
      setConfirmPassword('');
      setMessage({ type: 'success', text: 'Silakan login dengan akun baru Anda!' });
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isRegistering) {
        handleRegister();
      } else {
        handleLogin();
      }
    }
  };

  const switchToRegister = () => {
    setIsRegistering(true);
    setMessage({ type: '', text: '' });
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
  };

  const switchToLogin = () => {
    setIsRegistering(false);
    setMessage({ type: '', text: '' });
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-600/30">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Studio Ghibli
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {isRegistering ? 'Daftar akun baru' : 'Masuk ga!!'}
        </p>
      </div>

      {!isRegistering && (
        <div className="mb-6 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-white mb-2">
            Akun Demo:
          </h3>
          <div className="text-xs text-blue-700 dark:text-pink-300 space-y-1">
            <p><strong>ghibli</strong> / rahasia</p>
            <p><strong>totoro</strong> / myneighbor</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
          />
        </div>

        {isRegistering && (
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
            />
          </div>
        )}

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {isRegistering && (
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
            />
          </div>
        )}
      </div>

      {message.text && (
        <div className={`mt-4 p-3 rounded-xl text-center ${
          message.type === 'success' 
            ? 'bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30' 
            : 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30'
        }`}>
          {message.text}
        </div>
      )}

      <button
        onClick={isRegistering ? handleRegister : handleLogin}
        className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
      >
        {isRegistering ? <Plus className="w-5 h-5" /> : null}
        {isRegistering ? 'Daftar' : 'Masuk'}
      </button>

      <div className="mt-6 text-center">
        <button
          onClick={isRegistering ? switchToLogin : switchToRegister}
          className="text-blue-700 dark:text-blue-900 hover:text-blue-500 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-300"
        >
          {isRegistering 
            ? 'Sudah punya akun? Login di sini' 
            : 'Belum punya akun? Daftar di sini'
          }
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-black-500 dark:text-black">
          {isRegistering 
            ? 'Data disimpan secara lokal di browser Anda' 
            : 'Gunakan akun demo atau daftar akun sendiri'
          }
        </p>
      </div>
    </div>
  );
}
