import { GetLocalStorage } from '@/utils/helper';

export const getInstructorDetails = () => {
	const user: any = GetLocalStorage('instructorDetails');
	return user;
};

export const getInstructorBranchDetails = () => {
	const user: any = getInstructorDetails();
	return user?.branch_id;
};

export const getInstructorInstituteDetails = () => {
	const user: any = getInstructorDetails();
	return user?.institute_id;
};

export const getInstructorCourseId = () => {
	const user: any = getInstructorDetails();
	return user?.userDetail?.course[0];
};
