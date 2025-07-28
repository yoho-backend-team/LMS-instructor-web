import { getInstructorHelp } from "../services"
import { getHelp } from "./helpSlice";

export const getHelpThunk = (params:any)=>
    async (dispatch:any)=>{

try{
    const response =await getInstructorHelp(params);
    dispatch(getHelp(response))
}
catch(error){
console.log(error);   
}

} 

