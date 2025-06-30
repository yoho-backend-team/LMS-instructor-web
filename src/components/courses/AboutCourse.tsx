import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import humanimg from '../../assets/courses icons/demo human.png';
// import CourseCard from './CourseCard';
// import navigationicon from "../../assets/courses icons/navigation arrow.svg"
import CourseNotes from '../../components/courses/coursenotes'
const courseData = {
  mernstack: {
    title: "MERN STACK",
    description: "A MERN Stack Developer is responsible for front-end and back-end development...",
    modules: "1 Modules",
    duration: "30 Hours",
  },
  python: {
    title: "PYTHON",
    description: "A Python Developer builds scalable backend applications...",
    modules: "2 Modules",
    duration: "45 Hours",
  },
};

const AboutCourse: React.FC = () => {
  const { course } = useParams<{ course: string }>();
  const navigate = useNavigate();
  const selected = courseData[course?.toLowerCase() as keyof typeof courseData];

  if (!selected) {
    return <div className="p-6 text-red-500 font-semibold">Course not found.</div>;
  }

  return (
    // <div className="px-4 py-6 bg-[#F5F7FA] min-h-screen">
    //   <div className="flex items-center gap-3 mb-6">

    //     <Button
    //       onClick={() => navigate(-1)}
    //       className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
    //     >
    //       <img src={navigationicon} />
    //     </Button>
    //     <h1 className="text-black text-2xl font-semibold">About</h1>
    //   </div>

    //   <div className="flex justify-center gap-4 mb-12">
    //     <Button className="bg-gradient-to-r from-[#7b00ff] to-[#a855f7] text-white px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
    //       About
    //     </Button>
    //     <Button className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">Class Notes & Materials</Button>
    //     <Button className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">Task & Projects</Button>
    //     <Button className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#444] px-6 py-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">Course Track</Button>
    //   </div>

    //   {/* Content */}
    //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto items-start">
    //     <CourseCard
    //       title={selected.title}
    //       description={selected.description}
    //       image={humanimg}
    //       modules={selected.modules}
    //       duration={selected.duration}
    //     />

    //     <div className="bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg w-full">
    //       <div className="space-y-6">
    //         <div>
    //           <h3 className="text-[#222] font-semibold mb-2">Course Name</h3>
    //           <Button className="w-full bg-[#EBEFF3] hover:bg-[#EBEFF3] text-left justify-start text-gray-700 py-3 px-4 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
    //             Successfully run the mobile app on Android
    //           </Button>
    //         </div>
    //         <div>
    //           <h3 className="text-[#222] font-semibold mb-2">Course Durations</h3>
    //           <Button className="w-full bg-[#EBEFF3] hover:bg-[#EBEFF3] text-left justify-start text-gray-700 py-3 px-4 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
    //             Feedback
    //           </Button>
    //         </div>
    //         <div>
    //           <h3 className="text-[#222] font-semibold mb-2">Total Hours</h3>
    //           <Button className="w-full bg-[#EBEFF3] hover:bg-[#EBEFF3] text-left justify-start text-gray-700 py-3 px-4 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] truncate">
    //             filename-example.pdf <span className="text-[#7b00ff] underline">View</span>
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
<>
<CourseNotes/>
</>

  );
};

export default AboutCourse;
