import React, { useEffect}from 'react';
import MainCourse from '@/components/courses/MainCourse';
import { useDispatch } from 'react-redux';
import Loader from '@/components/Loader/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useLoader } from '@/context/LoadingContext/Loader';

const Courses: React.FC = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const dispatch = useDispatch<any>();
		const { showLoader, hideLoader, IsLoading } = useLoader();

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
	
	return (
		<div>
			{IsLoading && (
					<div className='w-full h-[100vh] absolute z-10 bg-transparent backdrop-blur-sm'>
						<Loader />
					</div>
				)}
			<MainCourse />
		</div>
	);
};

export default Courses;
