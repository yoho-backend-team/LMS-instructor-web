import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourse } from '@/features/Course/reducers/selector';
import { FONTS } from '@/constants/uiConstants';
import type { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { getInstructorcourse } from '@/features/Course/reducers/thunks';

const MainCourse = () => {
	const navigate = useNavigate();
	const coursedata = useSelector(selectCourse);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(getInstructorcourse());
			} catch (error: any) {
				console.log('Course fetch error:', error.message);
			}
		};
		fetchData();
	}, [dispatch]);

	return (
		<div className='px-4 py-6'>
			<h1 className='text-black text-2xl font-semibold mb-6'>Courses</h1>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto'>
				{coursedata?.length !== 0 ? (
					coursedata?.map((course: any, index: any) => (
						<div key={index}>
							<CourseCard
								title={course?.course_name}
								description={course?.description}
								image={course?.image}
								modules={course?.coursemodules.length}
								duration={course?.duration}
								onClick={() => navigate('/about/mernstack')}
							/>
						</div>
					))
				) : (
					<div className='min-h-[280px] flex items-center justify-center'>
						<p style={{ ...FONTS.heading_03 }}>No courses available</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MainCourse;
