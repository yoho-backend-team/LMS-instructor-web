/* eslint-disable @typescript-eslint/no-explicit-any */
import Gridprofile from '@/components/dashboard/ui/GridProgress';
import React from 'react';
import { FONTS } from '@/constants/uiConstants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GetImageUrl } from '@/utils/helper';

const ProfileCard: React.FC = () => {
  const ClassesData: any = useSelector(
    (state: any) => state.dashboard.data.classes
  );
  const StudentData: any = useSelector(
    (state: any) => state.dashboard.data.user
  );
  const navigate = useNavigate();

  const data = [
    {
      title: 'Total Classes',
      icon: 'totalclass',
      total: ClassesData?.[0]?.total,
    },
    {
      title: 'Completed',
      icon: 'completed',
      total:
        ClassesData?.[0]?.offline_class?.completed +
          ClassesData?.[0]?.online_class?.completed || 0,
    },
    {
      title: 'Pending',
      icon: 'pending',
      total:
        ClassesData?.[0]?.offline_class?.pending +
          ClassesData?.[0]?.online_class?.pending || 0,
    },
    {
      title: 'Live Class',
      icon: 'liveclass',
      total: ClassesData?.[0]?.offline_class?.total,
    },
    {
      title: 'Online Class',
      icon: 'onlineclass',
      total: ClassesData?.[0]?.online_class?.total,
    },
    {
      title: 'Offline Class',
      icon: 'offlineclass',
      total: ClassesData?.[0]?.offline_class?.total,
    },
  ];

  return (
    <div className='flex flex-col w-full h-auto lg:h-[365px] gap-4 p-4 lg:p-5 divshadow shadow-xl rounded-[16px]'>
      <h2 style={{ ...FONTS.heading_02 }} className='text-lg lg:text-xl'>
        Classes
      </h2>
      
      {/* Profile Info Section */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div className='flex flex-row gap-3 lg:gap-4 items-start'>
          <img
            src={GetImageUrl(StudentData?.image) ?? StudentData?.image}
            alt={StudentData?.fullName}
            title={StudentData?.fullName}
            className='rounded-xl w-12 h-12 lg:w-[62px] lg:h-[53px] object-cover flex-shrink-0'
          />
          <div className='flex flex-col min-w-0 flex-1'>
            <h3
              style={{
                fontFamily: FONTS.heading_03.fontFamily,
                fontSize: 'clamp(14px, 4vw, 18px)',
                fontWeight: FONTS.heading_03.fontWeight,
              }}
              className='text-transparent bg-clip-text bg-gradient-to-r from-[#7B00FF] to-[#B200FF] break-words'
            >
              {StudentData?.full_name}
            </h3>
            <p 
              style={{ ...FONTS.para_01 }} 
              className='text-xs lg:text-sm text-gray-600'
            >
              Trainer ID: {StudentData?.id}
            </p>
          </div>
        </div>
        
        <button
          type='button'
          onClick={() => navigate('/profile')}
          style={{
            fontFamily: FONTS.heading_06.fontFamily,
            fontWeight: FONTS.heading_06.fontWeight,
          }}
          className='w-full sm:w-auto px-4 py-3 lg:py-3 lg:w-[104px] h-10 lg:h-[48px] rounded-xl btnshadow cursor-pointer text-[#716F6F] text-sm hover:text-white btnhovershadow transition-all duration-200'
        >
          View Profile
        </button>
      </div>

      {/* Grid Section */}
      <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mt-2'>
        {data?.map((item, index) => {
          return (
            <div 
              key={index} 
              className='w-full h-20 lg:h-24 rounded-xl divshadow transition-transform duration-200 hover:scale-[1.02]'
            >
              <Gridprofile
                title={item.title}
                value={item.total}
                icon={item.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileCard;