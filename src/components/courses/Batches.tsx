import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import navigationicon from '../../assets/courses icons/navigation arrow.svg';
import { COLORS, FONTS } from '@/constants/uiConstants';
import CourseButton from './button';
import {
	selectBatches,
	selectCourse,
} from '@/features/Course/reducers/selector';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import {
	getBatchesData,
	getInstructorcourse,
} from '@/features/Course/reducers/thunks';
import dayjs from 'dayjs';
import Course_Track from './Course_Track';

const Batches = () => {
  const navigate = useNavigate();
  const SelectBatches = useSelector(selectBatches);
  const coursedata = useSelector(selectCourse);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const { course } = useParams();

  const fetchData = async () => {
    try {
      await dispatch(getInstructorcourse());
    } catch (error: any) {
      console.log('Course fetch error:', error.message);
    }
  };

  const fetchCourseData = async () => {
    try {
      const params = { uuid: coursedata[0]?.uuid };
      await dispatch(getBatchesData(params));
    } catch (error) {
      console.error('batch fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (coursedata?.length) {
      fetchCourseData();
    }
  }, [coursedata]);

  const handleModule = (batchId: string) => {
    setSelectedBatch(batchId);
    navigate('/course/course-track');
  };

  return (
    <div className="w-full mx-auto p-4">
      {/* Back & Title */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate('/courses')}
          className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} />
        </Button>
        <h1 style={{ ...FONTS.heading_02 }}>Batches</h1>
      </div>

      <CourseButton activeTabs="batches" />

      <Card className="overflow-hidden bg-[#EBEFF3] rounded-xl shadow-inner">
        <div className="flex flex-col">
          {/* Table Header */}
          <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-4 mx-4 rounded-md sticky top-0 z-10 mb-4">
            <div className="grid grid-cols-5 gap-4 text-center !text-white">
              <div style={{ ...FONTS.heading_02, color: COLORS.black }}>Batches</div>
              <div style={{ ...FONTS.heading_02, color: COLORS.black }}>Total Students</div>
              <div style={{ ...FONTS.heading_02, color: COLORS.black }}>Total Classes</div>
              <div style={{ ...FONTS.heading_02, color: COLORS.black }}>Start Date</div>
              <div style={{ ...FONTS.heading_02, color: COLORS.black }}>End Date</div>
            </div>
          </Card>

          {/* Table Data */}
          <div className="overflow-y-auto mx-4">
            {SelectBatches?.length ? (
              SelectBatches.map((item: any, index: any) => (
                <Card
                  key={index}
                  onClick={() => handleModule(item?._id)}
                  className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-md rounded-lg"
                >
                  <div className="grid grid-cols-5 gap-4 text-center items-center">
                    <div style={{ ...FONTS.para_01 }}>{item?.batch_name}</div>
                    <div style={{ ...FONTS.para_01 }}>{item?.student?.length}</div>
                    <div style={{ ...FONTS.para_01 }}>{item?.classes?.length}</div>
                    <div style={{ ...FONTS.para_01 }}>{dayjs(item?.start_date).format('DD-MMM-YYYY')}</div>
                    <div style={{ ...FONTS.para_01 }}>{dayjs(item?.end_date).format('DD-MMM-YYYY')}</div>
                  </div>

                  {/* Show Course_Track only for selected batch */}
                  {selectedBatch === item?._id && (
                    <Course_Track batch_id={item?._id} course={course} />
                  )}
                </Card>
              ))
            ) : (
              <div className="flex justify-center mt-3">
                <p style={{ ...FONTS.heading_06 }}>No batches available</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Batches