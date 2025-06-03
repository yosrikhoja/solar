import { create } from 'zustand';
import { Document, DocumentStatus, DocumentType } from '../types/Document';

interface DocumentState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUserDocuments: (userId: string) => Promise<void>;
  uploadDocument: (userId: string, file: File, type: DocumentType) => Promise<Document>;
  getDocument: (id: string) => Document | undefined;
  updateDocumentStatus: (id: string, status: DocumentStatus) => void;
}

// Helper function to generate mock documents
const createMockDocument = (
  userId: string, 
  file: File, 
  type: DocumentType
): Document => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    userId,
    name: file.name,
    type,
    status: 'pending',
    uploadDate: new Date().toISOString(),
    pages: Math.floor(Math.random() * 10) + 1,
    fileSize: file.size,
  };
};

// Mock data for demonstration
const mockDocuments: Document[] = [
  {
    id: 'doc123',
    userId: '12345',
    name: 'Electricity Bill June 2024.pdf',
    type: 'Utility Bill',
    status: 'approved',
    uploadDate: '2024-06-10T10:30:00Z',
    processingDate: '2024-06-10T10:35:00Z',
    completionDate: '2024-06-10T11:00:00Z',
    pages: 2,
    fileSize: 1245000,
    eligible: true,
    creditAmount: 12500,
    sponsorshipAmount: 5000,
    analysisResults: {
      overallScore: 85,
      eligibility: {
        credit: true,
        sponsorship: true
      },
      recommendation: 'Recommended for both credit and sponsorship programs based on consistent energy usage pattern and property suitability.',
      details: [
        {
          category: 'Energy Usage',
          score: 78,
          assessment: 'Regular high consumption indicates good solar potential.'
        },
        {
          category: 'Payment History',
          score: 92,
          assessment: 'Excellent payment history with no late payments.'
        },
        {
          category: 'Property Suitability',
          score: 85,
          assessment: 'Location and roof orientation favorable for solar installation.'
        }
      ]
    }
  },
  {
    id: 'doc456',
    userId: '12345',
    name: 'Bank Statement Q1 2024.pdf',
    type: 'Bank Statement',
    status: 'processing',
    uploadDate: '2024-06-15T14:20:00Z',
    processingDate: '2024-06-15T14:25:00Z',
    pages: 5,
    fileSize: 3245000
  },
  {
    id: 'doc789',
    userId: '12345',
    name: 'Property Deed.pdf',
    type: 'Property Document',
    status: 'pending',
    uploadDate: '2024-06-16T09:15:00Z',
    pages: 8,
    fileSize: 5642000
  },
  {
    id: 'doc012',
    userId: '12345',
    name: 'Solar Installation Quote.pdf',
    type: 'Other',
    status: 'rejected',
    uploadDate: '2024-06-05T11:45:00Z',
    processingDate: '2024-06-05T11:50:00Z',
    completionDate: '2024-06-05T13:30:00Z',
    pages: 3,
    fileSize: 2156000,
    eligible: false,
    analysisResults: {
      overallScore: 35,
      eligibility: {
        credit: false,
        sponsorship: false
      },
      recommendation: 'Not eligible for financing programs due to incomplete documentation and inconsistencies in property information.',
      details: [
        {
          category: 'Documentation',
          score: 30,
          assessment: 'Missing critical property ownership details.'
        },
        {
          category: 'Quote Validity',
          score: 40,
          assessment: 'Quote exceeds reasonable market rates for specified system.'
        },
        {
          category: 'Technical Feasibility',
          score: 35,
          assessment: "Proposed system specifications don't match property requirements."
        }
      ]
    }
  }
];

const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [...mockDocuments],
  isLoading: false,
  error: null,
  
  fetchUserDocuments: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      const userDocuments = mockDocuments.filter(doc => doc.userId === userId);
      
      set({ documents: userDocuments, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      set({ 
        error: 'Failed to load your documents. Please try again later.',
        isLoading: false 
      });
    }
  },
  
  uploadDocument: async (userId: string, file: File, type: DocumentType) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock document
      const newDocument = createMockDocument(userId, file, type);
      
      // Update store
      set(state => ({
        documents: [...state.documents, newDocument],
        isLoading: false
      }));
      
      return newDocument;
    } catch (error) {
      console.error('Failed to upload document:', error);
      set({ 
        error: 'Failed to upload your document. Please try again later.',
        isLoading: false 
      });
      throw error;
    }
  },
  
  getDocument: (id: string) => {
    return get().documents.find(doc => doc.id === id);
  },
  
  updateDocumentStatus: (id: string, status: DocumentStatus) => {
    set(state => ({
      documents: state.documents.map(doc => 
        doc.id === id ? { ...doc, status } : doc
      )
    }));
  }
}));

export default useDocumentStore;