import Communityside from "../../components/community/communityside";
import { useAppDispatch } from "../../features/community/redux/hooks";
import { getAllCommunitiesData } from "@/features/community/redux/commuityThunk";
import { useSelector } from "react-redux";
import { selectCommunities } from "@/features/community/redux/communitySelector";
import { useEffect } from "react";
import { FONTS } from "@/constants/uiConstants";
import { useLoader } from "@/context/LoadingContext/Loader";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";

const Community = () => {
  const dispatch = useAppDispatch();
  const communities = useSelector(selectCommunities);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllCommunitiesData(""));
      } catch (error) {
        console.error("Community fetch error:", error);
      }
    };
    fetchData();
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

  return (
    <>
      <div className="w-[260px] sticky ml-6 mt-2">
        <p style={{ ...FONTS.heading_01 }}>Community</p>
      </div>
      <Communityside communities={communities} />
    </>
  );
};

export default Community;
