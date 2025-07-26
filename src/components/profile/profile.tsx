/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';
import { FONTS } from '@/constants/uiConstants';
// import { useToast } from '@/components/ui/toast';
import Client from '@/api/index'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';
import { getStudentProfileThunk, UpdateInstructorThunk } from '@/features/Profile/reducers/thunks';
import { updateStudentProfile } from '@/features/Profile/services';

const ProfileInformation: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // const { showToast } = useToast();



  const dispatch = useDispatch<any>();
  const profileDetails = useSelector(selectProfile);

  useEffect(() => {
    dispatch(getStudentProfileThunk());
  }, [dispatch]);
  // Sample data - replace with actual data from props or API
  const [profileData, setProfileData] = useState({
    name: profileDetails?.full_name,
    traineeId: profileDetails?.userDetail?.staffId,
    profileImage: profileDetails?.image
  });

  const [personalInfo, setPersonalInfo] = useState<any | null>(null);

  const [instituteInfo, setInstituteInfo] = useState({
    course: 'Theoretical Physics',
    batch: 'Batch 2024-25',
    studentId: profileDetails?.userDetail?.staffId,
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

  const handlePersonalInfoChange = async (data: any) => {
    setPersonalInfo(data);
    // Here you can also update the profile name if needed

    const thunk = {
      contact_info: {
        address1: data?.address1,
        address2: data?.address2,
        city: data?.city,
        state: data?.state,
        pincode: data?.pincode,
        phone_number: data?.phone_number,
        alternate_phone_number: data?.alternate_phone_number,
      },
      roll_no: data?.roll_no,
      qualification: data?.qualification,
      gender: data?.gender,
      email: data?.email,
      dob: data?.dob,
      full_name: data?.full_name,
    }
    dispatch(UpdateInstructorThunk(thunk))
    // const responce = await Client.Instructor.index.update(thunk)

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
      // showToast('No changes detected to save.', 'info');
      return;
    }

    setIsSaving(true);

    try {
      const data = {
        contact_info: {
          address1: personalInfo?.address1 || '',
          address2: personalInfo?.address2 || '',
          city: personalInfo?.city || '',
          state: personalInfo?.state || '',
          pincode: personalInfo?.pincode || '',
          phone_number: personalInfo?.phone_number || '',
          alternate_phone_number: personalInfo?.alternate_phone_number || '',
        },
        roll_no: personalInfo?.roll_no || '',
        qualification: personalInfo?.qualification || '',
        gender: personalInfo?.gender || '',
        email: personalInfo?.email || '',
        dob: personalInfo?.dob || '',
        full_name: personalInfo?.full_name || '',
      };

      dispatch(UpdateInstructorThunk(data))
      console.log(data, "check api")
      console.log(typeof data)

      await updateStudentProfile({ ...data })
      setIsEditing(false);
    } catch (error) {
      console.log(error)
      // Handle error
      // showToast('Failed to update profile. Please try again.', 'error');
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
    setProfileData(prev => ({
      ...prev,
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