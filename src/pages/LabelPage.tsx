// src/pages/LabelPage.tsx
import LabelDisplayWrapper from '@/components/LabelDisplayWrapper';
import medbackImage from '../assets/medback.png';
import type { Label } from '../types/label';

interface LabelPageProps {
  preloadedLabel: Label;
}

const LabelPage = ({ preloadedLabel }: LabelPageProps) => {
  const backgroundStyle = {
    backgroundImage: `url(${medbackImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  };

  // Render label immediately with preloaded data
  return (
    <div style={backgroundStyle} className="min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <LabelDisplayWrapper label={preloadedLabel} />
      </div>
    </div>
  );
};

export default LabelPage;
