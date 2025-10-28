/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';
import { FONTS } from '@/constants/uiConstants';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '@/context/LoadingContext/Loader';
import { uploadticketfile } from '@/features/Tickets/services/Ticket';

const ProfileInformation: React.FC = () => {
	const [activeMenuItem, setActiveMenuItem] = useState('profile');
	const [isEditing, setIsEditing] = useState(false);
	const [showCancelDialog, setShowCancelDialog] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const dispatch = useDispatch<any>();
	const profileDetails = useSelector(selectProfile);
	const navigate = useNavigate();
	const { showLoader, hideLoader } = useLoader();

	useEffect(() => {
		(async () => {
			showLoader();
			const response = await dispatch(getStudentProfileThunk());
			if (response) {
				hideLoader();
			} else {
				hideLoader();
			}
		})();
	}, [dispatch, hideLoader, showLoader]);

	const [profileData, setProfileData] = useState({
		name: profileDetails?.full_name || '',
		traineeId: profileDetails?.userDetail?.staffId || '',
		profileImage: profileDetails?.image || '',
	});

	// Update profileData when profileDetails changes
	useEffect(() => {
		setProfileData({
			name: profileDetails?.full_name || '',
			traineeId: profileDetails?.userDetail?.staffId || '',
			profileImage: profileDetails?.image || '',
		});
	}, [profileDetails]);

	const [personalInfo, setPersonalInfo] = useState<any>(null);
	const [instituteInfo, setInstituteInfo] = useState({
		course: 'Theoretical Physics',
		batch: 'Batch 2024-25',
		studentId: profileDetails?.userDetail?.staffId,
	});

	const [originalPersonalInfo, setOriginalPersonalInfo] = useState<any>(null);
	const [originalProfileImage, setOriginalProfileImage] = useState(
		profileData.profileImage
	);

	const handleMenuItemClick = (itemId: string) => {
		if (isEditing && itemId !== 'profile') {
			setIsEditing(false);
		}
		setActiveMenuItem(itemId);
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	const handlePersonalInfoChange = async (data: any) => {
		setPersonalInfo(data);

		if (data.full_name !== profileData.name) {
			setProfileData((prev) => ({ ...prev, name: data.full_name }));
		}
	};

	const handleInstituteInfoChange = (data: typeof instituteInfo) => {
		setInstituteInfo(data);
	};

	const handleEditClick = () => {
		if (!isEditing) {
			// Initialize personalInfo with current profile data when starting to edit
			if (!personalInfo && profileDetails) {
				const initialPersonalInfo = {
					full_name: profileDetails?.full_name || '',
					address1: profileDetails?.contact_info?.address1 || '',
					address2: profileDetails?.contact_info?.address2 || '',
					alternate_phone_number:
						profileDetails?.contact_info?.alternate_phone_number || '',
					city: profileDetails?.contact_info?.city || '',
					pincode: profileDetails?.contact_info?.pincode || '',
					state: profileDetails?.contact_info?.state || '',
					phone_number: profileDetails?.contact_info?.phone_number || '',
					dob: profileDetails?.dob || '',
					email: profileDetails?.email || '',
					gender: profileDetails?.gender || '',
					qualification: profileDetails?.qualification || '',
					roll_no: profileDetails?.roll_no || '',
					image: profileDetails?.image || '',
				};
				setPersonalInfo(initialPersonalInfo);
				setOriginalPersonalInfo(initialPersonalInfo);
			} else {
				setOriginalPersonalInfo(personalInfo);
			}
			setOriginalProfileImage(profileData.profileImage);
		}
		setIsEditing(!isEditing);
	};

	const handleImageChange = async (imageFile: File) => {
		try {
			const formData = new FormData();
			formData.append('file', imageFile);
			const response = await uploadticketfile(formData);
			if (response) {
				const newImageUrl = response?.data?.file;
				setProfileData((prev) => ({
					...prev,
					profileImage: newImageUrl,
				}));
				// Also update personalInfo with new image
				if (personalInfo) {
					setPersonalInfo((prev: any) => ({
						...prev,
						image: newImageUrl,
					}));
				}
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};

	// Check if there are any changes
	const hasChanges = () => {
		if (!personalInfo || !originalPersonalInfo) return false;

		const personalInfoChanged =
			JSON.stringify(personalInfo) !== JSON.stringify(originalPersonalInfo);
		const imageChanged = profileData.profileImage !== originalProfileImage;
		return personalInfoChanged || imageChanged;
	};

	const handleSave = async (apiData: any) => {
		setOriginalPersonalInfo(apiData);
		await dispatch(getStudentProfileThunk());
		setOriginalProfileImage(profileData.profileImage);

		if (!hasChanges() || !personalInfo) {
			console.log('No changes to save');
			setIsEditing(false);
			return;
		}
		setIsSaving(true);

		setPersonalInfo(null);

		setIsEditing(false);

		try {
			// Update the original values to reflect the saved state
			setOriginalPersonalInfo(apiData);
			setOriginalProfileImage(profileData.profileImage);

			// Reset personalInfo to null so it gets reinitialized with fresh data
			setPersonalInfo(null);

			setIsEditing(false);
			// }
		} catch (error) {
			console.log('Error saving profile:', error);
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
		// Reset to original values
		setPersonalInfo(originalPersonalInfo);
		setProfileData((prev) => ({
			...prev,
			profileImage: originalProfileImage,
			name: originalPersonalInfo?.full_name || prev.name,
		}));
		setIsEditing(false);
		setShowCancelDialog(false);
	};

	return (
		<div className='min-h-fit' style={{ fontFamily: FONTS.para_01.fontFamily }}>
			<div className='flex flex-col xl:flex-row gap-4 p-2 sm:p-4 max-w-[1400px] mx-auto'>
				{/* Sidebar - Responsive width */}
				<div className='w-full xl:w-[320px] 2xl:w-[380px] flex-shrink-0'>
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
				<div className='flex-1 min-w-0'>
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
						profileImage={profileData.profileImage}
						profileDetails={profileDetails}
					/>
				</div>
			</div>

			{/* Confirmation Dialog */}
			<ConfirmationDialog
				isOpen={showCancelDialog}
				onClose={() => {
					setShowCancelDialog(false);
				}}
				onConfirm={confirmCancel}
				title='Discard Changes'
				description='You have unsaved changes. Are you sure you want to discard them?'
				confirmText='Discard'
				cancelText='Keep Editing'
				type='warning'
			/>
		</div>
	);
};

export default ProfileInformation;
