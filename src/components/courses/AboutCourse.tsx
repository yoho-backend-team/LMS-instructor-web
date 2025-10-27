import { Button } from '@/components/ui/button';
import CourseButton from './button';
import threebox from '../../assets/courses icons/threebox.svg';
import timer from '../../assets/courses icons/timer.svg';
import { useNavigate, useParams } from 'react-router-dom';
import navigationicon from '../../assets/courses icons/navigation arrow.svg';
import { FONTS } from '@/constants/uiConstants';
import { GetImageUrl } from '@/utils/helper';
import { Star, Play } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { getInstructorcourseData } from '@/features/Course/reducers/thunks';
import { selectCoursedata } from '@/features/Course/reducers/selector';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';

// Video Player Component
interface VideoPlayerProps {
	videoUrl: string;
	title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handlePlay = () => {
		setIsLoading(true);
		setIsPlaying(true);
	};

	const handleIframeLoad = () => {
		setIsLoading(false);
	};

	// Check if the video URL is from YouTube or Vimeo
	const isExternalVideo = (url: string) => {
		return (
			url.includes('youtube.com') ||
			url.includes('youtu.be') ||
			url.includes('vimeo.com') ||
			url.includes('dailymotion.com')
		);
	};

	const getYouTubeEmbedUrl = (url: string) => {
		if (url.includes('youtube.com/watch?v=')) {
			const videoId = url.split('v=')[1]?.split('&')[0];
			return `https://www.youtube.com/embed/${videoId}`;
		} else if (url.includes('youtu.be/')) {
			const videoId = url.split('youtu.be/')[1]?.split('?')[0];
			return `https://www.youtube.com/embed/${videoId}`;
		}
		return url;
	};

	const getVimeoEmbedUrl = (url: string) => {
		if (url.includes('vimeo.com/')) {
			const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
			return `https://player.vimeo.com/video/${videoId}`;
		}
		return url;
	};

	const getEmbedUrl = (url: string) => {
		if (url.includes('youtube.com') || url.includes('youtu.be')) {
			return getYouTubeEmbedUrl(url);
		} else if (url.includes('vimeo.com')) {
			return getVimeoEmbedUrl(url);
		}
		return url;
	};

	if (!videoUrl) {
		return (
			<div className='w-full h-40 bg-gray-200 rounded-md flex items-center justify-center'>
				<span className='text-gray-500'>No video available</span>
			</div>
		);
	}

	if (!isPlaying) {
		return (
			<div className='relative w-full h-40 bg-gray-200 rounded-md cursor-pointer group overflow-hidden'>
				<div
					className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-20'
					onClick={handlePlay}
				>
					<div className='bg-white bg-opacity-90 rounded-full p-4 transform transition-transform duration-300 group-hover:scale-110'>
						<Play className='w-8 h-8 text-gray-700 fill-current' />
					</div>
				</div>
				<div className='absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded'>
					Click to play
				</div>
			</div>
		);
	}

	if (isExternalVideo(videoUrl)) {
		const embedUrl = getEmbedUrl(videoUrl);

		return (
			<div className='w-full h-40 rounded-md overflow-hidden'>
				{isLoading && (
					<div className='w-full h-40 bg-gray-200 flex items-center justify-center'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
					</div>
				)}
				<iframe
					src={embedUrl}
					title={title}
					className='w-full h-40'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					onLoad={handleIframeLoad}
				/>
			</div>
		);
	}

	// For direct video files
	return (
		<div className='w-full h-40 rounded-md overflow-hidden'>
			<video
				src={videoUrl}
				className='w-full h-40 object-contain bg-black'
				controls
				autoPlay
				onLoadStart={() => setIsLoading(true)}
				onCanPlay={() => setIsLoading(false)}
				onError={() => setIsLoading(false)}
			>
				Your browser does not support the video tag.
			</video>
			{isLoading && (
				<div className='absolute inset-0 bg-gray-200 flex items-center justify-center'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
				</div>
			)}
		</div>
	);
};

