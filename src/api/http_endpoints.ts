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
			},
			course_list: {
				get: `/institutes/:instituteid/branches/:branchid/teaching-staff/courses`,
			},
			course: {
				get: `/institutes/:instituteid/branches/:branchid/course/:courseid`,
				notes: {
					create: `/institutes/course/note`,
					update: `/institutes/course/note/update/`,
					delete: `/institutes/course/note/`,
				},
				study_material: {
					index: '/institutes/study-material/',
				},
				batches: {
					get: `/institutes/:instituteid/branches/:branchid/courses/:courseid/batches/`,
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
			reports: {
				get: '/institutes/reports/users/teaching-staff',
			},
			index: {
				get: '/institutes/auth/profile/me/',
			},
			profile:{
				get:'/institutes/auth/profile/me/',
				put:'/institutes/auth/profile/me/',
			}
		},
	};
}

const Http_Endpoints = generateendpoints();

export default Http_Endpoints;
