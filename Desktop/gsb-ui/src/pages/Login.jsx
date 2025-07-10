// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Lütfen kullanıcı adı ve şifre girin.");
      return;
    }

    try {
      const res = await login({ username, password });
      const token = res.data.token; // backend’in döndürdüğü token anahtarı
      localStorage.setItem("token", token);
      alert("Giriş başarılı!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data);
      const msg = err.response?.data?.title || err.message;
      alert("Giriş başarısız: " + msg);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Giriş Yap</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="username"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Giriş Yap
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Hesabın yok mu?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-green-600 hover:underline"
          >
            Kayıt Ol
          </button>
        </p>
      </div>
    </div>
  );
}
