/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FONTS } from '@/constants/uiConstants';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/dashboard/profile.svg';
import book from '../../assets/dashboard/book.svg';
import close from '../../assets/dashboard/close.svg';
import { useSelector } from 'react-redux';

const Attendance: React.FC = () => {
	const navigate = useNavigate();

	const Attendance = useSelector(
		(state: any) => state.dashboard.data.attendance
	);
	const month = new Date().getMonth();
	const Attendance_data = Attendance?.find((data: any) => data.month === month);

	const attendanceBars = React.useMemo(() => {
		if (!Attendance || !Attendance[0]) return [];

		return [
			{
				height: `${Attendance_data?.total?.percentage}%`,
				color:
					'bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]',
				shadow:
					'shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40,inset_4px_4px_8px_#45ab87bf,inset_8px_8px_12px_#46ab8740,inset_-4px_-4px_8px_#46ab87bf,inset_-8px_-8px_12px_#46ab8740]',
			},
			{
				height: `${Attendance?.[0]?.present?.percentage}%`,
				color:
					'bg-[linear-gradient(90deg,rgba(74,222,232,1)_0%,rgba(74,222,232,0.92)_52%,rgba(74,222,232,1)_100%)]',
				shadow:
					'shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40,inset_4px_4px_8px_#34a9b1bf,inset_8px_8px_12px_#34aab140,inset_-4px_-4px_8px_#34aab1bf,inset_-8px_-8px_12px_#34aab140]',
			},
			{
				height: `${Attendance_data?.absent?.percentage}%`,
				color:
					'bg-[linear-gradient(90deg,rgba(85,133,255,1)_0%,rgba(85,133,255,0.92)_53%,rgba(85,133,255,1)_100%)]',
				shadow:
					'shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40,inset_4px_4px_8px_#3358b8bf,inset_8px_8px_12px_#3358b840,inset_-4px_-4px_8px_#3358b8bf,inset_-8px_-8px_12px_#3358b840]',
			},
		];
	}, [Attendance, Attendance_data]);

	const attendanceMetrics = [
		{
			icon: profile,
			text: `Overall ${Attendance?.[0]?.total?.percentage ?? 0}% Attendance`,
		},
		{
			icon: book,
			text: `${
				Attendance?.[0]?.present?.percentage ?? 0
			}% Attendance Remaining`,
		},
		{
			icon: close,
			text: `${
				(Attendance?.[0]?.total?.percentage ?? 0) -
				(Attendance?.[0]?.present?.percentage ?? 0)
			}% Days Absent`,
		},
	];

	return (
		<Card className='w-full p-5 md:p-6 flex flex-col gap-4 bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]'>
			<CardContent className='flex flex-col w-full gap-6 p-0'>
				{/* Header */}
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full'>
					<div>
						<h2 className='text-lg sm:text-xl font-bold text-dark font-quicksand'>
							Attendance
						</h2>
					</div>
					<Button
						style={{ ...FONTS.heading_06 }}
						onClick={() => navigate('/attendance')}
						className='cursor-pointer btnshadow btnhovershadow hover:!text-white bg-gray-100 w-full sm:w-[120px] h-[42px] rounded-lg text-sm sm:text-base'
					>
						Over All
					</Button>
				</div>

				{/* Chart + Metrics */}
				<div className='flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-8 w-full'>
					{/* Bars */}
					<div className='flex items-end justify-center gap-6 w-full sm:w-auto'>
						{attendanceBars.map((bar, index) => (
							<div
								key={`bar-${index}`}
								className='relative w-7 sm:w-8 h-[160px] sm:h-[198px] bg-[#ebeff3] rounded-2xl border border-[#f4f6f8] shadow-[4px_4px_8px_#ffffffbf,inset_2px_2px_8px_#bdc2c7]'
							>
								<div
									style={{ height: bar.height }}
									className={`absolute bottom-0 w-[26px] sm:w-[30px] rounded-2xl ${bar.shadow} ${bar.color}`}
								/>
							</div>
						))}
					</div>

					{/* Metrics */}
					<div className='flex flex-col w-full sm:w-[260px] items-start gap-4'>
						{attendanceMetrics.map((metric, index) => (
							<div
								key={`metric-${index}`}
								className='flex items-center gap-4 w-full'
							>
								<img
									className='w-12 h-12 sm:w-16 sm:h-16'
									alt='Attendance icon'
									src={metric.icon}
								/>
								<div className='font-bold text-[#706f6f] text-sm sm:text-base leading-snug'>
									{metric.text}
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Attendance;
