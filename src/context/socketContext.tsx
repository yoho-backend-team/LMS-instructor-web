import { GetLocalStorage } from '@/utils/helper';
import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export function useInstructorSocket() {
	return useContext(SocketContext);
}

export const InstructorSocketProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	const user: any = GetLocalStorage('instructorDetails');
	console.log('user', user);

	useEffect(() => {
		const url = 'https://lms-node-backend-v1.onrender.com';
		// const url = 'http://localhost:3000';

		const socketIO = io(url, {
			query: { userId: user?._id },
			transports: ['websocket'],
		});

		setSocket(socketIO);

		socketIO.emit('registerOnline', { userId: user?._id });
		console.log('Instructor Socket Connected', user?.full_name);
		return () => {
			socketIO.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
