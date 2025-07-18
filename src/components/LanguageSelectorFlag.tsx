import React from 'react';
import FlagSelect from 'react-flags-select'; // Import the react-flags-select component

interface LanguageSelectorFlagProps {
  languages: string[]; // Array of available languages (country codes)
  selectedLanguage: string; // Currently selected language
  onLanguageChange: (language: string) => void; // Function to handle language change
}

// Function to extract country code from the language code (e.g., 'en-US' -> 'US')
const getCountryCode = (languageCode: string) => {
  return languageCode.split('-')[1] || languageCode; // Split by hyphen and get the second part (country code)
};

// Map country code back to language code
const getLanguageCode = (countryCode: string, languages: string[]) => {
  // First, try to find exact match with country code
  const exactMatch = languages.find((lang) => lang.split('-')[1] === countryCode);
  if (exactMatch) return exactMatch;

  // Then try to find language by mapping country back to language
  const countryToLanguageMap: Record<string, string> = {
    US: 'en',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    JP: 'ja',
    IN: 'hi',
    FI: 'fi',
  };

  const languageCode = countryToLanguageMap[countryCode];
  return languages.find((lang) => lang === languageCode || lang.startsWith(languageCode + '-')) || languages[0];
};

const LanguageSelectorFlag: React.FC<LanguageSelectorFlagProps> = ({ languages, selectedLanguage, onLanguageChange }) => {
  // Handle flag change by setting the language when the flag is selected
  const handleFlagChange = (countryCode: string) => {
    const languageCode = getLanguageCode(countryCode, languages); // Convert country code back to language code
    if (languageCode) {
      onLanguageChange(languageCode); // Update language state with correct language code
    }
  };

  // Map over languages and convert them to country codes
  const countryCodes = [...new Set(languages.map((lang) => getCountryCode(lang)))];

  return (
    <div className="language-selector-flag">
      {/* Flag selector dropdown */}
      <FlagSelect
        countries={countryCodes} // Pass the available language codes (country codes)
        customLabels={{}} // Customize the label if necessary
        selected={getCountryCode(selectedLanguage)} // Set the currently selected language (country code)
        onSelect={handleFlagChange} // Call the handler on flag selection
        placeholder="Select Language"
      />
    </div>
  );
};

export default LanguageSelectorFlag;
