// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api'; // authApi servisimiz
import { useAuth } from '../context/AuthContext.jsx'; // AuthContext'ten useAuth hook'unu kullanacağız
import '../styles/AuthPage.css'; // Auth (Giriş/Kayıt) sayfaları için tek bir CSS kullanacağız

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Hata mesajlarını göstermek için
  const [loading, setLoading] = useState(false); // Yükleme durumu için

  const { login } = useAuth(); // AuthContext'teki login fonksiyonunu alıyoruz
  const navigate = useNavigate(); // Yönlendirme için

  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

    setError(''); // Her yeni denemede hatayı sıfırla
    setLoading(true); // Yükleme durumunu başlat

    try {
      const response = await authApi.login({ username, password });
      // Backend'den dönen userId ve username'i login fonksiyonuna gönder
      login(response.data.userId, response.data.username);
      navigate('/reports'); // Giriş başarılıysa raporlar sayfasına yönlendir
    } catch (err) {
      // API'den gelen hata mesajını göster
      // Hata objesinin yapısına göre 'err.response.data' veya 'err.message' olabilir
      setError(err.response?.data || 'Giriş yapılırken bir hata oluştu.');
    } finally {
      setLoading(false); // Yükleme durumunu bitir
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-card">
        <h2 className="form-title">Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı:</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Parola:</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </div>
          <p className="form-link-text">
            Hesabın yok mu? <Link to="/register" className="form-link">Kayıt Ol</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;