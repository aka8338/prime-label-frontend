export interface Label {
  labelType: string;
  sponsorName: string;
  templateVersion: number;
  trialIdentifier: string;
  protocolNumber: string;
  productName: string;
  identifierCode: string;
  batchNumber: string;
  expiryDate: string;
  kitNumber?: string;
  customFields: {
    dosage: Record<string, string>;
    manufacturing: Record<string, string>;
    warning: Record<string, string>;
    adverseReactions: Record<string, string>;
  };
  languages: string[];
  metadata: {
    createdBy: string;
    createdAt: string;
  };
}
