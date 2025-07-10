import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function TopicCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Devam Ediyor");
  const [priority, setPriority] = useState(3); // yeni
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    console.log("Yeni Konu:", { title, description, status, priority });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">+ Yeni Konu Ekle</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Başlık */}
          <div>
            <label className="block text-gray-700 mb-1">Başlık</label>
            <input
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {/* Açıklama */}
          <div>
            <label className="block text-gray-700 mb-1">Açıklama</label>
            <textarea
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {/* Durum */}
          <div>
            <label className="block text-gray-700 mb-1">Durum</label>
            <select
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Devam Ediyor</option>
              <option>Beklemede</option>
              <option>Tamamlandı</option>
            </select>
          </div>
          {/* Öncelik */}
          <div>
            <label className="block text-gray-700 mb-1">Öncelik (1–5)</label>
            <select
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
            >
              {[5,4,3,2,1].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          {/* Kaydet */}
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            <Plus className="h-5 w-5" />
            <span>Kaydet</span>
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <button onClick={()=>navigate("/dashboard")} className="text-blue-600 hover:underline">
            ← Geri Dön
          </button>
        </p>
      </div>
    </div>
);
}
