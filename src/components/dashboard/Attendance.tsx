/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { FONTS } from '@/constants/uiConstants'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import profile from '../../assets/dashboard/profile.svg'
import book from '../../assets/dashboard/book.svg'
import close from '../../assets/dashboard/close.svg'
import { useSelector } from 'react-redux'

const Attendance: React.FC = () => {
    const navigate = useNavigate()

    const Attendance = useSelector((state: any) => state.dashboard.data.attendance)
    const month = new Date().getMonth()
    const Attendance_data = Attendance?.find((data: any) => data.month === month)

    const attendanceBars = React.useMemo(() => {
        if (!Attendance || !Attendance[0]) return [];

        return [
            {
                height: `${Attendance_data?.total?.percentage}%`,
                top: "bottom-0",
                color:
                    "bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]",
                shadow:
                    "shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40,inset_4px_4px_8px_#45ab87bf,inset_8px_8px_12px_#46ab8740,inset_-4px_-4px_8px_#46ab87bf,inset_-8px_-8px_12px_#46ab8740]",
            },
            {
                height: `${Attendance?.[0]?.present?.percentage}%`,
                top: "bottom-0",
                color:
                    "bg-[linear-gradient(90deg,rgba(74,222,232,1)_0%,rgba(74,222,232,0.92)_52%,rgba(74,222,232,1)_100%)]",
                shadow:
                    "shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40,inset_4px_4px_8px_#34a9b1bf,inset_8px_8px_12px_#34aab140,inset_-4px_-4px_8px_#34aab1bf,inset_-8px_-8px_12px_#34aab140]",
            },
            {
                height: `${Attendance_data?.absent?.percentage}%`,
                top: "bottom-0",
                color:
                    "bg-[linear-gradient(90deg,rgba(85,133,255,1)_0%,rgba(85,133,255,0.92)_53%,rgba(85,133,255,1)_100%)]",
                shadow:
                    "shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40,inset_4px_4px_8px_#3358b8bf,inset_8px_8px_12px_#3358b840,inset_-4px_-4px_8px_#3358b8bf,inset_-8px_-8px_12px_#3358b840]",
            },
        ]
    }, [Attendance, Attendance_data?.absent?.percentage, Attendance_data?.total?.percentage]);

    const attendanceMetrics = [
        {
            icon: profile,
            text: `Overall ${Attendance?.[0]?.total?.percentage}% Attendance`,
        },
        {
            icon: book,
            text: `${Attendance?.[0]?.present?.percentage}% Attendance Remaining`,
        },
        {
            icon: close,
            text: `${Attendance?.[0]?.total?.percentage - Attendance?.[0]?.present?.percentage}% Days Absent`,
        },
    ];

    return (
        <>
            <Card className="w-full max-w-full h-auto min-h-[280px] p-4 sm:p-5 flex flex-col items-start gap-2.5 relative bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
                <CardContent className="flex flex-col w-full max-w-full items-start gap-4 sm:gap-5 relative flex-[0_0_auto] p-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between relative self-stretch w-full flex-[0_0_auto] gap-3 sm:gap-0">
                        <div className="flex flex-col w-full sm:w-[228px] items-start gap-2 sm:gap-3 relative">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-dark text-lg sm:text-xl tracking-[0] leading-[normal]">
                                Attendance
                            </div>
                        </div>

                        <Button 
                            style={{ ...FONTS.heading_06 }}
                            onClick={() => navigate('/attendance')}
                            className="cursor-pointer btnshadow btnhovershadow hover:!text-white bg-gray-100 flex w-full sm:w-[104px] h-[38px] sm:h-[42px] items-center justify-center gap-2.5 px-3 py-2 relative rounded-lg text-sm sm:text-base" 
                        >
                            <span className="whitespace-nowrap">
                                Over All
                            </span>
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[30px] relative self-stretch w-full flex-[0_0_auto]">
                        {/* Bars Container */}
                        <div className="flex justify-center sm:inline-flex items-center gap-3 sm:gap-[30px] relative flex-[0_0_auto] w-full sm:w-auto">
                            {attendanceBars?.map((bar, index) => {
                                return (
                                    <div
                                        key={`bar-${index}`}
                                        className="relative w-6 sm:w-7 h-[120px] sm:h-[198px] bg-[#ebeff3] rounded-2xl border border-solid border-[#f4f6f8] shadow-[4px_4px_8px_#ffffffbf,inset_2px_2px_8px_#bdc2c7]"
                                    >
                                        <div
                                            style={{ height: bar.height }}
                                            className={`absolute w-[22px] sm:w-[26px] ${bar.top} rounded-2xl ${bar.shadow} ${bar.color}`}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        {/* Metrics Container */}
                        <div className="flex flex-col w-full sm:w-[226px] items-start gap-3 sm:gap-5 relative">
                            {attendanceMetrics.map((metric, index) => (
                                <div
                                    key={`metric-${index}`}
                                    className="flex items-center gap-3 sm:gap-4 relative self-stretch w-full flex-[0_0_auto]"
                                >
                                    <img
                                        className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-20 md:h-20 mt-[-10px] sm:mt-[-20.00px] mb-[-10px] sm:mb-[-20.00px] ml-[-10px] sm:ml-[-20.00px]"
                                        alt="Attendance icon"
                                        src={metric.icon}
                                    />
                                    <div className="relative w-full [font-family:'Quicksand',Helvetica] font-bold text-[#706f6f] text-xs sm:text-sm tracking-[0] leading-[normal] break-words">
                                        {metric.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Attendance;