/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
// import style from './style.module.css'
import InstituteDetails from '@/components/dashboard/InstituteDetails';
import ProfileCard from '@/components/dashboard/ProfileCard';
import CourseProgress from '@/components/dashboard/CourseProgress';
import Attendance from '@/components/dashboard/Attendance';
import Payment from '@/components/dashboard/Payment';
import Assesments from '@/components/dashboard/Assesments';
import Updates from '@/components/dashboard/Updates';
import { FONTS } from '@/constants/uiConstants';
import { TabViewResponsive } from '@/hooks/TabViewResponce/TabViewResponsive';
import DashCalender from '@/components/ui/calendarDash';
import { useDispatch } from 'react-redux';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useLoader } from '@/context/LoadingContext/Loader';
import Loader from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Dashboard: React.FC = () => {
	const { TabView } = TabViewResponsive();
	const dispatch = useDispatch<any>();
	const { showLoader, hideLoader, IsLoading } = useLoader();

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
			<div
				className='flex flex-col h-full w-full p-5 gap-5 overflow-x-hidden'
				style={{ scrollbarWidth: 'none' }}
			>
				{IsLoading && (
					<div className='w-full h-[100vh] absolute z-10 bg-transparent backdrop-blur-sm'>
						<Loader />
					</div>
				)}
				{TabView ? (
					<div className='flex flex-col gap-5'>
						<ProfileCard />
						<div className='flex flex-row gap-5'>
							<InstituteDetails />
							<CourseProgress />
						</div>
					</div>
				) : (
					<div className='grid grid-cols-8 gap-5 justify-between'>
						<div className='col-span-2 col-start-1'>
							<InstituteDetails />
						</div>
						<div className='col-span-4'>
							<ProfileCard />
						</div>
						<div className='col-span-2'>
							<CourseProgress />
						</div>
					</div>
				)}

				{TabView ? (
					<div className='flex flex-col gap-5'>
						<div className='flex flex-row gap-5'>
							<Attendance />
							<Payment />
						</div>
						<div className='grid grid-cols-2 gap-5'>
							<Assesments />
							<DashCalender />
						</div>
						<Updates />
					</div>
				) : (
					<div className='grid grid-cols-3 gap-5'>
						
						{/* <div>
							<Payment />
						</div>
						<div>
							<Assesments />
						</div> */}
					</div>
				)}

				{!TabView && (
					<div className='grid grid-cols-3 gap-5'>
						<div>
							<Attendance />
							<div className='mt-5'>
							<Payment />
							</div>

						</div>
						<div className='col-span-2'>
							<Updates />
						</div>
						{/* <div>
							<DashCalender />
						</div> */}
					</div>
				)}
				

				<div className='flex flex-row space-x-25'>
					{/* <div className='divshadow p-2 rounded-xl'>
						<p style={{ ...FONTS.heading_06 }}>
							Course Name:{' '}
							<span style={{ ...FONTS.heading_04 }}>MEARN STACK 2024</span>
						</p>
					</div> */}
					{/* <div className='divshadow p-2 rounded-xl'>
						<p style={{ ...FONTS.heading_06 }}>
							Projects:{' '}
							<span style={{ ...FONTS.heading_04 }}>Web Development</span>
						</p>
					</div> */}

					<Card className='bg-[#ebeff3] rounded-2xl w-[19%] shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]'>
					<Button
						className="bg-[#ebeff3] w-56 mx-6 h-14 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
						style={FONTS.heading_06}
						variant="outline"
					>
						Total Course Handling: 1
					</Button>
						</Card>

					<Card className='bg-[#ebeff3] rounded-2xl w-[19%] shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]'>
					<Button
						className="bg-[#ebeff3] w-56 mx-6 h-14 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
						style={FONTS.heading_06}
						variant="outline"
					>
						Batch's Holding: 1
					</Button>
						</Card>
					<Card className='bg-[#ebeff3] rounded-2xl w-[19%] shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]'>
					<Button
						className="bg-[#ebeff3] w-56 mx-6 h-14 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
						style={FONTS.heading_06}
						variant="outline"
					>
						Branch: Palkalaiperur
					</Button>
						</Card>
					<Card className='bg-[#ebeff3] rounded-2xl w-[25%] shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]'>
					<Button
						className="bg-[#ebeff3] w-66 mx-8 h-14 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
						style={FONTS.heading_06}
						variant="outline"
					>
						Category: Web Development
					</Button>
						</Card>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
