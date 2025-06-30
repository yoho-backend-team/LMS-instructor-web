import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import htmlLogo from '../../assets/courses icons/htmlimg.png';
import classIcon from '../../assets/courses icons/demo human.png';
import CourseButton from './button';
import threebox from '../../assets/courses icons/threebox.svg';
import timer from '../../assets/courses icons/timer.svg';
import { useNavigate } from 'react-router-dom';
import navigationicon from '../../assets/courses icons/navigation arrow.svg';

const CourseList: React.FC = () => {
  
    const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
              <Button
                onClick={() => navigate(-1)}
                className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
              >
                <img src={navigationicon} />
              </Button>
              <h1 className="text-black text-2xl font-semibold">Course Lists</h1>
            </div>

      <div className="flex justify-center mb-8">
        <CourseButton activeTabs="about" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#ebeff3] rounded-2xl p-6 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
          <h2 className="text-gray-700 font-semibold text-lg mb-4">Course Details</h2>

          <div className="flex items-start gap-4">
            <div className="w-50 h-50 rounded-lg bg-[#EBEFF3] flex items-center justify-center shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
              <img src={classIcon} alt="Course Icon" className="w-35 h-35 object-contain" />
            </div>

            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold text-gray-800">MERN STACK</h3>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? 'bg-[#7b00ff]' : 'bg-gray-300'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span
                    className={`${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>

              <p className="text-sm text-gray-600 mb-1">Rajalakshmi Institute</p>

              <div className="flex items-center gap-1 mb-2">
                {'★★★★☆'.split('').map((star, idx) => (
                  <span key={idx} className={`text-sm ${star === '☆' ? 'text-gray-300' : 'text-yellow-500'}`}>{star}</span>
                ))}
                <span className="text-sm text-gray-600 ml-1">4.5</span>
              </div>

              <p className="text-sm text-gray-600 leading-tight mb-4">
                A MERN Stack Developer is responsible for front-end and back-end development, database
                management, integration and deployment, bug fixing, and working with cross-functional teams.
              </p>

          
              <div className="flex items-center gap-10 flex-wrap mt-8">
                <div className="flex items-start gap-2">
                  <Button className="bg-[#ebeff3] hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                    <img src={threebox} alt="Modules" className="h-5 w-5" />
                  </Button>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs text-gray-500">Duration</span>
                    <span className="text-sm text-gray-700 font-medium">30 Days Months</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Button className="bg-[#ebeff3] hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                    <img src={timer} alt="Status" className="h-5 w-5" />
                  </Button>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs text-gray-500">Status</span>
                    <span className="text-sm text-gray-700 font-medium">72%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

   
        <div className="bg-[#ebeff3] rounded-2xl p-6 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-gray-700 font-semibold text-lg">Course Chapters / Topics</h2>
            <span className="text-sm text-gray-400">1 Chapters</span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-md font-semibold text-gray-700">HTML History</h3>
                <img src={htmlLogo} alt="HTML Logo" className="w-40 h-40 object-contain rounded-md" />
                <p className="text-sm text-gray-600">Brief History About HTML</p>
              </div>

              <div className="flex flex-col items-end">
                <Button className="bg-[#ebeff3] text-black hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-sm">
                  <span className="text-xl font-bold text-black">12</span>
                  <span className="text-sm text-gray-600">/146 classes</span>
                </Button>
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <span className="text-xs text-black font-medium">Enrolled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
