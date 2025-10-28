import { useNavigate, useParams } from 'react-router-dom';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { COLORS, FONTS } from '@/constants/uiConstants';
import backImg from '../../assets/classes/back.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { AppDispatch } from '@/store/store';
import { selectIdClass } from '@/features/classId/services/reducers/selector';
import { getClassIdDetail } from '@/features/classId/services/reducers/thunks';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { FileText, Upload, X, Download } from 'lucide-react';
import { toast } from 'react-toastify';
import { GetImageUrl } from '@/utils/helper';

const ClassId = () => {
	const { id, classType } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const classIdData = useSelector(selectIdClass);
	const navigate = useNavigate();
	const { showLoader, hideLoader } = useLoader();

	const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
	const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
	const [notesForm, setNotesForm] = useState({
		title: '',
		description: '',
		file: null,
	});
	const [studyForm, setStudyForm] = useState({
		title: '',
		description: '',
		file: null,
	});
	const [notesPreview, setNotesPreview] = useState(null);
	const [studyPreview, setStudyPreview] = useState(null);

	useEffect(() => {
		if (id) {
			dispatch(
				getClassIdDetail({
					classType,
					course: id,
				})
			);
		}
	}, [id, dispatch, classType]);

	useEffect(() => {
		(async () => {
			try {
				showLoader();
				const timeoutId = setTimeout(() => {
					hideLoader();
				}, 8000);
				const response = await dispatch(getDashBoardReports());
				if (response) {
					clearTimeout(timeoutId);
				}
			} finally {
				hideLoader();
			}
		})();
	}, [dispatch, hideLoader, showLoader]);

	const handleBackPage = () => {
		navigate(-1);
	};

	const handleFileChange = (e: any, type: any) => {
		const file = e.target.files[0];
		if (!file) return;

		const validTypes = [
			'application/pdf',
			'image/png',
			'image/jpeg',
			'image/jpg',
		];

		if (!validTypes.includes(file.type)) {
			toast.error(
				'Invalid file type. Please upload PDF, PNG, or JPG files only.'
			);
			e.target.value = '';
			return;
		}

		if (type === 'notes') {
			setNotesForm({ ...notesForm, file });
			if (file.type.startsWith('image/')) {
				const reader: any = new FileReader();
				reader.onloadend = () => {
					setNotesPreview(reader.result);
				};
				reader.readAsDataURL(file);
			} else {
				setNotesPreview(null);
			}
		} else {
			setStudyForm({ ...studyForm, file });
			if (file.type.startsWith('image/')) {
				const reader: any = new FileReader();
				reader.onloadend = () => {
					setStudyPreview(reader.result);
				};
				reader.readAsDataURL(file);
			} else {
				setStudyPreview(null);
			}
		}
	};

	const handleNotesSubmit = async (e: any) => {
		e.preventDefault();

		if (!notesForm.title || !notesForm.description || !notesForm.file) {
			toast.error('Please fill all fields');
			return;
		}

		const formData = new FormData();
		formData.append('title', notesForm.title);
		formData.append('description', notesForm.description);
		formData.append('file', notesForm.file);

		try {
			// Add your API call here
			// await dispatch(uploadNotes(formData));
			toast.success('Notes uploaded successfully');
			setIsNotesModalOpen(false);
			setNotesForm({ title: '', description: '', file: null });
			setNotesPreview(null);
		} catch (error) {
			toast.error('Failed to upload notes');
		}
	};

	const handleStudySubmit = async (e: any) => {
		e.preventDefault();

		if (!studyForm.title || !studyForm.description || !studyForm.file) {
			toast.error('Please fill all fields');
			return;
		}

		const formData = new FormData();
		formData.append('title', studyForm.title);
		formData.append('description', studyForm.description);
		formData.append('file', studyForm.file);

		try {
			// Add your API call here
			// await dispatch(uploadStudyMaterial(formData));
			toast.success('Study material uploaded successfully');
			setIsStudyModalOpen(false);
			setStudyForm({ title: '', description: '', file: null });
			setStudyPreview(null);
		} catch (error) {
			toast.error('Failed to upload study material');
		}
	};

	const handleDownload = (fileUrl: any, fileName: any) => {
		const link = document.createElement('a');
		const FileUrl: any = GetImageUrl(fileUrl);
		link.href = FileUrl;
		link.download = fileName;
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const getFileIcon = (fileUrl: any) => {
		if (fileUrl?.endsWith('.pdf')) {
			return <FileText className='w-12 h-12 text-red-500' />;
		}
		return <FileText className='w-12 h-12 text-blue-500' />;
	};

	const getYouTubeEmbedUrl = (url: any) => {
		if (!url) return null;
		const videoId = url.split('v=')[1]?.split('&')[0];
		return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
	};

	const notes = classIdData.data?.notes || [];
	const studyMaterials = classIdData.data?.study_materials || [];
	const videoUrl = classIdData.data?.video_url;

	return (
		<div className='mb-4 px-2 sm:px-4'>
			{/* Title Section */}
			<div className='my-4 flex flex-row justify-start items-center gap-3 sm:gap-5'>
				<div
					onClick={handleBackPage}
					className='p-2 rounded-lg bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] cursor-pointer hover:opacity-80'
				>
					<img src={backImg} alt='back-img' className='w-5 h-5 sm:w-6 sm:h-6' />
				</div>
				<h1
					style={{ ...FONTS.heading_01 }}
					className='text-lg sm:text-xl md:text-2xl'
				>
					Class Details - {classIdData.data?.id}
				</h1>
			</div>

			{/* Card Section */}
			<div className='grid xl:grid-cols-2 grid-cols-1 gap-6 lg:gap-10 mb-6'>
				{/* Left Side Card */}
				<Card
					style={{ backgroundColor: COLORS.bg_Colour }}
					className='px-3 sm:px-4 py-1 min-h-[350px] sm:min-h-[400px]'
				>
					<CardHeader className='px-2 sm:px-6'>
						<CardTitle
							style={{ ...FONTS.heading_01 }}
							className='!text-[#7B00FF] mb-4 text-base sm:text-lg md:text-xl'
						>
							Batch No: #{classIdData.data?.batch?.id || 'N/A'}
						</CardTitle>
						<CardDescription>
							<h2
								style={{ ...FONTS.heading_02 }}
								className='text-[#2A2A2A] mb-2 text-sm sm:text-base'
							>
								{classIdData.data?.class_name}
							</h2>
							<p style={{ ...FONTS.para_02 }} className='text-xs sm:text-sm'>
								{classIdData.data?.course?.description}
							</p>
						</CardDescription>
					</CardHeader>

					<Card className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] mx-2 sm:mx-4'>
						<Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-2 sm:p-4 mx-2 sm:mx-4'>
							<div className='overflow-x-auto'>
								<table className='w-full table-fixed text-center min-w-[300px]'>
									<thead
										style={{ ...FONTS.para_02 }}
										className='!text-[#ffffff]'
									>
										<tr>
											<td className='text-xs sm:text-sm px-1'>Date</td>
											<td className='text-xs sm:text-sm px-1'>Start At</td>
											<td className='text-xs sm:text-sm px-1'>End At</td>
											<td className='text-xs sm:text-sm px-1'>Duration</td>
										</tr>
									</thead>
									<tbody
										style={{ ...FONTS.heading_04 }}
										className='!text-[#ffffff]'
									>
										<tr>
											<td className='text-xs sm:text-sm px-1'>
												{classIdData.data?.start_date &&
													new Date(
														classIdData.data.start_date
													).toLocaleDateString('en-GB', {
														day: 'numeric',
														month: 'short',
														year: 'numeric',
													})}
											</td>
											<td className='text-xs sm:text-sm px-1'>
												{classIdData.data?.start_time &&
													new Date(classIdData.data.start_time)
														.toLocaleString('en-IN', {
															hour: 'numeric',
															minute: 'numeric',
															hour12: true,
															timeZone: 'Asia/Kolkata',
														})
														.toUpperCase()}
											</td>
											<td className='text-xs sm:text-sm px-1'>
												{classIdData.data?.end_time &&
													new Date(classIdData.data.end_time)
														.toLocaleString('en-IN', {
															hour: 'numeric',
															minute: 'numeric',
															hour12: true,
															timeZone: 'Asia/Kolkata',
														})
														.toUpperCase()}
											</td>
											<td className='text-xs sm:text-sm px-1'>
												{classIdData.data?.course?.durationInMonths} Month
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Card>
					</Card>
				</Card>

				{/* Video Section */}
				{videoUrl && (
					<Card
						style={{ backgroundColor: COLORS.bg_Colour }}
						className='px-3 sm:px-4 py-4 min-h-[350px] sm:min-h-[400px]'
					>
						<CardTitle
							style={{ ...FONTS.heading_02 }}
							className='mb-4 text-base sm:text-lg'
						>
							Class Video
						</CardTitle>
						<div
							className='relative w-full'
							style={{ paddingBottom: '56.25%' }}
						>
							<iframe
								className='absolute top-0 left-0 w-full h-full rounded-lg'
								src={getYouTubeEmbedUrl(videoUrl) ?? undefined}
								title='Class Video'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
							></iframe>
						</div>
					</Card>
				)}
			</div>

			{/* Notes Section */}
			<Card
				style={{ backgroundColor: COLORS.bg_Colour }}
				className='px-3 sm:px-4 py-4 mb-6'
			>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3'>
					<CardTitle
						style={{ ...FONTS.heading_02 }}
						className='text-base sm:text-lg'
					>
						Notes
					</CardTitle>
					{/* <button
						onClick={() => setIsNotesModalOpen(true)}
						className='flex items-center gap-2 bg-[#7B00FF] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#6500d9] transition-colors text-sm'
					>
						<Upload className='w-4 h-4' />
						Upload Notes
					</button> */}
				</div>

				{notes.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{notes.map((note: any) => (
							<Card
								key={note._id}
								className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] p-4'
							>
								<div className='flex flex-col items-center gap-3'>
									{getFileIcon(note.file)}
									<div className='text-center w-full'>
										<h3
											style={{ ...FONTS.heading_04 }}
											className='text-[#2A2A2A] mb-2 text-sm sm:text-base break-words'
										>
											{note.title}
										</h3>
										<p
											style={{ ...FONTS.para_02 }}
											className='text-gray-600 mb-3 text-xs sm:text-sm break-words'
										>
											{note.description}
										</p>
									</div>
									<button
										onClick={() => handleDownload(note.file, note.title)}
										className='flex items-center gap-2 bg-[#7B00FF] text-white px-3 py-2 rounded-lg hover:bg-[#6500d9] transition-colors text-xs sm:text-sm w-full justify-center'
									>
										<Download className='w-4 h-4' />
										Download
									</button>
								</div>
							</Card>
						))}
					</div>
				) : (
					<Card
						style={{ ...FONTS.para_02 }}
						className='py-8 px-4 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-center text-gray-500 text-sm'
					>
						No notes available
					</Card>
				)}
			</Card>

			{/* Study Materials Section */}
			<Card
				style={{ backgroundColor: COLORS.bg_Colour }}
				className='px-3 sm:px-4 py-4 mb-6'
			>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3'>
					<CardTitle
						style={{ ...FONTS.heading_02 }}
						className='text-base sm:text-lg'
					>
						Study Materials
					</CardTitle>
					{/* <button
						onClick={() => setIsStudyModalOpen(true)}
						className='flex items-center gap-2 bg-[#7B00FF] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#6500d9] transition-colors text-sm'
					>
						<Upload className='w-4 h-4' />
						Upload Study Material
					</button> */}
				</div>

				{studyMaterials.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{studyMaterials.map((material: any) => (
							<Card
								key={material._id}
								className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] p-4'
							>
								<div className='flex flex-col items-center gap-3'>
									{getFileIcon(material.file)}
									<div className='text-center w-full'>
										<h3
											style={{ ...FONTS.heading_04 }}
											className='text-[#2A2A2A] mb-2 text-sm sm:text-base break-words'
										>
											{material.title}
										</h3>
										<p
											style={{ ...FONTS.para_02 }}
											className='text-gray-600 mb-3 text-xs sm:text-sm break-words'
										>
											{material.description}
										</p>
									</div>
									<button
										onClick={() =>
											handleDownload(material.file, material.title)
										}
										className='flex items-center gap-2 bg-[#7B00FF] text-white px-3 py-2 rounded-lg hover:bg-[#6500d9] transition-colors text-xs sm:text-sm w-full justify-center'
									>
										<Download className='w-4 h-4' />
										Download
									</button>
								</div>
							</Card>
						))}
					</div>
				) : (
					<Card
						style={{ ...FONTS.para_02 }}
						className='py-8 px-4 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-center text-gray-500 text-sm'
					>
						No study materials available
					</Card>
				)}
			</Card>

			{/* Notes Upload Modal */}
			{isNotesModalOpen && (
				<div className='fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<Card className='bg-white p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
						<div className='flex justify-between items-center mb-4'>
							<h2
								style={{ ...FONTS.heading_02 }}
								className='text-base sm:text-lg'
							>
								Upload Notes
							</h2>
							<button
								onClick={() => {
									setIsNotesModalOpen(false);
									setNotesForm({ title: '', description: '', file: null });
									setNotesPreview(null);
								}}
								className='text-gray-500 hover:text-gray-700'
							>
								<X className='w-5 h-5 sm:w-6 sm:h-6' />
							</button>
						</div>
						<form onSubmit={handleNotesSubmit} className='space-y-4'>
							<div>
								<label className='block text-sm font-medium mb-2'>Title</label>
								<input
									type='text'
									value={notesForm.title}
									onChange={(e) =>
										setNotesForm({ ...notesForm, title: e.target.value })
									}
									className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B00FF] text-sm'
									placeholder='Enter title'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium mb-2'>
									Description
								</label>
								<textarea
									value={notesForm.description}
									onChange={(e) =>
										setNotesForm({ ...notesForm, description: e.target.value })
									}
									className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B00FF] text-sm min-h-[80px]'
									placeholder='Enter description'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium mb-2'>
									File (PDF, PNG, JPG)
								</label>
								<input
									type='file'
									accept='.pdf,.png,.jpg,.jpeg'
									onChange={(e) => handleFileChange(e, 'notes')}
									className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B00FF] text-sm'
								/>
							</div>
							{notesPreview && (
								<div className='mt-4'>
									<img
										src={notesPreview}
										alt='Preview'
										className='w-full h-48 object-cover rounded-lg'
									/>
								</div>
							)}
							<button
								type='submit'
								className='w-full bg-[#7B00FF] text-white px-4 py-2 rounded-lg hover:bg-[#6500d9] transition-colors text-sm'
							>
								Upload
							</button>
						</form>
					</Card>
				</div>
			)}

			{/* Study Material Upload Modal */}
			{isStudyModalOpen && (
				<div className='fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<Card className='bg-white p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
						<div className='flex justify-between items-center mb-4'>
							<h2
								style={{ ...FONTS.heading_02 }}
								className='text-base sm:text-lg'
							>
								Upload Study Material
							</h2>
							<button
								onClick={() => {
									setIsStudyModalOpen(false);
									setStudyForm({ title: '', description: '', file: null });
									setStudyPreview(null);
								}}
								className='text-gray-500 hover:text-gray-700'
							>
								<X className='w-5 h-5 sm:w-6 sm:h-6' />
							</button>
						</div>
						<form onSubmit={handleStudySubmit} className='space-y-4'>
							<div>
								<label className='block text-sm font-medium mb-2'>Title</label>
								<input
									type='text'
									value={studyForm.title}
									onChange={(e) =>
										setStudyForm({ ...studyForm, title: e.target.value })
									}
									className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B00FF] text-sm'
									placeholder='Enter title'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium mb-2'>
									Description
								</label>
								<textarea
									value={studyForm.description}
									onChange={(e) =>
										setStudyForm({ ...studyForm, description: e.target.value })
									}
									className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B00FF] text-sm min-h-[80px]'
									placeholder='Enter description'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium mb-2'>
									File (PDF, PNG, JPG)
								</label>
								<input
									type='file'
									accept='.pdf,.png,.jpg,.jpeg'
									onChange={(e) => handleFileChange(e, 'study')}
									className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B00FF] text-sm'
								/>
							</div>
							{studyPreview && (
								<div className='mt-4'>
									<img
										src={studyPreview}
										alt='Preview'
										className='w-full h-48 object-cover rounded-lg'
									/>
								</div>
							)}
							<button
								type='submit'
								className='w-full bg-[#7B00FF] text-white px-4 py-2 rounded-lg hover:bg-[#6500d9] transition-colors text-sm'
							>
								Upload
							</button>
						</form>
					</Card>
				</div>
			)}
		</div>
	);
};

export default ClassId;
