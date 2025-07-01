import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
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
