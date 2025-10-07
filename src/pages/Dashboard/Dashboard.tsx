/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
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
        className="flex flex-col h-full w-full p-4 md:p-5 lg:p-6 xl:p-8 gap-4 md:gap-5 lg:gap-6 xl:gap-8 overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Top Section - Profile and Details */}
        {TabView ? (
          // Mobile Layout
          <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6">
            <ProfileCard />
            <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6">
              <InstituteDetails />
              <CourseProgress />
            </div>
          </div>
        ) : (
          // Desktop Layout - Optimized for 1024px
          <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            {/* Institute Details - Left Column */}
            <div className="md:col-span-3 lg:col-span-3 xl:col-span-2">
              <InstituteDetails />
            </div>
            
            {/* Profile Card - Center Column */}
            <div className="md:col-span-6 lg:col-span-6 xl:col-span-7">
              <ProfileCard />
            </div>
            
            {/* Course Progress - Right Column */}
            <div className="md:col-span-3 lg:col-span-3 xl:col-span-3">
              <CourseProgress />
            </div>
          </div>
        )}

        {/* Middle Section - Split Layout for 1024px */}
        {TabView ? (
          // Mobile Layout
          <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6">
            <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6">
              <Attendance />
              <Payment />
            </div>
            <Updates />
          </div>
        ) : (
          // Desktop Layout - Split for 1024px
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            {/* Left Split - Attendance & Payment */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-8 h-full">
                {/* Attendance - Top Left */}
                <div className="lg:col-span-2">
                  <Attendance />
                </div>
                {/* Payment - Bottom Left */}
                <div className="lg:col-span-2">
                  <Payment />
                </div>
              </div>
            </div>
            
            {/* Right Split - Updates/Tickets */}
            <div className="lg:col-span-7 xl:col-span-8">
              <Updates />
            </div>
          </div>
        )}

        {/* Stats Cards Section - Optimized for 1024px */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6 xl:gap-8">
          {/* Total Course Handling */}
          <Card className="bg-[#ebeff3] rounded-2xl w-full shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
            <Button
              className="bg-[#ebeff3] w-full h-14 md:h-16 lg:h-18 xl:h-20 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:bg-[#e0e5e9]"
              style={FONTS.heading_06}
              variant="outline"
            >
              <span className="text-xs md:text-sm lg:text-base xl:text-lg whitespace-normal text-center px-2">
                Total Course: {dashboard?.courses?.length || 0}
              </span>
            </Button>
          </Card>

          {/* Batch Holding */}
          <Card className="bg-[#ebeff3] rounded-2xl w-full shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
            <Button
              className="bg-[#ebeff3] w-full h-14 md:h-16 lg:h-18 xl:h-20 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:bg-[#e0e5e9]"
              style={FONTS.heading_06}
              variant="outline"
            >
              <span className="text-xs md:text-sm lg:text-base xl:text-lg whitespace-normal text-center px-2">
                Batch's Holding: {dashboard?.batches?.length || 0}
              </span>
            </Button>
          </Card>

          {/* Branch */}
          <Card className="bg-[#ebeff3] rounded-2xl w-full shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
            <Button
              className="bg-[#ebeff3] w-full h-14 md:h-16 lg:h-18 xl:h-20 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:bg-[#e0e5e9]"
              style={FONTS.heading_06}
              variant="outline"
            >
              <span className="text-xs md:text-sm lg:text-base xl:text-lg whitespace-normal text-center px-2">
                Branch: {dashboard?.branch?.branch_identity || 'N/A'}
              </span>
            </Button>
          </Card>

          {/* Institute - Span 2 columns on larger screens */}
          <Card className="bg-[#ebeff3] rounded-2xl w-full sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
            <Button
              className="bg-[#ebeff3] w-full h-14 md:h-16 lg:h-18 xl:h-20 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:bg-[#e0e5e9]"
              style={FONTS.heading_06}
              variant="outline"
            >
              <span className="text-xs md:text-sm lg:text-base xl:text-lg whitespace-normal text-center px-2">
                Institute: {dashboard?.institute?.institute_name || 'N/A'}
              </span>
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;