import { GetLocalStorage } from '@/utils/helper'
import Client from '../../../api/index'



export const getInstructorfaq = async ()=>{

    const instituteId = GetLocalStorage("instituteId")
    const branchid = GetLocalStorage("branchId")

   
    const response = await Client.Instructor.faq.get({instituteId,branchid})
    return response;
}