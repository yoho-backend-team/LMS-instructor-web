import Client from "../../../api/index"

export const getCoursesListData = async (params: any) => {
  try {
    const response = await Client.Instructor.course_list.get(params);
    return response; 
  } catch (error) {
    console.error('Error in getcourselistdata:', error);
    throw error;
  }
}


export const getCourseData = async (params:any) =>{
  try{
    const response = await Client.Instructor.course.get(params);
    return response;

  }catch(error){
    console.error("Error in getcoursedata:",error);
    throw error;
  }

}


export const getAllBatches = async (params:any) =>{
  try{
    const response = await Client.Instructor.course.batches.get(params);
    return response;

  }catch(error){
    console.error("Error in getallbatches:",error);
    throw error;
  }

}

    

    
