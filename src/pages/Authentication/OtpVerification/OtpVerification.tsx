import { Card } from '@/components/ui/card';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Logo from '../../../assets/icons/navbar/icons8-ionic-50.png';
import { authOtpVerification } from '@/features/Authentication/services';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext/AuthContext';

const OtpVerification = () => {
	const navigate = useNavigate();
	const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
	const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
	const [showError, setShowError] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);
	const location = useLocation();
	const { data, email } = location?.state;
	const { login } = useAuth();

	const handleOtpChange = (index: number, value: string) => {
		setShowError(false);
		if (!/^\d?$/.test(value)) return;
		const updated = [...otpDigits];
		updated[index] = value;
		setOtpDigits(updated);
		if (value && index < 5) {
			otpRefs.current[index + 1]?.focus();
		}
	};

	const handleOtpKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace') {
			e.preventDefault();
			const updated = [...otpDigits];
			if (otpDigits[index]) {
				updated[index] = '';
			} else if (index > 0) {
				updated[index - 1] = '';
				otpRefs.current[index - 1]?.focus();
			}
			setOtpDigits(updated);
		}
	};

	const handleOtpVerify = async () => {
		const enteredOtp = otpDigits.join('');
		if (!enteredOtp.length) {
			setShowError(true);
			return;
		}
		setIsVerifying(true);
		try {
			const params_data = {
				email,
				token: data?.token,
				otp: enteredOtp,
			};
			const response = await authOtpVerification(params_data);
			if (response) {
				if (data?.step === 'otp') {
					login(response?.data);
					toast.success('Login successfully');
					navigate('/');
				} else {
					navigate('/change-password', {
						state: {
							email,
						},
					});
					toast.success('OTP verified successfully!');
				}
			} else {
				toast.error('Invalid OTP, please enter valid OTP.');
			}
		} catch (error) {
			toast.error('Something went wrong, please try again.');
		} finally {
			setIsVerifying(false);
		}
	};

	return (
		<div className='flex bg-[#ebeff3] w-full h-[100vh] p-4 gap-4'>
			<div className='w-1/2 h-full'>
				<Card
					className='bg-[#ebeff3] w-full h-full px-4 rounded-md flex justify-center cursor-pointer'
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
						<p
							className='text-center my-3 mb-5'
							style={{ ...FONTS.heading_02 }}
						>
							OTP Verifications
						</p>
						<p style={{ ...FONTS.heading_06 }}>
							Enter the 6 digit OTP Sent to your Mobile Number
						</p>
						<div className='mt-2'>
							<p style={{ ...FONTS.heading_06, color: COLORS.light_red }}>
								OTP: {data?.otp}
							</p>
						</div>
						<div className='flex gap-3 justify-center my-3'>
							{otpDigits.map((digit, idx) => (
								<input
									key={idx}
									type='tel'
									style={{ ...FONTS.heading_02 }}
									maxLength={1}
									value={digit}
									onChange={(e) => handleOtpChange(idx, e.target.value)}
									onKeyDown={(e) => handleOtpKeyDown(e, idx)}
									ref={(el) => {
										if (el) otpRefs.current[idx] = el;
									}}
									className='w-16 h-16 text-center rounded-md px-4 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none'
								/>
							))}
						</div>

						{showError && (
							<p
								style={{ ...FONTS.para_03, color: COLORS.light_red }}
								className='my-3'
							>
								Please enter your otp
							</p>
						)}

						{/* Submit */}
						<button
									type="submit"
									onClick={handleOtpVerify}
									disabled={isVerifying}
									className={`w-full my-6 mt-8 py-2 rounded-md flex justify-center items-center gap-2 transition
										bg-gradient-to-r from-[#7B00FF] to-[#B200FF]
										${isVerifying ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
									style={{ ...FONTS.heading_04, color: COLORS.white }}
								>
									{isVerifying && (
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									)}
									{isVerifying ? 'Verifying...' : 'Verify'}
								</button>


						<div className='flex justify-center'>
							<p
								style={{ ...FONTS.heading_06, color: COLORS.blue_02 }}
								className='hover:underline'
							>
								Resend OTP
							</p>
						</div>
					</div>
				</Card>
			</div>
			<div className='w-1/2 h-full'>
				<Card
					className='bg-gradient-to-l from-[#B200FF] to-[#7B00FF] w-full h-full rounded-md flex items-center justify-center cursor-pointer'
					style={{
						boxShadow: `
				  rgba(255, 255, 255, 0.7) -4px -4px 4px,
				  rgba(189, 194, 199, 0.75) 5px 5px 4px
					`,
					}}
				></Card>
			</div>
		</div>
	);
};

export default OtpVerification;
