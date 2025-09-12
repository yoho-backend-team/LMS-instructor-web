import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import CourseButton from './button'
import { COLORS, FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'
import navigationicon from '../../assets/courses icons/navigation arrow.svg';
import { Card } from '../ui/card'
import dayjs from 'dayjs'
import { getCourseModules } from '@/features/Course/services/Course'
import { GetLocalStorage } from '@/utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { selectModules } from '@/features/Course/reducers/selector'
import { getInstructorcourseModules } from '@/features/Course/reducers/thunks'

interface CourseTrackProps {
    batch_id: string;
    course: string;
}

const Course_Track: React.FC<CourseTrackProps> = ({ batch_id, course }) => {
    const navigate = useNavigate();
    const branch = GetLocalStorage('branchId');
    const dispatch: any = useDispatch();
    const Modules = useSelector(selectModules);

    useEffect(() => {

        const query = {
            branch_id: branch,
            course_id: course,
            batch_id: batch_id,
        };

        dispatch(getInstructorcourseModules(query))

    }, [batch_id, course, branch]);

   console.log("Modules", Modules)
    return (
        <div className="w-full mx-auto p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Button
                    onClick={() => navigate('/courses')}
                    className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                >
                    <img src={navigationicon} />
                </Button>
                <h1 style={{ ...FONTS.heading_02 }}>Course Track</h1>
            </div>

            {/* <CourseButton activeTabs="course-track" /> */}

            {/* Modules Table */}
            <Card className="overflow-hidden bg-[#EBEFF3] rounded-xl shadow-inner">
                <div className="flex flex-col">
                    {/* Table Header */}
                    <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-4 mx-4 rounded-md sticky top-0 z-10 mb-4">
                        <div className="grid grid-cols-4 gap-4 text-center !text-white">
                            <div style={{ ...FONTS.heading_02, color: COLORS.black }}>Course Modules</div>
                            <div style={{ ...FONTS.heading_02, color: COLORS.black }}>Start Date</div>
                            <div style={{ ...FONTS.heading_02, color: COLORS.black }}>End Date</div>
                            <div style={{ ...FONTS.heading_02, color: COLORS.black }}>Status</div>
                        </div>
                    </Card>

                    {/* Table Body */}
                    <div className="overflow-y-auto mx-4">
                        {Modules?.data?.length > 0 ? (
                            Modules?.data?.map((item: any, index: number) => (
                                <Card
                                    key={index}
                                    className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-md rounded-lg"
                                >
                                    <div className="grid grid-cols-4 gap-4 text-center items-center">
                                        <div style={{ ...FONTS.para_01 }}>{item?.title}</div>
                                        <div style={{ ...FONTS.para_01 }}>
                                            {item?.start_date ? dayjs(item.start_date).format('DD-MMM-YYYY') : '--'}
                                        </div>
                                        <div style={{ ...FONTS.para_01 }}>
                                            {item?.end_date ? dayjs(item.end_date).format('DD-MMM-YYYY') : '--'}
                                        </div>
                                        <div style={{ ...FONTS.para_01 }}>{item?.status || 'Pending'}</div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div className="flex justify-center mt-3">
                                <p style={{ ...FONTS.heading_06 }}>No Modules available</p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Course_Track;
