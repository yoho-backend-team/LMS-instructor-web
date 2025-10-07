import FAQInterface from "@/components/Faq/Faq";
import { useLoader } from "@/context/LoadingContext/Loader";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";
import { getFaqThunk } from "@/features/faq/reduces/thunks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const FAQs = () => {
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

  useEffect(() => {
    // getFaqThunk(dispatch)
    dispatch(getFaqThunk());
  }, [dispatch]);

  return <FAQInterface />;
};

export default FAQs;
