import Completedclass from '@/components/classes/Completedclass';
import Liveclass from '@/components/classes/Liveclass';
import Upcomingclass from '@/components/classes/Upcomingclass';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { getClassDetails } from '@/features/classes/reducers/thunks';
import { selectClass } from '@/features/classes/reducers/selectors';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { getInstructorcourse } from '@/features/Course/reducers/thunks';
import { selectCourse } from '@/features/Course/reducers/selector';

const Classes = () => {
	const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'completed'>(
		'completed'
	);
	const [isOn, setIsOn] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [classTypeCheck, setclassTypeCheck] = useState('offline');
	const [selectedCourse, setSelectedCourse] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const classData = useSelector(selectClass) || [];
	const { showLoader, hideLoader } = useLoader();
	const coursedata = useSelector(selectCourse) || [];

	// Default selected course once coursedata is available
	useEffect(() => {
		if (coursedata.length > 0 && !selectedCourse) {
			setSelectedCourse(coursedata[0]?._id);
		}
	}, [coursedata, selectedCourse]);

	useEffect(() => {
		((tab: 'live' | 'upcoming' | 'completed', page: number = 1) => {
			selectedCourse &&
				dispatch(
					getClassDetails({
						userType: isOn ? 'online' : 'offline',
						classType: tab,
						page: page,
						users: selectedCourse,
					})
				);
		})(activeTab, currentPage);
		setclassTypeCheck(isOn === true ? 'online' : 'offline');
	}, [activeTab, isOn, currentPage, selectedCourse, dispatch]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(getInstructorcourse());
			} catch (error: any) {
				console.log('Course fetch error:', error.message);
			}
		};
		fetchData();
	}, [dispatch]);

	const handleTabChange = (tab: 'live' | 'upcoming' | 'completed') => {
		setActiveTab(tab);
		setCurrentPage(1);
	};

	const toggleSwitch = () => {
		setIsOn((prev) => !prev);
	};

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
		<div className='h-screen flex flex-col'>
			{/* Header Section */}
			<div className='pt-2 px-4 pb-3 relative flex-shrink-0'>
				<h1 style={{ ...FONTS.heading_01 }} className='mb-4'>
					Classes
				</h1>
				<Card
					style={{ backgroundColor: COLORS.bg_Colour }}
					className='relative p-4'
				>
					<h2 style={{ ...FONTS.heading_02 }} className='ml-6'>
						{isOn ? 'Online Classes' : 'Offline Classes'}
					</h2>

					{/* Dropdown + Toggle Section */}
					<div className='absolute right-6 top-4 flex items-center space-x-6'>
						{/* Course Dropdown */}
						<select
							value={selectedCourse}
							onChange={(e) => setSelectedCourse(e.target.value)}
							className='min-w-[180px] px-3 py-2 rounded-md bg-[#ebeff3] text-[#2a2a2a] font-semibold focus:outline-none shadow-[inset_2px_2px_5px_rgba(189,194,199,0.75),inset_-2px_-2px_5px_rgba(255,255,255,0.75)]'
							style={{ fontFamily: FONTS.heading_01.fontFamily }}
						>
							{coursedata.map((course: any, index: number) => (
								<option key={index} value={course._id}>
									{course.course_name}
								</option>
							))}
						</select>

						{/* Toggle Switch */}
						<label className='inline-block cursor-pointer'>
							<input
								type='checkbox'
								checked={isOn}
								onChange={toggleSwitch}
								className='sr-only peer'
							/>
							<div
								className={`relative w-28 h-8 rounded-full flex items-center justify-between px-2 text-sm font-bold transition-colors duration-300
									${
										isOn
											? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF]'
											: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
									}`}
							>
								{isOn ? (
									<span
										style={{ fontFamily: FONTS.heading_01.fontFamily }}
										className='text-white'
									>
										ONLINE
									</span>
								) : (
									<span
										style={{ fontFamily: FONTS.heading_01.fontFamily }}
										className='absolute right-2 text-[#2a2a2a]'
									>
										OFFLINE
									</span>
								)}
								<div
									className={`absolute top-[2px] h-7 w-7 bg-white rounded-full shadow-md transition-transform duration-300
										${isOn ? 'left-[calc(100%-30px)]' : 'left-[3px]'}
									`}
								></div>
							</div>
						</label>
					</div>

					{/* Tabs Section */}
					<div className='grid xl:grid-cols-8 lg:grid-cols-5 md:grid-cols-4 items-start mb-2 px-6 gap-36 mt-16'>
						<Button
							style={{
								...FONTS.heading_07,
								color: activeTab === 'live' ? COLORS.white : COLORS.black,
							}}
							onClick={() => handleTabChange('live')}
							className={`px-2 min-w-[155px] rounded-[6px] cursor-pointer hover:bg-gradient-to-l from-[#7B00FF] to-[#B200FF] hover:!text-white ${
								activeTab === 'live'
									? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white'
									: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
							}`}
						>
							Live Class
						</Button>
						<Button
							style={{
								...FONTS.heading_07,
								color: activeTab === 'upcoming' ? COLORS.white : COLORS.black,
							}}
							onClick={() => handleTabChange('upcoming')}
							className={`px-2 min-w-[155px] cursor-pointer hover:bg-gradient-to-l from-[#7B00FF] to-[#B200FF] hover:!text-white ${
								activeTab === 'upcoming'
									? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white'
									: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
							}`}
						>
							Upcoming Classes
						</Button>
						<Button
							style={{
								...FONTS.heading_07,
								color: activeTab === 'completed' ? COLORS.white : COLORS.black,
							}}
							onClick={() => handleTabChange('completed')}
							className={`px-2 min-w-[155px] cursor-pointer hover:bg-gradient-to-l from-[#7B00FF] to-[#B200FF] hover:!text-white ${
								activeTab === 'completed'
									? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white'
									: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
							}`}
						>
							Completed Classes
						</Button>
					</div>
				</Card>
			</div>

			{/* Scrollable Content */}
			<div className='flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide min-h-0'>
				{activeTab === 'live' && (
					<Liveclass
						showOnlineOnly={isOn}
						currentPage={currentPage}
						onPageChange={setCurrentPage}
						data={classData}
					/>
				)}
				{activeTab === 'upcoming' && (
					<Upcomingclass
						currentPage={currentPage}
						onPageChange={setCurrentPage}
						data={classData}
					/>
				)}
				{activeTab === 'completed' && (
					<Completedclass
						data={classData}
						classType={classTypeCheck}
						currentPage={currentPage}
						onPageChange={setCurrentPage}
					/>
				)}
			</div>
		</div>
	);
};

export default Classes;
