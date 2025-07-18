import { Minus, Plus, RotateCcw } from 'lucide-react';
import React, { useState } from 'react';
import type { Label } from '../types/label';
import LabelDisplay from './LabelDisplay';
import { Button } from './ui/button';

interface LabelDisplayWrapperProps {
  label: Label;
}

const LabelDisplayWrapper: React.FC<LabelDisplayWrapperProps> = ({ label }) => {
  const [fontSize, setFontSize] = useState(16);
  const DEFAULT_FONT_SIZE = 16;
  const MIN_FONT_SIZE = 12;
  const MAX_FONT_SIZE = 24;
  const STEP_SIZE = 2;

  const increaseFontSize = () => {
    if (fontSize < MAX_FONT_SIZE) {
      setFontSize(fontSize + STEP_SIZE);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > MIN_FONT_SIZE) {
      setFontSize(fontSize - STEP_SIZE);
    }
  };

  const resetFontSize = () => {
    setFontSize(DEFAULT_FONT_SIZE);
  };

  return (
    <div className="w-full" style={{ display: 'block', alignItems: 'normal', justifyContent: 'normal' }}>
      {/* Font Size Controls */}
      <div className="flex items-center justify-center bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center gap-8">
          {/* Zoom Out */}
          <Button
            variant="default"
            size="sm"
            onClick={decreaseFontSize}
            disabled={fontSize <= MIN_FONT_SIZE}
            className="bg-gray-600 hover:bg-gray-700 text-white w-12 h-12 rounded-lg p-0 shadow-lg disabled:opacity-50 transition-all duration-200"
            title="Zoom Out"
          >
            <Minus className="h-6 w-6" />
          </Button>

          {/* Font Size Display */}
          <div className="flex items-center gap-3 min-w-[140px] justify-center px-4">
            <span className="font-medium text-gray-600" style={{ fontSize: `${Math.max(12, fontSize * 0.75)}px` }}>
              Font Size:
            </span>
            <span className="font-bold text-gray-800" style={{ fontSize: `${Math.max(14, fontSize * 0.9)}px` }}>
              {fontSize}px
            </span>
          </div>

          {/* Zoom In */}
          <Button
            variant="default"
            size="sm"
            onClick={increaseFontSize}
            disabled={fontSize >= MAX_FONT_SIZE}
            className="bg-gray-600 hover:bg-gray-700 text-white w-12 h-12 rounded-lg p-0 shadow-lg disabled:opacity-50 transition-all duration-200"
            title="Zoom In"
          >
            <Plus className="h-6 w-6" />
          </Button>

          {/* Larger Spacer */}
          <div className="w-8"></div>

          {/* Reset Button */}
          <Button
            variant="default"
            size="sm"
            onClick={resetFontSize}
            disabled={fontSize === DEFAULT_FONT_SIZE}
            className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-lg p-0 shadow-lg disabled:opacity-50 transition-all duration-200"
            title="Reset to Default Size"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Label Display */}
      <div style={{ fontSize: `${fontSize}px` }} className="w-full">
        <LabelDisplay label={label} />
      </div>
    </div>
  );
};

export default LabelDisplayWrapper;
