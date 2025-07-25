/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { Outlet } from 'react-router-dom';
import Client from '../api/index'

const MainLayout = () => {

	const publicVapidKey = import.meta.env.VITE_PUBLIC_VAPI_KEY;

	function urlBase64ToUint8Array(base64String: string) {
		const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		const base64 = (base64String + padding)
			.replace(/-/g, '+')
			.replace(/_/g, '/');

		const rawData = window.atob(base64);
		return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
	}


	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/Service-Worker.js')
			.then((registration) => {
				console.log('Service Worker registered with scope:', registration.scope);
			})
			.catch((error) => {
				console.error('Service Worker registration failed:', error);
			});
	}

	if ('serviceWorker' in navigator && 'PushManager' in window) {
		navigator.serviceWorker
			.register('/Service-Worker.js')
			.then(async (register: any) => {
				const user: any = localStorage.getItem('user')
				const sub = await register.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
				});

				await Client.notificatinsubscription.post({ subscription: sub, user: user._id });
			});
	}

	return (
		<>
			<div className='flex flex-col h-[100vh]  bg-[#EBEFF3]'>
				<div className='flex flex-col justify-center h-[90px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
					<Navbar />
				</div>
				<div className='relative h-[100vh] overflow-y-auto scrollbar-hide px-6 py-2'>
					<Outlet />
				</div>
				<div className='h-[70px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default MainLayout;
