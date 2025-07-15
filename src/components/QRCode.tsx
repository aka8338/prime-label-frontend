import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeWrapperProps {
  URL: string;
}

const QRCodeWrapper: React.FC<QRCodeWrapperProps> = ({ URL }) => {
  return (
    <div className="qr-code-container">
      {/* QR Code */}
      <div>
        <QRCode value={URL} />
      </div>
      {/* Clickable URL */}
      <div className="qr-code-url">
        <a href={URL} rel="noopener noreferrer">
          {URL}
        </a>
      </div>
    </div>
  );
};

export default QRCodeWrapper;