const CourseList: React.FC = () => {
	const navigate = useNavigate();
	const { course } = useParams();
	const courseSelectData = useSelector(selectCoursedata);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				await dispatch(getInstructorcourseData(course ?? ''));
			} catch (error) {
				console.error('Course fetch error:', error);
			}
		};
		fetchCourseData();
	}, [course, dispatch]);

	const { showLoader, hideLoader } = useLoader();

	useEffect(() => {
		(async () => {
			try {
				showLoader();
				const timeoutId = setTimeout(() => {
					hideLoader();
				}, 8000);
				const response = await dispatch(getDashBoardReports());
				if (response) {
					clearTimeout(timeoutId);
				}
			} finally {
				hideLoader();
			}
		})();
	}, [dispatch, hideLoader, showLoader]);

	const rating = Math.round(courseSelectData?.rating || 0);
	console.log('Courese Select Data:', courseSelectData);

	return (
		<div className='p-8'>
			<div className='flex items-center gap-3 mb-6'>
				<Button
					onClick={() => navigate('/courses')}
					className='bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
				>
					<img src={navigationicon} />
				</Button>
				<h1 className='' style={{ ...FONTS.heading_02 }}>
					Course Lists
				</h1>
			</div>

			<div className='flex justify-center mb-8'>
				<CourseButton activeTabs='about' courseId={courseSelectData?._id} />
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Course Details - Fixed responsive height */}
				<div
					className='bg-[#ebeff3] rounded-2xl p-6 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex flex-col'
					style={{
						height: 'clamp(500px, 70vh, 800px)',
						minHeight: '500px',
						maxHeight: '800px',
					}}
				>
					<h2 className='mb-4' style={{ ...FONTS.heading_02 }}>
						Course Details
					</h2>

					<div className='flex flex-col flex-1'>
						<div className='flex items-start gap-4 mb-4'>
							<div className='w-50 h-50 rounded-lg bg-[#EBEFF3] flex items-center justify-center shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex-shrink-0'>
								<img
									src={GetImageUrl(courseSelectData?.image) ?? undefined}
									alt='Course Icon'
									className='w-40 h-40 object-contain'
								/>
							</div>

							<div className='flex-1 min-w-0'>
								<div className='flex justify-between items-center mb-1'>
									<h3 style={{ ...FONTS.heading_02 }} className='truncate'>
										{courseSelectData?.course_name}
									</h3>
								</div>

								<div className='flex items-center gap-1 mb-2'>
									{[...Array(5)].map((_, idx) => (
										<span key={idx}>
											{idx < rating ? (
												<Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
											) : (
												<Star className='w-4 h-4 text-gray-300' />
											)}
										</span>
									))}
									<span className='text-sm text-gray-600 ml-1'>
										{courseSelectData?.rating}
									</span>
								</div>

								<p className='mb-4 line-clamp-5' style={{ ...FONTS.para_03 }}>
									{courseSelectData?.description}
								</p>
							</div>
						</div>

						<div className='flex items-center gap-10 flex-wrap mt-auto pt-4'>
							<div className='flex items-start gap-2'>
								<Button className='bg-[#ebeff3] hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'>
									<img src={timer} alt='Status' className='h-5 w-5' />
								</Button>
								<div className='flex flex-col leading-tight'>
									<span style={{ ...FONTS.heading_05 }} className='mb-1'>
										Modules
									</span>
									<span style={{ ...FONTS.para_02 }}>
										{courseSelectData?.coursemodules?.length}
									</span>
								</div>
							</div>

							<div className='flex items-start gap-2'>
								<Button className='bg-[#ebeff3] hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'>
									<img src={threebox} alt='Modules' className='h-5 w-5' />
								</Button>
								<div className='flex flex-col leading-tight'>
									<span style={{ ...FONTS.heading_05 }} className='mb-1'>
										Duration
									</span>
									<span style={{ ...FONTS.para_02 }}>
										{courseSelectData?.duration}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Course Chapters - Fixed responsive height with scroll */}
				<div
					className='bg-[#ebeff3] rounded-2xl p-6 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex flex-col'
					style={{
						height: 'clamp(500px, 70vh, 800px)',
						minHeight: '500px',
						maxHeight: '800px',
					}}
				>
					<div className='flex justify-between items-start mb-4 flex-shrink-0'>
						<h2 style={{ ...FONTS.heading_02 }}>Course Chapters / Topics</h2>
						<span style={{ ...FONTS.para_02 }}>
							{courseSelectData?.coursemodules?.length}{' '}
							{courseSelectData?.coursemodules?.length === 1
								? 'Chapter'
								: 'Chapters'}
						</span>
					</div>

					{/* Scrollable chapters container */}
					<div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pr-2'>
						<div className='flex flex-col gap-6'>
							{courseSelectData?.coursemodules?.map(
								(chapter: any, index: any) => (
									<div
										key={index}
										className='flex justify-between items-start gap-4 pb-6 border-b border-gray-300 last:border-b-0 last:pb-0'
									>
										<div className='space-y-2 flex-1 min-w-0'>
											<h3 style={{ ...FONTS.heading_02 }} className='truncate'>
												{chapter?.title}
											</h3>

											{/* Video Player */}
											<VideoPlayer
												videoUrl={chapter?.video}
												title={chapter?.title}
											/>

											<p style={{ ...FONTS.para_03 }} className='line-clamp-2'>
												{chapter?.description}
											</p>
										</div>

										<div className='flex flex-col items-end flex-shrink-0'>
											<Button className='bg-[#ebeff3] text-black hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-sm whitespace-nowrap'>
												<span style={{ ...FONTS.heading_07 }}>
													Class Id : {chapter?.id}
												</span>
											</Button>
										</div>
									</div>
								)
							)}
						</div>
					</div>

					<div className='flex justify-end mt-4 pt-4 border-t border-gray-300 flex-shrink-0'>
						<span style={{ ...FONTS.para_02 }}>Enrolled</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseList;
