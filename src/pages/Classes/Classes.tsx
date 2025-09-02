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
import Loader from '@/components/Loader/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';


const Classes = () => {
	const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'completed'>(
		'live'
	);
	const [isOn, setIsOn] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const dispatch = useDispatch<AppDispatch>();
	const classData = useSelector(selectClass)?.data || [];
	const { showLoader, hideLoader, IsLoading } = useLoader();
	

	const fetchClassData = (
		tab: 'live' | 'upcoming' | 'completed',
		page: number = 1
	) => {
		dispatch(
			getClassDetails({
				userType: isOn ? 'online' : 'offline',
				classType: tab,
				page: page,
			})
		);
	};

	useEffect(() => {
		fetchClassData(activeTab, currentPage);
	}, [activeTab, isOn, currentPage]);

	const handleTabChange = (tab: 'live' | 'upcoming' | 'completed') => {
		setActiveTab(tab);
		setCurrentPage(1); // Reset to first page when changing tabs
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
			{/* Fixed Header Section */}
			<div className='pt-2 px-4 pb-3 relative flex-shrink-0'>
				<h1 style={{ ...FONTS.heading_01 }} className='mb-4'>
					Classes
				</h1>
				{IsLoading && (
					<div className='w-full h-[100vh] absolute z-10 bg-transparent backdrop-blur-sm'>
						<Loader />
					</div>
				)}

				<Card style={{ backgroundColor: COLORS.bg_Colour }}>
					<h2 style={{ ...FONTS.heading_02 }} className='ml-6'>
						{isOn ? 'Online Classes' : 'Offline Classes'}
					</h2>

					<label className='inline-block cursor-pointer absolute right-20'>
						<input
							type='checkbox'
							checked={isOn}
							onChange={toggleSwitch}
							className='sr-only peer'
						/>
						<div
							className={`relative w-25 h-8 rounded-full flex items-center justify-between px-2 text-sm font-bold
                transition-colors duration-300
                ${
									isOn
										? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF]'
										: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
								}
              `}
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

					<div className='grid xl:grid-cols-8 lg:grid-cols-5 md:grid-cols-4 items-start mb-2 px-6 gap-36'>
						<Button
							style={{
								...FONTS.heading_07,
								color: activeTab === 'live' ? COLORS.white : undefined,
							}}
							onClick={() => handleTabChange('live')}
							className={`px-2 min-w-[155px] rounded-[6px] cursor-pointer ${
								activeTab === 'live'
									? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
									: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
							}`}
							variant={activeTab === 'live' ? 'default' : 'outline'}
						>
							Live Class
						</Button>
						<Button
							style={{
								...FONTS.heading_07,
								color: activeTab === 'upcoming' ? COLORS.white : undefined,
							}}
							onClick={() => handleTabChange('upcoming')}
							className={`px-2 min-w-[155px] cursor-pointer ${
								activeTab === 'upcoming'
									? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
									: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
							}`}
							variant={activeTab === 'upcoming' ? 'default' : 'outline'}
						>
							Upcoming Classes
						</Button>
						<Button
							style={{
								...FONTS.heading_07,
								color: activeTab === 'completed' ? COLORS.white : undefined,
							}}
							onClick={() => handleTabChange('completed')}
							className={`px-2 min-w-[155px] cursor-pointer ${
								activeTab === 'completed'
									? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
									: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
							}`}
							variant={activeTab === 'completed' ? 'default' : 'outline'}
						>
							Completed Classes
						</Button>
					</div>
				</Card>
			</div>

			{/* Scrollable Content Section */}
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
						showOnlineOnly={isOn}
						currentPage={currentPage}
						onPageChange={setCurrentPage}
						data={classData}
						classType={isOn}
					/>
				)}
			</div>
		</div>
	);
};

export default Classes;
