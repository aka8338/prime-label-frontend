import { useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import type { Label } from '../types/label';
import styles from './LabelDisplay.module.css';
import LanguageSelectorFlag from './LanguageSelectorFlag';

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
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const langs = Array.isArray(label.languages) && label.languages.length ? [...new Set(label.languages)].sort() : ['en'];

  // Load voices when component mounts and when they become available
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Sync selectedLanguage with i18next's language on initial load
  useEffect(() => {
    if (i18n.language && langs.includes(i18n.language)) {
      setSelectedLanguage(i18n.language);
    }
  }, [i18n.language, langs]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  // Core fields that will appear in the left column
  const coreFields = [
    {
      label: t('trialID') || 'Trial Identifier',
      value: label.trialIdentifier || label.protocolNumber || '—',
    },
    {
      label: t('sponsorName') || 'Sponsor Name',
      value: label.sponsorName || '—',
    },
    {
      label: t('protocolNumber') || 'Protocol Number',
      value: label.protocolNumber || '—',
    },
    {
      label: t('productName') || 'Product Name',
      value: label.productName || '—',
    },
    {
      label: t('batchNumber') || 'Batch Number',
      value: label.batchNumber || '—',
    },
    {
      label: t('expiryDate') || 'Expiry Date',
      value: label.expiryDate ? new Date(label.expiryDate).toLocaleDateString(selectedLanguage, dateFormatOptions) : '—',
    },
  ];

  // Additional fields from custom fields
  const additionalFields = Object.entries(label.customFields || {}).map(([key, translations]) => ({
    label: t(`customFields.${key}`) || key,
    value: translations?.[selectedLanguage] || '—',
  }));

  const buildSpeechText = (lang: string): string => {
    const coreText = coreFields.map((field) => `${field.label}: ${field.value}`).join('. ');

    const additionalText = additionalFields.map((field) => `${field.label}: ${field.value}`).join('. ');

    return `${coreText}. ${additionalText}`;
  };

  const handleStartReading = () => {
    if (isSpeaking) return;

    const text = buildSpeechText(selectedLanguage);
    const utterance = new SpeechSynthesisUtterance(text);

    const languageCode = selectedLanguage.toLowerCase();
    const formattedLang = languageCode.includes('-') ? languageCode : `${languageCode}-${languageCode.toUpperCase()}`;
    utterance.lang = formattedLang;

    const exactMatch = voices.find((voice) => voice.lang.toLowerCase() === formattedLang);
    const languageMatch = voices.find((voice) => voice.lang.toLowerCase().startsWith(languageCode));

    if (exactMatch) {
      utterance.voice = exactMatch;
    } else if (languageMatch) {
      utterance.voice = languageMatch;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const handleStopReading = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className={styles.labelContainer}>
      {/* Header with controls */}
      <div className={styles.header}>
        <LanguageSelectorFlag languages={langs} selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />

        {showControls && (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button
              variant="primary"
              disabled={isSpeaking}
              onClick={handleStartReading}
              style={{
                backgroundColor: isSpeaking ? '#6b7280' : '#3b82f6',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: isSpeaking ? 'not-allowed' : 'pointer',
              }}
            >
              {isSpeaking ? 'Reading...' : 'Read Aloud'}
            </Button>
            {isSpeaking && (
              <Button
                variant="secondary"
                onClick={handleStopReading}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Stop
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Two-column layout */}
      <div className={styles.twoColumnGrid}>
        {/* Core Information Column */}
        <div className={styles.column}>
          <h2 className={styles.title}>{t('coreInformation') || 'Core Information'}</h2>
          {coreFields.map((field, index) => (
            <div key={index} className={styles.infoCard}>
              <div className={styles.label}>{field.label}</div>
              <div className={styles.value}>{field.value}</div>
            </div>
          ))}
        </div>

        {/* Additional Information Column */}
        <div className={styles.column}>
          <h2 className={styles.title}>{t('AdditionalInformation') || 'Additional Information'}</h2>
          {additionalFields.length > 0 ? (
            additionalFields.map((field, index) => (
              <div key={index} className={styles.infoCard}>
                <div className={styles.label}>{field.label}</div>
                <div className={styles.value}>{field.value}</div>
              </div>
            ))
          ) : (
            <div className={styles.infoCard}>
              <div className={styles.value}>{t('noAdditionalInfo') || 'No additional information available'}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabelDisplay;
