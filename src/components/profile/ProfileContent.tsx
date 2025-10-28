import React, { useRef, useState, useEffect } from 'react';
import PersonalInformation from './PersonalInformation';
import IDCard from './IDCard';
import { COLORS, FONTS } from '@/constants/uiConstants';
import type { PersonalInformationRef } from './PersonalInformation';
import { updateStudentProfile } from '../../features/Profile/services/index';

interface PersonalInfo {
	full_name: string;
	address1: string;
	address2: string;
	alternate_phone_number: string;
	city: string;
	pincode: number;
	state: string;
	phone_number: string;
	dob: string;
	email: string;
	gender: string;
	qualification: string;
	roll_no: string;
	image: string;
}

interface InstituteInfo {
	course: string;
	batch: string;
	studentId: string;
}

interface ProfileContentProps {
	personalInfo?: PersonalInfo;
	instituteInfo?: InstituteInfo;
	onPersonalInfoChange?: (data: PersonalInfo) => void;
	onInstituteInfoChange?: (data: InstituteInfo) => void;
	isEditing?: boolean;
	onSave?: (data: any) => Promise<void> | void;
	onCancel?: () => void;
	activeMenuItem?: string;
	isSaving?: boolean;
	profileImage?: string;
	profileDetails?: any;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
	personalInfo,
	isEditing = false,
	onSave,
	onCancel,
	activeMenuItem = 'profile',
	isSaving = false,
	profileImage = '',
	profileDetails,
}) => {
	const personalInfoRef = useRef<PersonalInformationRef>(null);
	const [currentFormData, setCurrentFormData] = useState<PersonalInfo | null>(
		null
	);
	const [saving, setSaving] = useState(false);
	const [forceRefreshKey] = useState(0);

	// Update form when profileDetails changes (after save or cancel)
	useEffect(() => {
		if (personalInfoRef.current && profileDetails && !isEditing) {
			personalInfoRef.current.resetForm();
		}
	}, [profileDetails, isEditing]);

	// Reset form when personalInfo changes from parent (for cancel functionality)
	useEffect(() => {
		if (personalInfo && personalInfoRef.current && !isEditing) {
			personalInfoRef.current.resetForm();
		}
	}, [personalInfo, isEditing]);

	const handlePersonalInfoChange = (data: PersonalInfo) => {
		setCurrentFormData(data);
	};

	const handleCancel = () => {
		if (personalInfoRef.current) {
			personalInfoRef.current.resetForm();
		}
		setCurrentFormData(null);
		if (onCancel) onCancel();
	};

	const formatPhoneNumber = (num: string) => {
		if (!num) return '';
		const cleaned = num.replace(/\D/g, '');
		if (cleaned.length === 10)
			return `+91-${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
				6
			)}`;
		return num;
	};

	const transformDataForAPI = (data: PersonalInfo) => {
		const apiData = {
			full_name: data.full_name || '',
			dob: data.dob || '',
			email: data.email || '',
			gender: data.gender || '',
			qualification: data.qualification || '',
			roll_no: data.roll_no || '',
			image: profileImage || data.image || '',
			contact_info: {
				address1: data.address1 || '',
				address2: data.address2 || '',
				alternate_phone_number: formatPhoneNumber(data.alternate_phone_number),
				city: data.city || '',
				pincode: Number(data.pincode) || 0,
				state: data.state || '',
				phone_number: formatPhoneNumber(data.phone_number),
			},
		};
		return apiData;
	};

	const handleSave = async () => {
		if (!currentFormData) {
			console.warn('No changes detected');
			handleCancel();
			return;
		}

		const apiData = transformDataForAPI(currentFormData);

		try {
			setSaving(true);
			const response = await updateStudentProfile(apiData);

			if (response?.status === 'failed') {
				throw new Error(response?.message || 'Failed to update profile');
			}

			// Call parent onSave callback which will refresh the profile data
			if (onSave) await onSave(apiData);

			// Reset form data after successful save
			setCurrentFormData(null);
		} catch (error: any) {
			console.error('Failed to update profile:', error);
			alert(error.message || 'Failed to update profile');
		} finally {
			setSaving(false);
		}
	};

	const renderContent = () => {
		switch (activeMenuItem) {
			case 'idcard':
				return (
					<div className='flex-1 w-full'>
						<IDCard />
					</div>
				);
			case 'profile':
			default:
				return (
					<div className='flex-1 w-full px-2 sm:px-0'>
						<div
							className='rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex flex-col'
							style={{
								width: '100%',
								marginTop: '1rem',
								height: '75vh',
								fontFamily: FONTS.para_01.fontFamily,
							}}
						>
							{isEditing && (
								<div className='flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-3 sm:p-4 border-b border-gray-200 flex-shrink-0'>
									<button
										onClick={handleCancel}
										disabled={saving || isSaving}
										className='cursor-pointer px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(189,194,199,0.75),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed'
										style={{
											backgroundColor: COLORS.bg_Colour,
											color: COLORS.text_desc,
											fontFamily: FONTS.para_01.fontFamily,
											fontSize: FONTS.para_01.fontSize,
										}}
									>
										Cancel
									</button>

									<button
										onClick={handleSave}
										disabled={saving || isSaving}
										className='cursor-pointer px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(123,0,255,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
										style={{
											backgroundColor: COLORS.light_blue,
											color: COLORS.white,
											fontFamily: FONTS.para_01.fontFamily,
											fontSize: FONTS.para_01.fontSize,
										}}
									>
										{(saving || isSaving) && (
											<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
										)}
										{saving || isSaving ? 'Saving...' : 'Save Changes'}
									</button>
								</div>
							)}

							<div className='p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-hide'>
								<PersonalInformation
									key={`personal-info-${forceRefreshKey}`}
									ref={personalInfoRef}
									isEditing={isEditing}
									onDataChange={handlePersonalInfoChange}
									profileImage={profileImage}
								/>
							</div>
						</div>
					</div>
				);
		}
	};

	return renderContent();
};

export default ProfileContent;
