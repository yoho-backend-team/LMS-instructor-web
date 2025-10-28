/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useRef, useCallback } from 'react';
import type { Message } from './type';
import { GetLocalStorage } from '@/utils/helper';
import { format } from 'date-fns';

type Props = {
	messages: Message[];
	formatMessageDate: (d?: string | Date) => string;
	isMine: (m: Message) => boolean;
	bottomRef: React.MutableRefObject<HTMLDivElement | null>;
};

function groupMessagesByDay(messages: Message[]) {
	const grouped: Record<string, Message[]> = {};
	messages.forEach((msg) => {
		const date = new Date(msg.timestamp || msg.time || '');
		const dayKey = format(date, 'yyyy-MM-dd');
		if (!grouped[dayKey]) grouped[dayKey] = [];
		grouped[dayKey].push(msg);
	});
	return grouped;
}

function getDayLabel(date: Date) {
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);

	if (date.toDateString() === today.toDateString()) return 'Today';
	if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

	return format(date, 'MMMM dd, yyyy');
}

const PALETTE = [
	'text-red-500',
	'text-green-500',
	'text-purple-500',
	'text-pink-500',
	'text-amber-500',
	'text-indigo-500',
	'text-teal-500',
	'text-rose-500',
];

function hashStr(str: string) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
	}
	return hash;
}

const MessageList: React.FC<Props> = ({
	messages,
	formatMessageDate,
	isMine,
	bottomRef,
}) => {
	const user: any = GetLocalStorage('instructorDetails');
	const grouped = useMemo(() => groupMessagesByDay(messages), [messages]);

	const colorMap = useRef<Record<string, string>>({});
	const getSenderColor = useCallback((senderKey: string) => {
		const key = senderKey || 'unknown';
		if (!colorMap.current[key]) {
			const idx = hashStr(key) % PALETTE.length;
			colorMap.current[key] = PALETTE[idx];
		}
		return colorMap.current[key];
	}, []);

	return (
		<div className='space-y-3 p-2'>
			{Object.keys(grouped).map((dayKey) => {
				const dayMessages = grouped[dayKey];
				const dayLabel = getDayLabel(new Date(dayKey));

				return (
					<div key={dayKey}>
						{/* Day Separator */}
						<div className='text-center my-4 pb-1'>
							<span className='bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded-full'>
								{dayLabel}
							</span>
						</div>

						{/* Messages of this day */}
						{dayMessages.map((message, index) => {
							const senderKey =
								(message as any).senderId ??
								(message as any).sender ??
								message.sender_name ??
								'';

							const isYou = senderKey === user?._id;

							return (
								<div
									key={`${dayKey}-${index}`}
									className={`p-2 mb-2 rounded-lg max-w-[25%] shadow ${
										isMine(message) ? 'ml-auto bg-blue-100' : 'mr-auto bg-white'
									}`}
								>
									{/* Sender label */}
									{isYou ? (
										<span className='text-blue-600 text-xs font-semibold block'>
											You
										</span>
									) : message.sender_name ? (
										<span
											className={`text-xs font-semibold block ${getSenderColor(
												senderKey
											)}`}
										>
											{message.sender_name}
										</span>
									) : null}

									<p className='max-w-xs break-words'>
										{message?.message || message.content}
									</p>

									<p className='text-[10px] text-gray-500 text-right'>
										{formatMessageDate(message?.timestamp || message.time)}
									</p>
								</div>
							);
						})}
					</div>
				);
			})}

			<div ref={bottomRef} />
		</div>
	);
};

export default MessageList;
