
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import humanimg from '../../assets/courses icons/demo human.png';


const MainCourse = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6">
      <h1 className="text-black text-2xl font-semibold mb-6">Courses</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto">
        <CourseCard
          title="MERN STACK"
          description="The MERN stack is a popular JavaScript-based framework used for building full-stack web applications."
          image={humanimg}
          modules="1 Module"
          duration="30 Days"
          onClick={() => navigate("/about/mernstack")}
        />

        <CourseCard
          title="PYTHON"
          description="The Python helps you develope backend apps  efficiently."
          image={humanimg}
          modules="2 Modules"
          duration="45 Days"
          onClick={() => navigate("/about/python")}
        />
      </div>
      
    </div>
  );
};

export default MainCourse;
