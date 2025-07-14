// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api'; // authApi servisimiz
import '../styles/AuthPage.css'; // Auth (Giriş/Kayıt) sayfaları için tek bir CSS kullanacağız

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [error, setError] = useState(''); // Hata mesajlarını göstermek için
  const [success, setSuccess] = useState(''); // Başarı mesajı için
  const [loading, setLoading] = useState(false); // Yükleme durumu için

  const navigate = useNavigate(); // Yönlendirme için

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authApi.register({
        username,
        password,
        eMail: email, // Backend DTO'daki isimle eşleşmeli (EMail)
        name,
        surname,
      });
      setSuccess(response.data); // "Kayıt başarılı." mesajını alacağız
      // Başarılı kayıt sonrası 2 saniye bekleyip giriş sayfasına yönlendir
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Kayıt yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-card">
        <h2 className="form-title">Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          {/* Kullanıcı Adı */}
          <div className="form-group">
            <label htmlFor="reg-username">Kullanıcı Adı:</label>
            <input
              type="text"
              id="reg-username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Parola */}
          <div className="form-group">
            <label htmlFor="reg-password">Parola:</label>
            <input
              type="password"
              id="reg-password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* E-posta */}
          <div className="form-group">
            <label htmlFor="reg-email">E-posta:</label>
            <input
              type="email"
              id="reg-email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Ad */}
          <div className="form-group">
            <label htmlFor="reg-name">Ad:</label>
            <input
              type="text"
              id="reg-name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Soyad */}
          <div className="form-group">
            <label htmlFor="reg-surname">Soyad:</label>
            <input
              type="text"
              id="reg-surname"
              className="form-input"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
            </button>
          </div>
          <p className="form-link-text">
            Zaten hesabın var mı? <Link to="/login" className="form-link">Giriş Yap</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;