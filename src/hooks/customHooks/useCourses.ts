import { selectDashBoard } from '@/features/Dashboard/reducers/selectors';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCourses = () => {
    const dispatch = useDispatch<any>()
    const func = async ()=>{
       await dispatch(getDashBoardReports())
    }
    useEffect(() => {
        func()
  }, [dispatch]);
  const courseDetails = useSelector(selectDashBoard)
  return courseDetails.courses;
};

// How to use...

// const coursesDetails =   useCourses();
// 	console.log(coursesDetails,"Courses")