import React, { useState } from 'react';
import LabelDisplay from './LabelDisplay'; // Your label component
import { Label } from '../types/label'; // Import the Label interface from the types folder
import { Button } from '../components/ui/button';

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
      <br></br>
      <Button variant="primary" className="default" onClick={increaseFontSize}>
        Zoom In
      </Button>
      <Button variant="primary" className="default" onClick={decreaseFontSize}>
        Zoom Out
      </Button>
      {/* Font Resizing Controls */}
      <div style={{ fontSize: `${fontSize}px` }}>
        <LabelDisplay label={label} />
      </div>
    </div>
  );
};

export default LabelDisplayWrapper;
