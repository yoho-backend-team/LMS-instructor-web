// src/components/community/CommunitySide/Sidebar.tsx
import React from 'react';
import doubleicon from '@/assets/icons/community/Group 210.png';
import type { Chat, Community } from './type';
import { FONTS } from '@/constants/uiConstants';

type Props = {
	communities: Community[];
	selectedChat?: Chat | null;
	onSelectChat: (c: Community) => void;
	searchTerm: string;
	setSearchTerm: (v: string) => void;
	formatMessageDate: (d?: string | Date) => string;
};

const Sidebar: React.FC<Props> = ({
	communities,
	selectedChat,
	onSelectChat,
	searchTerm,
	setSearchTerm,
	formatMessageDate,
}) => {
	const filteredCommunities = communities?.filter(
		(community) =>
			community?.batch?.batch_name
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			community?.group?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleClearSearch = () => {
		setSearchTerm('');
	};

	return (
		<div className='w-full lg:w-[400px] xl:w-[500px] h-[490px] bg-[#EBEFF3] rounded-xl shadow-2xl'>
			<div className='relative p-2 bg-[#EBEFF3]'>
				<div className='relative mt-4'>
					<input
						type='text'
						placeholder='Search'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full sticky p-3 h-10 pl-10 bg-[#EBEFF3] rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
					/>
					<svg
						className='absolute left-3 top-3 h-5 w-5 text-gray-500'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
					{searchTerm && (
						<svg
							onClick={handleClearSearch}
							className='absolute right-3 top-3 h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					)}
				</div>
			</div>

			<div
				className='p-4 h-[calc(500px-80px)] relative bg-[#EBEFF3] overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'
			>
				{filteredCommunities?.length > 0 ? (
					filteredCommunities?.map((chat: any) => (
						<div
							key={chat._id}
							className={`relative mb-2 z-10 flex items-center justify-between p-3 bg-[#EBEFF3] rounded-lg overflow-hidden shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] transition-all cursor-pointer ${
								selectedChat?._id === chat?._id ? 'bg-gray-200' : ''
							}`}
							onClick={() => onSelectChat(chat)}
						>
							<div className='flex items-center space-x-3'>
								<div className='bg-gray-900 text-white rounded-full h-12 w-12 flex items-center justify-center overflow-hidden'>
									{chat?.batch?.groupImage ? (
										<img
											src={chat?.batch?.groupImage}
											alt={chat?.batch?.batch_name}
											className='h-full w-full object-cover'
										/>
									) : (
										<span
											className='!text-white'
											style={{ ...FONTS.heading_03 }}
										>
											{chat?.batch?.batch_name?.charAt(0).toUpperCase()}
										</span>
									)}
								</div>
								<div>
									<h3 style={{ ...FONTS.heading_05 }}>
										{chat?.batch?.batch_name || chat?.group}
									</h3>
									<p style={{ ...FONTS.heading_07 }}>
										{chat?.last_message?.message}
									</p>
								</div>
							</div>
							<div className='flex flex-col items-end'>
								<p style={{ ...FONTS.para_02 }}>
									{chat?.last_message?.timestamp &&
										formatMessageDate(chat?.last_message?.timestamp)}
								</p>
								<img
									src={doubleicon}
									className='mt-1 w-4 h-4 opacity-70'
									alt='Read receipt'
								/>
							</div>
						</div>
					))
				) : (
					<div className='flex flex-col items-center justify-center h-full'>
						<div className='text-gray-500 text-lg font-medium'>
							<p style={{ ...FONTS.heading_03 }}>No communities found</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
