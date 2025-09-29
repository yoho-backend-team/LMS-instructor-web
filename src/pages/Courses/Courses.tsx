import React, { useEffect } from "react";
import MainCourse from "@/components/courses/MainCourse";
import { useDispatch } from "react-redux";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";
import { useLoader } from "@/context/LoadingContext/Loader";

const Courses: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
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
    <div>
      <MainCourse />
    </div>
  );
};

export default Courses;
