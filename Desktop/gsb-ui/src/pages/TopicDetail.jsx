// src/pages/TopicDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTopic,
  updateTopic,
  getExplanations,
  addExplanation,
  deleteExplanation
} from "../services/topics";
import { ArrowLeft, Trash2, Plus } from "lucide-react";

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading]         = useState(true);
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus]           = useState("");
  const [priority, setPriority]       = useState(3);

  // AÇIKLAMALAR
  const [explanations, setExplanations]     = useState([]);
  const [newExplanation, setNewExplanation] = useState("");
  const [expLoading, setExpLoading]         = useState(true);

  useEffect(() => {
    // Konu detayını al
    setLoading(true);
    getTopic(id)
      .then(res => {
        const t = res.data;
        setTitle(t.title);
        setDescription(t.description);
        setStatus(t.status);
        setPriority(t.priority);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    // Açıklamaları al
    setExpLoading(true);
    getExplanations(id)
      .then(res => setExplanations(res.data))
      .catch(console.error)
      .finally(() => setExpLoading(false));
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

  const handleAddExp = async () => {
    if (!newExplanation.trim()) return;
    try {
      const res = await addExplanation(id, newExplanation.trim());
      setExplanations(prev => [...prev, res.data]);
      setNewExplanation("");
    } catch (err) {
      console.error(err);
      alert("Açıklama eklenemedi: " + err.message);
    }
  };

  const handleDelExp = async (expId) => {
    if (!window.confirm("Bu açıklamayı silmek istediğine emin misin?")) return;
    try {
      await deleteExplanation(id, expId);
      setExplanations(prev => prev.filter(x => x.id !== expId));
    } catch (err) {
      console.error(err);
      alert("Silme başarısız: " + err.message);
    }
  };

  if (loading)    return <p className="p-4 text-center">Yükleniyor...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Konu Formu */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center bg-gray-100 px-6 py-4 border-b">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5 mr-2" /> Geri Dön
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

        {/* Açıklama Paneli */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Açıklamalar</h3>

          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newExplanation}
              onChange={e => setNewExplanation(e.target.value)}
              placeholder="Yeni açıklama..."
              className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAddExp}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition flex items-center"
              type="button"
            >
              <Plus className="h-4 w-4 mr-1" /> Ekle
            </button>
          </div>

          {expLoading ? (
            <p className="text-center text-gray-500">Yükleniyor...</p>
          ) : explanations.length === 0 ? (
            <p className="text-gray-500 text-sm">Henüz açıklama yok.</p>
          ) : (
            <ul className="space-y-3">
              {explanations.map(exp => (
                <li key={exp.id} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded">
                  <span className="text-gray-800">{exp.content}</span>
                  <button
                    onClick={() => handleDelExp(exp.id)}
                    className="text-red-600 hover:text-red-800"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
