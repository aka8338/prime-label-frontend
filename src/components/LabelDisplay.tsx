import { useEffect, useState, useMemo, useCallback, type FC } from 'react';
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

// Optimized language mapping cache
const LANGUAGE_MAPPING: Record<string, string> = {
  hi: 'hi-IN',
  'hi-in': 'hi-IN',
  en: 'en-US',
  'en-us': 'en-US',
  es: 'es-ES',
  'es-es': 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  'de-de': 'de-DE',
  ja: 'ja-JP',
  fi: 'fi-FI',
  'fi-fi': 'fi-FI',
};

const LabelDisplay: FC<LabelDisplayProps> = ({ label, showControls = true }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const langs = Array.isArray(label.languages) && label.languages.length ? [...new Set(label.languages)].sort() : ['en'];

  // Memoized core fields computation
  const coreFields = useMemo(
    () => [
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
    ],
    [t, label, selectedLanguage],
  );

  // Memoized additional fields computation
  const additionalFields = useMemo(
    () =>
      Object.entries(label.customFields || {}).map(([key, translations]: [string, Record<string, string>]) => ({
        label: t(`customFields.${key}`) || key,
        value: translations?.[selectedLanguage] || '—',
      })),
    [label.customFields, selectedLanguage, t],
  );

  // Memoized speech text - only rebuilds when language or fields change
  const speechText = useMemo(() => {
    const coreText = coreFields.map((field) => `${field.label}: ${field.value}`).join('. ');
    const additionalText = additionalFields.map((field) => `${field.label}: ${field.value}`).join('. ');
    return `${coreText}. ${additionalText}`;
  }, [coreFields, additionalFields]);

  // Memoized language formatting
  const formattedLanguage = useMemo(() => {
    const languageCode = selectedLanguage.toLowerCase();
    return LANGUAGE_MAPPING[languageCode] || (languageCode.includes('-') ? languageCode : `${languageCode}-${languageCode.toUpperCase()}`);
  }, [selectedLanguage]);

  // Memoized voice selection
  const selectedVoice = useMemo(() => {
    if (voices.length === 0) return null;

    const languageCode = selectedLanguage.toLowerCase().split('-')[0];

    // Try exact match first
    const exactMatch = voices.find((voice) => voice.lang.toLowerCase() === formattedLanguage.toLowerCase());
    if (exactMatch) return exactMatch;

    // Try language match
    const languageMatch = voices.find((voice) => voice.lang.toLowerCase().startsWith(languageCode));
    if (languageMatch) return languageMatch;

    // Try fallback match
    const fallbackMatch = voices.find((voice) => voice.lang.toLowerCase().includes(languageCode));
    return fallbackMatch || null;
  }, [voices, formattedLanguage, selectedLanguage]);

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

  // Optimized language change handler
  const handleLanguageChange = useCallback(
    (language: string) => {
      setSelectedLanguage(language);
      i18n.changeLanguage(language);
    },
    [i18n],
  );

  // Optimized speech handlers with useCallback
  const handleStartReading = useCallback(() => {
    if (isSpeaking) return;

    // Cancel any existing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = formattedLanguage;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Optimized event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [isSpeaking, speechText, formattedLanguage, selectedVoice]);

  const handleStopReading = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

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
                transition: 'background-color 0.2s ease',
              }}
            >
              {isSpeaking ? t('reading') || 'Reading...' : t('readAloud') || 'Read Aloud'}
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
                  transition: 'background-color 0.2s ease',
                }}
              >
                {t('stop') || 'Stop'}
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
