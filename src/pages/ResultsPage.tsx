import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import useDocumentStore from '../store/documentStore';
import { Document } from '../types/Document';

const ResultsPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { getDocument } = useDocumentStore();
  const [document, setDocument] = useState<Document | undefined>();

  useEffect(() => {
    if (documentId) {
      const doc = getDocument(documentId);
      setDocument(doc);
    }
  }, [documentId, getDocument]);

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Analysis Results</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<Download className="h-4 w-4" />}
        >
          Export Report
        </Button>
      </div>
      
      {/* Document info card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="bg-secondary-100 p-3 rounded-full mr-4">
              <FileText className="h-8 w-8 text-secondary-600" />
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-medium text-gray-900">{document.name}</h2>
              <p className="text-sm text-gray-500">{document.type} • {document.pages} pages</p>
            </div>
            <div>
              {document.status === 'approved' ? (
                <div className="bg-success-50 px-3 py-1 rounded-full text-sm font-medium text-success-700 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approved
                </div>
              ) : (
                <div className="bg-error-50 px-3 py-1 rounded-full text-sm font-medium text-error-700 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  Not Eligible
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-500">Upload Date</p>
              <p className="text-sm font-medium">{formatDate(document.uploadDate)}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-500">Analysis Started</p>
              <p className="text-sm font-medium">{formatDate(document.processingDate)}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-500">Analysis Completed</p>
              <p className="text-sm font-medium">{formatDate(document.completionDate)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Results section */}
      {document.analysisResults ? (
        <div className="space-y-6">
          {/* Eligibility card */}
          <Card className={document.status === 'approved' ? 'border-l-4 border-l-success-500' : 'border-l-4 border-l-error-500'}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Eligibility Results</CardTitle>
            </CardHeader>
            <CardContent>
              {document.status === 'approved' ? (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Based on our analysis, you are eligible for:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {document.eligible && document.creditAmount && (
                      <div className="bg-success-50 p-4 rounded-md border border-success-100">
                        <h3 className="font-medium text-success-700 mb-2 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" /> Credit Approval
                        </h3>
                        <p className="text-success-700 text-sm mb-1">
                          You've been approved for a solar installation credit.
                        </p>
                        <p className="text-2xl font-bold text-success-800">
                          €{document.creditAmount.toLocaleString()}
                        </p>
                        <p className="text-xs text-success-600 mt-2">
                          Terms: 120 months at 3.5% interest rate
                        </p>
                      </div>
                    )}
                    
                    {document.eligible && document.sponsorshipAmount && (
                      <div className="bg-secondary-50 p-4 rounded-md border border-secondary-100">
                        <h3 className="font-medium text-secondary-700 mb-2 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" /> Sponsorship Eligibility
                        </h3>
                        <p className="text-secondary-700 text-sm mb-1">
                          You qualify for a green energy sponsorship.
                        </p>
                        <p className="text-2xl font-bold text-secondary-800">
                          €{document.sponsorshipAmount.toLocaleString()}
                        </p>
                        <p className="text-xs text-secondary-600 mt-2">
                          Non-repayable grant for solar installation
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="font-medium text-gray-700 mb-2">Next Steps</h3>
                    <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                      <li>Review your approval details carefully</li>
                      <li>Download your eligibility certificate</li>
                      <li>Contact one of our partner installers to proceed with your installation</li>
                      <li>Submit the installation quote through our platform</li>
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-error-50 p-4 rounded-md border border-error-100">
                    <h3 className="font-medium text-error-700 mb-2 flex items-center">
                      <XCircle className="h-5 w-5 mr-2" /> Not Eligible at This Time
                    </h3>
                    <p className="text-error-700 text-sm">
                      Based on the documents provided, you don't currently qualify for our solar financing programs.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="font-medium text-gray-700 mb-2">Reasons & Recommendations</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Insufficient documentation - please provide additional property ownership records</li>
                      <li>Energy consumption patterns do not meet minimum requirements</li>
                      <li>Property characteristics may not be suitable for solar installation</li>
                    </ul>
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 text-sm mb-1">What you can do:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Upload additional supporting documentation</li>
                        <li>Consider energy efficiency improvements first</li>
                        <li>Consult with our advisors for personalized guidance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Analysis details */}
          {document.analysisResults && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-gray-500 mr-2" />
                  <CardTitle className="text-xl">Detailed Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Overall Score</h3>
                    <span className="text-sm font-medium text-gray-700">{document.analysisResults.overallScore}/100</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ease-out ${
                        document.analysisResults.overallScore >= 70 ? 'bg-success-500' :
                        document.analysisResults.overallScore >= 40 ? 'bg-warning-500' : 'bg-error-500'
                      }`}
                      style={{ width: `${document.analysisResults.overallScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-gray-700 mb-3">Category Breakdown</h3>
                <div className="space-y-4">
                  {document.analysisResults.details.map((detail, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{detail.category}</span>
                        <span className="text-sm text-gray-500">{detail.score}/100</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ease-out ${
                            detail.score >= 70 ? 'bg-success-500' :
                            detail.score >= 40 ? 'bg-warning-500' : 'bg-error-500'
                          }`}
                          style={{ width: `${detail.score}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{detail.assessment}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Analysis Summary</h3>
                  <p className="text-sm text-gray-600">
                    {document.analysisResults.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No analysis results available yet.</p>
          <p className="text-gray-500 mt-1">Please wait while we process your document.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;