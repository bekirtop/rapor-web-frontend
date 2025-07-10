// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]       = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username||!email.trim()||!password.trim()||!name.trim()||!surname.trim()) {
      alert("Tüm alanları doldurun.");
      return;
    }

    try {
      await register({
        username,
        password,
        eMail: email,
        name,
        surname
      });
      alert("Kayıt başarılı!");
      navigate("/"); // login sayfasına döner
    } catch (err) {
      console.error(err.response?.data);
      const msg = err.response?.data?.title || err.message;
      alert("Kayıt başarısız: " + msg);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Kayıt Ol
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="username"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Ad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Adınız"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Soyad</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Soyadınız"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Zaten hesabın var mı?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Giriş Yap
          </button>
        </p>
      </div>
    </div>
  );
}
