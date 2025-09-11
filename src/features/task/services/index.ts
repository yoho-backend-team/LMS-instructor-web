
import Client from '../../../api/index'

export const getTaskDeatails = async (params: any) => {
	try {
		const response = await Client.Instructor.course.task.get(params)
		console.log("task response", response);
		return response?.data;
	} catch (error) {
		console.log(error);
	}
};


export const createTask = async(data: any,params: any) => {
  const response = await Client.Instructor.course.task.create(data,params);

    return response;
}

export const updateTask = async (params:any, data: any) => {
  try {
	await Client.Instructor.course.task.update(params, data);
	console.log('service ressssssssssss');
	// No response to return since update returns void
  } catch (error:any) {
    console.log(error.message);
  }
};