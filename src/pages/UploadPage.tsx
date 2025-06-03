import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import FileUploader from '../components/upload/FileUploader';
import { useAuth } from '../context/AuthContext';
import useDocumentStore from '../store/documentStore';
import { DocumentType } from '../types/Document';

const UploadPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState<DocumentType>('Utility Bill');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { uploadDocument } = useDocumentStore();
  const navigate = useNavigate();

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setError(null);
  };

  const handleUpload = async () => {
    if (!user) {
      setError('You must be logged in to upload documents');
      return;
    }
    
    if (files.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }

    setIsUploading(true);
    setError(null);
    
    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);

      // Handle document upload (one at a time for now)
      const uploadedDoc = await uploadDocument(user.id, files[0], documentType);

      // Complete progress and clear interval
      clearInterval(interval);
      setUploadProgress(100);
      
      // Short delay to show 100% before redirecting
      setTimeout(() => {
        navigate(`/analysis/${uploadedDoc.id}`);
      }, 500);
    } catch (error) {
      setError('An error occurred while uploading your document. Please try again.');
      console.error('Upload error:', error);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Upload Documents</h1>
        <p className="mt-1 text-gray-500">
          Upload your documents for analysis to determine your eligibility for solar financing
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>
            Please upload the required documents for analysis
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as DocumentType)}
              className="w-full rounded-md shadow-sm border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              disabled={isUploading}
            >
              <option value="Utility Bill">Utility Bill</option>
              <option value="Bank Statement">Bank Statement</option>
              <option value="Invoice">Invoice</option>
              <option value="ID Document">ID Document</option>
              <option value="Property Document">Property Document</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <FileUploader
              onFilesAccepted={handleFilesAccepted}
              maxFiles={1}
              maxSize={5 * 1024 * 1024} // 5MB
            />
          </div>
          
          {error && (
            <div className="p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {isUploading && (
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-right">{uploadProgress}%</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            disabled={isUploading}
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleUpload}
            icon={<Upload className="h-4 w-4" />}
            isLoading={isUploading}
            disabled={files.length === 0 || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="bg-secondary-50 p-4 rounded-md border border-secondary-200">
        <div className="flex space-x-3">
          <HelpCircle className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-secondary-800">Document Requirements</h3>
            <ul className="mt-2 text-sm text-secondary-700 space-y-1">
              <li>• Utility bills should be recent (less than 3 months old)</li>
              <li>• Bank statements should cover at least 3 months of history</li>
              <li>• Property documents must show ownership or lease agreement</li>
              <li>• All documents should be clearly legible</li>
              <li>• Maximum file size: 5MB per document</li>
              <li>• Accepted formats: PDF, DOC, DOCX, JPG, PNG</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;