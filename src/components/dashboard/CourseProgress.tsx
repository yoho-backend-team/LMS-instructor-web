/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
// import Progress3D from './ui/Progress3D'
// import { FONTS } from '@/constants/uiConstants'
// import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import eclip from '../../assets/dashboard/ellipse-2-4.svg'
import dots from '../../assets/dashboard/dotcircle.png'
// import { useSelector } from 'react-redux'

const CourseProgress: React.FC = () => {
    // const navigate = useNavigate()

    // const CourseProgress = useSelector((state: any) => state.dashboard.data.classes) ?? []
    const CourseProgress: any[] = []
    const progress = CourseProgress?.[0]?.total || 0
    const radius = 80
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = (circumference - (progress / 100) * circumference) || 0

    return (
        <Card className="flex w-full h-[365px] items-start justify-center gap-2.5 p-5 relative bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
            <CardContent className="flex flex-col w-[242px] h-[325px] items-center gap-5 relative p-0">
                <div className="flex flex-col h-[287px] items-center gap-5 relative self-stretch w-full">
                    <div className="relative self-stretch mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-dark text-xl tracking-[0] leading-[normal]">
                        Courses Progress
                    </div>

                    <div className="relative w-full h-[242px]">
                        <div className="relative w-[258px] h-[274px] -top-5 left-8">
                            <img
                                className="absolute w-[258px] h-[258px] top-4 left-0"
                                alt="Ellipse"
                                src={eclip}
                            />

                            <svg className="w-[258px] h-[287px] transform -rotate-90" viewBox="0 3 198 200">
                                <circle
                                    cx="100"
                                    cy="100"
                                    r={radius}
                                    fill="none"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="25"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    className="transition-all duration-1000 ease-out shadow-2xl bg-gradient-to-r from-[#7B00FF] to-[#7B00FF]"
                                />

                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <img
                                className="absolute w-[170px] h-[170px] top-[60px] left-11"
                                alt="Group"
                                src={dots}
                            />

                            <div className="absolute w-[81px] h-[81px] top-[99px] left-[85px] bg-[#ebeff3] rounded-[40.33px] shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
                                <div className="flex flex-col w-[63px] items-center gap-2 relative top-[17px] left-[9px]">
                                    <div className="relative w-[62px] mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-semibold text-dark text-xs text-center tracking-[0] leading-4">
                                        Progress
                                    </div>

                                    <div className="relative self-stretch h-[19px] bg-[linear-gradient(135deg,rgba(123,0,255,1)_0%,rgba(178,0,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Quicksand',Helvetica] font-bold text-transparent text-xl text-center tracking-[0] leading-4 whitespace-nowrap">
                                        2%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center left-6 justify-between relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-[#706f6f] text-sm tracking-[0] leading-[normal]">
                        Total Classes
                    </div>

                    <div className="relative w-[67px] mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-[#706f6f] text-sm text-right tracking-[0] leading-[normal]">
                        {CourseProgress?.[0]?.total} Classes
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseProgress