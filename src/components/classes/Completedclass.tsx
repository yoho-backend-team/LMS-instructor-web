/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import filterImg from '../../assets/classes/filter.png';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useDispatch } from 'react-redux';

interface DropdownOption {
	value: string;
	label: string;
}

interface FilterGroup {
	title: string;
	options: DropdownOption[];
}

interface CompletedclassProps {
	data?: any;
	classType?: boolean;
	showOnlineOnly?: boolean;
	currentPage?: number;
	onPageChange?: React.Dispatch<React.SetStateAction<number>>;
}

const Completedclass: React.FC<CompletedclassProps> = ({
	data,
	classType,
	currentPage = 1,
	onPageChange,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<any>();
	const { showLoader, hideLoader } = useLoader();

	const headers = ['Title', 'Start Date', 'Start Time', 'Duration', 'Action'];

	const months: DropdownOption[] = [
		{ value: '01', label: 'January' },
		{ value: '02', label: 'February' },
		{ value: '03', label: 'March' },
		{ value: '04', label: 'April' },
		{ value: '05', label: 'May' },
		{ value: '06', label: 'June' },
		{ value: '07', label: 'July' },
		{ value: '08', label: 'August' },
		{ value: '09', label: 'September' },
		{ value: '10', label: 'October' },
		{ value: '11', label: 'November' },
		{ value: '12', label: 'December' },
	];

	const years: DropdownOption[] = Array.from({ length: 5 }, (_, i) => {
		const year = new Date().getFullYear() - i;
		return { value: year.toString(), label: year.toString() };
	});

	const courses = useMemo(() => {
		const courseSet = new Set<string>();
		data?.data?.forEach((item: any) => {
			if (item.courseDetails?.course_name) {
				courseSet.add(item.courseDetails.course_name);
			}
		});
		return Array.from(courseSet).map((course) => ({
			value: course,
			label: course,
		}));
	}, [data]);

	const filterGroups: FilterGroup[] = [
		{ title: 'Month', options: months },
		{ title: 'Year', options: years },
		{ title: 'Course', options: courses },
	];

	const [showFilters, setShowFilters] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const [selectedFilters, setSelectedFilters] = useState<
		Record<string, string>
	>({});
	const totalPages = data?.last_page || 1;

	const toggleFilters = () => {
		setShowFilters((prev) => !prev);
		setOpenDropdown(null);
	};

	const toggleDropdown = (title: string) => {
		setOpenDropdown((prev) => (prev === title ? null : title));
	};

	const selectOption = (groupTitle: string, value: string) => {
		setSelectedFilters((prev) => ({ ...prev, [groupTitle]: value }));
		setOpenDropdown(null);
	};

	const clearFilters = () => {
		setSelectedFilters({});
	};

	const filteredData = useMemo(() => {
		return data?.data?.filter((item: any) => {
			const date = item.start_date || '';
			const month = date.slice(5, 7);
			const year = date.slice(0, 4);
			const courseName = item.courseDetails?.course_name || '';

			return (
				(!selectedFilters.Month || month === selectedFilters.Month) &&
				(!selectedFilters.Year || year === selectedFilters.Year) &&
				(!selectedFilters.Course || courseName === selectedFilters.Course)
			);
		});
	}, [data, selectedFilters]);

	const handleClassDetailPage = (id: string) => {
		navigate(`/class/${classType}/${id}`);
	};

	const hasActiveFilters = Object.keys(selectedFilters).length > 0;

	useEffect(() => {
		(async () => {
			try {
				showLoader();
				const timeoutId = setTimeout(() => {
					hideLoader();
				}, 8000);
				const response = await dispatch(getDashBoardReports());
				if (response) clearTimeout(timeoutId);
			} finally {
				hideLoader();
			}
		})();
	}, [dispatch, hideLoader, showLoader]);

	return (
		<div
			style={{ backgroundColor: COLORS.bg_Colour }}
			className='mb-4 flex flex-col min-h-[calc(100vh-150px)]'
		>
			{/* Sticky Filters */}
			<div className='sticky top-0 z-10 bg-[#f1f3f5] pt-2 pb-3'>
				<Card
					style={{ backgroundColor: COLORS.bg_Colour }}
					className='px-4 py-3 shadow-sm'
				>
					<div className='flex justify-between items-center'>
						{/* Filter grid */}
						{showFilters && (
							<div className='flex-1 mr-4'>
								<div className='hidden md:grid grid-cols-6 gap-4'>
									{filterGroups.map((group) => (
										<div key={group.title} className='relative'>
											<Button
												style={{ ...FONTS.heading_07 }}
												variant='outline'
												className='cursor-pointer w-full justify-between bg-[#ebeff3]'
												onClick={() => toggleDropdown(group.title)}
											>
												{selectedFilters[group.title] || group.title}
												<ChevronDown className='ml-2 h-4 w-4' />
											</Button>

											{openDropdown === group.title && (
												<div className='absolute z-50 w-full mt-1 bg-[#ebeff3] rounded-md p-1 max-h-60 overflow-y-auto'>
													{group.options.map((option) => (
														<div
															key={option.value}
															style={{ ...FONTS.para_02 }}
															className={`p-2 m-1 cursor-pointer rounded-sm ${
																selectedFilters[group.title] === option.value
																	? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white'
																	: 'bg-[#ebeff3] hover:bg-[#dde1e5]'
															}`}
															onClick={() =>
																selectOption(group.title, option.value)
															}
														>
															{option.label}
														</div>
													))}
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						)}

						{/* Right-side controls */}
						<div className='flex items-center'>
							{hasActiveFilters && (
								<Button
									onClick={clearFilters}
									variant='ghost'
									className='mr-2 text-sm text-[#7B00FF] hover:text-[#B200FF]'
								>
									<X size={16} className='mr-1' />
									Clear
								</Button>
							)}
							<img
								src={filterImg}
								alt='filter'
								className='cursor-pointer p-2 rounded-lg bg-[#ebeff3]'
								onClick={toggleFilters}
							/>
						</div>
					</div>
				</Card>
			</div>

			{/* Table / Cards */}
			<div className='flex-1 overflow-y-auto'>
				{/* Desktop */}
				{/* ✅ Desktop Table View with Proper Alignment */}
				<div className='hidden md:block'>
					<Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white mx-2 p-4 mt-2'>
						<table className='w-full table-fixed'>
							<thead>
								<tr style={{ ...FONTS.heading_03 }}>
									{headers.map((title, index) => (
										<th
											key={index}
											className='text-center py-2 w-1/5 text-white'
										>
											{title}
										</th>
									))}
								</tr>
							</thead>
						</table>
					</Card>

					{filteredData?.length ? (
						<Card className='mx-2 mt-2 bg-[#ebeff3] p-0 overflow-hidden shadow-sm'>
							<table className='w-full table-fixed'>
								<tbody>
									{filteredData.map((item: any) => (
										<tr
											key={item.uuid}
											className='border-b border-gray-300 hover:bg-gray-100 cursor-pointer'
											style={{ ...FONTS.heading_06 }}
											onClick={() => handleClassDetailPage(item.uuid)}
										>
											<td className='text-left pl-8 py-3 w-1/5'>
												{item?.class_name || 'N/A'}
											</td>
											<td className='text-center py-3 w-1/5'>
												{(item.start_date || '').slice(0, 10)}
											</td>
											<td className='text-center py-3 w-1/5'>
												{(item.start_time || '').slice(11, 16)}
											</td>
											<td className='text-center py-3 w-1/5'>
												{item.duration} Min
											</td>
											<td className='text-center py-3 w-1/5'>
												<Button
													onClick={(e) => {
														e.stopPropagation();
														handleClassDetailPage(item.uuid);
													}}
													className='bg-gradient-to-r from-green-400 to-green-500 text-white px-4'
												>
													View Details
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</Card>
					) : (
						<div className='text-center py-8 text-gray-600'>
							No completed classes available
						</div>
					)}
				</div>

				{/* Mobile */}
				<div className='block md:hidden'>
					{filteredData?.length ? (
						<div className='space-y-3 mx-2 mt-2'>
							{filteredData.map((item: any) => (
								<Card
									key={item.uuid}
									className='bg-[#ebeff3] text-black p-4 shadow-md cursor-pointer'
									onClick={() => handleClassDetailPage(item.uuid)}
								>
									<div className='space-y-2'>
										<div className='flex justify-between'>
											<span className='font-semibold'>Title:</span>
											<span>{item?.class_name || 'N/A'}</span>
										</div>
										<div className='flex justify-between'>
											<span className='font-semibold'>Start Date:</span>
											<span>{(item.start_date || '').slice(0, 10)}</span>
										</div>
										<div className='flex justify-between'>
											<span className='font-semibold'>Start Time:</span>
											<span>{(item.start_time || '').slice(11, 16)}</span>
										</div>
										<div className='flex justify-between'>
											<span className='font-semibold'>Duration:</span>
											<span>{item.duration} Min</span>
										</div>
										<Button className='w-full bg-gradient-to-r from-green-400 to-green-500 text-white mt-2'>
											View Details
										</Button>
									</div>
								</Card>
							))}
						</div>
					) : (
						<div className='text-center py-8 text-gray-600'>
							No completed classes available
						</div>
					)}
				</div>
			</div>

			{/* ✅ Pagination - now visible on all screens */}
			{totalPages > 1 && (
				<div className='flex justify-center items-center gap-4 mt-6 mb-6 relative z-20 bg-[#f1f3f5] py-4 shadow-inner'>
					<Button
						onClick={() => onPageChange && onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						variant='outline'
					>
						Prev
					</Button>
					<span style={{ ...FONTS.heading_06 }}>
						Page {currentPage} of {totalPages}
					</span>
					<Button
						onClick={() => onPageChange && onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						variant='outline'
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};

export default Completedclass;
