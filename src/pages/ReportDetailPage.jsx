// src/pages/ReportDetailPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

function ReportDetailPage() {
  const { id } = useParams(); // URL'den rapor ID'sini alıyoruz
  return (
    <div className="page-content"> {/* Genel sayfa içeriği sınıfı */}
      <h1 className="page-title">Rapor Detayı: Rapor #{id}</h1>
      <p>Rapor Detayları Buraya Gelecek.</p>
      {/* Rapor detayları ve diğer elementler buraya eklenecek */}
    </div>
  );
}

export default ReportDetailPage;