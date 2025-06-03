import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Clock, ArrowUpDown, CheckCircle, XCircle, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import DocumentCard from '../components/dashboard/DocumentCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import useDocumentStore from '../store/documentStore';
import { DocumentStatus, DocumentType } from '../types/Document';

const DashboardPage = () => {
  const { user } = useAuth();
  const { documents, isLoading, fetchUserDocuments } = useDocumentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (user) {
      fetchUserDocuments(user.id);
    }
  }, [fetchUserDocuments, user]);

  // Filter and sort documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'asc'
        ? new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        : new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    } else if (sortBy === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'status') {
      const statusOrder = { approved: 0, processing: 1, pending: 2, rejected: 3 };
      return sortDirection === 'asc'
        ? statusOrder[a.status] - statusOrder[b.status]
        : statusOrder[b.status] - statusOrder[a.status];
    }
    return 0;
  });

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Manage your documents and track their analysis status
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            as={Link}
            to="/upload"
            icon={<Plus className="h-4 w-4" />}
            size="md"
          >
            Upload New Document
          </Button>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as DocumentStatus | 'all')}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as DocumentType | 'all')}
            >
              <option value="all">All Document Types</option>
              <option value="Invoice">Invoice</option>
              <option value="Bank Statement">Bank Statement</option>
              <option value="Utility Bill">Utility Bill</option>
              <option value="ID Document">ID Document</option>
              <option value="Property Document">Property Document</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'status')}
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
            </select>
            <button
              onClick={toggleSortDirection}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label={sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'}
            >
              {sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Status summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Documents</p>
            <p className="text-2xl font-semibold">{documents.length}</p>
          </div>
          <div className="bg-primary-100 p-2 rounded-full">
            <Filter className="h-6 w-6 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-warning-50 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-warning-700">Processing</p>
            <p className="text-2xl font-semibold">{documents.filter(d => d.status === 'processing').length}</p>
          </div>
          <div className="bg-warning-100 p-2 rounded-full">
            <Clock className="h-6 w-6 text-warning-600" />
          </div>
        </div>
        
        <div className="bg-success-50 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-success-700">Approved</p>
            <p className="text-2xl font-semibold">{documents.filter(d => d.status === 'approved').length}</p>
          </div>
          <div className="bg-success-100 p-2 rounded-full">
            <CheckCircle className="h-6 w-6 text-success-600" />
          </div>
        </div>
        
        <div className="bg-error-50 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-error-700">Rejected</p>
            <p className="text-2xl font-semibold">{documents.filter(d => d.status === 'rejected').length}</p>
          </div>
          <div className="bg-error-100 p-2 rounded-full">
            <XCircle className="h-6 w-6 text-error-600" />
          </div>
        </div>
      </div>
      
      {/* Document list */}
      {sortedDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' ? (
            <p className="text-gray-500">
              No documents match your current filters. Try adjusting your search criteria.
            </p>
          ) : (
            <>
              <p className="text-gray-500 mb-4">
                Start by uploading your first document for analysis.
              </p>
              <Button
                as={Link}
                to="/upload"
                size="md"
                variant="primary"
                icon={<Plus className="h-4 w-4" />}
              >
                Upload Document
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;