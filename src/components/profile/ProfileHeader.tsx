import React, { useRef } from 'react';
import { Edit, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { GetImageUrl } from '../../utils/helper';
import { useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';

interface ProfileHeaderProps {
	name: string;
	traineeId: string;
	profileImage: string;
	onEditClick?: () => void;
	onImageChange?: (imageFile: File) => void;
	isEditing?: boolean;
	showEditButton?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	name,
	profileImage,
	onEditClick,
	onImageChange,
	isEditing = false,
	showEditButton = true,
}) => {
	const profile = useSelector(selectProfile);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageClick = () => {
		if (isEditing && showEditButton) {
			fileInputRef.current?.click();
		}
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			onImageChange?.(file);
		}
		// Reset the input to allow selecting the same file again
		event.target.value = '';
	};

	// Use the profileImage prop if available, otherwise fall back to profile?.image
	const displayImage = profileImage || profile?.image;

	return (
		<Card
			className='shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] border-none w-full'
			style={{ backgroundColor: COLORS.bg_Colour }}
		>
			<CardContent className='p-3 sm:p-4'>
				<div className='flex items-center justify-between gap-3'>
					{/* Left side - Image and details */}
					<div className='flex items-center gap-3 flex-1 min-w-0'>
						<div className='flex-shrink-0 relative'>
							<div
								className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-gray-200 shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] ${
									isEditing && showEditButton ? 'cursor-pointer group' : ''
								}`}
							>
								<img
									src={GetImageUrl(displayImage) ?? undefined}
									alt={name}
									className='w-full h-full object-cover'
								/>

								{/* Small camera icon at bottom right - only show when editing */}
								{isEditing && showEditButton && (
									<div
										className='absolute bottom-0 right-0 bg-blue-500 rounded-tl-lg p-1 cursor-pointer'
										onClick={handleImageClick}
									>
										<Camera className='w-3 h-3 text-white' />
									</div>
								)}
							</div>

							{/* Hidden file input */}
							{isEditing && showEditButton && (
								<input
									ref={fileInputRef}
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									className='hidden'
								/>
							)}
						</div>

						{/* Name and ID */}
						<div className='flex flex-col justify-center min-w-0 flex-1'>
							<h3
								className='font-bold mb-1 text-base leading-tight truncate'
								style={{
									color: COLORS.text_title,
									fontFamily: FONTS.heading_05.fontFamily,
									fontWeight: FONTS.heading_05.fontWeight,
								}}
							>
								{profile?.full_name || name}
							</h3>
							<p
								className='text-xs leading-relaxed'
								style={{
									color: COLORS.text_desc,
									fontFamily: FONTS.para_01.fontFamily,
								}}
							>
								ID: {profile?.userDetail?.staffId}
							</p>
						</div>
					</div>

					{/* Right side - Edit button */}
					{showEditButton && (
						<div className='flex-shrink-0'>
							<button
								onClick={onEditClick}
								className={`cursor-pointer border-none rounded-md px-2 py-2 flex items-center gap-1 text-xs font-medium transition-all duration-200 ${
									isEditing
										? 'shadow-[inset_3px_3px_5px_rgba(189,194,199,0.75),inset_-3px_-3px_5px_rgba(255,255,255,0.7)]'
										: 'shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(189,194,199,0.75),inset_-3px_-3px_5px_rgba(255,255,255,0.7)]'
								}`}
								style={{
									backgroundColor: COLORS.bg_Colour,
									fontFamily: FONTS.para_01.fontFamily,
									color: isEditing ? COLORS.light_blue : COLORS.text_desc,
								}}
							>
								<Edit className='w-3 h-3' />
								<span className='hidden lg:inline'>
									{isEditing ? 'Close' : 'Edit'}
								</span>
							</button>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileHeader;
