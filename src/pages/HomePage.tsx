import { Link } from 'react-router-dom';
import { SunMoon, UploadCloud, BarChart3, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <SunMoon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Solar Credit Eligibility Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload your documents, get instant analysis, and find out if you qualify for solar panel 
            sponsorship or credit within minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              as={Link}
              to={isAuthenticated ? "/upload" : "/register"}
              icon={<UploadCloud className="h-5 w-5" />}
              className="animate-fade-in"
            >
              {isAuthenticated ? "Upload Documents" : "Get Started"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              as="a"
              href="#how-it-works"
              className="animate-fade-in"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-primary-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <p className="text-4xl font-bold text-primary-600">95%</p>
              <p className="mt-2 text-gray-600">Application Approval Rate</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <p className="text-4xl font-bold text-primary-600">€15.2M</p>
              <p className="mt-2 text-gray-600">Credit Facilitated</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <p className="text-4xl font-bold text-primary-600">5,000+</p>
              <p className="mt-2 text-gray-600">Solar Installations Funded</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to determine your eligibility for solar financing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
              <UploadCloud className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
            <p className="text-gray-600">
              Upload your utility bills, property documents, and other required paperwork securely to our platform.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-secondary-100 p-4 rounded-full inline-block mb-4">
              <BarChart3 className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Our advanced AI analyzes your documents to assess eligibility for various solar financing programs.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-success-50 p-4 rounded-full inline-block mb-4">
              <CheckCircle className="h-8 w-8 text-success-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Results</h3>
            <p className="text-gray-600">
              Receive a detailed report on your eligibility for sponsorships or credit for solar panel installation.
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">JD</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium">Jean Dupont</p>
                  <p className="text-sm text-gray-500">Paris, France</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The document analysis was incredibly accurate. I received approval for a solar installation credit within 48 hours of uploading my documents."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-secondary-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <span className="text-secondary-700 font-bold">MS</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium">Maria Schmidt</p>
                  <p className="text-sm text-gray-500">Berlin, Germany</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The platform simplified what would have been a complex application process. Thanks to SolarDoc, I now have solar panels fully sponsored!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-success-50 rounded-full h-12 w-12 flex items-center justify-center">
                  <span className="text-success-700 font-bold">AR</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium">Antonio Rossi</p>
                  <p className="text-sm text-gray-500">Rome, Italy</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I was skeptical at first, but the process was seamless. The detailed analysis of my documents helped me understand my financing options clearly."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to go solar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Find out if you qualify for solar panel sponsorship or credit today.
          </p>
          <Button
            size="lg"
            as={Link}
            to={isAuthenticated ? "/upload" : "/register"}
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            {isAuthenticated ? "Upload Your Documents" : "Create Free Account"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;