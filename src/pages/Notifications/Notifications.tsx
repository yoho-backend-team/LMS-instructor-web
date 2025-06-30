import {  FONTS } from '@/constants/uiConstants';
import backImg from '../../assets/icons/common/back_arrow.png';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import bellImg from '../../assets/icons/notifications/image 90.png';
import { useNavigate } from 'react-router-dom';

interface Notification {
	id: string;
	date: string;
	title: string;
	description: string;
	status: 'read' | 'unread';
}

const Notifications = () => {
	const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: '1',
			date: '27 April',
			title: 'Assignment Submitted',
			description:
				'Student John Doe has submitted Assignment 2 for review in "Web Development Basics".',
			status: 'read',
		},
		{
			id: '2',
			date: '30 June',
			title: 'New Course Review',
			description:
				'You’ve received a new course rating for "JavaScript Essentials" – check it out!',
			status: 'unread',
		},
		{
			id: '3',
			date: '5 July',
			title: 'Live Session Scheduled',
			description:
				'A new live Q&A session has been scheduled for "React Fundamentals" on 5 July at 6:00 PM.',
			status: 'unread',
		},
		{
			id: '4',
			date: '15 July',
			title: 'Student Question Posted',
			description:
				'A student asked a question in the discussion board of "Node.js Mastery".',
			status: 'read',
		},
		{
			id: '5',
			date: '19 July',
			title: 'Grading Deadline Reminder',
			description:
				'Reminder: Grade all pending submissions in "Advanced CSS" by 16 July.',
			status: 'read',
		},
		{
			id: '6',
			date: '21 July',
			title: 'New Enrollment',
			description:
				'A new student has enrolled in your course "Python for Beginners".',
			status: 'read',
		},
	]);

	const navigate = useNavigate();

	const handleNotificationClick = (notification: Notification) => {
		const isUnread = notification.status === 'unread';

		if (isUnread) {
			setNotifications((prev) =>
				prev.map((n) =>
					n.id === notification.id ? { ...n, status: 'read' } : n
				)
			);
		}

		setSelectedNotification(notification);
	};

	const filteredNotifications = notifications
		.filter((notification) => (filter === 'all' ? true : notification.status === filter))
		.filter((notification) =>
			[notification.title, notification.description, notification.date]
				.join(' ')
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		);

	const totalMessages = notifications.length;
	const unreadMessages = notifications.filter((n) => n.status === 'unread').length;

	return (
		<div className='py-4'>
			<div className='flex items-center gap-6'>
				<div
					className='cursor-pointer p-2 rounded-md'
					style={{
						boxShadow: `
              rgba(255, 255, 255, 0.7) 5px 5px 4px, 
              rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
					}}
				>
					<img src={backImg} alt='back' onClick={() => navigate(-1)} />
				</div>
				<p style={{ ...FONTS.heading_01 }}>Notification</p>
				<span style={{ ...FONTS.heading_06, marginLeft: 'auto' }}>
					{totalMessages} Message{totalMessages !== 1 ? 's' : ''} / {unreadMessages} Unread
				</span>
			</div>

			<div className='grid md:grid-cols-2 gap-6 w-full mt-4'>
				{/* Left panel - list */}
				<Card className='relative bg-[#ebeff3] px-5 h-[510px]'
					style={{
						boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px`,
					}}>
					<div className='relative'>
						<Input
							type='text'
							placeholder='Search notifications...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							style={{
								...FONTS.heading_05,
								boxShadow: `rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset`,
							}}
							className='px-3 h-12 rounded-md pr-10'
						/>
						{searchTerm && (
							<button
								onClick={() => setSearchTerm('')}
								className='absolute right-3 top-1/2 transform -translate-y-1/2'
							>
								<X className='h-5 w-5 text-gray-500 cursor-pointer' />
							</button>
						)}
					</div>

					
					<div className='flex gap-3 mt-2'>
	                     {['all', 'read', 'unread'].map((label) => (
		                  <Button
			                 key={label}
			                 className={`w-[75px] rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
				                 filter === label
				        	      ? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white hover:text-white '
					              : 'bg-[#ebeff3] text-black '
		                    	  }`}
			                    variant='outline'
			                     onClick={() => setFilter(label as 'all' | 'read' | 'unread')}
		                      >
			                     {label.charAt(0).toUpperCase() + label.slice(1)}
		                  </Button>
	                   ))}
                   </div>

				
					<div className='flex flex-col w-full gap-3 px-2 py-3 overflow-y-auto max-h-[400px] scrollbar-hide'>
						{filteredNotifications.length ? (
							filteredNotifications.map((notification) => (
								<Card
									key={notification.id}
									className={`relative bg-[#ebeff3] lg:h-[165px] cursor-pointer shadow-md ${
										notification.status === 'unread'
											? 'border-l-4 border-[#7b00ff]'
											: 'border-l-4 border-[#ebeff3]'
									}`}
									onClick={() => handleNotificationClick(notification)}
								>
									<CardHeader>
										<div className='flex justify-between items-center'>
											<div>
												<CardTitle style={{ ...FONTS.heading_02 }}>
													{notification.title}
												</CardTitle>
												<CardDescription />
											</div>
											<CardAction>
												<Dialog>
													<DialogTrigger asChild>
														<Button
															className='bg-[#ebeff3] shadow'
															variant='outline'
														>
															{notification.date}
														</Button>
													</DialogTrigger>
												</Dialog>
											</CardAction>
										</div>
									</CardHeader>
									<CardContent>
										<p style={{ ...FONTS.heading_07 }}>{notification.description}</p>
									</CardContent>
								</Card>
							))
						) : (
							<div className='text-center py-8' style={{ ...FONTS.para_01 }}>
								No notifications found
							</div>
						)}
					</div>
				</Card>

				<Card className='relative bg-[#ebeff3] h-[510px]'
					style={{
						boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px`,
					}}>
					<div className='p-4'>
						{selectedNotification ? (
							<>
								<div className='flex items-center justify-between'>
									<h4 style={{ ...FONTS.heading_02 }} className='mb-2'>
										{selectedNotification.title}
									</h4>
									<Button variant='outline'>{selectedNotification.date}</Button>
								</div>
								<p className='my-3' style={{ ...FONTS.heading_06 }}>
									{selectedNotification.description}
								</p>
								<div className='flex justify-end mt-5'>
									<Button
										className='bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white rounded-lg'
										variant='outline'
									>
										Status: {selectedNotification.status}
									</Button>
								</div>
							</>
						) : filteredNotifications.length ? (
							<div className='relative'>
								<p style={{ ...FONTS.para_01 }}>Select a notification to view details</p>
								<div className='absolute top-32 left-44'>
									<img src={bellImg} alt='notifications' />
								</div>
							</div>
						) : (
							<p style={{ ...FONTS.para_01 }}>No notifications available to display</p>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Notifications;
