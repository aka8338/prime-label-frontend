import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import medbackImage from '../assets/medback.png';
import LabelPage from '../pages/LabelPage';
import type { Label } from '../types/label';

const LabelPageLoader = () => {
  const navigate = useNavigate();
  const { sponsorName, trialIdentifier, batchNumber, kitNumber, identifierCode } = useParams<{
    sponsorName?: string;
    trialIdentifier?: string;
    batchNumber?: string;
    kitNumber?: string;
    identifierCode?: string;
  }>();

  const [label, setLabel] = useState<Label | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const backgroundStyle = {
    backgroundImage: `url(${medbackImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  };

  useEffect(() => {
    const fetchLabel = async () => {
      try {
        let url: string;

        // 1) Lookup by identifierCode
        if (identifierCode) {
          url = `${import.meta.env.VITE_API_URL}/api/labels/identifier/${identifierCode}`;
        } else if (sponsorName && trialIdentifier && batchNumber) {
          url = `${import.meta.env.VITE_API_URL}/api/labels/${sponsorName}/${trialIdentifier}/batch/${batchNumber}`;
        } else if (sponsorName && trialIdentifier && kitNumber) {
          url = `${import.meta.env.VITE_API_URL}/api/labels/${sponsorName}/${trialIdentifier}/kit/${kitNumber}`;
        } else {
          // Invalid URL format - redirect back to lookup
          navigate('/lookup');
          return;
        }

        const response = await axios.get<Label>(url);
        setLabel(response.data);
        setIsLoaded(true);
      } catch (err: any) {
        // On error, redirect back to lookup page with error message
        navigate('/lookup?error=' + encodeURIComponent(err.response?.data?.message || err.message || 'Label not found'));
      }
    };

    fetchLabel();
  }, [identifierCode, sponsorName, trialIdentifier, batchNumber, kitNumber, navigate]);

  // Show elegant loading screen while fetching
  if (!isLoaded || !label) {
    return (
      <div style={backgroundStyle} className="min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl max-w-md mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Preparing Label</h3>
            <p className="text-gray-600">Retrieving clinical label data...</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-600 h-1 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Once loaded, render the actual label page with pre-loaded data
  return <LabelPage preloadedLabel={label} />;
};

export default LabelPageLoader;
