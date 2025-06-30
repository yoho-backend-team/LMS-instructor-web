'use client';

import { COLORS, FONTS } from '@/constants/uiConstants';
import { useState, type SetStateAction } from 'react';
import { startOfMonth, setYear } from 'date-fns';
import Edit from '../../assets/icons/payments/Edit-alt.png';
import { Card } from '@/components/ui/card';
import filImg from '../../assets/classes/filter.png';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import PaymentDetails from '@/components/payment/paymentTable';

export const Payment = () => {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selectedYear, setSelectedYear] = useState<number>(
		selectedDate.getFullYear()
	);
	const [selectedStatus, setSelectedStatus] = useState<string>();

	const handleYearChange = (newYear: string) => {
		const numericYear = parseInt(newYear, 10);
		const updatedDate = startOfMonth(setYear(selectedDate, numericYear));
		setSelectedYear(numericYear);
		setSelectedDate(updatedDate);
	};

	const handleSelectedStatus = (newStatus: string) => {
		setSelectedStatus(newStatus);
	};

	const years = Array.from({ length: 36 }, (_, i) => 2000 + i);
	const status = ['All', 'Paid', 'Pending'];

	const [selectStatus, setSelectStatus] = useState('');
	const [showSelect, setShowSelect] = useState(false);

	const handleSelectStatus = (value: SetStateAction<string | undefined>) => {
		setSelectedStatus(value);
	};

	const toggleSelect = () => {
		setShowSelect(!showSelect);
	};

	return (
		<div className='py-4'>
			{/* Header */}
			<div className='flex items-center justify-between py-2'>
				<h2 className='text-xl font-semibold' style={{ ...FONTS.heading_01 }}>
					Salary Details
				</h2>

				<div className='flex items-center gap-4'>
					<div>
						<Select
							value={selectedYear.toString()}
							onValueChange={handleYearChange}
						>
							<SelectTrigger
								className='w-[100px] rounded-sm border-0 px-4 py-4.5 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none'
								style={{ ...FONTS.para_02, backgroundColor: COLORS.bg_Colour }}
							>
								<SelectValue placeholder='Select year' />
							</SelectTrigger>
							<SelectContent className='bg-[#ebeff3] rounded-sm p-2 shadow-[4px_4px_6px_rgba(189,194,199,0.5),-4px_-4px_6px_rgba(255,255,255,0.7)]'>
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
										{year || 'Year'}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div
						className='p-2 rounded-lg'
						style={{
							boxShadow: `
      							rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      							rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
						}}
					>
						<img src={Edit} alt='' />
					</div>
				</div>
			</div>

			<Card
				style={{ backgroundColor: COLORS.bg_Colour }}
				className='px-4 custom-inset-shadow mt-6 flex flex-row'
			>
				<h2 style={{ ...FONTS.heading_02 }}>Payment Status</h2>

				{showSelect && (
					<div>
						<Select value={selectedStatus} onValueChange={handleSelectStatus}>
							<SelectTrigger
								className='w-[150px] rounded-sm border-0 px-4 py-5 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none'
								style={{ ...FONTS.para_02, backgroundColor: COLORS.bg_Colour }}
							>
								<SelectValue placeholder='Payment Status' />
							</SelectTrigger>
							<SelectContent className='bg-[#ebeff3] rounded-sm p-2 shadow-[4px_4px_6px_rgba(189,194,199,0.5),-4px_-4px_6px_rgba(255,255,255,0.7)]'>
								{status.map((status) => (
									<SelectItem
										key={status}
										value={status}
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
										{status || 'Year'}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
			</Card>

			<div className='flex absolute right-14 top-29 items-center gap-3'>
				<img
					src={filImg}
					alt='filter'
					className='cursor-pointer p-2 rounded-lg bg-[#ebeff3] 
                    shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
					onClick={toggleSelect}
				/>
			</div>

			<div className='mt-8 custom-inset-shadow'>
				<PaymentDetails />
			</div>
		</div>
	);
};

export default Payment;
