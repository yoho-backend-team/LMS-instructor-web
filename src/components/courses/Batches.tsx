import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import navigationicon from '../../assets/courses icons/navigation arrow.svg';
import { FONTS } from '@/constants/uiConstants';
import CourseButton from './button';

const Batches = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Batch 1');

  const batch1 = [
    { name: 'Raji Sukla', course: 'Lorem ipsum', timeperiod: '26.08.2025' },
    { name: 'Thamo', course: 'Lorem ipsum', timeperiod: '12-06-2025' },
    { name: 'Dhinesh', course: 'Lorem ipsum', timeperiod: '21-09-2025' },
    { name: 'M S Dhoni', course: 'Lorem ipsum', timeperiod: '21-09-2025' },
  ];

  const batch2 = [
    { name: 'Anjali', course: 'React JS', timeperiod: '15.07.2025' },
    { name: 'Ravi Kumar', course: 'Node.js', timeperiod: '20-07-2025' },
    { name: 'Sowmya', course: 'MongoDB', timeperiod: '30-08-2025' },
    { name: 'Surya', course: 'Express.js', timeperiod: '02-09-2025' },
  ];

  const selectedBatch = activeTab === 'Batch 1' ? batch1 : batch2;

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} />
        </Button>
        <h1 className="text-black text-2xl font-semibold">Batches</h1>
      </div>

      <CourseButton activeTabs="batches" />

      <div className="flex gap-4 mb-4 ml-2">
        {['Batch 1', 'Batch 2'].map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2  rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-sm font-semibold ${
              activeTab === tab
                ? 'bg-purple-700 text-white'
                : 'bg-[#ebeff3] text-gray-700'
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

    
      <Card className="overflow-hidden bg-[#EBEFF3] rounded-xl shadow-inner">
        <div className="flex flex-col">
          <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-4 mx-4 rounded-md sticky top-0 z-10 mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div style={{ ...FONTS.heading_02 }}>Name</div>
              <div style={{ ...FONTS.heading_02 }}>Course Name</div>
              <div style={{ ...FONTS.heading_02 }}>Time Period</div>
            </div>
          </Card>

        
          <div className="min-h-[400px] overflow-y-auto mx-4">
            {selectedBatch.map((item, index) => (
              <Card
                key={index}
                className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-md rounded-lg"
              >
                <div className="grid grid-cols-3 gap-4 text-center items-center">
                  <div style={{ ...FONTS.para_01 }}>{item.name}</div>
                  <div style={{ ...FONTS.para_01 }}>{item.course}</div>
                  <div style={{ ...FONTS.para_01 }}>{item.timeperiod}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Batches;
