
import Client from '../../../api/index'


export const getInstructorHelp = async (params:any)=>{
    const response = await Client.Instructor.help.get(params)
     return response 
   
} 