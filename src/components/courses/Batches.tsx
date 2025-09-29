import { useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import navigationicon from "../../assets/courses icons/navigation arrow.svg";
import { COLORS, FONTS } from "@/constants/uiConstants";
import CourseButton from "./button";
import {
  selectBatches,
  selectCourse,
} from "@/features/Course/reducers/selector";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store/store";
import {
  getBatchesData,
  getInstructorcourse,
} from "@/features/Course/reducers/thunks";
import { useLoader } from "@/context/LoadingContext/Loader";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";

const Batches = () => {
  const navigate = useNavigate();
  const SelectBatches = useSelector(selectBatches);
  const coursedata = useSelector(selectCourse);
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    try {
      await dispatch(getInstructorcourse());
    } catch (error: any) {
      console.log("Course fetch error:", error.message);
    }
  };

  const fetchCourseData = async () => {
    try {
      const params = {
        uuid: coursedata[0]?.uuid,
      };
      await dispatch(getBatchesData(params));
    } catch (error) {
      console.error("batch fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      fetchCourseData();
    }, 8000);
  }, [dispatch]);
const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    (async () => {
      try {
        showLoader();
        const timeoutId = setTimeout(() => {
          hideLoader();
        }, 8000);
        const response = await dispatch(getDashBoardReports());
        if (response) {
          clearTimeout(timeoutId);
        }
      } finally {
        hideLoader();
      }
    })();
  }, [dispatch, hideLoader, showLoader]);
  const formattedDate = (date: any) => {
    const newDate = new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    return newDate;
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate("/courses")}
          className="bg-[#EBEFF3] text-[#333] cursor-pointer hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} />
        </Button>
        <h1 style={{ ...FONTS.heading_02 }}>Batches</h1>
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
              <div style={{ ...FONTS.heading_02, color: COLORS.white }}>
                Batches
              </div>
              <div style={{ ...FONTS.heading_02, color: COLORS.white }}>
                Total Students
              </div>
              <div style={{ ...FONTS.heading_02, color: COLORS.white }}>
                Total Classes
              </div>
              <div style={{ ...FONTS.heading_02, color: COLORS.white }}>
                Start Date
              </div>
              <div style={{ ...FONTS.heading_02, color: COLORS.white }}>
                End Date
              </div>
            </div>
          </Card>

          <div className="overflow-y-auto mx-4">
            {SelectBatches?.length ? (
              SelectBatches?.map((item: any, index: any) => (
                <Card
                  onClick={() => navigate(`/course-track/${item?.uuid}`)}
                  key={index}
                  className="bg-[#ebeff3] cursor-pointer shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-md rounded-lg"
                >
                  <div className="grid grid-cols-5 gap-4 text-center items-center">
                    <div style={{ ...FONTS.para_01 }}>{item?.batch_name}</div>
                    <div style={{ ...FONTS.para_01 }}>
                      {item?.student?.length}
                    </div>
                    <div style={{ ...FONTS.para_01 }}>
                      {item?.classes?.length}
                    </div>
                    <div style={{ ...FONTS.para_01 }}>
                      {formattedDate(item?.start_date)}
                    </div>
                    <div style={{ ...FONTS.para_01 }}>
                      {formattedDate(item?.end_date)}
                    </div>
                  </div>
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

export default Batches;
