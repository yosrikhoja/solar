import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, FileCheck, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

interface FileUploaderProps {
  onFilesAccepted: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedFileTypes?: string[];
  className?: string;
}

const FileUploader = ({
  onFilesAccepted,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedFileTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'],
  className,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      
      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files.`);
        return;
      }
      
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      onFilesAccepted(newFiles);
    },
    [files, maxFiles, onFilesAccepted]
  );

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesAccepted(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    maxSize,
    accept: acceptedFileTypes.reduce((acc, type) => {
      if (type.startsWith('.')) {
        // Convert file extension to MIME type
        const mimeType = 
          type === '.pdf' ? { 'application/pdf': [] } :
          type === '.doc' || type === '.docx' ? { 'application/msword': [], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [] } :
          type === '.xls' || type === '.xlsx' ? { 'application/vnd.ms-excel': [], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [] } :
          type === '.jpg' || type === '.jpeg' ? { 'image/jpeg': [] } :
          type === '.png' ? { 'image/png': [] } : {};
        
        return { ...acc, ...mimeType };
      }
      return acc;
    }, {}),
    maxFiles: maxFiles - files.length,
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
        } ${isDragReject ? 'border-error-500 bg-error-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-lg font-medium text-gray-700">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag and drop files here, or click to select files'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Upload up to {maxFiles} files (max {maxSize / (1024 * 1024)}MB each)
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supported formats: {acceptedFileTypes.join(', ')}
          </p>
          <Button 
            variant="outline"
            size="sm"
            className="mt-4"
            type="button"
          >
            Select Files
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center mt-2 text-error-500">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-6 animate-fade-in">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <Card key={file.name + index} className="bg-gray-50">
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <FileCheck className="h-5 w-5 text-primary-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 truncate" style={{ maxWidth: '250px' }}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeFile(index)}
                    icon={<Trash2 className="h-4 w-4" />}
                    aria-label="Remove file"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;