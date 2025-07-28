import { useEffect, useRef, useState } from 'react';
import fileimg from '../../assets/courses icons/File.jpg';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { toast } from 'react-toastify';
import { uploadticketfile } from '@/features/Tickets/services/Ticket';
import {
	createNotes,
	createStudyMaterial,
	updateNotes,
	updateStudyMaterial,
} from '@/features/Course/services/Course';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { selectDashBoard } from '@/features/Dashboard/reducers/selectors';
import {
	selectCourse,
	selectCoursedata,
} from '@/features/Course/reducers/selector';
import { getInstructorcourseData } from '@/features/Course/reducers/thunks';

interface FileUploadDesignProps {
	selectedNotes: {
		title?: string;
		description?: string;
		file?: File | string | null;
		uuid: string;
	};
	activeTab: string;
}

const FileUploadDesign = ({
	selectedNotes,
	activeTab,
}: FileUploadDesignProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [selectedFile, setSelectedFile] = useState<any>(null);
	const [fileUrl, setFileUrl] = useState<string | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const reports = useSelector(selectDashBoard);
	const courseSelectData = useSelector(selectCoursedata);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(getDashBoardReports());
				await dispatch(getInstructorcourseData());
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [dispatch]);

	useEffect(() => {
		setTitle(selectedNotes?.title ?? '');
		setDescription(selectedNotes?.description ?? '');
		setSelectedFile(selectedNotes?.file);

		return () => {
			setTitle('');
			setDescription('');
			setSelectedFile(null);
		};
	}, [selectedNotes]);

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;

		const allowedTypes = [
			'application/pdf',
			'image/jpeg',
			'image/png',
			'image/jpg',
		];
		if (!allowedTypes.includes(file.type)) {
			toast.error('Only PDF or image files (JPG, PNG) are allowed.');
			return;
		}

		if (file) {
			setSelectedFile(file);

			if (file.type.startsWith('image/')) {
				const imageUrl = URL.createObjectURL(file);
				setPreview(imageUrl);
			} else {
				setPreview(null);
			}

			const formData = new FormData();
			formData.append('file', file);

			const response = await uploadticketfile(formData);
			const uploadedPath = response?.data?.file;

			if (!uploadedPath) {
				throw new Error('Upload failed: No file path returned from server.');
			}
			setFileUrl(uploadedPath);
			toast.success('File uploaded successfully.');
		}
	};

	const handleCancelUpload = () => {
		setTitle('');
		setDescription('');
		setFileUrl(null);
		setPreview(null);
		setSelectedFile(null);
	};

	const handleUploadNotes = async () => {
		if (activeTab === 'study') {
			if (selectedNotes == null) {
				try {
					const params_data = {
						title,
						description,
						file: fileUrl,
						course: courseSelectData?._id,
						branch: reports?.branch?.uuid,
						institute: reports?.institute?.uuid,
					};
					setIsLoading(true);
					const response = await createStudyMaterial(params_data);
					if (response) {
						setTitle('');
						setDescription('');
						setFileUrl(null);
						setPreview(null);
						setSelectedFile(null);
						setIsLoading(false);
						toast.success('New note created successfully!');
					} else {
						toast.error('Failed to upload note, please try again.');
					}
				} catch (error) {
					toast.error('Something went wrong, please try again.');
				} finally {
					setIsLoading(false);
				}
			} else {
				try {
					const params_data = {
						title,
						description,
						file: fileUrl,
						materialId: selectedNotes?.uuid,
					};
					setIsLoading(true);
					const response = await updateStudyMaterial(params_data);
					if (response) {
						setTitle('');
						setDescription('');
						setFileUrl(null);
						setPreview(null);
						setSelectedFile(null);
						setIsLoading(false);
						toast.success('Note updated successfully!');
					} else {
						toast.error('Failed to update the note, please try again.');
					}
				} catch (error) {
					toast.error('Something went wrong, please try again.');
				} finally {
					setIsLoading(false);
				}
			}
		} else if (activeTab === 'notes') {
			if (selectedNotes == null) {
				try {
					const params_data = {
						title,
						description,
						file: fileUrl,
						course: courseSelectData?._id,
						branch: reports?.branch?.uuid,
						institute: reports?.institute?.uuid,
					};
					setIsLoading(true);
					const response = await createNotes(params_data);
					if (response) {
						setTitle('');
						setDescription('');
						setFileUrl(null);
						setPreview(null);
						setSelectedFile(null);
						setIsLoading(false);
						toast.success('New note created successfully!');
					} else {
						toast.error('Failed to upload notes, please try again.');
					}
				} catch (error) {
					toast.error('Something went wrong, please try again.');
				} finally {
					setIsLoading(false);
				}
			} else {
				try {
					const params_data = {
						title,
						description,
						file: fileUrl,
						noteId: selectedNotes?.uuid,
					};
					setIsLoading(true);
					const response = await updateNotes(params_data);
					if (response) {
						setTitle('');
						setDescription('');
						setFileUrl(null);
						setPreview(null);
						setSelectedFile(null);
						setIsLoading(false);
						toast.success('Note updated successfully!');
					} else {
						toast.error('Failed to update the note, please try again.');
					}
				} catch (error) {
					toast.error('Something went wrong, please try again.');
				} finally {
					setIsLoading(false);
				}
			}
		}
	};

	return (
		<div className='w-full h-[620px] mx-auto bg-[#EBEFF3] rounded-lg mt-10 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6'>
			{/* Hidden file input */}
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleFileChange}
				className='hidden'
			/>

			{/* Heading Section */}
			<div className='mb-6'>
				<h2 className='mt-4 mb-1' style={{ ...FONTS.heading_05 }}>
					Title
				</h2>
				<input
					type='text'
					placeholder='Enter title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					style={{ ...FONTS.heading_06 }}
					className='w-full p-3 h-15 pl-5 bg-[#EBEFF3] border-2 border-[#F4F7F9] rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    shadow-inner hover:shadow-md transition-shadow btnshadow'
				/>

				<h2 className='mt-4 mb-1' style={{ ...FONTS.heading_05 }}>
					Description
				</h2>
				<input
					type='text'
					placeholder='Enter description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					style={{ ...FONTS.heading_06 }}
					className='w-full p-3 h-15 pl-5 bg-[#EBEFF3] border-2 border-[#F4F7F9] rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    shadow-inner hover:shadow-md transition-shadow btnshadow'
				/>
			</div>

			{/* Upload Section */}
			<div className='mb-6'>
				<h3 className='mt-5' style={{ ...FONTS.heading_05 }}>
					Upload File
				</h3>

				{/* Drop Zone */}
				<div className='mt-5 border-2 border-dashed border-gray-300 rounded-lg shadow-lg btnshadow p-10 text-center'>
					<img src={fileimg} className='w-6 h-6 m-auto' />
					<p style={{ ...FONTS.heading_07 }}>Drag & Drop File</p>
					<p className='mt-1' style={{ ...FONTS.heading_07 }}>
						(or)
					</p>
					<button
						type='button'
						onClick={handleClick}
						style={{ ...FONTS.heading_07 }}
						className='!text-white font-medium mt-1 px-2 py-0.5 bg-gradient-to-r from-[#7B00FF] to-[#B200FF] rounded-sm btnshadow cursor-pointer'
					>
						Browse
					</button>
					{selectedFile && (
						<div className='mt-5'>
							<p style={{ ...FONTS.para_03 }}>
								{selectedFile?.name || selectedFile}
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex justify-end space-x-3 mt-10'>
				<button
					className='px-4 py-2 bg-[#EBEFF3] rounded-md btnshadow cursor-pointer'
					style={{ ...FONTS.heading_07 }}
					onClick={handleCancelUpload}
				>
					Cancel
				</button>
				<button
					className='px-4 py-2 bg-gradient-to-r from-[#7B00FF] to-[#B200FF] rounded-md btnshadow cursor-pointer'
					style={{ ...FONTS.heading_07, color: COLORS.white }}
					onClick={handleUploadNotes}
					disabled={isLoading}
				>
					{isLoading ? 'Uploading...' : 'Upload Note'}
				</button>
			</div>
		</div>
	);
};

export default FileUploadDesign;
