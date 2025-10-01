# 🚀 [Studio Ghibli]

<div align="center">

**✨ Studio Ghibli web [web ini diisi dengan API dari Studio Ghibli (https://ghibliapi.vercel.app/films) ] ✨**

</div>

## 👥 **Kelompok Kami**

<div align="center">

### 🚀 **The Ghibli Explorers**

<table>
  <tr>
    <td align="center" width="25%">
      <a href="https://github.com/Azfdfkhz">
        <img src="https://avatars.githubusercontent.com/u/Azfdfkhz" width="100px;" alt="Azmi" style="border-radius: 50%; border: 3px solid #61DAFB;"/>
        <br />
        <sub><b>Azmi Fadhil F.</b></sub>
      </a>
      <br />
      <div style="margin-top: 8px;">
        <img src="https://img.shields.io/badge/UI%2FUX-Design-FF6B6B?style=flat-square"/>
        <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square"/>
      </div>
      <p style="font-size: 12px; margin-top: 8px;">
        🎨 UI/UX Design<br/>
        🧭 Navigation<br/>
        🎬 Movie Components<br/>
        🔍 Search System
      </p>
    </td>
    
    <td align="center" width="25%">
      <a href="https://github.com/username2">
        <img src="https://avatars.githubusercontent.com/u/username2" width="100px;" alt="Kevin" style="border-radius: 50%; border: 3px solid #06B6D4;"/>
        <br />
        <sub><b>Kevin</b></sub>
      </a>
      <br />
      <div style="margin-top: 8px;">
        <img src="https://img.shields.io/badge/Components-React-61DAFB?style=flat-square"/>
        <img src="https://img.shields.io/badge/Data-API-8A2BE2?style=flat-square"/>
      </div>
      <p style="font-size: 12px; margin-top: 8px;">
        👥 CharacterList<br/>
        📋 FilmList<br/>
        🎭 Character Data<br/>
        🗂️ List Management
      </p>
    </td>
    
    <td align="center" width="25%">
      <a href="https://github.com/username3">
        <img src="https://avatars.githubusercontent.com/u/username3" width="100px;" alt="Risma" style="border-radius: 50%; border: 3px solid #FF6B6B;"/>
        <br />
        <sub><b>Risma Afiani</b></sub>
      </a>
      <br />
      <div style="margin-top: 8px;">
        <img src="https://img.shields.io/badge/Auth-System-FF6B6B?style=flat-square"/>
        <img src="https://img.shields.io/badge/Security-Login-00C853?style=flat-square"/>
      </div>
      <p style="font-size: 12px; margin-top: 8px;">
        🔐 Login System<br/>
        👤 Authentication<br/>
        🛡️ Security<br/>
        📝 LoginCard
      </p>
    </td>
    
    <td align="center" width="25%">
      <a href="https://github.com/username4">
        <img src="https://avatars.githubusercontent.com/u/username4" width="100px;" alt="Revan" style="border-radius: 50%; border: 3px solid #00C853;"/>
        <br />
        <sub><b>Revan Nugraha</b></sub>
      </a>
      <br />
      <div style="margin-top: 8px;">
        <img src="https://img.shields.io/badge/Content-About-00C853?style=flat-square"/>
        <img src="https://img.shields.io/badge/Info-Profile-8A2BE2?style=flat-square"/>
      </div>
      <p style="font-size: 12px; margin-top: 8px;">
        ℹ️ AboutUs Page<br/>
        👋 User Profile<br/>
        📄 Content<br/>
        🏆 Team Info
      </p>
    </td>
  </tr>
</table>

<br/>
</div>


## 📖 **Tentang Project**

**🎯 Latar Belakang:**
[Tujuan kita membuat ini adalah untuk ujian praktek bagaimana cara untuk menggunakan API di web]

**💡 Tujuan:**
- [dapet nilai]
- [dapet nilai +]
- [dapet nilai ++++++]

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
###nanti ah lanjutnya gamood
