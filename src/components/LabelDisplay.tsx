import { Fragment, useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import type { Label } from '../types/label';
import LanguageSelectorFlag from './LanguageSelectorFlag';
//import CountryFlagDisplay from './CountryFlagDisplay';

interface LabelDisplayProps {
  label: Label;
  showControls?: boolean;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
};

const LabelDisplay: FC<LabelDisplayProps> = ({ label, showControls = true }) => {
  const { t, i18n } = useTranslation(); // Access the translation function from react-i18next
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // Set the default language to 'en'

  const [isSpeaking, setIsSpeaking] = useState(false);

  const langs =
    Array.isArray(label.languages) && label.languages.length
      ? [...new Set(label.languages)].sort() // Remove duplicates and sort
      : ['en']; // Default to 'en' if languages is empty or undefined

  // Sync selectedLanguage with i18next's language on initial load
  useEffect(() => {
    const initialLanguage = i18n.language || 'en'; // Default to 'en' if no language detected
    setSelectedLanguage(initialLanguage); // Set initial language based on i18next's language
  }, [i18n.language]); // Run this effect when i18next's language changes

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language); // Update the selected language in state
    i18n.changeLanguage(language); // Change the language in i18next

    // Log available voices for this language (helpful for debugging)
    const availableVoices = speechSynthesis.getVoices();
    const languageVoices = availableVoices.filter((voice) => voice.lang.startsWith(language));
    console.log(
      `Available voices for ${language}:`,
      languageVoices.map((v) => `${v.name} (${v.lang})`),
    );
  };

  //core information that will be displayed for each label
  const generateCoreFields = (label: Label, langs: string[]) => {
    return [
      { title: t('trialID'), value: label.trialIdentifier },
      ...(label.sponsorName ? [{ title: t('sponsorName'), value: label.sponsorName }] : []),
      { title: t('protocolNumber'), value: label.protocolNumber },
      { title: t('productName'), value: label.productName },
      { title: t('identifierCode'), value: label.identifierCode },
      { title: t('batchNumber'), value: label.batchNumber },
      {
        title: t('expiryDate'),
        value: label.expiryDate ? new Date(label.expiryDate).toLocaleDateString(selectedLanguage, dateFormatOptions) : '—',
      },
      ...(label.kitNumber ? [{ title: t('kitNumber'), value: label.kitNumber }] : []),
    ];
  };

  // Generates custom fields based on the label's customFields property
  // It formats each custom field with its key and the corresponding translation for the specified language.
  const generateCustomFields = (label: Label, lang: string) => {
    return Object.entries(label.customFields)
      .map(([key, translations]) => {
        const val = translations?.[lang] ?? '—';
        return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}.`;
      })
      .join(' ');
  };

  const coreFields = generateCoreFields(label, langs);

  // dynamically generates the text that will be read aloud by the text-to-speech component.
  const buildSpeechText = (lang: string): string => {
    const customText = generateCustomFields(label, lang);

    return `
      ${t('protocolNumber')}: ${label.protocolNumber}.
      ${t('productName')}: ${label.productName}.
      ${t('batchNumber')}: ${label.batchNumber}.
      ${t('expiryDate')}: ${label.expiryDate ? new Date(label.expiryDate).toLocaleDateString(lang, dateFormatOptions) : '—'}.
      ${customText}
    `;
  };

  const handleStartReading = () => {
    if (isSpeaking) return;

    const text = buildSpeechText(selectedLanguage);
    const utterance = new SpeechSynthesisUtterance(text);

    // Find and set the voice for the selected language with preference for female voices
    const availableVoices = speechSynthesis.getVoices();
    const languageVoices = availableVoices.filter((voice) => voice.lang.startsWith(selectedLanguage));

    // Prefer female voices, then any voice for the language
    const selectedVoice =
      languageVoices.find((voice) => voice.name.toLowerCase().includes('female')) ||
      languageVoices.find((voice) => voice.name.toLowerCase().includes('woman')) ||
      languageVoices.find((voice) => voice.name.toLowerCase().includes('maria')) ||
      languageVoices.find((voice) => voice.name.toLowerCase().includes('anna')) ||
      languageVoices.find((voice) => voice.name.toLowerCase().includes('susan')) ||
      languageVoices[0]; // Fallback to first available voice

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`Selected voice: ${selectedVoice.name} (${selectedVoice.lang})`);
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (error) => {
      console.error('TTS Error:', error);
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  const handleStopReading = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-6">
      {/* Language Selector Component */}
      <LanguageSelectorFlag
        languages={langs}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange} // Pass the handler to update the language
      />
      {/* Display the currently selected language */}
      <h3 className="font-semibold">Currently selected language: {selectedLanguage}</h3>

      {/* Display the label information in the selected language */}
      <Card key={selectedLanguage}>
        <CardHeader>
          <CardTitle className="text-2xl">{selectedLanguage}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg">
          {/* Core Fields */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreFields.map(({ title, value }) => (
              <Fragment key={title}>
                <dt className="font-semibold">{t(title)}:</dt>
                <dd>{value}</dd>
              </Fragment>
            ))}
          </dl>

          {/* Custom Fields */}
          <div className="pt-4">
            <h3 className="font-semibold underline">{t('AdditionalInformation')}</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(label.customFields).map(([key, translations]) => (
                <Fragment key={key}>
                  <dt className="font-semibold">{t(`customFields.${key}`)}:</dt>
                  <dd>{translations?.[selectedLanguage] ?? '—'}</dd>
                </Fragment>
              ))}
            </dl>
          </div>

          <hr />

          {/* TTS Controls */}
          {showControls && (
            <>
              <hr />
              <div className="flex gap-2 items-center mt-4">
                <Button variant="primary" disabled={isSpeaking} onClick={handleStartReading} aria-label="Read Label Aloud">
                  {isSpeaking ? 'Reading...' : 'Read Label Aloud'}
                </Button>
                <Button variant="primary" disabled={!isSpeaking} onClick={handleStopReading} aria-label="Stop Reading">
                  Stop Reading
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">{isSpeaking ? t('Reading aloud...') : t('Click the button to read the label aloud.')}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LabelDisplay;
