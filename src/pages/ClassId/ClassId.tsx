import { useNavigate, useParams } from 'react-router-dom';
import classImg from '../../assets/classes/Mask group.png'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COLORS, FONTS } from '@/constants/uiConstants';
import backImg from '../../assets/classes/back.png'
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import type { AppDispatch } from '@/store/store';
import { selectIdClass } from '@/features/classId/services/reducers/selector';
import { getClassIdDetail } from '@/features/classId/services/reducers/thunks';

const ClassId = () => {
    const { id, classType } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    // handle backpage button function

    const classIdData = useSelector(selectIdClass);

    console.log('classIdData:', classIdData);

    useEffect(() => {
        if (id) {
            dispatch(getClassIdDetail({
                classType: "offline",
                course: id,
            }));
        }
    }, [id, dispatch, classType]);

    const navigate = useNavigate();
    const handleBackPage = () => {
        navigate(-1);
    }

    // const startDate = new Date(classIdData.data?.start_date)


    return (
        <div className='mb-4'>
            {/* title section */}
            <div className='my-4 flex flex-row justify-start items-center gap-5'>
                <div onClick={handleBackPage} className='p-2 rounded-lg bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'>
                    <img src={backImg} alt="back-img" />
                </div>
                <h1 style={{ ...FONTS.heading_01 }} >Class Details  -{classIdData.data?.id}</h1>
            </div>

            {/* card section */}
            <div className='grid xl:grid-cols-2 md:grid-cols-1 justify-between gap-10'>
                {/* Left side card */}
                <Card style={{ backgroundColor: COLORS.bg_Colour }} className='px-4 py-1 h-[400px]'>
                    <CardHeader>
                        <CardTitle style={{ ...FONTS.heading_01 }} className='!text-[#7B00FF] mb-4'> Batch No: #{classIdData.data?.batch?.id}</CardTitle>
                        <CardDescription>
                            <h2 style={{ ...FONTS.heading_02 }} className='text-[#2A2A2A] mb-2'>{classIdData.data?.class_name}</h2>
                            <p style={{ ...FONTS.para_02 }} >{classIdData.data?.course?.description}</p>
                        </CardDescription>
                    </CardHeader>

                    <Card className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] mx-4'>
                        <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-4 mx-4">
                            <table className='w-full table-fixed text-center'>
                                <thead style={{ ...FONTS.para_02 }} className='!text-[#ffffff]'>
                                    <tr>
                                        <td>Date</td>
                                        <td>Start At</td>
                                        <td>End At</td>
                                        <td>Duration</td>
                                    </tr>
                                </thead>
                                <tbody style={{ ...FONTS.heading_04 }} className='!text-[#ffffff]'>
                                    <tr>
                                        <td>{classIdData.data?.start_date && new Date(classIdData.data.start_date).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}</td>
                                        <td> {classIdData.data?.start_time &&
                                            new Date(classIdData.data.start_time).toLocaleString("en-IN", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                                timeZone: "Asia/Kolkata", // explicitly show IST time
                                            }).toUpperCase()}</td>
                                        <td>{classIdData.data?.end_time &&
                                            new Date(classIdData.data.end_time).toLocaleString("en-IN", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                                timeZone: "Asia/Kolkata", // explicitly show IST time
                                            }).toUpperCase()}</td>
                                        <td>{classIdData.data?.course?.durationInMonths} Month</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </Card>
                </Card>
                <Card style={{ backgroundColor: COLORS.bg_Colour }} className='px-4 h-[400px]'>
                    <CardTitle style={{ ...FONTS.heading_02 }} >Session Materials</CardTitle>
                    <Card style={{ ...FONTS.para_02 }} className='py-1 px-3 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] '>
                        Once Class finished study material videos will be upload
                    </Card>
                    <div className='mx-auto my-auto'>
                        <img className='w-[400px]' src={classImg} alt="" />
                    </div>
                </Card>
            </div>
        </div>
    )
};

export default ClassId;
