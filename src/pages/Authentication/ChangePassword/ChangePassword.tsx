import { Card } from '@/components/ui/card';
import Logo from '../../../assets/icons/navbar/icons8-ionic-50.png';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { toast } from 'react-toastify';
import { authChangePassword } from '@/features/Authentication/services';
import sideImg from '../../../assets/side image.jpg';

type ChangePassword = {
	newPassword: string;
	confirmPassword: string;
};

const ChangePasswordPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ChangePassword>({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { email } = location.state || {};

	useEffect(() => {
		const checkScreenSize = () => {
			setIsDesktop(window.innerWidth >= 1024);
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	}, []);

	const onSubmit = async (data: ChangePassword) => {
		setIsLoading(true);
		try {
			if (data.newPassword === data.confirmPassword) {
				const params_data = {
					email,
					new_password: data?.newPassword,
					confirm_password: data?.confirmPassword,
				};

				if (data.newPassword.length < 8) {
					toast.error('Password must be at least 8 characters long');
					return;
				}
				const response = await authChangePassword(params_data);
				if (response) {
					navigate('/login');
					toast.success('Password changed successfully!');
				} else {
					toast.error('Failed to change password, please try again.');
				}
			} else {
				toast.error('Credentials Not-Matched');
			}
		} catch (error: any) {
			toast.error('Something went wrong, please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={`flex bg-[#ebeff3] w-full h-[100vh] p-4 gap-4 ${
				!isDesktop ? 'justify-center items-center' : ''
			}`}
		>
			{/* Form Section */}
			<div className={`${isDesktop ? 'w-1/2' : 'w-full max-w-md'} h-full`}>
				<Card
					className='bg-[#ebeff3] w-full h-full rounded-md flex px-4 justify-center cursor-pointer'
					style={{
						boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px,
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
					}}
				>
					<div className='flex flex-col items-center'>
						<Card
							className='bg-[#ebeff3] w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer'
							style={{
								boxShadow: `
                  rgba(255, 255, 255, 0.7) -4px -4px 4px,
                  rgba(189, 194, 199, 0.75) 5px 5px 4px
                `,
							}}
						>
							<img src={Logo} alt='logo' style={{ width: 20, height: 20 }} />
						</Card>

						{/* Responsive heading */}
						<p
							className='text-center my-3 text-sm sm:text-base md:text-lg lg:text-xl'
							style={{ ...FONTS.heading_02 }}
						>
							Change Password
						</p>

						<form onSubmit={handleSubmit(onSubmit)} className='w-full my-4'>
							{/* New Password */}
							<div className='flex flex-col space-y-2'>
								<label
									className='text-sm sm:text-base md:text-lg'
									style={{ ...FONTS.heading_04 }}
								>
									New Password
								</label>
								<div className='relative'>
									<input
										style={{ ...FONTS.heading_06 }}
										type={showPassword ? 'text' : 'password'}
										{...register('newPassword', {
											required: 'Please Enter Your New Password',
										})}
										className='w-full mb-3 mt-2 rounded-md px-4 py-2 text-sm sm:text-base lg:text-lg shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none'
									/>
									<span
										className='absolute top-5.5 right-3 text-gray-500 cursor-pointer'
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeSlashIcon className='w-5 h-5 text-[#716F6F]' />
										) : (
											<EyeIcon className='w-5 h-5 text-[#716F6F]' />
										)}
									</span>
								</div>
								{errors.newPassword && (
									<span
										className='text-xs sm:text-sm md:text-base'
										style={{ ...FONTS.para_03, color: COLORS.light_red }}
									>
										{errors.newPassword.message}
									</span>
								)}
							</div>

							{/* Confirm Password */}
							<div className='flex flex-col space-y-2'>
								<label
									className='text-sm sm:text-base md:text-lg'
									style={{ ...FONTS.heading_04 }}
								>
									Confirm Password
								</label>
								<div className='relative'>
									<input
										style={{ ...FONTS.heading_06 }}
										type={showConfirmPassword ? 'text' : 'password'}
										{...register('confirmPassword', {
											required: 'Enter Same as New Password',
										})}
										className='w-full mb-3 mt-2 rounded-md px-4 py-2 text-sm sm:text-base lg:text-lg shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none'
									/>
									<span
										className='absolute top-5.5 right-3 text-gray-500 cursor-pointer'
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? (
											<EyeSlashIcon className='w-5 h-5 text-[#716F6F]' />
										) : (
											<EyeIcon className='w-5 h-5 text-[#716F6F]' />
										)}
									</span>
								</div>
								{errors.confirmPassword && (
									<span
										className='text-xs sm:text-sm md:text-base'
										style={{ ...FONTS.para_03, color: COLORS.light_red }}
									>
										{errors.confirmPassword.message}
									</span>
								)}
							</div>

							{/* Submit Button */}
							<button
								type='submit'
								disabled={isLoading}
								className={`w-full my-6 mt-8 bg-gradient-to-r from-[#7B00FF] to-[#B200FF] py-2 rounded-md flex justify-center items-center gap-2 transition text-sm sm:text-base lg:text-lg ${
									isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
								}`}
								style={{ ...FONTS.heading_04, color: COLORS.white }}
							>
								{isLoading && (
									<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
								)}
								{isLoading ? 'Submitting...' : 'Submit'}
							</button>

							<div
								className='flex items-center gap-2 justify-center cursor-pointer'
								onClick={() => navigate('/login')}
							>
								<IoMdArrowRoundBack color={COLORS.blue_02} />
								<p
									className='text-xs sm:text-sm md:text-base'
									style={{ ...FONTS.heading_06, color: COLORS.blue_02 }}
								>
									Back to Login
								</p>
							</div>
						</form>
					</div>
				</Card>
			</div>

			{/* Gradient Section (Desktop only) */}
			{isDesktop && (
				<div className='w-1/2 h-full'>
					<Card
						className='bg-gradient-to-l from-[#B200FF] to-[#7B00FF] w-full h-full rounded-md flex items-center justify-center cursor-pointer'
						style={{
							boxShadow: `
                rgba(255, 255, 255, 0.7) -4px -4px 4px,
                rgba(189, 194, 199, 0.75) 5px 5px 4px
              `,
						}}
					>
						<img src={sideImg} className='w-full h-full object-contain' />
					</Card>
				</div>
			)}
		</div>
	);
};

export default ChangePasswordPage;
