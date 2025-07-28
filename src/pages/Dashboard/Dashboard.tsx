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
						<div>
							<Attendance />
						</div>
						<div>
							<Payment />
						</div>
						<div>
							<Assesments />
						</div>
					</div>
				)}

				{!TabView && (
					<div className='grid grid-cols-3 gap-5'>
						<div className='col-span-2'>
							<Updates />
						</div>
						<div>
							<DashCalender />
						</div>
					</div>
				)}

				<div className='flex flex-row justify-between'>
					<div className='divshadow p-2 rounded-xl'>
						<p style={{ ...FONTS.heading_06 }}>
							Course Name:{' '}
							<span style={{ ...FONTS.heading_04 }}>MEARN STACK 2024</span>
						</p>
					</div>
					<div className='divshadow p-2 rounded-xl'>
						<p style={{ ...FONTS.heading_06 }}>
							Projects:{' '}
							<span style={{ ...FONTS.heading_04 }}>Web Development</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
