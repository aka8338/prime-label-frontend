// src/pages/LabelLookup.tsx
import { useState, useCallback } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import LabelDisplay from '../components/LabelDisplay';
import type { Label as LabelType } from '../types/label';
import LabelDisplayWrapper from '@/components/LabelDisplayWrapper';

const API = import.meta.env.VITE_API_URL;

export default function LabelLookup() {
  const [searchType, setSearchType] = useState<'identifier' | 'batch' | 'kit'>('identifier');
  const [identifierCode, setIdentifierCode] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [trialIdentifier, setTrialIdentifier] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [kitNumber, setKitNumber] = useState('');
  const [label, setLabel] = useState<LabelType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Lookup Your Label</h1>

      <Card>
        <CardHeader>
          <CardTitle>Search Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={searchType} onValueChange={onTypeChange} className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <RadioGroupItem value="identifier" />
              <span>Identifier Code</span>
            </label>
            <label className="flex items-center space-x-2">
              <RadioGroupItem value="batch" />
              <span>Trial + Batch</span>
            </label>
            <label className="flex items-center space-x-2">
              <RadioGroupItem value="kit" />
              <span>Trial + Kit</span>
            </label>
          </RadioGroup>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        {searchType === 'identifier' && <Input placeholder="Identifier Code" value={identifierCode} onChange={(e) => setIdentifierCode(e.target.value)} required />}

        {(searchType === 'batch' || searchType === 'kit') && (
          <>
            <Input placeholder="Sponsor Name" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} required />
            <Input placeholder="Trial Identifier" value={trialIdentifier} onChange={(e) => setTrialIdentifier(e.target.value)} required />
            {searchType === 'batch' ? (
              <Input placeholder="Batch Number" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} required />
            ) : (
              <Input placeholder="Kit Number" value={kitNumber} onChange={(e) => setKitNumber(e.target.value)} required />
            )}
          </>
        )}

        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? 'Looking up…' : 'Show Label'}
        </Button>
      </form>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {label && <LabelDisplayWrapper label={label} />}

      <div className="text-center text-sm text-gray-500 mt-4">
        <p>
          Issues? Contact{' '}
          <a href={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL}`} className="text-blue-600 underline">
            support
          </a>
        </p>

        <p>version 0.1.2</p>
        <p>Last Updated: 20-Jun-2025</p>
      </div>
    </div>
  );
}
