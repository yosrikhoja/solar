export type DocumentStatus = 'pending' | 'processing' | 'approved' | 'rejected';
export type DocumentType = 'Invoice' | 'Bank Statement' | 'Utility Bill' | 'ID Document' | 'Property Document' | 'Other';

export interface Document {
  id: string;
  userId: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  uploadDate: string;
  processingDate?: string;
  completionDate?: string;
  pages: number;
  fileSize: number;
  eligible?: boolean;
  creditAmount?: number;
  sponsorshipAmount?: number;
  analysisResults?: AnalysisResult;
}

export interface AnalysisResult {
  overallScore: number;
  eligibility: {
    credit: boolean;
    sponsorship: boolean;
  };
  recommendation: string;
  details: {
    category: string;
    score: number;
    assessment: string;
  }[];
}