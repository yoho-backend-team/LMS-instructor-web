import { COLORS, FONTS } from '@/constants/uiConstants';
import React from 'react';

interface LogoutConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isLoading: boolean;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	isLoading,
}) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='bg-white rounded-md shadow-lg p-6 w-full max-w-sm'>
				<h2 className='text-xl font-semibold text-gray-800 mb-2'>
					Confirm Logout
				</h2>
				<p className='text-sm text-gray-600 mb-6'>
					Are you sure you want to log out?
				</p>

				<div className='flex justify-end space-x-3'>
					<button
						style={{
							boxShadow: `
              rgba(255, 255, 255, 0.7) 5px 5px 4px, 
              rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
							...FONTS.heading_06,
						}}
						onClick={onClose}
						className='cursor-pointer px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='cursor-pointer px-4 py-2 text-sm rounded bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
						style={{ ...FONTS.heading_06, color: COLORS.white }}
						disabled={isLoading}
					>
						{isLoading ? 'Logout...' : 'Logout'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default LogoutConfirmationModal;
