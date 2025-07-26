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

export const getCourseData = async () => {
	try {
		const response = await Client.Instructor.course.get();
		return response;
	} catch (error) {
		console.error('Error in getcoursedata:', error);
		throw error;
	}
};

export const getAllBatches = async () => {
	try {
		const response = await Client.Instructor.course.batches.get();
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
