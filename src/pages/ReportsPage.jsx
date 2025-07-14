// src/pages/ReportsPage.jsx

import React from 'react';
// src/pages/ReportsPage.jsx
// ...
// Eski import: import reportsApi from '../api/reportsApi.jsx';
// Yeni import:
import { reportsApi } from '../api'; // src/api/index.js'den reportsApi'yi alıyoruz
// ...

function ReportsPage() {
  return (
    <div className="page-content"> {/* Genel sayfa içeriği sınıfı */}
      <h1 className="page-title">Tüm Raporlar</h1>
      <p>Rapor Listesi Buraya Gelecek.</p>
      {/* Rapor listesi ve diğer elementler buraya eklenecek */}
    </div>
  );
}

export default ReportsPage;