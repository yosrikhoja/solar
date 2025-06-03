import { useState } from 'react';
import { User, Lock, MapPin, Home, Mail, Phone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // User information state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+33 6 12 34 56 78',
    address: '123 Solar Avenue, Paris',
    postalCode: '75001',
    city: 'Paris',
    country: 'France',
  });
  
  // Password change state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };
  
  const saveProfile = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to update profile
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const changePassword = async () => {
    setIsChangingPassword(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to change password
      setPasswords({
        current: '',
        new: '',
        confirm: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-1 text-gray-500">
          Manage your account settings and personal information
        </p>
      </div>
      
      {/* Profile Information Card */}
      <Card className="mb-8">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <CardTitle>Personal Information</CardTitle>
          </div>
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              disabled={!isEditing}
            />
            
            <Input
              label="Email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleProfileChange}
              disabled={!isEditing}
            />
            
            <Input
              label="Phone Number"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
              disabled={!isEditing}
              icon={<Phone className="h-4 w-4 text-gray-400" />}
            />
            
            <Input
              label="Street Address"
              name="address"
              value={profileData.address}
              onChange={handleProfileChange}
              disabled={!isEditing}
              icon={<Home className="h-4 w-4 text-gray-400" />}
            />
            
            <Input
              label="Postal Code"
              name="postalCode"
              value={profileData.postalCode}
              onChange={handleProfileChange}
              disabled={!isEditing}
            />
            
            <Input
              label="City"
              name="city"
              value={profileData.city}
              onChange={handleProfileChange}
              disabled={!isEditing}
              icon={<MapPin className="h-4 w-4 text-gray-400" />}
            />
            
            <Input
              label="Country"
              name="country"
              value={profileData.country}
              onChange={handleProfileChange}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
        
        {isEditing && (
          <CardFooter className="justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={saveProfile} 
              isLoading={isSaving}
            >
              Save Changes
            </Button>
          </CardFooter>
        )}
      </Card>
      
      {/* Password Change Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-gray-500 mr-2" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <h3 className="text-base font-medium text-gray-700 mb-4">Change Password</h3>
          <div className="space-y-4">
            <Input
              label="Current Password"
              name="current"
              type="password"
              value={passwords.current}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
            
            <Input
              label="New Password"
              name="new"
              type="password"
              value={passwords.new}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              helperText="Must be at least 8 characters"
            />
            
            <Input
              label="Confirm New Password"
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
          </div>
        </CardContent>
        
        <CardFooter className="justify-end">
          <Button 
            onClick={changePassword}
            isLoading={isChangingPassword}
            disabled={!passwords.current || !passwords.new || !passwords.confirm}
          >
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;