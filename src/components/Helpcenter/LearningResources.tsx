import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import type { LearningResourcesProps } from './types.ts';

const LearningResources: React.FC<LearningResourcesProps> = ({
	onBack,
	data,
}) => {
	const sectionRef = useRef<HTMLDivElement | null>(null);

	function extractYouTubeId(url: string) {
		const regExp =
			/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^?&]+)/;
		const match = url.match(regExp);
		return match?.[1] || '';
	}

	useEffect(() => {
		if (sectionRef.current) {
			sectionRef.current.scrollIntoView({
				behavior: 'auto',
				block: 'center',
			});
		}
	}, []);

	console.log(data, 'dataaa');

	return (
		<div className='min-h-screen py-4 sm:py-8'>
			<div className='px-4 sm:px-6 max-w-7xl mx-auto'>
				{/* Header Card */}
				<div
					ref={sectionRef}
					className='relative bg-[#ebeff3] p-4 sm:p-6 rounded-lg mb-4 sm:mb-6'
					style={{
						boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
					}}
				>
					<div className='flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6'>
						<div
							className='cursor-pointer p-2 rounded-md flex-shrink-0'
							onClick={onBack}
							style={{
								boxShadow: `
                  rgba(255, 255, 255, 0.7) 5px 5px 4px, 
                  rgba(189, 194, 199, 0.75) 2px 2px 3px inset
                `,
							}}
						>
							<ArrowLeft
								className='w-4 h-4 sm:w-5 sm:h-5'
								style={{ color: COLORS.text_desc }}
							/>
						</div>
						<h1
							className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl'
							style={{
								...FONTS.heading_01,
								color: COLORS.text_title,
							}}
						>
							{data?.title}
						</h1>
					</div>

					{/* Grid Layout for Description + Video */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'>
						{/* Description */}
						<div
							className='bg-[#ebeff3] p-4 sm:p-6 rounded-lg'
							style={{
								boxShadow: `
                  rgba(255, 255, 255, 0.7) -4px -4px 4px, 
                  rgba(189, 194, 199, 0.75) 5px 5px 4px
                `,
							}}
						>
							<p
								className='leading-relaxed text-sm sm:text-base'
								style={{
									...FONTS.heading_02,
									color: COLORS.text_desc,
								}}
							>
								{data?.description}
							</p>
						</div>

						{/* Video Section */}
						<div
							className='relative bg-[#ebeff3] p-4 sm:p-6 rounded-lg'
							style={{
								boxShadow: `
                  rgba(255, 255, 255, 0.7) -4px -4px 4px, 
                  rgba(189, 194, 199, 0.75) 5px 5px 4px
                `,
							}}
						>
							<div
								className='relative rounded-lg overflow-hidden aspect-video w-full'
								style={{
									boxShadow: `
                    rgba(255, 255, 255, 0.7) -4px -4px 4px, 
                    rgba(189, 194, 199, 0.75) 5px 5px 4px
                  `,
								}}
							>
								{data?.video?.includes('youtube') ||
								data?.video?.includes('youtu.be') ? (
									<iframe
										width='100%'
										height='100%'
										src={`https://www.youtube.com/embed/${extractYouTubeId(
											data.video
										)}`}
										title='Educational Video'
										frameBorder='0'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
										className='w-full h-full'
									/>
								) : (
									<video
										src={data?.video}
										title='Educational Video'
										className='w-full h-full object-cover'
										controls
										preload='metadata'
									/>
								)}

								{/* Play Button Overlay */}
								<div className='absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-200'>
									<div
										className='rounded-full p-3 sm:p-4 bg-[#ebeff3]'
										style={{
											boxShadow: `
                        rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                        rgba(189, 194, 199, 0.75) 2px 2px 3px inset
                      `,
										}}
									>
										<Play
											className='w-6 h-6 sm:w-8 sm:h-8 ml-1'
											style={{ color: COLORS.light_blue }}
											fill={COLORS.light_blue}
										/>
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

export default LearningResources;
