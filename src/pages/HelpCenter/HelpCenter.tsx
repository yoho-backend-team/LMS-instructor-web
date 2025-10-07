import { useEffect } from "react";
import HelpCentre from "../../components/Helpcenter/helpcenter";
import { useDispatch, useSelector } from "react-redux";
import { selectHelpCenter } from "@/features/helpcenter/reduces/selectors";
import { getHelpThunk } from "@/features/helpcenter/reduces/thunks";
import { getStudentProfileThunk } from "@/features/Profile/reducers/thunks";
import { useLoader } from "@/context/LoadingContext/Loader";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";

const HelpCenter = () => {
  const dispatch = useDispatch<any>();
  const HelpDetails = useSelector(selectHelpCenter);
  const userDetail = JSON.parse(localStorage.getItem("user") || "{}");
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

  useEffect(() => {
    dispatch(getStudentProfileThunk());
    dispatch(getHelpThunk({ instituteid: userDetail?.institute_id?.uuid }));
    console.log(HelpDetails);
  }, [dispatch]);

  return <HelpCentre />;
};

export default HelpCenter;
