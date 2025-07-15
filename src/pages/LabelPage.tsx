// src/pages/LabelPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LabelDisplay from "../components/LabelDisplay";
import type { Label } from "../types/label";
import LabelDisplayWrapper from "@/components/LabelDisplayWrapper";

const LabelPage = () => {
  // URL params: either identifierCode, or sponsor+trial+batch, or sponsor+trial+kit
  const {
    sponsorName,
    trialIdentifier,
    batchNumber,
    kitNumber,
    identifierCode,
  } = useParams<{
    sponsorName?: string;
    trialIdentifier?: string;
    batchNumber?: string;
    kitNumber?: string;
    identifierCode?: string;
  }>();

  const [label, setLabel] = useState<Label | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchLabel = async () => {
      setLoading(true);
      setError("");
      try {
        let url: string;

        // 1) Lookup by identifierCode
        if (identifierCode) {
          url = `${
            import.meta.env.VITE_API_URL
          }/api/labels/identifier/${identifierCode}`;

          // 2) Lookup by sponsor + trial + batch
        } else if (sponsorName && trialIdentifier && batchNumber) {
          url = `${
            import.meta.env.VITE_API_URL
          }/api/labels/${sponsorName}/${trialIdentifier}/batch/${batchNumber}`;

          // 3) Lookup by sponsor + trial + kit
        } else if (sponsorName && trialIdentifier && kitNumber) {
          url = `${
            import.meta.env.VITE_API_URL
          }/api/labels/${sponsorName}/${trialIdentifier}/kit/${kitNumber}`;
        } else {
          throw new Error("Invalid URL format");
        }

        const response = await axios.get<Label>(url);
        setLabel(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Label not found"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLabel();
  }, [identifierCode, sponsorName, trialIdentifier, batchNumber, kitNumber]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  // Success: render label
  return (
    <div className="max-w-4xl mx-auto p-6">
      {label && <LabelDisplayWrapper label={label} />}
    </div>
  );
};

export default LabelPage;
