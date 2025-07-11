/* eslint-disable @typescript-eslint/no-explicit-any */

import httpClient from "./httpClient";
import HTTP_END_POINTS from "./http_endpoints";

class Client {
    common = {
        file: {
            upload: (data: any) =>
                httpClient.uploadFile(HTTP_END_POINTS.common.file.upload, data),
            get: (url: any) => httpClient.fileGet(url),
        },
    };

    Instructor = {
        login: (data: any, params: any) =>
            httpClient.post(
                HTTP_END_POINTS.Instructor.auth.login,
                data,
                params,
                "instructor"
            ),
        verifyOtp: (data: any, params: any) =>
            httpClient.post(
                HTTP_END_POINTS.Instructor.auth.verify_otp,
                data,
                params,
                "instructor"
            ),
        changePassword: (data: any, params: any) => httpClient.post(HTTP_END_POINTS.Instructor.auth.change_password, data, params, "instructor"),
        log_out: (data: any) => httpClient.post(HTTP_END_POINTS.Instructor.auth.log_out, data, "instructor"),
        attendance: {
            get: (params: { userId: any; }) =>
                httpClient.get(
                    `${HTTP_END_POINTS.Instructor.attendance.get}${params.userId}`,
                    params,
                    "instructor"
                ),
            get_class_attendance: (data: { classId: string; }) =>
                httpClient.get(
                    HTTP_END_POINTS.Instructor.attendance.class_attendance + data.classId,
                    data,
                    "instructor"
                ),
            update: (data: { uuid: string; }) =>
                httpClient.update(
                    HTTP_END_POINTS.Instructor.attendance.class_attendance + data.uuid,
                    data,
                    "instructor"
                ),
        },
        course_list: {
            get: (params: any) => httpClient.get(HTTP_END_POINTS.Instructor.course_list.get, params, "instructor")
        },
        course: {
            get: (params: { course: string; }) =>
                httpClient.get(
                    HTTP_END_POINTS.Instructor.course.get + params.course,
                    params,
                    "instructor"
                ),
            notes: {
                create: (data: any, params: any) =>
                    httpClient.post(
                        HTTP_END_POINTS.Instructor.course.notes.create,
                        data,
                        params,
                        "instructor"
                    ),
                update: (data: { NoteId: string; }) =>
                    httpClient.update(
                        HTTP_END_POINTS.Instructor.course.notes.update + data.NoteId,
                        data,
                        "instructor"
                    ),
                delete: (data: { id: string; }) =>
                    httpClient.delete(
                        HTTP_END_POINTS.Instructor.course.notes.delete + data.id,
                        "instructor"
                    ),
            },
            study_material: {
                create: (data: any, params: any) =>
                    httpClient.post(
                        HTTP_END_POINTS.Instructor.course.study_material.index,
                        data,
                        params,
                        "instructor"
                    ),
                update: (data: { materialId: string; }) =>
                    httpClient.update(
                        HTTP_END_POINTS.Instructor.course.study_material.index +
                        data.materialId,
                        data,
                        "instructor"
                    ),
                delete: (data: { id: string; }) =>
                    httpClient.delete(
                        HTTP_END_POINTS.Instructor.course.study_material.index + data?.id,
                        "instructor"
                    ),
            },
            bathes: {
                get: (data: { course: string; }) => httpClient.get(HTTP_END_POINTS.Instructor.course.batches.get + data?.course + "/batches/", {}, "instructor")
            }
        },
        class: {
            get: (params: any) => httpClient.get(HTTP_END_POINTS.Instructor.class.get, params, "instructor"),
            getWithId: (params: { course: string; }) =>
                httpClient.get(
                    HTTP_END_POINTS.Instructor.class.getwithId + params.course,
                    params,
                    "instructor"
                ),
            update: (data: { uuid: string; }) =>
                httpClient.update(
                    HTTP_END_POINTS.Instructor.class.update + data?.uuid,
                    data,
                    "instructor"
                ),
        },
        community: {
            get: (params: any) => httpClient.get(HTTP_END_POINTS.Instructor.community.get, params, "instructor"),
            get_messages: (params: { community: string; }) => httpClient.get(HTTP_END_POINTS.Instructor.community.get_messages + params?.community, {}, "instructor")
        },
        notification: {
            get: (params: any) => httpClient.get(HTTP_END_POINTS.Instructor.notification.get, params, "instructor"),
            put: (params: { uuid: string; }) => httpClient.update(HTTP_END_POINTS.Instructor.notification.put + params?.uuid, {}, "instructor"),
            delete: (params: { uuid: string; }) => httpClient.delete(HTTP_END_POINTS.Instructor.notification.delete + params?.uuid, {}, "instructor")
        },
        payment: {
            get: (params: any) => httpClient.get(HTTP_END_POINTS.Instructor.payments.getSalaries, params, "instructor"),
        },
        ticket: {
            create: (data: any, params: any) =>
                httpClient.post(
                    HTTP_END_POINTS.Instructor.ticket.create,
                    data,
                    params,
                    "instructor"
                ),
            get: (params: any) =>
                httpClient.get(
                    HTTP_END_POINTS.Instructor.ticket.get,
                    params,
                    "instructor"
                ),
        },
        reports: {
            get: (params: any) =>
                httpClient.get(
                    HTTP_END_POINTS.Instructor.reports.get,
                    params,
                    "instructor"
                ),
        },
        activity: {
            get: (params: any) => httpClient.get(HTTP_END_POINTS.Instructor.activity.get, params, "instructor")
        },
        index: {
            get: (params: any) =>
                httpClient.get(
                    HTTP_END_POINTS.Instructor.index.get,
                    params,
                    "instructor"
                ),
            update: (data: any) =>
                httpClient.update(
                    HTTP_END_POINTS.Instructor.index.get,
                    data,
                    "instructor"
                ),
        },
    };
}

export default new Client()