// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 için createRoot kullanılıyor
import App from './App.jsx'; // App.jsx olarak güncellendi
import './index.css'; // Genel CSS dosyamız
import { AuthProvider } from './context/AuthContext.jsx'; // AuthProvider'ı import ediyoruz

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Uygulamayı AuthProvider ile sarmalıyoruz */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);