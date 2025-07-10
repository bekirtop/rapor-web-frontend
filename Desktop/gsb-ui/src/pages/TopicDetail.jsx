import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { mockTopics } from "../data/mockTopics";

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = mockTopics.find((t) => t.id === parseInt(id));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState(3);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (topic) {
      setTitle(topic.title);
      setDescription(topic.description);
      setStatus(topic.status);
      setPriority(topic.priority);
    }
  }, [topic]);

  if (!topic) {
    return <p className="p-4">Konu bulunamadı.</p>;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Güncellenen Konu:", { title, description, status, priority });
    alert("Konu güncellendi!");
    navigate("/dashboard");
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    setComments((c) => [...c, comment.trim()]);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center bg-gray-100 px-6 py-4 border-b">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Geri Dön
          </button>
          <h2 className="flex-1 text-xl font-bold text-center">Konu Detayları</h2>
        </div>

        <form onSubmit={handleUpdate} className="px-6 py-6 space-y-6">
          {/* Başlık */}
          <div>
            <label className="block text-gray-700 mb-1">Başlık</label>
            <input
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Konu */}
          <div>
            <label className="block text-gray-700 mb-1">Konu</label>
            <textarea
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Durum */}
          <div>
            <label className="block text-gray-700 mb-1">Durum</label>
            <select
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
            >
              {[5,4,3,2,1].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          {/* Güncelle */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Güncelle
          </button>
        </form>

        {/* Yorumlar */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Yorumlar</h3>
          <div className="space-y-4">
            {comments.map((c,i) => (
              <div key={i} className="bg-gray-100 p-3 rounded border">
                {c}
              </div>
            ))}
          </div>
          <div className="mt-4 flex space-x-2">
            <input
              className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Yorumunuzu yazın..."
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
