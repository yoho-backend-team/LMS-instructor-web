import React, { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';
import { FONTS } from '@/constants/uiConstants';
import { useToast } from '@/components/ui/toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

const ProfileInformation: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  // Sample data - replace with actual data from props or API
  const [profileData, setProfileData] = useState({
    name: 'Albert Einstein',
    traineeId: 'U56TRN241',
    profileImage: 'https://img.freepik.com/premium-photo/character-portrait-albert-einstein-generate-by-ai_978242-594.jpg?w=2000'
  });

  const [personalInfo, setPersonalInfo] = useState({
    mailAddress: 'albert.einstein@example.com',
    name: 'Albert Einstein',
    gender: 'Male',
    qualification: 'Ph.D. in Physics',
    contactNumber: '+1 234 567 8900',
    alternateNumber: '+1 234 567 8901',
    dateOfBirth: '1879-03-14',
    addressLine1: '123 Physics Street',
    addressLine2: 'Apartment 4B',
    city: 'Princeton',
    state: 'New Jersey',
    pinCode: '08544'
  });

  const [instituteInfo, setInstituteInfo] = useState({
    course: 'Theoretical Physics',
    batch: 'Batch 2024-25',
    studentId: 'U56TRN241'
  });

  // Store original data to compare changes
  const [originalPersonalInfo, setOriginalPersonalInfo] = useState(personalInfo);
  const [originalProfileImage, setOriginalProfileImage] = useState(profileData.profileImage);

  const handleMenuItemClick = (itemId: string) => {
    // If switching away from profile section while editing, exit edit mode
    if (isEditing && itemId !== 'profile') {
      setIsEditing(false);
    }
    setActiveMenuItem(itemId);
  };

  const handleGoBack = () => {
  };

  const handlePersonalInfoChange = (data: typeof personalInfo) => {
    setPersonalInfo(data);
    // Here you can also update the profile name if needed
    if (data.name !== profileData.name) {
      setProfileData(prev => ({ ...prev, name: data.name }));
    }
  };

  const handleInstituteInfoChange = (data: typeof instituteInfo) => {
    setInstituteInfo(data);
  };

  const handleEditClick = () => {
    if (!isEditing) {
      // Store original data when starting to edit
      setOriginalPersonalInfo(personalInfo);
      setOriginalProfileImage(profileData.profileImage);
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (imageFile: File) => {
    // Handle image upload
    const imageUrl = URL.createObjectURL(imageFile);
    setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
    
    // Here you would typically upload the image to your server
  };

  // Check if there are any changes
  const hasChanges = () => {
    const personalInfoChanged = JSON.stringify(personalInfo) !== JSON.stringify(originalPersonalInfo);
    const imageChanged = profileData.profileImage !== originalProfileImage;
    return personalInfoChanged || imageChanged;
  };

  const handleSave = async () => {
    if (!hasChanges()) {
      showToast('No changes detected to save.', 'info');
      return;
    }

    setIsSaving(true);
    
    try {
      // Here you would typically save all data to your backend
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update original data after successful save
      setOriginalPersonalInfo(personalInfo);
      setOriginalProfileImage(profileData.profileImage);
      
      // Show success message
      showToast('Profile updated successfully!', 'success');
      setIsEditing(false);
    } catch (error) {
      // Handle error
      showToast('Failed to update profile. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges()) {
      setShowCancelDialog(true);
      return;
    }
    
    setIsEditing(false);
  };

  const confirmCancel = () => {
    // Restore original data
    setPersonalInfo(originalPersonalInfo);
    setProfileData(prev => ({ ...prev, 
      profileImage: originalProfileImage,
      name: originalPersonalInfo.name 
    }));
    
    setIsEditing(false);
    setShowCancelDialog(false);
  };

  return (
    <div className="min-h-fit" style={{ fontFamily: FONTS.para_01.fontFamily }}>
      <div className="flex flex-col xl:flex-row gap-4 p-2 sm:p-4 max-w-[1400px] mx-auto">
        {/* Sidebar - Responsive width */}
        <div className="w-full xl:w-[320px] 2xl:w-[380px] flex-shrink-0">
          <ProfileSidebar
            name={profileData.name}
            traineeId={profileData.traineeId}
            profileImage={profileData.profileImage}
            activeMenuItem={activeMenuItem}
            onMenuItemClick={handleMenuItemClick}
            onGoBack={handleGoBack}
            onEditClick={handleEditClick}
            onImageChange={handleImageChange}
            isEditing={isEditing}
          />
        </div>
        
        {/* Content - Takes remaining space */}
        <div className="flex-1 min-w-0">
          <ProfileContent
            personalInfo={personalInfo}
            instituteInfo={instituteInfo}
            onPersonalInfoChange={handlePersonalInfoChange}
            onInstituteInfoChange={handleInstituteInfoChange}
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={handleCancel}
            activeMenuItem={activeMenuItem}
            isSaving={isSaving}
          />
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={confirmCancel}
        title="Discard Changes"
        description="You have unsaved changes. Are you sure you want to discard them?"
        confirmText="Discard"
        cancelText="Keep Editing"
        type="warning"
      />
    </div>
  );
};

export default ProfileInformation;