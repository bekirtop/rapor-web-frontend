// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // AuthContext'ten useAuth hook'unu alıyoruz
import '../styles/Navbar.css'; // Navbar için özel CSS dosyasını import et

function Navbar() {
  const { userId, username, logout } = useAuth(); // Kullanıcı bilgilerini ve logout fonksiyonunu alıyoruz
  const navigate = useNavigate(); // Yönlendirme için useNavigate hook'unu kullanıyoruz

  const handleLogout = () => {
    logout(); // AuthContext'ten çıkış yap
    navigate('/login'); // Giriş sayfasına yönlendir
  };

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-brand">GSB Kredi Birimi İş Yönetim Paneli</Link>
      <div>
        {userId ? ( // Kullanıcı giriş yapmışsa
          <ul className="navbar-menu">
            <li className="navbar-item"><span className="navbar-welcome">Hoşgeldin, {username}</span></li>
            <li className="navbar-item"><Link to="/reports">Raporlar</Link></li>
            <li className="navbar-item"><Link to="/reports/new">Yeni Rapor</Link></li>
            <li className="navbar-item">
              <button onClick={handleLogout} className="navbar-logout-button">Çıkış Yap</button>
            </li>
          </ul>
        ) : ( // Kullanıcı giriş yapmamışsa
          <ul className="navbar-menu">
            <li className="navbar-item"><Link to="/login">Giriş Yap</Link></li>
            <li className="navbar-item"><Link to="/register">Kayıt Ol</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;