import { Button } from '@/components/ui/button';
import CourseButton from './button';
import threebox from '../../assets/courses icons/threebox.svg';
import timer from '../../assets/courses icons/timer.svg';
import { useNavigate } from 'react-router-dom';
import navigationicon from '../../assets/courses icons/navigation arrow.svg';
import { FONTS } from '@/constants/uiConstants';
import { GetImageUrl } from '@/utils/helper';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { getInstructorcourseData } from '@/features/Course/reducers/thunks';
import { selectCoursedata } from '@/features/Course/reducers/selector';

const CourseList: React.FC = () => {
	const navigate = useNavigate();
	const courseSelectData = useSelector(selectCoursedata);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				await dispatch(getInstructorcourseData());
			} catch (error) {
				console.error('Course fetch error:', error);
			}
		};
		fetchCourseData();
	}, [dispatch]);

	const rating = Math.round(courseSelectData?.rating || 0);

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
				<CourseButton activeTabs='about' />
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div className='bg-[#ebeff3] rounded-2xl p-6 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]'>
					<h2 className=' mb-4' style={{ ...FONTS.heading_02 }}>
						Course Details
					</h2>

					<div className='flex items-start gap-4'>
						<div className='w-50 h-50 rounded-lg bg-[#EBEFF3] flex items-center justify-center shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]'>
							<img
								src={GetImageUrl(courseSelectData?.image) ?? undefined}
								alt='Course Icon'
								className='w-35 h-35 object-contain'
							/>
						</div>

						<div className='flex-1 w-full'>
							<div className='flex justify-between items-center mb-1'>
								<h3 style={{ ...FONTS.heading_02 }}>
									{courseSelectData?.course_name}
								</h3>
							</div>

							<p className=' mb-1' style={{ ...FONTS.heading_06 }}>
								Rajalakshmi Institute
							</p>

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

							<p className=' mb-4' style={{ ...FONTS.para_03 }}>
								{courseSelectData?.description}
							</p>

							<div className='flex items-center gap-10 flex-wrap mt-8'>
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

								<div className='flex items-start gap-2'>
									<Button className='bg-[#ebeff3] hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'>
										<img src={timer} alt='Status' className='h-5 w-5' />
									</Button>
									<div className='flex flex-col leading-tight'>
										<span style={{ ...FONTS.heading_05 }} className='mb-1'>
											Status
										</span>
										<span style={{ ...FONTS.para_02 }}>72%</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='bg-[#ebeff3] rounded-2xl p-6 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]'>
					<div className='flex justify-between items-start mb-4'>
						<h2 style={{ ...FONTS.heading_02 }}>Course Chapters / Topics</h2>
						<span style={{ ...FONTS.para_02 }}>
							{courseSelectData?.coursemodules?.length}{' '}
							{courseSelectData?.coursemodules?.length == 1
								? 'Chapter'
								: 'Chapters'}
						</span>
					</div>

					<div className='flex flex-col gap-6'>
						{courseSelectData?.coursemodules?.map(
							(chapter: any, index: any) => (
								<div key={index} className='flex justify-between items-start'>
									<div className='space-y-2'>
										<h3 style={{ ...FONTS.heading_02 }}>{chapter?.title}</h3>
										<video
											src={chapter?.video}
											className='w-full h-40 object-contain rounded-md'
											controls
											preload='metadata'
										/>

										<p style={{ ...FONTS.para_03 }}>{chapter?.description}</p>
									</div>

									<div className='flex flex-col items-end'>
										<Button className='bg-[#ebeff3] text-black hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-sm'>
											<span style={{ ...FONTS.heading_07 }}>
												{' '}
												Class Id : {chapter?.id}
											</span>
										</Button>
									</div>
								</div>
							)
						)}
					</div>

					<div className='flex justify-end mt-4'>
						<span style={{ ...FONTS.para_02 }}>Enrolled</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseList;
