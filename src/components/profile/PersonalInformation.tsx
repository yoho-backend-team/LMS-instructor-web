/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';
import InstituteInformation from './InstituteInformation';

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

interface PersonalInformationProps {
	data?: PersonalInfo;
	onDataChange?: (data: PersonalInfo) => void;
	isEditing?: boolean;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
	onDataChange,
	isEditing = false,
}) => {
	const personalInfo = useSelector(selectProfile);

	const fullNameRef = useRef<HTMLInputElement>(null);
	const address1Ref = useRef<HTMLInputElement>(null);
	const address2Ref = useRef<HTMLInputElement>(null);
	const alternatePhoneNumberRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const pincodeRef = useRef<HTMLInputElement>(null);
	const stateRef = useRef<HTMLInputElement>(null);
	const phoneNumberRef = useRef<HTMLInputElement>(null);
	const dobRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const genderRef = useRef<HTMLSelectElement>(null);
	const qualificationRef = useRef<HTMLInputElement>(null);
	const rollNoRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch<any>();

	const [formData, setFormData] = useState<any>({
		full_name: '',
		address1: '',
		address2: '',
		alternate_phone_number: '',
		city: '',
		pincode: '',
		state: '',
		phone_number: '',
		dob: '',
		email: '',
		gender: '',
		qualification: '',
		roll_no: '',
		image: '',
	});

	useEffect(() => {
		dispatch(getStudentProfileThunk());
	}, [dispatch]);

	useEffect(() => {
		setFormData({
			full_name: personalInfo?.full_name,
			address1: personalInfo?.contact_info?.address1,
			address2: personalInfo?.contact_info?.address2,
			alternate_phone_number:
				personalInfo?.contact_info?.alternate_phone_number,
			city: personalInfo?.contact_info?.city,
			pincode: personalInfo?.contact_info?.pincode,
			state: personalInfo?.contact_info?.state,
			phone_number: personalInfo?.contact_info?.phone_number,
			dob: personalInfo?.dob,
			email: personalInfo?.email,
			gender: personalInfo?.gender,
			qualification: personalInfo?.qualification,
			roll_no: personalInfo?.roll_no,
			image: personalInfo?.image,
		});
	}, [personalInfo]);

	const handleInputChange = (key: keyof PersonalInfo, value: string) => {
		const updatedData = { ...formData, [key]: value };
		setFormData(updatedData);
		onDataChange?.(updatedData);
	};

	const fields = [
		{
			label: 'Full Name',
			key: 'full_name',
			type: 'text',
			editable: true,
			ref: fullNameRef,
		},
		{
			label: 'Gender',
			key: 'gender',
			type: 'select',
			options: ['Male', 'Female', 'Other'],
			editable: false,
			ref: genderRef,
		},
		{
			label: 'Qualification',
			key: 'qualification',
			type: 'text',
			editable: true,
			ref: qualificationRef,
		},
		{
			label: 'Contact Number',
			key: 'phone_number',
			type: 'tel',
			editable: true,
			ref: phoneNumberRef,
		},
		{
			label: 'Alternate Number',
			key: 'alternate_phone_number',
			type: 'tel',
			editable: true,
			ref: alternatePhoneNumberRef,
		},
		{
			label: 'Email',
			key: 'email',
			type: 'email',
			editable: false,
			ref: emailRef,
		},
		{
			label: 'Address Line 1',
			key: 'address1',
			type: 'text',
			editable: true,
			ref: address1Ref,
		},
		{
			label: 'Address Line 2',
			key: 'address2',
			type: 'text',
			editable: true,
			ref: address2Ref,
		},
		{ label: 'City', key: 'city', type: 'text', editable: true, ref: cityRef },
		{
			label: 'State',
			key: 'state',
			type: 'text',
			editable: true,
			ref: stateRef,
		},
		{
			label: 'Pin Code',
			key: 'pincode',
			type: 'text',
			editable: true,
			ref: pincodeRef,
		},
		{
			label: 'Date of Birth',
			key: 'dob',
			type: 'date',
			editable: true,
			ref: dobRef,
		},
		{
			label: 'Roll No',
			key: 'roll_no',
			type: 'text',
			editable: true,
			ref: rollNoRef,
		},
		{
			label: 'Image URL',
			key: 'image',
			type: 'text',
			editable: true,
			ref: imageRef,
		},
	];


	return (
		<div className='mb-8'>
			<h2
				className='font-bold mb-6 text-2xl'
				style={{
					color: COLORS.text_title,
					fontFamily: FONTS.heading_01.fontFamily,
					fontWeight: FONTS.heading_01.fontWeight,
				}}
			>
				Personal Information
			</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				{fields.map((field: any) => (
					<div key={field.key}>
						<label
							className='block font-medium mb-2 text-sm'
							style={{
								color: COLORS.text_desc,
								fontFamily: FONTS.para_01.fontFamily,
							}}
						>
							{field.label}
						</label>

						{isEditing && field.editable ? (
							field.type === 'select' ? (
								<select
									ref={field.ref as React.RefObject<HTMLSelectElement>}
									value={formData[field.key] || ''}
									onChange={(e) => handleInputChange(field.key, e.target.value)}
									className='w-full rounded-lg px-4 py-3 text-sm border-2'
									style={{
										backgroundColor: COLORS.bg_Colour,
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
										borderColor: `${COLORS.light_blue}33`,
										fontSize: FONTS.para_01.fontSize,
									}}
								>
									<option value=''>Select {field.label}</option>
									{field.options?.map((option: any) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							) : (
								<input
									ref={field.ref as React.RefObject<HTMLInputElement>}
									type={field.type}
									value={formData[field.key] || ''}
									onChange={(e) => handleInputChange(field.key, e.target.value)}
									className='w-full rounded-lg px-4 py-3 text-sm border-2'
									style={{
										backgroundColor: COLORS.bg_Colour,
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
										borderColor: `${COLORS.light_blue}33`,
										fontSize: FONTS.para_01.fontSize,
									}}
									placeholder={`Enter ${field.label.toLowerCase()}`}
								/>
							)
						) : (
							<div
								className='relative rounded-lg px-4 py-3 text-sm shadow-inner min-h-[44px] flex items-center'
								style={{
									backgroundColor: COLORS.bg_Colour,
									fontFamily: FONTS.para_01.fontFamily,
									color: COLORS.text_desc,
									fontSize: FONTS.para_01.fontSize,
								}}
							>
								{formData[field.key] || 'Not provided'}
							</div>
						)}
					</div>
				))}
			</div>

			<InstituteInformation
				data={personalInfo?.userDetail}
				onDataChange={onDataChange}
				isEditing={isEditing}
			/>
		</div>
	);
};

export default PersonalInformation;
