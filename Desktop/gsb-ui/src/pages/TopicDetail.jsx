// src/pages/TopicDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTopic, updateTopic } from "../services/topics";
import { ArrowLeft } from "lucide-react";

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading]   = useState(true);
  const [title, setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus]     = useState("");
  const [priority, setPriority] = useState(3);

  useEffect(() => {
    setLoading(true);
    getTopic(id)
      .then(res => {
        const t = res.data;
        setTitle(t.title);
        setDescription(t.description);
        setStatus(t.status);
        setPriority(t.priority);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTopic(id, { title, description, status, priority })
      .then(() => {
        alert("Güncelleme başarılı!");
        navigate("/dashboard");
      })
      .catch(err => {
        console.error(err.response?.data);
        alert("Güncelleme hatası: " + (err.response?.data?.title || err.message));
      });
  };

  if (loading) return <p className="p-4 text-center">Yükleniyor...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center bg-gray-100 px-6 py-4 border-b">
          <button onClick={() => navigate("/dashboard")} className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-5 w-5 mr-2"/> Geri Dön
          </button>
          <h2 className="flex-1 text-center text-xl font-bold">Konu Detayları</h2>
        </div>

        <form onSubmit={handleUpdate} className="px-6 py-6 space-y-6">
          <div>
            <label className="block mb-1">Başlık</label>
            <input
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Konu</label>
            <textarea
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Durum</label>
            <select
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>Devam Ediyor</option>
              <option>Beklemede</option>
              <option>Tamamlandı</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Öncelik (1–5)</label>
            <select
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={priority}
              onChange={e => setPriority(parseInt(e.target.value))}
            >
              {[5,4,3,2,1].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}
