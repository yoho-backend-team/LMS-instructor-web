import  { useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import navigationicon from '../../assets/courses icons/navigation arrow.svg';
import { COLORS, FONTS } from '@/constants/uiConstants';
import CourseButton from './button';
import { selectBatches } from '@/features/Course/reducers/selector';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { getBatchesData } from '@/features/Course/reducers/thunks';

const Batches = () => {
  const navigate = useNavigate();
  const SelectBatches = useSelector(selectBatches)
  const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const params = {
					instituteid: "6794385f-ed41-4baf-acca-3e6befed824b",
					branchid: "b555338b-ab0b-43a1-be1f-f9b24872ff82",
					courseid: 'a20c9768-f1af-4c64-b525-910bef9879c5',
				};
				await dispatch(getBatchesData(params));
			} catch (error) {
				console.error('batch fetch error:', error);
			}
		};

		fetchData();
	}, [dispatch]);

    const formattedDate = (date:any)=> {
    const newDate = new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return newDate
  }

  console.log(SelectBatches, 'course selector data')


  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} />
        </Button>
        <h1 style={{...FONTS.heading_02}}>Batches</h1>
      </div>

      <CourseButton activeTabs="batches" />

      {/* <div className="flex gap-4 mb-4 ml-2">
        {SelectBatches?.map((tab:any, index:any) => (
          <Button
            key={index}
            onClick={() => setActiveTab(tab?.batch_name)}
            className={`px-4 py-2  rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-sm font-semibold ${activeTab === tab
              ? 'bg-purple-700 text-white btnhovershadow hover:!text-white btnfocusshadow'
              : 'bg-[#ebeff3] text-gray-700 btnhovershadow hover:!text-white'
              }`}
          >
            {tab?.batch_name}
          </Button>
        ))}
      </div> */}


      <Card className="overflow-hidden bg-[#EBEFF3] rounded-xl shadow-inner">
        <div className="flex flex-col">
          <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-4 mx-4 rounded-md sticky top-0 z-10 mb-4">
            <div className="grid grid-cols-5 gap-4  text-center !text-white">
               <div style={{ ...FONTS.heading_02,color:COLORS.white }}>Batches</div>
              <div style={{ ...FONTS.heading_02 ,color:COLORS.white}}>Total Students</div>
              <div style={{ ...FONTS.heading_02 ,color:COLORS.white}}>Total Classes</div>
              <div style={{ ...FONTS.heading_02 ,color:COLORS.white}}>Start Date</div>
               <div style={{ ...FONTS.heading_02,color:COLORS.white }}>End Date</div>
              
            </div>
          </Card>


          <div className="min-h-[400px] overflow-y-auto mx-4">
            {SelectBatches?.map((item:any, index:any) => (
              <Card
                key={index}
                className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-md rounded-lg"
              >
                <div className="grid grid-cols-5 gap-4 text-center items-center">
                   <div style={{ ...FONTS.para_01 }}>{item?.batch_name}</div>
                  <div style={{ ...FONTS.para_01 }}>{item?.student?.length}</div>
                  <div style={{ ...FONTS.para_01 }}>{item?.classes?.length}</div>
                  <div style={{ ...FONTS.para_01 }}>{formattedDate(item?.start_date)}</div>
                   <div style={{ ...FONTS.para_01 }}>{formattedDate(item?.end_date)}</div>
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
