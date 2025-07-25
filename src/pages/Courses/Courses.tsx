import MainCourse from '@/components/courses/MainCourse';
import { getInstructorcourse } from '@/features/Course/reducers/thunks';
import type { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Courses = () => {


const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const params = {
					instituteid: "6794385f-ed41-4baf-acca-3e6befed824b",
					branchid: "6555338b-ab0b-43a1-be1f-f9b24872ff82",
					// courseId: '67a0bd83a0af9570a36c499d',
				};
				await dispatch(getInstructorcourse(params));
			} catch (error) {
				console.error('Course fetch error:', error);
			}
		};

		fetchData();
	}, [dispatch]);


	return (


		
		<div>
			<MainCourse />
		</div>

	)

};

export default Courses;
