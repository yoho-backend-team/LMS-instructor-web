import Client from "../../../api/index"

export const getCoursesListData = async (params: any) => {
  try {
    const response = await Client.Instructor.course_list.get(params);
    return response; 
  } catch (error) {
    console.error('Error in getcoursedata:', error);
    throw error;
  }
}

    

    
