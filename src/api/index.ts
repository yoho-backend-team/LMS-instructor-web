/* eslint-disable @typescript-eslint/no-explicit-any */
import httpClient from './httpClient';
import HTTP_END_POINTS from './http_endpoints';

import {
	getInstructorBranchDetails,
	getInstructorCourseId,
	getInstructorInstituteDetails,
} from '@/hooks/TabViewResponce/common';

class Client {
	common = {
		file: {
			upload: (data: any) =>
				httpClient.uploadFile(HTTP_END_POINTS.common.file.upload, data),
			get: (url: any, params: any) => httpClient.fileGet(url, params),
		},
	};

	Instructor = {
		login: (data: any, params?: any) =>
			httpClient.post(
				HTTP_END_POINTS.Instructor.auth.login,
				data,
				params,
				'instructor'
			),
		forgotPassword: (data: any, params?: any) =>
			httpClient.post(
				HTTP_END_POINTS.Instructor.auth.forgot_password,
				data,
				params
			),
		verifyOtp: (data: any, params?: any) =>
			httpClient.post(
				HTTP_END_POINTS.Instructor.auth.verify_otp,
				data,
				params,
				'instructor'
			),
		changePassword: (data: any, params?: any) =>
			httpClient.post(
				HTTP_END_POINTS.Instructor.auth.change_password,
				data,
				params,
				'instructor'
			),
		log_out: (data: any, params?: any) =>
			httpClient.post(
				HTTP_END_POINTS.Instructor.auth.log_out,
				data,
				params,
				'instructor'
			),
		attendance: {
			get: (params: { userId: any }) =>
				httpClient.get(
					`${HTTP_END_POINTS.Instructor.attendance.get}${params.userId}`,
					params,
					'instructor'
				),
			get_class_attendance: (data: { classId: string }) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.attendance.class_attendance + data.classId,
					data,
					'instructor'
				),
			update: (data: { uuid: string }) =>
				httpClient.update(
					HTTP_END_POINTS.Instructor.attendance.class_attendance + data.uuid,
					data,
					'instructor'
				),
			getByDaily: (params: string, data: any) => httpClient.get(HTTP_END_POINTS.Instructor.attendance.class_by_day.replace(":staffId", params), data)
		},
		course_list: {
			get: () =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.course_list.get.replace(":instituteid", getInstructorInstituteDetails()?.uuid).replace(":branchid", getInstructorBranchDetails()?.uuid),
					{},
					'instructor'
				),
		},
		course: {
			get: (params: string) =>
				httpClient.get(HTTP_END_POINTS.Instructor.course.get.replace(":instituteid", getInstructorInstituteDetails()?.uuid).replace(":branchid", getInstructorBranchDetails()?.uuid).replace(":courseid", params), {}, 'instructor'),
			notes: {
				create: (data: any, params?: any) =>
					httpClient.post(
						HTTP_END_POINTS.Instructor.course.notes.create,
						data,
						params,
						'instructor'
					),
				update: (data: any, params?: any) =>
					httpClient.update(
						HTTP_END_POINTS.Instructor.course.notes.update.replace(
							':noteId',
							data?.noteId
						),
						data,
						params,
						'instructor'
					),
				delete: (params: any) =>
					httpClient.delete(
						HTTP_END_POINTS.Instructor.course.notes.delete.replace(
							':noteId',
							params?.noteId
						),
						params,
						'instructor'
					),
			},
			 task: {
        create:  (data: any, params:any) =>httpClient.post(HTTP_END_POINTS.Instructor.course.task.create, data, params, 'instructor')
        ,
        get:  (params: any) =>  httpClient.get(HTTP_END_POINTS.Instructor.course.task.get.replace(":course",params.course), params, 'instructor')
      ,
        update: (params:any, data:any) => httpClient.patch(HTTP_END_POINTS.Instructor.course.task.update + params?.id,
            data,
            {},
            'instructor')
      },
			study_material: {
				create: (data: any, params?: any) =>
					httpClient.post(
						HTTP_END_POINTS.Instructor.course.study_material.create,
						data,
						params,
						'instructor'
					),
				update: (data: any, params?: any) =>
					httpClient.update(
						HTTP_END_POINTS.Instructor.course.study_material.update.replace(
							':materialId',
							data?.materialId
						),
						data,
						params,
						'instructor'
					),
				delete: (params: any) =>
					httpClient.delete(
						HTTP_END_POINTS.Instructor.course.study_material.delete.replace(
							':materialId',
							params?.materialId
						),
						params,
						'instructor'
					),
			},
			batches: {
				get: (data: any) =>
					httpClient.get(
						HTTP_END_POINTS.Instructor.course.batches.get.replace(
							':courseId',
							data?.uuid
						).replace(":instituteid", getInstructorInstituteDetails()?.uuid).replace(":branchid", getInstructorBranchDetails()?.uuid),
						{},
						'instructor'
					),
			},
		},
		class: {
			get: (params: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.class.get.replace(":courseid", params?.users),
					params,
					'instructor'
				),
			getWithId: (params: { course: string }) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.class.getwithId + params.course,
					params,
					'instructor'
				),
			update: (data: { uuid: string }) =>
				httpClient.update(
					HTTP_END_POINTS.Instructor.class.update + data?.uuid,
					data,
					'instructor'
				),
		},
		community: {
			get: (params: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.community.get.replace(":courseid", getInstructorCourseId()?.uuid),
					params,
					'instructor'
				),
			get_messages: (params: { community: string }) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.community.get_messages + params?.community,
					{},
					'instructor'
				),
		},
		notification: {
			get: (params: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.notification.get,
					params,
					'instructor'
				),
			put: (data: any, params?: any) =>
				httpClient.update(
					HTTP_END_POINTS.Instructor.notification.put + data?.uuid,
					data,
					params,
					'instructor'
				),
			delete: (params?: any) =>
				httpClient.delete(
					HTTP_END_POINTS.Instructor.notification.delete + params?.uuid,
					{},
					'instructor'
				),
		},
		payment: {
			get: (params: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.payments.getSalaries,
					params,
					'instructor'
				),
		},
		ticket: {
			create: (data: any, params: any) =>
				httpClient.post(
					HTTP_END_POINTS.Instructor.ticket.create,
					data,
					params,
					'instructor'
				),
			get: (params: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.ticket.get,
					params,
					'instructor'
				),
		},
		reports: {
			get: (params?: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.reports.get,
					params,
					'instructor'
				),
		},
		activity: {
			get: (params: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.activity.get,
					params,
					'instructor'
				),
		},
		faq: {
			get: (params: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.faq.get,
					params,
					'instructor'
				),
		},
		help: {
			get: (params: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.help.get,
					params,
					'instructor'
				),
		},
		index: {
			get: (params?: any) =>
				httpClient.get(
					HTTP_END_POINTS.Instructor.index.get,
					params,
					'instructor'
				),
			update: (data: any) =>
				httpClient.update(
					HTTP_END_POINTS.Instructor.profile.put,
					data,
					'',
					'instructor'
				),
		},
	};

	notificatinsubscription = {
		post: (data: any) =>
			httpClient.post(HTTP_END_POINTS.notificationSubscription.post, data),
	};
}

export default new Client();
