
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import { useSelector } from 'react-redux';
import { selectCourse } from '@/features/Course/reducers/selector';


const MainCourse = () => {
  const navigate = useNavigate();
  const coursedata = useSelector(selectCourse);

  return (
    <div className="px-4 py-6">
      <h1 className="text-black text-2xl font-semibold mb-6">Courses</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto">
        {coursedata?.length !== 0 && coursedata?.map((course:any,index:any) => (
          <div key={index}>
            <CourseCard
              title={course?.course_name}
              description={course?.description}
              image={course?.image}
              modules={course?.coursemodules.length}
              duration={course?.duration}
              onClick={() => navigate("/about/mernstack", {
                state: {
                  data: course
                }
              })}
            />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MainCourse;
