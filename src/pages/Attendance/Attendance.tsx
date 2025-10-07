import { COLORS, FONTS } from "@/constants/uiConstants";
// import { Card, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import filter from "../../assets/icons/common/Mask group.png";
import { startOfMonth, setMonth, setYear } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";
import { selectDashBoard } from "@/features/Dashboard/reducers/selectors";
import {
  selectAttendanceDaily,
} from "@/features/attentance/reduces/selectors";
import type { AppDispatch } from "@/store/store";
import {
  getInstructorAttendance,
  getAttendanceDailyThunk,
} from "@/features/attentance/reduces/thunks";
// import Attendence_1 from "../../assets/attendence/attengraph1.png"
// import Attendence_2 from "../../assets/attendence/attengraph2.png"
// import Attendence_3 from "../../assets/attendence/attengraph3.png"
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
import { useNavigate } from "react-router-dom";
import { useLoader } from "@/context/LoadingContext/Loader";
import AttendanceCardGraph from "@/components/dashboard/AttendanceCardGraph";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[selectedDate.getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    selectedDate.getFullYear()
  );
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const dashData = useSelector(selectDashBoard);
  const dailydata = useSelector(selectAttendanceDaily);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      selectedDate?.toISOString().split("T")[0] ==
      new Date().toISOString().split("T")[0]
    ) {
      dispatch(
        getAttendanceDailyThunk({
          date: selectedDate?.toISOString().split("T")[0],
        })
      );
    } else {
      const nextDay = new Date(selectedDate).setDate(
        selectedDate.getDate() + 1
      );
      dispatch(
        getAttendanceDailyThunk({
          date: new Date(nextDay).toISOString().split("T")[0],
        })
      );
    }
  }, [dispatch, selectedDate]);


  const handleMonthChange = (newMonth: (typeof months)[number]) => {
    const monthIndex = months.indexOf(newMonth);
    const updatedDate = startOfMonth(setMonth(selectedDate, monthIndex));
    setSelectedMonth(newMonth);
    setSelectedDate(updatedDate);
  };

  const handleYearChange = (newYear: string) => {
    const numericYear = parseInt(newYear, 10);
    const updatedDate = startOfMonth(setYear(selectedDate, numericYear));
    setSelectedYear(numericYear);
    setSelectedDate(updatedDate);
  };

  const handleCalendarMonthChange = (newMonth: Date) => {
    setSelectedDate(newMonth);
    setSelectedMonth(months[newMonth.getMonth()]);
    setSelectedYear(newMonth.getFullYear());
  };

  const handleNavigate = () => {
    console.log(" clickde nav");
    navigate("/classes");
  };

  function formatISOTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 2 + i
  );

  // Helper function to get status for selected date
  // const getSelectedDateStatus = () => {
  // 	if (!attendancedata?.data?.workingDays) return null;

  // 	const selectedDateStr = selectedDate.toISOString().split('T')[0];
  // 	return attendancedata.data.workingDays.find((day: any) =>
  // 		day.date === selectedDateStr
  // 	);
  // };

  // Calculate classes for selected date (simplified calculation)
  // const getSelectedDateStats = () => {
  // 	const dateStatus = getSelectedDateStatus();
  // 	const totalClasses = attendancedata?.data?.total_class || 1; // Default to 1 if 0

  // 	return {
  // 		scheduled: totalClasses,
  // 		attended: dateStatus?.status === 'present' ? 1 : 0,
  // 		absent: dateStatus?.status === 'absent' ? 1 : 0,
  // 	};
  // };

  useEffect(() => {
    dispatch(getDashBoardReports());
  }, [dispatch]);

  useEffect(() => {
    try {
      const payload = {
        userId: dashData?.user?.uuid,
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
        instituteId: dashData?.institute.uuid,
      };
      dispatch(getInstructorAttendance(payload));
    } catch (error) {
      console.log(error);
    }
  }, [dashData?.institute?.uuid, dashData?.user?.uuid, dispatch, selectedDate]);

  // const selectedDateStats = getSelectedDateStats();

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
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-semibold mb-0 mx-1"
          style={{ ...FONTS.heading_01 }}
        >
          Attendance
        </h2>

        <div className="relative flex items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:scale-105 transition z-0"
            style={{ backgroundColor: COLORS.bg_Colour }}
            aria-label="Filter attendance data"
          >
            <img src={filter} alt="Filter" className="w-6 h-6" />
          </button>

          {showFilters && (
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-4 flex gap-4 opacity-100 max-w-[400px]">
              <Select value={selectedMonth} onValueChange={handleMonthChange}>
                <SelectTrigger
                  style={{
                    ...FONTS.para_02,
                    backgroundColor: COLORS.bg_Colour,
                  }}
                  className="w-max-sm rounded-sm border-0 px-1 py-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
                >
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent className="bg-[#ebeff3] rounded-sm w-[40px] px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                  {months.map((month) => (
                    <SelectItem
                      key={month}
                      value={month}
                      className={`
                        cursor-pointer text-gray-700 w-[100px]
                        rounded-sm 
                        bg-[#ebeff3]
                        shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] 
                        data-[state=checked]:bg-gradient-to-r 
                        data-[state=checked]:from-purple-500 
                        data-[state=checked]:to-purple-700 
                        data-[state=checked]:text-white
                        mb-2 transition
                      `}
                      style={{ backgroundColor: COLORS.bg_Colour }}
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedYear.toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger
                  className="w-max-sm rounded-sm border-0 px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
                  style={{
                    ...FONTS.para_02,
                    backgroundColor: COLORS.bg_Colour,
                  }}
                >
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-[#ebeff3] rounded-sm w-[40px] px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={year.toString()}
                      className={`
                        cursor-pointer px-2 py-2 text-gray-700 
                        rounded-sm 
                        bg-[#ebeff3]
                        shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(189,194,199,0.6)]
                        data-[state=checked]:bg-gradient-to-r 
                        data-[state=checked]:from-purple-500 
                        data-[state=checked]:to-purple-700 
                        data-[state=checked]:text-white
                        mb-2 transition
                      `}
                      style={{ backgroundColor: COLORS.bg_Colour }}
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
      <AttendanceCardGraph/>
      <div className="flex flex-row gap-6 mt-5">
        <div className="flex flex-col">
          <h2
            className="text-xl font-semibold mb-4 mt-2"
            style={{ ...FONTS.heading_02 }}
          >
            Calendar
          </h2>
          <Calendar
            mode="single"
            required
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={selectedDate}
            onMonthChange={handleCalendarMonthChange}
            className="border **:gap-5 **:py-0.5 md:**:gap-2 rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]"
            style={{ ...FONTS.heading_02, backgroundColor: COLORS.bg_Colour }}
            showOutsideDays={false}
          />
        </div>

  {/* Day Overview Section */}
 <div className="flex flex-col w-full lg:w-7/12">
  <h3
    className="text-lg font-semibold mb-4 mt-2"
    style={{ ...FONTS.heading_02 }}
  >
    Day Overview
  </h3>

  <div
    className="flex flex-col justify-between rounded-md p-6 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]"
    style={{
      backgroundColor: COLORS.bg_Colour,
      minHeight: "375px",
    }}
  >
    <p
      className="text-sm mb-4 text-gray-700"
      style={{ ...FONTS.para_01 }}
    >
      {selectedDate ? selectedDate.toDateString() : "Select a date"}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-2 flex-1 no-scrollbar">
      {dailydata
        ?.filter((item: any) => item?.class_name) // only include scheduled classes
        .map((item: any, index: number) => (
          <div
            key={index}
            className="rounded-md p-3 bg-[#f7f9fb] h-32 shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.7),inset_2px_2px_4px_rgba(189,194,199,0.6)]"
          >
            <ul
              className="space-y-1 text-gray-700"
              style={{ ...FONTS.heading_06 }}
            >
              <li>
                <strong>Class:</strong> {item.class_name}
              </li>
              <li>
                <strong>Duration:</strong> {item.duration}
              </li>
              <li>
                <strong>Start:</strong> {formatISOTime(item.start_date)}
              </li>
              <li>
                <strong>End:</strong> {formatISOTime(item.end_time)}
              </li>
            </ul>
          </div>
        ))}
    </div>

    {dailydata?.filter((item: any) => item?.class_name).length === 0 && (
      <p className="text-gray-500 text-sm">No scheduled classes for this day.</p>
    )}

    <button
      className="mt-4 self-start px-4 py-2 bg-gray rounded-xl btnshadow text-white text-[14px] hover:!text-white btnhovershadow cursor-pointer"
      style={{ ...FONTS.heading_06 }}
      onClick={handleNavigate}
    >
      View Details
    </button>
  </div>
</div>

</div>

    </div>
  );
};

export default Attendance;
