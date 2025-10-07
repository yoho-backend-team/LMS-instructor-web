import React from 'react';
import { Button } from '@/components/ui/button';
import threebox from '../../assets/courses icons/threebox.svg';
import timer from '../../assets/courses icons/timer.svg';
import { GetImageUrl } from '@/utils/helper';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  modules: string;
  duration: string;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  modules,
  duration,
  onClick,
  
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer grid grid-cols-1 md:grid-cols-2 bg-[#EBEFF3] text-[#444447] 
        shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] 
        p-3 rounded-lg h-[250px]  max-h-[250px]"
    >
      
      <div className="flex justify-center items-center mb-4 md:mb-0">
        <div className="bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-2 rounded-md w-full">
          <img
            src={GetImageUrl(image) ?? undefined}
            alt="Course Icon"
            className="w-full h-[120px] object-cover rounded"
          />
        </div>
      </div>

      <div className="flex flex-col ml-4 justify-between overflow-hidden">
        <div>
          <h1 className="text-lg font-bold truncate">{title}</h1>

         
          <p className="mt-2 text-sm line-clamp-7">{description}</p>
        </div>

        <div className="flex items-center gap-6 mt-4 flex-wrap">
         
          <div className="flex items-center gap-2">
            <Button className="bg-[#ebeff3] hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
              <img src={threebox} alt="Modules" className="h-5 w-5" />
            </Button>
            <span className="text-sm truncate max-w-[80px]">
              {modules} {Number(modules) === 1 ? 'module' : 'modules'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button className="bg-[#ebeff3] hover:bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
              <img src={timer} alt="Duration" className="h-5 w-5" />
            </Button>
            <span className="text-sm truncate max-w-[80px]">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
