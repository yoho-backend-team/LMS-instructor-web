import React, { useEffect, useState, useRef } from 'react';
import { Download, QrCode } from 'lucide-react';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useDispatch } from 'react-redux';
// import { selectProfile } from '@/features/Profile/reducers/selectors';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import { getStaffIdCard } from '@/features/Profile/services';
import { GetImageUrl, GetLocalStorage } from '@/utils/helper';

interface IDCardData {
	staffName: string;
	staffId: string;
	email: string;
	address: string;
	validFrom: string;
	validUntil: string;
	institution: string;
	profileImage: string;
	contact?: string;
	emergencyContact?: string;
}

interface IDCardProps {
	data?: IDCardData;
}

const IDCard: React.FC<IDCardProps> = ({ data }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [profileImgBase64, setProfileImgBase64] = useState<string | null>(null);
	const frontRef = useRef<HTMLDivElement>(null);
	const backRef = useRef<HTMLDivElement>(null);
	const [idCard, setIdCard] = useState<any>('');

	const dispatch = useDispatch<any>();
	// const profileDetails = useSelector(selectProfile);
	const userId: any = GetLocalStorage('instructorDetails');

	useEffect(() => {
		dispatch(getStudentProfileThunk());
		(async () => {
			const response = await getStaffIdCard(userId?._id);
			setIdCard(response?.data[0]);
		})();
	}, [dispatch]);

	const idCardData: IDCardData = data || {
		staffName: idCard?.name || '',
		staffId: idCard?.id || '-',
		email: idCard?.email,
		address: idCard?.address?.state,
		validFrom: idCard?.contact,
		validUntil: '2024-12-31',
		institution: 'Classie',
		profileImage: idCard?.image,
		contact: idCard?.contact,
		emergencyContact: idCard?.contact,
	};

	// Convert remote image to Base64
	useEffect(() => {
		const fetchImageAsBase64 = async (url: string) => {
			try {
				const response = await fetch(url, { mode: 'cors' });
				if (!response.ok) throw new Error('Failed to fetch image');
				const blob = await response.blob();
				return await new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result as string);
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				});
			} catch (err) {
				console.error('Failed to fetch image for Base64:', err);
				return null;
			}
		};

		if (idCardData.profileImage) {
			fetchImageAsBase64(idCardData.profileImage).then((base64) => {
				if (base64) setProfileImgBase64(base64);
			});
		}
	}, [idCardData.profileImage]);

	const createCombinedImage = async (
		frontDataUrl: string,
		backDataUrl: string
	): Promise<string> => {
		return new Promise((resolve, reject) => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (!ctx) {
				reject(new Error('Could not get canvas context'));
				return;
			}

			const frontImg = new Image();
			const backImg = new Image();

			frontImg.onload = () => {
				backImg.onload = () => {
					// Set canvas dimensions: width same as card, height = 2 * card height + gap
					const gap = 20; // Gap between front and back
					canvas.width = frontImg.width;
					canvas.height = frontImg.height + backImg.height + gap;

					// Fill with white background
					ctx.fillStyle = '#ffffff';
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					// Draw front image at top
					ctx.drawImage(frontImg, 0, 0);

					// Draw back image below front with gap
					ctx.drawImage(backImg, 0, frontImg.height + gap);

					resolve(canvas.toDataURL('image/png'));
				};

				backImg.onerror = () => reject(new Error('Failed to load back image'));
				backImg.src = backDataUrl;
			};

			frontImg.onerror = () => reject(new Error('Failed to load front image'));
			frontImg.src = frontDataUrl;
		});
	};

	const createBackSideForDownload = () => {
		// Create a completely fresh back side without any 3D transform context
		const backContainer = document.createElement('div');
		backContainer.style.width = '320px';
		backContainer.style.height = '500px';
		backContainer.style.borderRadius = '16px';
		backContainer.style.overflow = 'hidden';
		backContainer.style.background = `linear-gradient(135deg, ${COLORS.purple_01}, ${COLORS.light_blue})`;
		backContainer.style.color = COLORS.white;
		backContainer.style.fontFamily = FONTS.para_01.fontFamily;
		backContainer.style.position = 'relative';

		// Header
		const header = document.createElement('div');
		header.style.textAlign = 'center';
		header.style.padding = '24px';
		header.style.borderBottom = '1px solid rgba(255,255,255,0.2)';

		const headerTitle = document.createElement('h3');
		headerTitle.textContent = 'QR Code';
		headerTitle.style.fontSize = '18px';
		headerTitle.style.fontWeight = 'bold';
		headerTitle.style.marginBottom = '4px';
		headerTitle.style.fontFamily = FONTS.heading_04.fontFamily;

		const headerSubtitle = document.createElement('p');
		headerSubtitle.textContent = 'Scan for verification';
		headerSubtitle.style.fontSize = '14px';
		headerSubtitle.style.opacity = '0.9';
		headerSubtitle.style.fontFamily = FONTS.para_01.fontFamily;

		header.appendChild(headerTitle);
		header.appendChild(headerSubtitle);
		backContainer.appendChild(header);

		// QR Code Section
		const qrSection = document.createElement('div');
		qrSection.style.flex = '1';
		qrSection.style.display = 'flex';
		qrSection.style.flexDirection = 'column';
		qrSection.style.alignItems = 'center';
		qrSection.style.justifyContent = 'center';
		qrSection.style.padding = '32px';

		const qrContainer = document.createElement('div');
		qrContainer.style.width = '192px';
		qrContainer.style.height = '192px';
		qrContainer.style.backgroundColor = '#ffffff';
		qrContainer.style.borderRadius = '16px';
		qrContainer.style.display = 'flex';
		qrContainer.style.alignItems = 'center';
		qrContainer.style.justifyContent = 'center';
		qrContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

		// Create SVG for QR code (simplified representation)
		const qrSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		qrSvg.setAttribute('width', '128');
		qrSvg.setAttribute('height', '128');
		qrSvg.setAttribute('viewBox', '0 0 24 24');
		qrSvg.style.color = COLORS.text_desc;

		const qrPath = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		qrPath.setAttribute('fill', 'currentColor');
		qrPath.setAttribute(
			'd',
			'M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4z'
		);

		qrSvg.appendChild(qrPath);
		qrContainer.appendChild(qrSvg);
		qrSection.appendChild(qrContainer);

		// Text below QR code
		const textContainer = document.createElement('div');
		textContainer.style.textAlign = 'center';
		textContainer.style.marginTop = '24px';

		const staffIdText = document.createElement('p');
		staffIdText.textContent = `Staff ID: ${idCardData.staffId}`;
		staffIdText.style.fontSize = '14px';
		staffIdText.style.opacity = '0.9';
		staffIdText.style.marginBottom = '8px';
		staffIdText.style.fontFamily = FONTS.para_01.fontFamily;

		const instructionText = document.createElement('p');
		instructionText.textContent = 'Scan this QR code for quick verification';
		instructionText.style.fontSize = '12px';
		instructionText.style.opacity = '0.7';
		instructionText.style.fontFamily = FONTS.para_01.fontFamily;

		textContainer.appendChild(staffIdText);
		textContainer.appendChild(instructionText);
		qrSection.appendChild(textContainer);

		backContainer.appendChild(qrSection);

		// Decorative elements
		const decor1 = document.createElement('div');
		decor1.style.position = 'absolute';
		decor1.style.top = '0';
		decor1.style.left = '0';
		decor1.style.width = '80px';
		decor1.style.height = '80px';
		decor1.style.backgroundColor = 'rgba(255,255,255,0.1)';
		decor1.style.borderRadius = '50%';
		decor1.style.transform = 'translate(-40px, -40px)';
		backContainer.appendChild(decor1);

		const decor2 = document.createElement('div');
		decor2.style.position = 'absolute';
		decor2.style.bottom = '0';
		decor2.style.right = '0';
		decor2.style.width = '64px';
		decor2.style.height = '64px';
		decor2.style.backgroundColor = 'rgba(255,255,255,0.1)';
		decor2.style.borderRadius = '50%';
		decor2.style.transform = 'translate(32px, 32px)';
		backContainer.appendChild(decor2);

		return backContainer;
	};

	const handleDownload = async (
		e: React.MouseEvent,
		side: 'front' | 'back' | 'both'
	) => {
		e.stopPropagation();

		try {
			if (side === 'front' && frontRef.current) {
				// Hide download buttons temporarily
				const downloadButtons = frontRef.current.querySelectorAll(
					'[data-download-button]'
				);
				downloadButtons.forEach((button) => {
					(button as HTMLElement).style.display = 'none';
				});

				const dataUrl = await htmlToImage.toPng(frontRef.current, {
					quality: 1,
					cacheBust: true,
					backgroundColor: '#ffffff',
				});

				// Restore download buttons
				downloadButtons.forEach((button) => {
					(button as HTMLElement).style.display = '';
				});

				saveAs(dataUrl, `${idCardData.staffName || 'IDCard'}_Front.png`);
			} else if (side === 'back' && backRef.current) {
				// Temporarily flip the card to show the back
				const wasFlipped = isFlipped;
				if (!wasFlipped) {
					setIsFlipped(true);
					// Wait for animation to complete
					await new Promise((resolve) => setTimeout(resolve, 750));
				}

				// Hide download button and remove the rotateY transform temporarily
				const downloadButtons = backRef.current.querySelectorAll(
					'[data-download-button]'
				);
				downloadButtons.forEach((button) => {
					(button as HTMLElement).style.display = 'none';
				});

				// Store original transform
				const originalTransform = backRef.current.style.transform;

				// Remove the Y rotation to capture in correct orientation
				backRef.current.style.transform = 'rotateY(0deg)';

				// Wait a moment for transform to apply
				await new Promise((resolve) => setTimeout(resolve, 50));

				// Capture the back side
				const dataUrl = await htmlToImage.toPng(backRef.current, {
					quality: 1,
					cacheBust: true,
					backgroundColor: '#ffffff',
				});

				// Restore original transform and download button
				backRef.current.style.transform = originalTransform;
				downloadButtons.forEach((button) => {
					(button as HTMLElement).style.display = '';
				});

				// Flip back if it wasn't flipped before
				if (!wasFlipped) {
					setIsFlipped(false);
				}

				saveAs(dataUrl, `${idCardData.staffName || 'IDCard'}_Back.png`);
			} else if (side === 'both') {
				if (frontRef.current && backRef.current) {
					// Capture front side
					const frontDownloadButtons = frontRef.current.querySelectorAll(
						'[data-download-button]'
					);
					frontDownloadButtons.forEach((button) => {
						(button as HTMLElement).style.display = 'none';
					});

					const frontDataUrl = await htmlToImage.toPng(frontRef.current, {
						quality: 1,
						cacheBust: true,
						backgroundColor: '#ffffff',
					});

					frontDownloadButtons.forEach((button) => {
						(button as HTMLElement).style.display = '';
					});

					// Flip to back side
					const wasFlipped = isFlipped;
					if (!wasFlipped) {
						setIsFlipped(true);
						await new Promise((resolve) => setTimeout(resolve, 750));
					}

					// Capture back side
					const backDownloadButtons = backRef.current.querySelectorAll(
						'[data-download-button]'
					);
					backDownloadButtons.forEach((button) => {
						(button as HTMLElement).style.display = 'none';
					});

					const originalTransform = backRef.current.style.transform;
					backRef.current.style.transform = 'rotateY(0deg)';
					await new Promise((resolve) => setTimeout(resolve, 50));

					const backDataUrl = await htmlToImage.toPng(backRef.current, {
						quality: 1,
						cacheBust: true,
						backgroundColor: '#ffffff',
					});

					backRef.current.style.transform = originalTransform;
					backDownloadButtons.forEach((button) => {
						(button as HTMLElement).style.display = '';
					});

					// Flip back if needed
					if (!wasFlipped) {
						setIsFlipped(false);
					}

					// Create combined image
					const combinedDataUrl = await createCombinedImage(
						frontDataUrl,
						backDataUrl
					);
					saveAs(
						combinedDataUrl,
						`${idCardData.staffName || 'IDCard'}_Complete.png`
					);
				}
			}
		} catch (err) {
			console.error('Failed to download ID Card:', err);
			alert('Failed to download ID Card. Make sure all images allow CORS.');
		}
	};

	const handleCardClick = () => setIsFlipped(!isFlipped);

	return (
		<div className='w-full'>
			<div
				className='rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex flex-col'
				style={{
					width: '100%',
					marginTop: '1rem',
					height: '75vh',
					fontFamily: FONTS.para_01.fontFamily,
				}}
			>
				{/* Header */}
				<div className='p-4 sm:p-6 border-b border-gray-200 flex-shrink-0'>
					<div className='flex justify-between items-center'>
						<h2
							className='font-bold text-2xl leading-none'
							style={{
								color: COLORS.text_title,
								fontFamily: FONTS.heading_01.fontFamily,
								fontWeight: FONTS.heading_01.fontWeight,
							}}
						>
							Staff ID Card
						</h2>
						{/* Download Both Button */}
						<button
							onClick={(e) => handleDownload(e, 'both')}
							className='cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(123,0,255,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-sm flex items-center gap-2'
							style={{
								backgroundColor: COLORS.light_blue,
								color: COLORS.white,
								fontFamily: FONTS.para_01.fontFamily,
							}}
						>
							<Download className='w-4 h-4' />
							Download Both Sides
						</button>
					</div>
				</div>

				<div className='p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-hide'>
					{/* ID Card Preview */}
					<div className='mb-8 flex justify-center'>
						<div
							className='relative w-full max-w-80 h-[500px]'
							style={{ perspective: '1000px' }}
						>
							<div
								className='relative w-full h-full transition-transform duration-700 cursor-pointer'
								onClick={handleCardClick}
								style={{
									transformStyle: 'preserve-3d',
									transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
								}}
							>
								{/* Card Front */}
								<div
									ref={frontRef}
									className='absolute inset-0 w-full h-full rounded-2xl overflow-hidden'
									style={{ backfaceVisibility: 'hidden' }}
								>
									<div className='h-full relative'>
										{/* Top Half */}
										<div
											className='h-1/2 p-6 relative flex flex-col'
											style={{
												background: `linear-gradient(135deg, ${COLORS.light_blue}, ${COLORS.purple_01})`,
												color: COLORS.white,
											}}
										>
											<div className='text-center mb-4'>
												<h3
													className='text-lg font-bold mb-1'
													style={{ fontFamily: FONTS.heading_04.fontFamily }}
												>
													{idCardData.institution}
												</h3>
												<p
													className='text-sm opacity-90'
													style={{ fontFamily: FONTS.para_01.fontFamily }}
												>
													STAFF ID CARD
												</p>
												<div className='w-16 h-0.5 bg-white/50 mx-auto mt-2'></div>
											</div>

											{/* Profile Image */}
											<div className='flex justify-center mb-4'>
												<div className='w-20 h-20 rounded-full border-4 border-white/30 overflow-hidden bg-white/10'>
													{profileImgBase64 ? (
														<img
															src={GetImageUrl(idCardData.profileImage)}
															alt={idCardData.staffName}
															className='w-full h-full object-cover'
														/>
													) : (
														<div className='w-full h-full bg-gray-200 animate-pulse' />
													)}
												</div>
											</div>

											{/* Staff Info */}
											<div className='text-center'>
												<h4
													className='text-lg font-bold mb-1'
													style={{ fontFamily: FONTS.heading_04.fontFamily }}
												>
													{idCardData.staffName}
												</h4>
												<p
													className='text-sm opacity-90'
													style={{ fontFamily: FONTS.para_01.fontFamily }}
												>
													{idCardData.email}
												</p>
											</div>

											{/* Decorative elements */}
											<div className='absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8'></div>
											<div className='absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full translate-y-6 -translate-x-6'></div>
										</div>

										{/* Bottom Half */}
										<div
											className='h-1/2 p-6 bg-white relative flex flex-col'
											style={{ color: COLORS.text_desc }}
										>
											<div
												className='space-y-2 text-sm flex-1'
												style={{ fontFamily: FONTS.para_01.fontFamily }}
											>
												<div className='flex justify-between'>
													<span className='opacity-70'>Staff ID:</span>
													<span className='font-semibold'>
														{idCardData.staffId}
													</span>
												</div>
												<div className='flex justify-between'>
													<span className='opacity-70'>Address:</span>
													<span className='font-semibold'>
														{idCardData.address}
													</span>
												</div>
												<div className='flex justify-between'>
													<span className='opacity-70'>Contact:</span>
													<span className='font-semibold'>
														{idCardData.contact || 'N/A'}
													</span>
												</div>
											</div>

											{/* Bottom Section */}
											<div className='flex items-end justify-between mt-4'>
												{/* Download Front Button */}
												<button
													data-download-button
													onClick={(e) => handleDownload(e, 'front')}
													className='w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200 shadow-md'
													style={{ backgroundColor: COLORS.bg_Colour }}
													title='Download Front Side'
												>
													<Download
														className='w-5 h-5'
														style={{ color: COLORS.light_blue }}
													/>
												</button>
											</div>

											<div
												className='absolute top-2 right-2 text-xs opacity-50'
												style={{ fontFamily: FONTS.para_01.fontFamily }}
											>
												Click to flip
											</div>
										</div>
									</div>
								</div>

								{/* Card Back */}
								<div
									ref={backRef}
									className='absolute inset-0 w-full h-full rounded-2xl overflow-hidden'
									style={{
										backfaceVisibility: 'hidden',
										transform: 'rotateY(180deg)',
									}}
								>
									<div
										className='h-full relative'
										style={{
											background: `linear-gradient(135deg, ${COLORS.purple_01}, ${COLORS.light_blue})`,
											color: COLORS.white,
										}}
									>
										{/* Header */}
										<div className='text-center p-6 border-b border-white/20'>
											<h3
												className='text-lg font-bold mb-1'
												style={{ fontFamily: FONTS.heading_04.fontFamily }}
											>
												QR Code
											</h3>
											<p
												className='text-sm opacity-90'
												style={{ fontFamily: FONTS.para_01.fontFamily }}
											>
												Scan for verification
											</p>
										</div>

										{/* QR Code Section */}
										<div className='flex-1 flex flex-col items-center justify-center p-8'>
											<div className='w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
												<QrCode
													className='w-32 h-32'
													style={{ color: COLORS.text_desc }}
												/>
											</div>

											<div className='text-center'>
												<p
													className='text-sm opacity-90 mb-2'
													style={{ fontFamily: FONTS.para_01.fontFamily }}
												>
													Staff ID: {idCardData.staffId}
												</p>
												<p
													className='text-xs opacity-70'
													style={{ fontFamily: FONTS.para_01.fontFamily }}
												>
													Scan this QR code for quick verification
												</p>
											</div>
										</div>

										{/* Bottom Section */}
										<div className='absolute bottom-4 left-4'>
											{/* Download Back Button */}
											<button
												data-download-button
												onClick={(e) => handleDownload(e, 'back')}
												className='w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200 shadow-md'
												style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
												title='Download Back Side'
											>
												<Download
													className='w-5 h-5'
													style={{ color: COLORS.white }}
												/>
											</button>
										</div>

										{/* Decorative elements */}
										<div className='absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 -translate-x-10'></div>
										<div className='absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 translate-x-8'></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Remaining details sections remain unchanged (ID Card Details, Card Status, Digital Features) */}
					<div className='mb-8'>
						<h3
							className='font-bold mb-6 text-xl leading-none'
							style={{
								color: COLORS.text_title,
								fontFamily: FONTS.heading_02.fontFamily,
								fontWeight: FONTS.heading_02.fontWeight,
							}}
						>
							ID Card Details
						</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6'>
							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Staff Name
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.staffName}
								</div>
							</div>

							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Staff ID
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.staffId}
								</div>
							</div>

							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Course
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.address}
								</div>
							</div>

							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Address
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.address}
								</div>
							</div>

							<div className='md:col-span-2'>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Institution
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.institution}
								</div>
							</div>

							<div className='md:col-span-2'>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Emergency Contact
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.emergencyContact}
								</div>
							</div>
						</div>
					</div>

					{/* Card Status */}
					<div className='mb-6'>
						<h3
							className='font-bold mb-4 text-xl leading-none'
							style={{
								color: COLORS.text_title,
								fontFamily: FONTS.heading_02.fontFamily,
								fontWeight: FONTS.heading_02.fontWeight,
							}}
						>
							Card Status
						</h3>
						<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
							<div className='flex items-center gap-3'>
								<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
									<svg
										className='w-5 h-5 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
								</div>
								<div>
									<p
										className='font-semibold text-green-800'
										style={{ fontFamily: FONTS.heading_06.fontFamily }}
									>
										Active ID Card
									</p>
									<p
										className='text-sm text-green-600'
										style={{ fontFamily: FONTS.para_01.fontFamily }}
									>
										Your staff ID card is active and valid.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Digital Features */}
					<div className='mb-6'>
						<h3
							className='font-bold mb-4 text-xl leading-none'
							style={{
								color: COLORS.text_title,
								fontFamily: FONTS.heading_02.fontFamily,
								fontWeight: FONTS.heading_02.fontWeight,
							}}
						>
							Digital Features
						</h3>
						<div className='grid grid-cols-1 gap-4'>
							<div
								className='rounded-lg p-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
								style={{ backgroundColor: COLORS.bg_Colour }}
							>
								<div className='flex items-center gap-3'>
									<QrCode
										className='w-8 h-8'
										style={{ color: COLORS.light_blue }}
									/>
									<div>
										<p
											className='font-semibold'
											style={{
												color: COLORS.text_title,
												fontFamily: FONTS.heading_06.fontFamily,
											}}
										>
											QR Code Access
										</p>
										<p
											className='text-sm'
											style={{
												color: COLORS.text_desc,
												fontFamily: FONTS.para_01.fontFamily,
											}}
										>
											Quick verification and access
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IDCard;
