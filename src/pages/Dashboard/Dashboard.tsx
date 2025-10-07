/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
// import style from './style.module.css'
import InstituteDetails from "@/components/dashboard/InstituteDetails";
import ProfileCard from "@/components/dashboard/ProfileCard";
import CourseProgress from "@/components/dashboard/CourseProgress";
import Attendance from "@/components/dashboard/Attendance";
import Payment from "@/components/dashboard/Payment";
import Updates from "@/components/dashboard/Updates";
import { FONTS } from "@/constants/uiConstants";
import { TabViewResponsive } from "@/hooks/TabViewResponce/TabViewResponsive";
import { useDispatch, useSelector } from "react-redux";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";
import { useLoader } from "@/context/LoadingContext/Loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { RootState } from "@/store/store";

const Dashboard: React.FC = () => {
  const { TabView } = TabViewResponsive();
  const dispatch = useDispatch<any>();
  const dashboard: any = useSelector(
    (state: RootState) => state.dashboard.data
  );
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

  return (
    <>
      <div
        className="flex flex-col h-full w-full p-5 gap-5 overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {TabView ? (
          <div className="flex flex-col gap-5">
            <ProfileCard />
            <div className="flex flex-row gap-5">
              <InstituteDetails />
              <CourseProgress />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-8 gap-5 justify-between">
            <div className="col-span-2 col-start-1">
              <InstituteDetails />
            </div>
            <div className="col-span-4">
              <ProfileCard />
            </div>
            <div className="col-span-2">
              <CourseProgress />
            </div>
          </div>
        )}

        {TabView ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5">
              <Attendance />
              <Payment />
            </div>
            <Updates />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {/* <div>
							<Payment />
						</div>
						<div>
							<Assesments />
						</div> */}
          </div>
        )}

        {!TabView && (
          <div className="grid grid-cols-3 gap-5">
            <div>
              <Attendance />
              <div className="mt-5">
                <Payment />
              </div>
            </div>
            <div className="col-span-2">
              <Updates />
            </div>
          </div>
        )}

       <div className="flex flex-wrap justify-between gap-6 md:gap-4 lg:gap-6">
  {/* Total Course Handling */}
  <Card className="bg-[#ebeff3] rounded-2xl w-full sm:w-[48%] md:w-[30%] lg:w-[19%] flex justify-center shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
    <Button
      className="bg-[#ebeff3] w-[90%] h-14 my-2 mx-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
      style={FONTS.heading_06}
      variant="outline"
    >
      Total Course Handling: {dashboard?.courses?.length}
    </Button>
  </Card>

  {/* Batch Holding */}
  <Card className="bg-[#ebeff3] rounded-2xl w-full sm:w-[48%] md:w-[30%] lg:w-[19%] flex justify-center shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
    <Button
      className="bg-[#ebeff3] w-[90%] h-14 my-2 mx-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
      style={FONTS.heading_06}
      variant="outline"
    >
      Batch's Holding: {dashboard?.batches?.length}
    </Button>
  </Card>

  {/* Branch */}
  <Card className="bg-[#ebeff3] rounded-2xl w-full sm:w-[48%] md:w-[30%] lg:w-[19%] flex justify-center shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
    <Button
      className="bg-[#ebeff3] w-[90%] h-14 mx-3 my-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
      style={FONTS.heading_06}
      variant="outline"
    >
      Branch: {dashboard?.branch?.branch_identity}
    </Button>
  </Card>

  {/* Institute */}
  <Card className="bg-[#ebeff3] rounded-2xl w-full sm:w-[100%] md:w-[64%] lg:w-[25%] flex justify-center shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
    <Button
      className="bg-[#ebeff3] w-[90%] h-14 mx-3 my-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
      style={FONTS.heading_06}
      variant="outline"
    >
      Institute: {dashboard?.institute?.institute_name}
    </Button>
  </Card>
</div>

      </div>
    </>
  );
};

export default Dashboard;
