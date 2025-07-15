import React from 'react';
import Flag from 'react-country-flag'; // Import the react-country-flag component
import { Card } from './ui/card';

interface CountryFlagDisplayProps {
  selectedLanguage: string; // The selected language (e.g., 'es-ES', 'en-US')
}

const CountryFlagDisplay: React.FC<CountryFlagDisplayProps> = ({ selectedLanguage }) => {
  // Extract the first two characters of the language code (country code)
  const countryCode = selectedLanguage.split('-')[1].toUpperCase(); // Get the 2-letter country code (e.g., 'ES' from 'es-ES')

  return (
    <div className="country-flag-display">
      {/* Display Country Flag */}
      <div>
        <Flag countryCode={countryCode} svg alt={'Flag'} style={{ width: '2em', height: '2em' }} />
      </div>

      {/* Display Country Name */}
      <div>
        <strong>country name ={countryCode}</strong>
      </div>
    </div>
  );
};

export default CountryFlagDisplay;
