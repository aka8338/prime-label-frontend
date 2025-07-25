// src/pages/LabelPage.tsx
import LabelDisplayWrapper from '@/components/LabelDisplayWrapper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Label } from '../types/label';

interface LabelPageProps {
  preloadedLabel?: Label;
}

const LabelPage = ({ preloadedLabel }: LabelPageProps) => {
  const navigate = useNavigate();
  const { sponsorName, trialIdentifier, batchNumber, kitNumber, identifierCode } = useParams<{
    sponsorName?: string;
    trialIdentifier?: string;
    batchNumber?: string;
    kitNumber?: string;
    identifierCode?: string;
  }>();

  const [label, setLabel] = useState<Label | null>(preloadedLabel || null);
  const [isLoaded, setIsLoaded] = useState(!!preloadedLabel);

  const pageStyle = {
    backgroundColor: '#f8f9fa', // Light white color
    minHeight: '100vh',
  };

  useEffect(() => {
    // If we already have preloaded data, don't fetch
    if (preloadedLabel) {
      return;
    }

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

        const response = await axios.get<Label>(url, {
          timeout: 15000, // 15 seconds timeout for Heroku sleeping apps
        });
        setLabel(response.data);
        setIsLoaded(true);
      } catch (err: any) {
        // On error, redirect back to lookup page with error message
        navigate('/lookup?error=' + encodeURIComponent(err.response?.data?.message || err.message || 'Label not found'));
      }
    };

    fetchLabel();
  }, [identifierCode, sponsorName, trialIdentifier, batchNumber, kitNumber, navigate, preloadedLabel]);

  // Show loading screen while fetching (only if no preloaded data)
  if (!isLoaded || !label) {
    return (
      <div style={pageStyle} className="min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl max-w-md mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Label</h3>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render label with data
  return (
    <div style={pageStyle} className="min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <LabelDisplayWrapper label={label} />
      </div>
    </div>
  );
};

export default LabelPage;
