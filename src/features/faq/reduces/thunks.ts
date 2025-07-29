

import { getInstructorfaq } from "../services";
import { getfaq } from "./faqSlice";

export const getFaqThunk = () => {
  return async (dispatch: any) => {
    try {
      const response:any = await getInstructorfaq();
      
      dispatch(getfaq(response?.data));
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };
};
