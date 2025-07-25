import { getAllActivity } from "../services"
import { setActivityLogs, setLoading } from "./ActivitySlice"

export const getAllActivityLogs =
          (params:any)=>async (dispatch:any)=>{
    try{
     dispatch(setLoading(true))
     const response=await getAllActivity(params)
     console.log(response, 'response')
     dispatch(setActivityLogs(response));
    }
    catch(error){
     console.log(error)
    }
}