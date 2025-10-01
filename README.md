# 🚀 [Studio Ghibli]

<div align="center">

**✨ Studio Ghibli web [web ini diisi dengan API dari Studio Ghibli (https://ghibliapi.vercel.app/films) ] ✨**

</div>

## 👥 **Kelompok Kami**

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Azfdfkhz">
        <img src="https://avatars.githubusercontent.com/Azfdfkhz" width="100px;" alt=""/>
        <br />
        <sub><b>Azmi Fadhil Fakhrurrazi</b></sub>
      </a>
      <br />
      👉 UI/UX, Sidebar, Banner, Movie, SearchBar, FilmCard  
    </td>
    <td align="center">
      <a href="https://github.com/username2">
        <img src="https://avatars.githubusercontent.com/username2" width="100px;" alt=""/>
        <br />
        <sub><b>Kevin</b></sub>
      </a>
      <br />
      👉 CharacterList, FilmList
    </td>
    <td align="center">
      <a href="https://github.com/username3">
        <img src="https://avatars.githubusercontent.com/username3" width="100px;" alt=""/>
        <br />
        <sub><b>Risma Afiani</b></sub>
      </a>
      <br />
      👉 LoginCard
    </td>
        <td align="center">
      <a href="https://github.com/username3">
        <img src="https://avatars.githubusercontent.com/username3" width="100px;" alt=""/>
        <br />
        <sub><b>Revan Nugraha</b></sub>
      </a>
      <br />
      👉 AboutUs
    </td>
  </tr>
</table>

## 📖 **Tentang Project**

**🎯 Latar Belakang:**
[Tujuan kita membuat ini adalah untuk ujian praktek bagaimana cara untuk menggunakan API di web]

**💡 Tujuan:**
- [dapet nilai]
- [dapet nilai +]
- [dapet nilai ++++++]
- [dapet Project]
- 
## ✨ **Fitur**

### 🎉 Fitur Utama
- ✅ **Login** - 
login disini kita dapat login atau daftar akun baru nah tersimpan pada browser masing masing u know?, untuk melihat pada halaman user nama kita kan kece gitloh
- ✅ **DarkMode** - 
DarkMode/LightMode pastinya selain dapat berubah warna pada Darkmode terdapat icon bintang menunjukan bahwa ini malam jika light mode terdapat awan
- ✅ **Search** - 
Fitur ini dapat mempermudah mencari film Ghibli apa yg ingin kita lihat
### 🔧 Fitur Tambahan
- ⚡ Responsive Design
- 📱 Mobile Friendly

## 🛠️ **Teknologi**

### **Frontend:**
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-FF6B6B?style=for-the-badge&logo=react&logoColor=white)
![React Parallax Tilt](https://img.shields.io/badge/React_Parallax_Tilt-8A2BE2?style=for-the-badge&logo=react&logoColor=white)


## 🚀 **Cara Install**


### **membuat project:**
- Create vite@latest 
- pilih REACT lalu JAVASCRIPT
-Ghibli-Web

### **Langkah-langkah:**

# Masuk ke directory
cd Ghibli-Web

# Install dependencies
npm install

# Install Tallwind 4.1
npm install tailwindcss @tailwindcss/vite

# lalu import vite plugin
cari aja di website tallwind 

simpan ( @import "tailwindcss"; ) di index.css kalo gue tuh
 
# Jalankan development server
npm run dev

## 🔥 **Code**

```javascript
useEffect(() => {
  const checkAuthStatus = () => {
    try {
      const savedAuth = localStorage.getItem('ghibliAuth');
      if (!savedAuth) return;

      const authData = JSON.parse(savedAuth);
      const isValidAuth = authData.isLoggedIn && authData.username;
      
      if (isValidAuth) {
        setIsLoggedIn(true);
        setUsername(authData.username);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('ghibliAuth');
    }
  };

  checkAuthStatus();
}, []);

     Fungsi ini untuk auto-login user dari data yang disimpan di browser.
```
# nanti ah lanjutnya gamood
