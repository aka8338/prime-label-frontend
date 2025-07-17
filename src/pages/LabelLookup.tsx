// src/pages/LabelLookup.tsx
import LabelDisplayWrapper from '@/components/LabelDisplayWrapper';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import type { Label as LabelType } from '../types/label';

const API = import.meta.env.VITE_API_URL;

export default function LabelLookup() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState<'identifier' | 'batch' | 'kit'>('identifier');
  const [identifierCode, setIdentifierCode] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [trialIdentifier, setTrialIdentifier] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [kitNumber, setKitNumber] = useState('');
  const [label, setLabel] = useState<LabelType | null>(null);
  const [urlError, setUrlError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for error message in URL parameters
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setUrlError(decodeURIComponent(errorParam));
      // Clear the error from URL after showing it
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Clear old errors when the search type changes
  const onTypeChange = (val: string) => {
    setError('');
    setLabel(null);
    setSearchType(val as any);
  };

  const fetchLabel = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let res;
      if (searchType === 'identifier') {
        res = await axios.get<LabelType>(`${API}/api/labels/identifier/${identifierCode.trim()}`);
      } else if (searchType === 'batch') {
        res = await axios.get<LabelType>(`${API}/api/labels/${sponsorName.trim()}/${trialIdentifier.trim()}/batch/${batchNumber.trim()}`);
      } else {
        res = await axios.get<LabelType>(`${API}/api/labels/${sponsorName.trim()}/${trialIdentifier.trim()}/kit/${kitNumber.trim()}`);
      }
      setLabel(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Label not found');
    } finally {
      setLoading(false);
    }
  }, [searchType, identifierCode, sponsorName, trialIdentifier, batchNumber, kitNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLabel();
  };

  return (
    <div className="flex justify-center items-center px-4" style={{ minHeight: 'calc(100vh - 184px)', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="w-full space-y-8" style={{ maxWidth: '500px' }}>
        <h1 className="text-2xl font-bold text-center text-gray-800">Lookup Your Label</h1>

        <Card style={{ width: '100%' }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-lg">Search Method</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <RadioGroup value={searchType} onValueChange={onTypeChange} className="flex justify-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="identifier" />
                <span className="font-medium">Identifier Code</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="batch" />
                <span className="font-medium">Trial + Batch</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="kit" />
                <span className="font-medium">Trial + Kit</span>
              </label>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 space-y-1">
          <p>
            Issues? Contact{' '}
            <a href={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL || 'help@clinicallabel.io'}`} className="text-blue-600 underline">
              support
            </a>
          </p>
          <p>version 0.1.2</p>
          <p>Last Updated: 20-Jun-2025</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" style={{ width: '100%' }}>
          {searchType === 'identifier' && (
            <Input placeholder="Identifier Code" value={identifierCode} onChange={(e) => setIdentifierCode(e.target.value)} required className="h-12 text-base" style={{ width: '100%' }} />
          )}

          {(searchType === 'batch' || searchType === 'kit') && (
            <div className="space-y-4">
              <Input placeholder="Sponsor Name" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} required className="h-12 text-base" style={{ width: '100%' }} />
              <Input placeholder="Trial Identifier" value={trialIdentifier} onChange={(e) => setTrialIdentifier(e.target.value)} required className="h-12 text-base" style={{ width: '100%' }} />
              {searchType === 'batch' ? (
                <Input placeholder="Batch Number" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} required className="h-12 text-base" style={{ width: '100%' }} />
              ) : (
                <Input placeholder="Kit Number" value={kitNumber} onChange={(e) => setKitNumber(e.target.value)} required className="h-12 text-base" style={{ width: '100%' }} />
              )}
            </div>
          )}

          <Button type="submit" variant="primary" className="h-12 text-lg font-semibold" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'loading' : 'Show Label'}
          </Button>
        </form>

        {error && <p className="text-red-600 text-center font-medium">{error}</p>}
        {urlError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-center font-medium">Label Loading Failed</p>
            <p className="text-red-500 text-center text-sm mt-1">{urlError}</p>
          </div>
        )}

        {label && (
          <div className="mx-auto">
            <LabelDisplayWrapper label={label} />
          </div>
        )}
      </div>
    </div>
  );
}
