// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Trash2,            // ← ekledik
  MoreVertical,
  TrendingUp,
  Calendar,
  Bell
} from "lucide-react";
import { getTopics, deleteTopic } from "../services/topics"; // ← deleteTopic’i de import ettik

export default function Dashboard() {
  const navigate = useNavigate();
  const [topics, setTopics]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchTerm, setSearchTerm]     = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tümü");

  useEffect(() => {
    setLoading(true);
    getTopics()
      .then(res => setTopics(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const goToDetail  = (id) => navigate(`/topics/${id}`);
  const addNewTopic = ()   => navigate("/topics/new");

  // “Sil” işlemi
  const handleDelete = async (id) => {
    if (!window.confirm("Bu konuyu silmek istediğine emin misin?")) return;
    try {
      await deleteTopic(id);
      setTopics(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Silme başarısız: " + (err.response?.data?.title || err.message));
    }
  };

  const getStatusColor = (s) => ({
    Aktif:      "bg-green-100 text-green-800",
    Beklemede:  "bg-yellow-100 text-yellow-800",
    Tamamlandı: "bg-blue-100 text-blue-800",
  }[s] || "bg-gray-100 text-gray-800");

  const filteredTopics = topics.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = selectedFilter === "Tümü" || t.status === selectedFilter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: "Toplam Konu",   value: topics.length.toString(), icon: TrendingUp, color: "from-blue-500 to-purple-600" },
    { label: "Aktif Konular", value: topics.filter(t => t.status==="Aktif").length.toString(), icon: Calendar, color: "from-green-500 to-teal-600" },
    { label: "Bekleyen",      value: topics.filter(t => t.status==="Beklemede").length.toString(), icon: Bell, color: "from-yellow-500 to-orange-600" },
  ];

  if (loading) {
    return <p className="p-4 text-center">Yükleniyor...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <div className="h-8 w-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">JD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow border p-6 hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow border">
          {/* Table Header */}
          <div className="px-6 py-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold">Konular Listesi</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Konu ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Tümü</option>
                <option>Aktif</option>
                <option>Beklemede</option>
                <option>Tamamlandı</option>
              </select>
              <button
                onClick={addNewTopic}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition shadow"
              >
                <Plus className="h-4 w-4" /> <span>Yeni Konu</span>
              </button>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3"><input type="checkbox" className="rounded" /></th>
                  {["No", "Başlık", "Durum", "Öncelik", "İşlemler"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {filteredTopics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                    <td className="px-6 py-4">#{topic.id}</td>
                    <td className="px-6 py-4 font-medium">{topic.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full ${getStatusColor(topic.status)}`}>
                        {topic.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-sm font-semibold rounded">
                        {topic.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => goToDetail(topic.id)}
                        className="text-blue-600 hover:bg-blue-50 p-1 rounded transition"
                        title="Detayları Görüntüle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(topic.id)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded transition"
                        title="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:bg-gray-50 p-1 rounded transition" title="Diğer İşlemler">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTopics.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      Kayıt bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Toplam <span className="font-medium">{filteredTopics.length}</span> konu gösteriliyor
            </div>
            <div className="flex space-x-2">
              <button disabled className="px-3 py-1 text-sm text-gray-500 disabled:opacity-50">Önceki</button>
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">2</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Sonraki</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
