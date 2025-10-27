import { useEffect, useState, useCallback } from 'react';
import Add_Notes from './Add_notes';
import NotesMaterials from './notes__materials';
import CourseButton from './button';
import { Button } from '../ui/button';
import navigationicon from '../../assets/courses icons/navigation arrow.svg';
import studyIcon from '../../assets/courses icons/studyIcon.png';
import notesIcon from '../../assets/courses icons/notesIcon.png';
import { useNavigate, useParams } from 'react-router-dom';
import StudyMaterials from './studyMaterials';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { getInstructorcourseData } from '@/features/Course/reducers/thunks';
import { selectCoursedata } from '@/features/Course/reducers/selector';

function CourseNotes() {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<'notes' | 'study'>('notes');
	const [selectedNotes, setselectedNotes] = useState<any | null>(null);
	const { showLoader, hideLoader } = useLoader();
	const dispatch = useDispatch<any>();
	const { course } = useParams();
	const courseSelectData = useSelector(selectCoursedata);

	const fetchCourseData = useCallback(async () => {
		try {
			await dispatch(getInstructorcourseData(course ?? ''));
		} catch (error) {
			console.error('Course fetch error:', error);
		}
	}, []);

	useEffect(() => {
		fetchCourseData();
	}, [course, dispatch]);

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

	return (
		<>
			<div className='p-4 sm:p-6 lg:p-8'>
				{/* Header Section */}
				<div className='flex items-center gap-3 mb-6'>
					<Button
						onClick={() => navigate('/courses')}
						className='bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] flex-shrink-0'
					>
						<img src={navigationicon} />
					</Button>
					<h1 className='text-black text-xl sm:text-2xl font-semibold whitespace-nowrap'>
						Notes & Materials
					</h1>
				</div>

				{/* Course Button - Centered */}
				<div className='flex justify-center mb-6'>
					<CourseButton activeTabs='notes' />
				</div>

				{/* Tabs Section - Below CourseButton */}
				<div className='flex justify-center mb-8'>
					<div className='bg-[#EBEFF3] rounded-2xl p-2 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] w-full max-w-md'>
						<div className='flex gap-2 justify-center'>
							{/* Notes Tab */}
							<button
								onClick={() => setActiveTab('notes')}
								className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-200 flex-1 justify-center ${
									activeTab === 'notes'
										? 'bg-white text-[#B200FF] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
										: 'text-gray-500 hover:text-gray-700'
								}`}
							>
								<img
									src={notesIcon}
									className='w-4 h-4 sm:w-5 sm:h-5'
									alt='Notes'
								/>
								<span className='text-xs sm:text-sm font-medium whitespace-nowrap'>
									Notes
								</span>
							</button>

							{/* Study Materials Tab */}
							<button
								onClick={() => setActiveTab('study')}
								className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-200 flex-1 justify-center ${
									activeTab === 'study'
										? 'bg-white text-[#B200FF] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
										: 'text-gray-500 hover:text-gray-700'
								}`}
							>
								<img
									src={studyIcon}
									className='w-4 h-4 sm:w-5 sm:h-5'
									alt='Study'
								/>
								<span className='text-xs sm:text-sm font-medium whitespace-nowrap'>
									Study Materials
								</span>
							</button>
						</div>
					</div>
				</div>

				{/* Content Section */}
				{activeTab === 'notes' ? (
					<>
						<h1 className='text-black text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center sm:text-left'>
							Add Notes
						</h1>
						<div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-4 sm:gap-6'>
							<Add_Notes
								selectedNotes={selectedNotes}
								activeTab={activeTab}
								onRefresh={fetchCourseData}
							/>
							<NotesMaterials
								setselectedNotes={setselectedNotes}
								courseSelectData={courseSelectData}
								onRefresh={fetchCourseData}
							/>
						</div>
					</>
				) : (
					<>
						<h1 className='text-black text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center sm:text-left'>
							Add Study Materials
						</h1>
						<div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-4 sm:gap-6'>
							<Add_Notes
								selectedNotes={selectedNotes}
								activeTab={activeTab}
								onRefresh={fetchCourseData}
							/>
							<StudyMaterials
								setselectedNotes={setselectedNotes}
								courseSelectData={courseSelectData}
								onRefresh={fetchCourseData}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default CourseNotes;
