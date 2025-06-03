import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import useDocumentStore from '../store/documentStore';
import { Document } from '../types/Document';

const AnalysisPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const { getDocument, updateDocumentStatus } = useDocumentStore();
  const [document, setDocument] = useState<Document | undefined>();
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('Initializing analysis');
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    if (documentId) {
      const doc = getDocument(documentId);
      setDocument(doc);

      if (doc && doc.status === 'pending') {
        // Simulate document processing
        updateDocumentStatus(documentId, 'processing');
        
        // Simulate analysis progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 5) + 1;
          
          if (progress <= 20) {
            setAnalysisStage('Extracting document information');
          } else if (progress <= 40) {
            setAnalysisStage('Analyzing financial data');
          } else if (progress <= 60) {
            setAnalysisStage('Verifying property details');
          } else if (progress <= 80) {
            setAnalysisStage('Calculating eligibility scores');
          } else {
            setAnalysisStage('Generating final recommendation');
          }
          
          setAnalysisProgress(Math.min(progress, 100));
          
          if (progress >= 100) {
            clearInterval(interval);
            setAnalysisComplete(true);
            
            // After a delay, update status and navigate to results
            setTimeout(() => {
              // Randomly determine result for demo purposes
              const newStatus = Math.random() > 0.3 ? 'approved' : 'rejected';
              updateDocumentStatus(documentId, newStatus);
              navigate(`/results/${documentId}`);
            }, 2000);
          }
        }, 500);

        return () => clearInterval(interval);
      } else if (doc && (doc.status === 'approved' || doc.status === 'rejected')) {
        // If document is already processed, redirect to results
        navigate(`/results/${documentId}`);
      }
    }
  }, [documentId, getDocument, navigate, updateDocumentStatus]);

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Document Analysis</h1>
        <p className="mt-1 text-gray-500">
          We're analyzing your document to determine your eligibility
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="bg-secondary-100 p-3 rounded-full mr-4">
              <FileText className="h-8 w-8 text-secondary-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">{document.name}</h2>
              <p className="text-sm text-gray-500">{document.type}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Analysis Progress</h3>
              <span className="text-sm font-medium text-gray-700">{analysisProgress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 transition-all duration-300 ease-out"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center">
              {analysisComplete ? (
                <CheckCircle className="h-5 w-5 text-success-500 mr-3 animate-pulse" />
              ) : (
                <div className="mr-3">
                  <LoadingSpinner size="small" />
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">
                {analysisStage}
              </span>
            </div>
          </div>
          
          {analysisComplete && (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-success-600 mb-4">
                Analysis complete! Redirecting to results...
              </p>
              <Button
                onClick={() => navigate(`/results/${documentId}`)}
              >
                View Results
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center text-gray-500 text-sm">
        <p>This process usually takes between 30 seconds to 2 minutes depending on document complexity.</p>
        <p className="mt-1">Please don't close this window during analysis.</p>
      </div>
    </div>
  );
};

export default AnalysisPage;