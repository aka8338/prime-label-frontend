import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Label } from '../types/label'; // Import the Label interface from the types folder
import LabelDisplay from './LabelDisplay'; // Your label component

interface LabelDisplayWrapperProps {
  label: Label; // Use the existing Label interface
}

const LabelDisplayWrapper: React.FC<LabelDisplayWrapperProps> = ({ label }) => {
  // State to manage font size
  const [fontSize, setFontSize] = useState(16);

  // Function to increase font size
  const increaseFontSize = () => setFontSize(fontSize + 2);

  // Function to decrease font size
  const decreaseFontSize = () => {
    if (fontSize > 8) {
      setFontSize(fontSize - 2);
    }
  };

  return (
    <div>
      {/* Font Resizing Controls */}
      <div className="flex gap-2 mb-4">
        <Button variant="primary" onClick={increaseFontSize}>
          Zoom In
        </Button>
        <Button variant="primary" onClick={decreaseFontSize} disabled={fontSize <= 8}>
          Zoom Out
        </Button>
        <span className="text-sm text-gray-600 flex items-center ml-2">Font Size: {fontSize}px</span>
      </div>
      <div style={{ fontSize: `${fontSize}px` }}>
        <LabelDisplay label={label} />
      </div>
    </div>
  );
};

export default LabelDisplayWrapper;
