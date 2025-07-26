// import { createAsyncThunk } from '@reduxjs/toolkit';
 import { getAllCommunities, getMessage } from '../../../features/community/services/communityservices';
import { setCommunities, setMessage } from './communitySlice';

export const getAllCommunitiesData = (params:any) => async  (dispatch:any) => {
  try {
    const response = await getAllCommunities(params);
    console.log("Thunk Response", response)
    dispatch(setCommunities(response));
  } catch (error) {
    console.error(error);
  } 
  // finally {
    // dispatch(setLoading(false));
  // }
};


export const getMessages = (params:any) => async (dispatch : any) => {
  try{
    const response = await getMessage(params);
    console.log("Chat Response", response)
    dispatch(setMessage(response));

  }
  catch(error){
    console.log(error);
  }
}




// export const getAllCommunities = createAsyncThunk(
//   'community/getAllCommunities',
//   async (searchParam: string, thunkAPI) => {
//     try {
//       const data = await fetchCommunitiesService(searchParam);
//       console.log('thunks data:',data);
//       return data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );
