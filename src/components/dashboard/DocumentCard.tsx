import { Eye, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Document } from '../../types/Document';

interface DocumentCardProps {
  document: Document;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="h-5 w-5 text-success-500" />;
    case 'rejected':
      return <XCircle className="h-5 w-5 text-error-500" />;
    case 'processing':
      return <Clock className="h-5 w-5 text-warning-500 animate-pulse-slow" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-gray-400" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />;
  }
};

const DocumentCard = ({ document }: DocumentCardProps) => {
  const statusLabels = {
    approved: 'Approved for Financing',
    rejected: 'Not Eligible',
    processing: 'Analysis in Progress',
    pending: 'Pending Review',
  };

  const statusClasses = {
    approved: 'bg-success-50 text-success-700 border-success-200',
    rejected: 'bg-error-50 text-error-700 border-error-200',
    processing: 'bg-warning-50 text-warning-700 border-warning-200',
    pending: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="h-full transition-transform hover:translate-y-[-2px] hover:shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <FileText className="h-10 w-10 text-secondary-500 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900 truncate max-w-xs">
                {document.name}
              </h3>
              <p className="text-sm text-gray-500">
                Uploaded on {formatDate(document.uploadDate)}
              </p>
            </div>
          </div>
          <div 
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 border ${statusClasses[document.status]}`}
          >
            <StatusIcon status={document.status} />
            <span>{statusLabels[document.status]}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Document Type</h4>
          <p className="text-sm text-gray-600">{document.type}</p>
        </div>
        
        {document.status === 'approved' && (
          <div className="bg-success-50 p-3 rounded-md border border-success-200 mb-4">
            <p className="text-sm font-medium text-success-700">
              {document.eligible ? 'Eligible for sponsorship and credit' : 'Eligible for credit only'}
            </p>
            {document.creditAmount && (
              <p className="text-xs text-success-700 mt-1">
                Approved credit amount: €{document.creditAmount.toLocaleString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 border-t border-gray-100">
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            icon={<Eye className="h-4 w-4" />}
            as={Link}
            to={`/results/${document.id}`}
          >
            View Results
          </Button>
          
          <div className="text-sm text-gray-500">
            {document.pages} page{document.pages !== 1 ? 's' : ''}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;