/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index';

export const getCoursesListData = async () => {
	try {
		const response = await Client.Instructor.course_list.get();
		return response;
	} catch (error) {
		console.error('Error in getcourselistdata:', error);
		throw error;
	}
};

export const getCourseData = async (course: string) => {
	try {
		const response = await Client.Instructor.course.get(course);
		return response;
	} catch (error) {
		console.error('Error in getcoursedata:', error);
		throw error;
	}
};

export const getAllBatches = async (data: any) => {
	try {
		const response = await Client.Instructor.course.batches.get(data);
		return response;
	} catch (error) {
		console.error('Error in getallbatches:', error);
		throw error;
	}
};

export const createStudyMaterial = async (data: any) => {
	try {
		const response = await Client.Instructor.course.study_material.create(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const updateStudyMaterial = async (data: any) => {
	try {
		const response = await Client.Instructor.course.study_material.update(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteStudyMaterial = async (data: any) => {
	try {
		const response = await Client.Instructor.course.study_material.delete(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const createNotes = async (data: any) => {
	try {
		const response = await Client.Instructor.course.notes.create(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const updateNotes = async (data: any) => {
	try {
		const response = await Client.Instructor.course.notes.update(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteNotes = async (data: any) => {
	try {
		const response = await Client.Instructor.course.notes.delete(data);
		if (response) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

//Task services
export const uploadquestionfile = async (data: any) => {
  const response = await Client.common.file.upload(data);
  return response;
};

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

export const updateTaskData = async (params:any, data: any) => {
  try {
	const response = await Client.Instructor.course.task.update(params, data);
	return response;
	// No response to return since update returns void
  } catch (error:any) {
    console.log(error.message);
  }
};