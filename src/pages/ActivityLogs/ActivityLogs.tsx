import { COLORS, FONTS } from "@/constants/uiConstants";
import backBtn from "../../assets/icons/common/back_arrow.png";
import vector_H from "../../assets/icons/activitylog/Vector-H.png";
import User from "../../assets/icons/activitylog/User.png";
import filter from "../../assets/icons/common/filter.png";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store/store";
import updatesimg from "../../assets/dashboard/updates.png";
import { getAllActivityLogs } from "@/features/activitylog/reduces/thunks";
import { selectActivityLogs } from "@/features/activitylog/reduces/selectors";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLoader } from "@/context/LoadingContext/Loader";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";

const ActivityLogs = () => {
  const [handleFilter, setHandleFilter] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const activityLogs1 = useSelector(selectActivityLogs);

  useEffect(() => {
    dispatch(getAllActivityLogs({ page: currentPage }));
  }, [dispatch, currentPage]);

  const formatFullDate = (dateStr: string) => {
    if (!dateStr) return "Invalid Date";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${ampm}`;
  };

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
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const allLogs = activityLogs1?.data ?? [];

  // ✅ Fixed filter logic
  const filteredLogs = allLogs.filter((log: any) => {
    const logDate = new Date(log.createdAt);

    let from = fromDate ? new Date(fromDate) : null;
    let to = toDate ? new Date(toDate) : null;

    if (from) {
      from.setHours(0, 0, 0, 0); // start of day
      if (logDate < from) return false;
    }

    if (to) {
      to.setHours(23, 59, 59, 999); // end of day
      if (logDate > to) return false;
    }

    return true;
  });

  const totalPages = activityLogs1?.pagination?.totalPages ?? 1;

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-6">
        {/* Left side - Back button and title */}
        <div className="flex items-center gap-6">
          <div
            className="p-2 rounded-lg cursor-pointer"
            style={{
              boxShadow: `rgba(255, 255, 255, 0.7) 5px 5px 4px, rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
            }}
            onClick={() => navigate(-1)}
          >
            <img src={backBtn} alt="BackBtn" className="w-6 h-6" />
          </div>
          <h1 style={{ ...FONTS.heading_02 }}>Activity Log</h1>
        </div>

        {/* Right side - Filter button */}
        <button
          className="p-2 rounded-lg cursor-pointer"
          onClick={() => {
            setHandleFilter(!handleFilter);
            setShowFromCalendar(false);
            setShowToCalendar(false);
          }}
          style={{
            boxShadow: `rgba(255, 255, 255, 0.7) 5px 5px 4px, rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
          }}
        >
          <img src={filter} alt="Filter" className="w-6 h-6" />
        </button>
      </div>
      <div >
        {/* Filter Panel */}
        <div className="lg:w-[500px] md:w-fit">
          {handleFilter && (
            <div className="lg:grid md:flex lg:gap-0 md:gap-12 lg:grid-cols-1">
              <section className="flex gap-6 lg:justify-end mt-4">
                <div>
                  <p style={{ ...FONTS.heading_07 }}>From</p>
                  <button
                    className=" cursor-pointer p-2 rounded-lg"
                    onClick={() => {
                      setShowFromCalendar(!showFromCalendar);
                      setShowToCalendar(false);
                    }}
                    style={{
                      ...FONTS.heading_07,
                      boxShadow: `rgba(255, 255, 255, 0.7) 5px 5px 4px, rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                    }}
                  >
                    {fromDate ? formatDate(fromDate) : "DD/MM/YYYY"}
                    {fromDate && (
                      <span
                        title="Clear From Date"
                        className="ml-1 text-gray-500 hover:text-blue-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFromDate(undefined);
                          setCurrentPage(1);
                        }}
                      >
                        ↻
                      </span>
                    )}
                  </button>
                </div>

                <div>
                  <p style={{ ...FONTS.heading_07 }}>To</p>
                  <button
                    className="p-2 cursor-pointer rounded-lg"
                    onClick={() => {
                      setShowToCalendar(!showToCalendar);
                      setShowFromCalendar(false);
                    }}
                    style={{
                      ...FONTS.heading_07,
                      boxShadow: `rgba(255, 255, 255, 0.7) 5px 5px 4px, rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                    }}
                  >
                    {toDate ? formatDate(toDate) : "DD/MM/YYYY"}
                    {toDate && (
                      <span
                        title="Clear To Date"
                        className="ml-1 text-gray-500 hover:text-blue-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setToDate(undefined);
                          setCurrentPage(1);
                        }}
                      >
                        ↻
                      </span>
                    )}
                  </button>
                </div>
              </section>

              {showFromCalendar && (
                <div
                  className="mt-6 p-1 rounded-lg"
                  style={{
                    boxShadow:
                      "rgba(189, 194, 199, 0.7) 2px 5px 4px, rgba(255, 255, 255, 0.4) 3px 2px 2px inset",
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={fromDate} // ✅ should be fromDate
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        setFromDate(selectedDate); // ✅ update fromDate
                        setShowFromCalendar(false);
                        setCurrentPage(1);
                      }
                    }}
                    className="rounded-lg bg-gray-100 w-full"
                    style={{ backgroundColor: COLORS.bg_Colour }}
                    captionLayout="dropdown"
                    fromYear={2000}
                    toYear={2100}
                    showOutsideDays={false}
                  />
                </div>
              )}

              {showToCalendar && (
                <div
                  className="mt-6 p-1 rounded-lg"
                  style={{
                    boxShadow:
                      "rgba(189, 194, 199, 0.7) 2px 5px 4px, rgba(255, 255, 255, 0.4) 3px 2px 2px inset",
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        setToDate(selectedDate);
                        setShowToCalendar(false);
                        setCurrentPage(1);
                      }
                    }}
                    className="rounded-lg bg-gray-100 w-full"
                    style={{ backgroundColor: COLORS.bg_Colour }}
                    captionLayout="dropdown"
                    showOutsideDays={false}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-full relative">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((data: any) => (
              <section
                key={data.id}
                className="flex justify-between items-start py-6 gap-12 my-4 relative"
              >
                <div className="lg:w-[170px] pl-6 !text-sm md:w-[160px]">
                  <p style={{ ...FONTS.heading_07 }}>
                    {formatFullDate(data?.createdAt)}
                  </p>
                </div>
                <div className="grid gap-6 w-3/4 relative pb-10">
                  <div className="btnshadow h-full w-3 rounded-2xl absolute left-0 text-transparent"></div>
                  <h3
                    className="pl-14"
                    style={{ ...FONTS.heading_05, color: COLORS.text_title }}
                  >
                    {data?.title}
                  </h3>
                  <section className="flex items-center gap-6 relative">
                    <div className="relative">
                      <div
                        className="h-8 w-8 rounded-full flex p-1 absolute left-[-10px] top-[-5px]"
                        style={{
                          background: COLORS.blue_user,
                          boxShadow:
                            "rgba(189, 194, 199, 0.7) 2px 5px 4px, rgba(255, 255, 255, 0.4) 3px 2px 2px inset",
                        }}
                      >
                        <img src={User} alt="User-icon" />
                      </div>
                      <img src={vector_H} alt="Vector-H" />
                      <div
                        className="h-8 w-8 rounded-full absolute right-0 top-[-5px]"
                        style={{
                          background: COLORS.green_text,
                          boxShadow:
                            "rgba(189, 194, 199, 0.7) 2px 5px 4px, rgba(255, 255, 255, 0.4) 3px 2px 2px inset",
                        }}
                      ></div>
                    </div>
                    <div className="p-3 custom-inset-shadow md:w-[380px]">
                      <p
                        style={{
                          ...FONTS.heading_07,
                          color: COLORS.green_text,
                        }}
                      >
                        {data?.details}
                      </p>
                    </div>
                  </section>
                </div>
              </section>
            ))
          ) : (
            <div className="flex flex-col w-full items-center gap-3 py-10">
              <img
                src={updatesimg}
                alt="No logs"
                className="w-[646px] h-[200px]"
              />
              <h1 style={{ ...FONTS.heading_04 }} className="pt-10  !text-2xl">
                No Logs Found
              </h1>
              <p style={{ ...FONTS.para_02 }}>
                Try adjusting your filters or date range.
              </p>
            </div>
          )}

{/* Pagination */}
{!fromDate && !toDate && filteredLogs.length > 0 && (
  <div className="flex justify-center px-4 mt-6 pb-6 pt-6 sm:mt-8 sm:pb-8 sm:pt-8">
    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap justify-center">
      {/* Previous Button */}
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.max(prev - 1, 1))
        }
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-[#ebeff3] text-gray-600 font-medium text-sm sm:text-base
          shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="rounded-full border border-gray-400 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
          <ChevronLeft size={12} className="sm:w-3 sm:h-3" />
        </span>
        Previous
      </button>

      {/* Page Indicator */}
      <p className="text-gray-600 font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">
        Page {currentPage} of {totalPages}
      </p>

      {/* Next Button */}
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-[#ebeff3] text-gray-600 font-medium text-sm sm:text-base
          shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <span className="rounded-full border border-gray-400 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
          <ChevronRight size={12} className="sm:w-3 sm:h-3" />
        </span>
      </button>
    </div>
  </div>
)}
        </div>
        
      </div>
    </div>
  );
};

export default ActivityLogs;
