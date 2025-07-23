import React from 'react';
import QRCode from '../components/QRCode';

const baseUrl = import.meta.env.VITE_FRONT_END;

let demoUrls: string[];

if (import.meta.env.MODE === 'development') {
  // In development, use the local server URL
  demoUrls = [
    `${baseUrl}/ENLIGHTEN-2025-101496`,
    `${baseUrl}/MidPharma Inc./MPX-2025-001/batch/LOT_09AV`,
    `${baseUrl}/MidPharma Inc./MPX-2025-001/kit/101899`,
    `${baseUrl}/CO45 Pharmaceuticals/CO45-2025-001/batch/LOT_06RS`,
  ];
} else {
  // In production, use the configured front-end URL
  demoUrls = [
    `${baseUrl}/ENLIGHTEN-2025-101496`,
    `${baseUrl}/MidPharma Inc./MPX-2025-001/batch/LOT_09AV`,
    `${baseUrl}/MidPharma Inc./MPX-2025-001/kit/101899`,
    // `${baseUrl}/CO92/CO92-2025-001/batch/LOT_01CV`,
    `${baseUrl}/CO45 Pharmaceuticals/CO45-2025-001/batch/LOT_06RS`,
  ];
}

// demoUrls = [
//   `${baseUrl}/ENLIGHTEN-2025x-102201`,
//   `${baseUrl}/MidPharma Inc./MPX-2025-002/batch/LOT_07AV`,
//   `${baseUrl}/MidPharma Inc./MPX-2025-002/kit/102201`,
//   `${baseUrl}/CO92/CO92-2025-001/batch/LOT_01CV`,
//   `${baseUrl}/CO45 Pharmaceuticals/CO45-2025-001/batch/LOT_06RS`,
// ];

const DemoPage: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">QR Code Demo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoUrls.map((url, index) => (
          <div key={index} className="border rounded-lg p-4 shadow">
            <QRCode URL={url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoPage;
