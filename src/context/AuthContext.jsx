// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

// AuthContext'i oluşturuyoruz
const AuthContext = createContext();

// AuthProvider, uygulamanın oturum durumunu yönetecek
export const AuthProvider = ({ children }) => {
  // localStorage'dan başlangıç değerlerini al, yoksa null
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null);
  const [username, setUsername] = useState(() => localStorage.getItem('username') || null);

  // Kullanıcı giriş yaptığında veya çıkış yaptığında localStorage'ı güncelle
  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [userId, username]);

  // Giriş fonksiyonu
  const login = (newUserId, newUsername) => {
    setUserId(newUserId);
    setUsername(newUsername);
  };

  // Çıkış fonksiyonu
  const logout = () => {
    setUserId(null);
    setUsername(null);
  };

  // Context değerini döndür
  return (
    <AuthContext.Provider value={{ userId, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext'i kolayca kullanabilmek için custom hook
export const useAuth = () => useContext(AuthContext);