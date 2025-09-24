

function generateendpoints() {

	return {
		common: {
			file: {
				upload: '/upload/',
			},
		},
		Instructor: {
			activity: {
				get: '/institutes/user/activity',
			},
			auth: {
				login: '/institutes/auth/teaching-staff/login',
				forgot_password: '/institutes/auth/profile/forgot-password',
				verify_otp: '/institutes/auth/teaching-staff/verify-otp',
				change_password: '/institutes/auth/profile/reset-password',
				log_out: '/institutes/auth/teaching-staff/logout',
			},
			attendance: {
				get: '/institutes/attedance/staff/',
				class_attendance: '/institutes/attedance/class/',
				class_by_day: '/institutes/attedance/staff/:staffId/daily',
			},
			course_list: {
				get: `/institutes/:instituteid/branches/:branchid/teaching-staff/courses`,
			},
			course: {
				get: `/institutes/:instituteid/branches/:branchid/course/:courseid`,
				notes: {
					create: `/institutes/course/note`,
					update: `/institutes/course/note/update/:noteId`,
					delete: `/institutes/course/note/:noteId`,
				},
				study_material: {
					create: '/institutes/study-material/',
					update: '/institutes/study-material/:materialId',
					delete: '/institutes/study-material/:materialId',
				},
				task:{
        		  create: '/task-project',
        		  get: '/task-project/get/:course',
        		  update: '/task-project/update/:taskid',
						},
				batches: {
					get: `/institutes/:instituteid/branches/:branchid/courses/:courseId/batches/`,
				},
				
			},
			class: {
				get: `/institutes/class/:courseid`,
				getwithId: `/institutes/class/course/`,
				update: `/institutes/class/`,
			},
			community: {
				get: `/institutes/community/course/:courseid`,
				get_messages: `/institutes/community/messages/all/`,
			},
			notification: {
				get: `/institutes/staff/notifications`,
				put: `institutes/staff/notifications/status/`,
				delete: `/institutes/staff/notifications/`,
			},
			payments: {
				getSalaries: '/institutes/payments/staff-salary/salary',
			},
			ticket: {
				create: '/institutes/staff/ticket',
				get: '/institutes/staff/ticket/',
			},
			faq: {
				get: '/institutes/faq/all',
			},
			help: {
				get: `/help-center/all`,
			},
			reports: {
				get: '/institutes/reports/users/teaching-staff',
			},
			index: {
				get: '/institutes/auth/profile/me',
				put: '/institutes/auth/profile/me',
			},
			profile: {
				get: '/institutes/auth/profile/me/',
				put: '/institutes/auth/profile/me/',
			},
		},
		notificationSubscription: {
			post: '/notification/subscribe',
		},
	};
}

const Http_Endpoints = generateendpoints();

export default Http_Endpoints;
