/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS, FONTS } from '@/constants/uiConstants';
import { LineChart, XAxis } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState, useCallback } from 'react';
import { Calendar } from '@/components/ui/calendar';
import filter from '../../assets/icons/common/Mask group.png';
import { startOfMonth, setMonth, setYear, format } from 'date-fns';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { selectDashBoard } from '@/features/Dashboard/reducers/selectors';
import { selectAttendance, selectAttendanceDaily } from '@/features/attentance/reduces/selectors';
import type { AppDispatch } from '@/store/store';
import { getInstructorAttendance, getAttendanceDailyThunk } from '@/features/attentance/reduces/thunks';
import { ResponsiveContainer } from 'recharts';

const chartConfig = {
	desktop: {
		label: 'Day',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig;

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
] as const;

export const Attendance = () => {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selectedMonth, setSelectedMonth] = useState<string>(
		months[selectedDate.getMonth()]
	);
	const [selectedYear, setSelectedYear] = useState<number>(
		selectedDate.getFullYear()
	);
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const dashData = useSelector(selectDashBoard);
	const attendancedata: any = useSelector(selectAttendance);
	const dailydata = useSelector(selectAttendanceDaily)
	console.log(dailydata, "dailydata")

	const generateChartData = useCallback(() => {
		// Fixed: Check for the correct data structure from your API
		if (!attendancedata?.data?.data) return [];

		// Group attendance data by month from the 'data' array
		const monthlyData: { [key: string]: { present: number; absent: number; total: number } } = {};

		attendancedata.data.data.forEach((record: any) => {
			const date = new Date(record.date);
			const monthName = format(date, 'MMM');

			if (!monthlyData[monthName]) {
				monthlyData[monthName] = { present: 0, absent: 0, total: 0 };
			}

			monthlyData[monthName].total += 1;
			if (record.status === 'present') {
				monthlyData[monthName].present += 1;
			} else {
				monthlyData[monthName].absent += 1;
			}
		});

		// Convert to chart format
		return Object.entries(monthlyData).map(([month, data]) => ({
			month,
			desktop: data.present,
		}));
	}, [attendancedata]);

	useEffect(() => {
		if (selectedDate?.toISOString().split('T')[0] == new Date().toISOString().split('T')[0]) {
			dispatch(getAttendanceDailyThunk({ date: selectedDate?.toISOString().split('T')[0] }));
		} else {
			const nextDay = new Date(selectedDate).setDate(selectedDate.getDate() + 1)
			dispatch(getAttendanceDailyThunk({ date: new Date(nextDay).toISOString().split('T')[0] }));
		}
	}, [dispatch, selectedDate])

	const chartData = generateChartData();

	const attendanceCards = [
		{
			label: 'Classes Attend',
			current: attendancedata?.data?.totalWorkingDays || 0,
			color: COLORS.light_blue,
		},
		{
			label: 'Present Days',
			current: attendancedata?.data?.presentDays || 0,
			total: attendancedata?.data?.totalWorkingDays || 0,
			color: COLORS.light_pink,
		},
		{
			label: 'Absent Days',
			current: attendancedata?.data?.absentDays || 0,
			total: attendancedata?.data?.totalWorkingDays || 0,
			color: COLORS.light_green_02,
		},
	];

	const handleMonthChange = (newMonth: (typeof months)[number]) => {
		const monthIndex = months.indexOf(newMonth);
		const updatedDate = startOfMonth(setMonth(selectedDate, monthIndex));
		setSelectedMonth(newMonth);
		setSelectedDate(updatedDate);
	};

	const handleYearChange = (newYear: string) => {
		const numericYear = parseInt(newYear, 10);
		const updatedDate = startOfMonth(setYear(selectedDate, numericYear));
		setSelectedYear(numericYear);
		setSelectedDate(updatedDate);
	};

	const handleCalendarMonthChange = (newMonth: Date) => {
		setSelectedDate(newMonth);
		setSelectedMonth(months[newMonth.getMonth()]);
		setSelectedYear(newMonth.getFullYear());
	};

	const years = Array.from(
		{ length: 5 },
		(_, i) => new Date().getFullYear() - 2 + i
	);

	// Helper function to get status for selected date
	// const getSelectedDateStatus = () => {
	// 	if (!attendancedata?.data?.workingDays) return null;

	// 	const selectedDateStr = selectedDate.toISOString().split('T')[0];
	// 	return attendancedata.data.workingDays.find((day: any) =>
	// 		day.date === selectedDateStr
	// 	);
	// };

	// Calculate classes for selected date (simplified calculation)
	// const getSelectedDateStats = () => {
	// 	const dateStatus = getSelectedDateStatus();
	// 	const totalClasses = attendancedata?.data?.total_class || 1; // Default to 1 if 0

	// 	return {
	// 		scheduled: totalClasses,
	// 		attended: dateStatus?.status === 'present' ? 1 : 0,
	// 		absent: dateStatus?.status === 'absent' ? 1 : 0,
	// 	};
	// };

	useEffect(() => {
		dispatch(getDashBoardReports());
	}, [dispatch]);

	useEffect(() => {
		try {
			const payload = {
				userId: dashData?.user?.uuid,
				month: selectedDate.getMonth() + 1,
				year: selectedDate.getFullYear(),
				instituteId: dashData?.institute.uuid,
			};
			dispatch(getInstructorAttendance(payload));
		} catch (error) {
			console.log(error);
		}
	}, [dashData?.institute.uuid, dashData?.user?.uuid, dispatch, selectedDate]);

	// const selectedDateStats = getSelectedDateStats();

	return (
		<div className='p-4'>
			{/* Header */}
			<div className='flex items-center justify-between mb-4'>
				<h2
					className='text-xl font-semibold mb-0 mx-1'
					style={{ ...FONTS.heading_01 }}
				>
					Attendance
				</h2>

				<div className='relative flex items-center'>
					<button
						onClick={() => setShowFilters(!showFilters)}
						className='p-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:scale-105 transition z-10'
						style={{ backgroundColor: COLORS.bg_Colour }}
						aria-label='Filter attendance data'
					>
						<img src={filter} alt='Filter' className='w-6 h-6' />
					</button>

					{showFilters && (
						<div className='absolute right-full top-1/2 transform -translate-y-1/2 mr-4 flex gap-4 opacity-100 max-w-[400px]'>
							<Select value={selectedMonth} onValueChange={handleMonthChange}>
								<SelectTrigger
									style={{
										...FONTS.para_02,
										backgroundColor: COLORS.bg_Colour,
									}}
									className='w-max-sm rounded-sm border-0 px-1 py-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none'
								>
									<SelectValue placeholder='Select month' />
								</SelectTrigger>
								<SelectContent className='bg-[#ebeff3] rounded-sm w-[40px] px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'>
									{months.map((month) => (
										<SelectItem
											key={month}
											value={month}
											className={`
                        cursor-pointer text-gray-700 w-[100px]
                        rounded-sm 
                        bg-[#ebeff3]
                        shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] 
                        data-[state=checked]:bg-gradient-to-r 
                        data-[state=checked]:from-purple-500 
                        data-[state=checked]:to-purple-700 
                        data-[state=checked]:text-white
                        mb-2 transition
                      `}
											style={{ backgroundColor: COLORS.bg_Colour }}
										>
											{month}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select
								value={selectedYear.toString()}
								onValueChange={handleYearChange}
							>
								<SelectTrigger
									className='w-max-sm rounded-sm border-0 px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none'
									style={{
										...FONTS.para_02,
										backgroundColor: COLORS.bg_Colour,
									}}
								>
									<SelectValue placeholder='Select year' />
								</SelectTrigger>
								<SelectContent className='bg-[#ebeff3] rounded-sm w-[40px] px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'>
									{years.map((year) => (
										<SelectItem
											key={year}
											value={year.toString()}
											className={`
                        cursor-pointer px-2 py-2 text-gray-700 
                        rounded-sm 
                        bg-[#ebeff3]
                        shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(189,194,199,0.6)]
                        data-[state=checked]:bg-gradient-to-r 
                        data-[state=checked]:from-purple-500 
                        data-[state=checked]:to-purple-700 
                        data-[state=checked]:text-white
                        mb-2 transition
                      `}
											style={{ backgroundColor: COLORS.bg_Colour }}
										>
											{year}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}
				</div>
			</div>

			<div className='flex flex-wrap gap-6 justify-center pt-6'>
				{attendanceCards.map((card) => (
					<Card
						key={card.label}
						className='
    relative 
    w-full 
    md:max-w-full
    h-auto 
    shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] 
    overflow-hidden
    flex flex-col
  '
						style={{ backgroundColor: COLORS.bg_Colour }}
					>
						<CardHeader className='p-4 pb-2'>
							<div className='flex justify-between items-center w-full'>
								<span style={{ ...FONTS.heading_04 }}>{card.label}</span>
								<div className='text-right'>
									<span
										className='text-2xl font-bold block'
										style={{ ...FONTS.heading_01 }}
									>
										<span style={{ color: card.color }}>{card.current}</span>
										{card.total && (
											<span className='text-sm text-gray-500'>/{card.total}</span>
										)}
									</span>
								</div>
							</div>
						</CardHeader>
						<CardContent className='p-4 pt-2 flex-1'>
							<div className='w-full h-[70px]'>
								<ChartContainer
									config={chartConfig}
									style={{
										...FONTS.para_03,
										width: '100%',
										height: '100%'
									}}
								>
									<ResponsiveContainer width="100%" height="100%">
										<LineChart
											data={chartData}
											margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
										>
											<XAxis dataKey='month' hide />
											<ChartTooltip
												cursor={false}
												content={<ChartTooltipContent hideLabel />}
											/>
											{/* <Line
              dataKey='desktop'
              type='monotone'
              stroke={card.color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: card.color }}
            /> */}
										</LineChart>
									</ResponsiveContainer>
								</ChartContainer>
							</div>
						</CardContent>
					</Card>
				))}
			</div>


			<div className='flex flex-row gap-6 pt-6 '>
				<div className='flex flex-col'>
					<h2
						className='text-xl font-semibold mb-4 mt-2'
						style={{ ...FONTS.heading_02 }}
					>
						Calendar
					</h2>
					<Calendar
						mode='single'
						required
						selected={selectedDate}
						onSelect={setSelectedDate}
						month={selectedDate}
						onMonthChange={handleCalendarMonthChange}
						className='border **:gap-5 **:py-0.5 md:**:gap-2 rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]'
						style={{ ...FONTS.heading_02, backgroundColor: COLORS.bg_Colour }}
					/>
				</div>

				<div className='flex flex-col w-full'>
					<h3
						className='text-lg font-semibold mb-4 mt-2'
						style={{ ...FONTS.heading_02 }}
					>
						Day Overview
					</h3>
					<div
						className='flex flex-col justify-between rounded-md p-6 h-full shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]'
						style={{ backgroundColor: COLORS.bg_Colour }}
					>
						<div>
							<p
								className='text-sm mb-4 text-gray-700'
								style={{ ...FONTS.para_01 }}
							>
								{selectedDate ? selectedDate.toDateString() : 'Select a date'}
							</p>
							{dailydata?.map((item: any, index: number) => (
								<ul
									key={index}
									className='space-y-2 text-gray-700'
									style={{ ...FONTS.heading_06 }}
								>

									<li>
										Class Name: {item?.class_name}
									</li>
									<li>
										Duration: {item?.duration}
									</li>
									<li>Start Date: {item?.start_date}</li>
									<li>End Time: {item?.end_time}</li>

								</ul>
							))}
						</div>
						<button
							className='w-max-sm mt-4 self-start px-4 py-2 bg-gray rounded-xl btnshadow text-white text-[14px] hover:!text-white btnhovershadow cursor-pointer '
							style={{ ...FONTS.heading_06 }}
						>
							View Details
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Attendance;