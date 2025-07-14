// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx'; // AuthContext'imizden useAuth hook'unu alıyoruz

// Sayfa bileşenlerini import edelim (hepsinin .jsx uzantılı olduğundan emin olun)
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import ReportDetailPage from './pages/ReportDetailPage.jsx';
import NewReportPage from './pages/NewReportPage.jsx';

// Navbar bileşenini import edelim (Navbar.jsx olduğundan emin olun)
import Navbar from './components/Navbar.jsx';

// Genel CSS dosyasını import etmeyi unutmayın
import './index.css';

// Korumalı Rota Bileşeni
// Bu bileşen, sadece giriş yapmış kullanıcıların erişebileceği rotaları tanımlar.
const ProtectedRoute = ({ children }) => {
  const { userId } = useAuth(); // AuthContext'ten userId'yi alıyoruz

  if (!userId) {
    // Eğer userId yoksa, yani kullanıcı giriş yapmamışsa, login sayfasına yönlendir.
    return <Navigate to="/login" replace />;
  }

  return children; // Kullanıcı giriş yapmışsa, çocuk bileşenleri render et (yani gidilmek istenen sayfayı göster)
};

function App() {
  return (
    <Router>
      <Navbar /> {/* Tüm sayfalarımızda gözükecek Navbar bileşeni */}
      <div className="app-container"> {/* Klasik CSS için kendi sınıfımızı kullanıyoruz */}
        <Routes>
          {/* Kimlik doğrulama rotaları */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Korumalı Rapor Rotaları */}
          <Route path="/reports" element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          } />
          <Route path="/reports/:id" element={
            <ProtectedRoute>
              <ReportDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/reports/new" element={
            <ProtectedRoute>
              <NewReportPage />
            </ProtectedRoute>
          } />

          {/* Ana sayfa yönlendirmesi veya varsayılan rota */}
          <Route path="/" element={<Navigate to="/reports" replace />} />

          {/* Tanımsız rotalar için 404 veya ana sayfaya yönlendirme */}
          <Route path="*" element={<Navigate to="/reports" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;