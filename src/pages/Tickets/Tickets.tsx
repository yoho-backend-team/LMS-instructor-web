import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ticketicon from '../../assets/icons/Tickets/Mask group.png';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentticket } from '@/features/Tickets/reducer/thunks';
import type { AppDispatch } from '@/store/store';
import { selectTicket } from '@/features/Tickets/reducer/selector';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';

interface Message {
	_id: string;
	sender: string;
	content: string;
	senderType: string;
	createdAt: string;
	updatedAt: string;
	date: string;
}

interface Ticket {
	_id: string;
	institute: string;
	branch: string;
	user: string;
	query: string;
	category: string;
	solution: string | null;
	description: string;
	date: string;
	priority: string;
	file: string | null;
	status: string;
	is_active: boolean;
	is_deleted: boolean;
	messages: Message[];
	createdAt: string;
	updatedAt: string;
	uuid: string;
	id: number;
	ticket_id: string;
	__v: number;
}

const Tickets = () => {
	const [filter, setFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const itemsPerPage = 4;
	const dispatch = useDispatch<AppDispatch>();
	const ticketData = useSelector(selectTicket);

	const memoizedTickets = useMemo(() => {
		const tickets = ticketData?.data || [];
		return [...tickets].reverse();
	}, [ticketData]);

	const handleCreate = () => {
		navigate('/tickets/create-ticket');
	};

	const filteredTickets = useMemo(() => {
		if (filter === 'all') return memoizedTickets;
		return memoizedTickets.filter((ticket: Ticket) => {
			if (filter === 'open') return ticket.status === 'opened';
			if (filter === 'closed') return ticket.status === 'closed';
			return false;
		});
	}, [memoizedTickets, filter]);

	const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
	const paginatedTickets = useMemo(() => {
		return filteredTickets.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		);
	}, [filteredTickets, currentPage, itemsPerPage]);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	useEffect(() => {
		dispatch(getStudentticket({ page: 1, limit: 10 }));
	}, [dispatch]);

	const { showLoader, hideLoader } = useLoader();

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
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	};

	return (
		<div className='flex min-h-screen flex-col px-4 md:px-8 py-10'>
			<div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4'>
				<h1 className='text-xl md:text-2xl font-bold' style={FONTS.heading_01}>
					Ticket
				</h1>
				<Button
					className='bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white rounded-xl cursor-pointer shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] py-5'
					style={FONTS.heading_07}
					variant='outline'
					onClick={handleCreate}
				>
					Create Ticket
				</Button>
			</div>

			<div className='flex flex-wrap gap-3 mb-8'>
				{['all', 'open', 'closed'].map((label) => (
					<Button
						key={label}
						className={`cursor-pointer  rounded-xl ${
							filter === label
								? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
								: 'bg-[#ebeff3] !text-black shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
						}`}
						style={FONTS.heading_05}
						variant='outline'
						onClick={() => {
							setFilter(label);
							setCurrentPage(1);
						}}
					>
						{label.charAt(0).toUpperCase() + label.slice(1)}
					</Button>
				))}
			</div>

			{filteredTickets.length > 0 ? (
				<>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 gap-6 w-full'>
						{paginatedTickets.map((ticket: Ticket) => (
							<Card
								key={ticket._id}
								onClick={() =>
									navigate(`/ticket/${ticket.ticket_id}`, { state: ticket })
								}
								className='relative bg-[#ebeff3] min-h-[231px] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] cursor-pointer'
							>
								<CardHeader>
									<div className='flex justify-between items-center'>
										<CardTitle
											style={{
												...FONTS.heading_01,
												color: COLORS.blue_02,
												fontSize: '24px',
											}}
										>
											{ticket.ticket_id}
										</CardTitle>
										<CardAction>
											<Dialog>
												<DialogTrigger>
													<Button
														className='bg-[#ebeff3] rounded-lg shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
														style={FONTS.heading_06}
														variant='outline'
													>
														{formatDate(ticket.date)}
													</Button>
												</DialogTrigger>
											</Dialog>
										</CardAction>
									</div>
								</CardHeader>
								<CardContent>
									<p className='font-semibold' style={FONTS.heading_04}>
										{ticket.query || 'No Title'}
									</p>
									<p style={FONTS.heading_06}>{ticket.description}</p>
								</CardContent>
								<CardFooter>
									<div className='flex w-full justify-between items-center'>
										<div className='flex items-center gap-1'>
											<img
												src={ticketicon}
												alt='Ticket'
												className='w-9 h-9 p-2 rounded-lg shadow-[4px_3px_3px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
											/>
											<p className='ml-3' style={FONTS.heading_04}>
												{ticket.messages?.length || 0}
											</p>
										</div>
										<CardAction>
											<Dialog>
												<DialogTrigger>
													<Button
														className={`rounded-lg cursor-pointer ${
															ticket.status === 'opened'
																? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
																: 'bg-[#ebeff3] !text-black shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
														}`}
														style={FONTS.heading_04}
														variant='outline'
													>
														{ticket.status === 'opened' ? 'Open' : 'Closed'}
													</Button>
												</DialogTrigger>
											</Dialog>
										</CardAction>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>

					{/* ✅ Simplified pagination UI */}
					{totalPages > 1 && (
						<div className='flex justify-center items-center mt-10 gap-4'>
							<Button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								variant='outline'
								size='icon'
								className='rounded-full bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
							>
								<ChevronLeft size={20} />
							</Button>

							<span
								style={FONTS.heading_05}
								className='text-sm md:text-base text-black'
							>
								Page <strong>{currentPage}</strong> of{' '}
								<strong>{totalPages}</strong>
							</span>

							<Button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								variant='outline'
								size='icon'
								className='rounded-full bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
							>
								<ChevronRight size={20} />
							</Button>
						</div>
					)}
				</>
			) : (
				<div className='flex flex-col items-center justify-center py-35'>
					<p className='text-lg font-medium mb-4' style={FONTS.para_01}>
						{filter === 'open'
							? 'No open tickets found'
							: filter === 'closed'
							? 'No closed tickets found'
							: 'No tickets found'}
					</p>
				</div>
			)}
		</div>
	);
};

export default Tickets;
