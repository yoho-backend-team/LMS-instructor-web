/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent } from '../ui/card';
import eclip from '../../assets/dashboard/ellipse-2-4.svg';
import dots from '../../assets/dashboard/dotcircle.png';
import sun from '../../assets/dashboard/sun.png';
import moon from '../../assets/dashboard/moon.png';
import { useSelector } from 'react-redux';
import { TabViewResponsive } from '@/hooks/TabViewResponce/TabViewResponsive';

interface Course {
    total: number;
}

interface RootState {
    dashboard: {
        data: {
            classes: Course[];
        };
    };
}

const CourseProgress: React.FC = () => {
    const CourseProgress: any = useSelector((state: RootState) => state.dashboard.data.classes) ?? [];
    const progress = parseFloat((((CourseProgress?.[0]?.offline_class?.completed + CourseProgress?.[0]?.online_class?.completed) / CourseProgress?.[0]?.total) * 100).toFixed(1));

    const radius = 70; // Reduced for laptop
    const radius2 = 85; // Reduced for laptop
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const { TabView } = TabViewResponsive();

    const centerX = 85; // Adjusted for laptop
    const centerY = 100; // Adjusted for laptop

    const getCirclePosition = (angleDeg: number) => {
        const angleRad = (angleDeg - 90) * (Math.PI / 180);
        const x = centerX + radius2 * Math.cos(angleRad);
        const y = centerY + radius2 * Math.sin(angleRad);
        return { x, y };
    };

    const sunAngle = ((progress) % 100) * 3.6;
    const { x: sunX, y: sunY } = getCirclePosition(sunAngle);

    const moonAngle = (1 / 100) * 360;
    const { x: moonX, y: moonY } = getCirclePosition(moonAngle);

    return (
        <Card className='flex w-full h-[340px] lg:h-[320px] items-start justify-center gap-2.5 p-4 lg:p-3 relative bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]'>
            <CardContent className='flex flex-col w-full h-[300px] lg:h-[280px] items-center gap-4 lg:gap-3 relative p-0'>
                <div className='flex flex-col h-[250px] lg:h-[230px] items-center gap-4 lg:gap-3 relative self-stretch w-full'>
                    <div className="relative self-stretch mt-2 [font-family:'Quicksand',Helvetica] font-bold text-dark text-lg lg:text-base tracking-[0] leading-[normal] text-center">
                        Courses Progress
                    </div>

                    <div className='relative w-full h-[200px] lg:h-[180px] flex items-center justify-center'>
                        <div className='relative w-[220px] lg:w-[190px] h-[220px] lg:h-[190px]'>
                            <img
                                className='absolute w-full h-full top-0 left-0'
                                alt='Ellipse'
                                src={eclip}
                            />

                            <svg
                                className='w-full h-full transform -rotate-90'
                                viewBox='0 0 170 170'
                            >
                                <circle
                                    cx='85'
                                    cy='85'
                                    r={radius}
                                    fill='none'
                                    stroke='url(#progressGradient)'
                                    strokeWidth='20'
                                    strokeLinecap='round'
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    className='transition-all duration-1000 ease-out'
                                />
                                <defs>
                                    <linearGradient
                                        id='progressGradient'
                                        x1='0%'
                                        y1='0%'
                                        x2='100%'
                                        y2='0%'
                                    >
                                        <stop offset='0%' stopColor='#8b5cf6' />
                                        <stop offset='100%' stopColor='#a855f7' />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <img
                                className='absolute w-[140px] lg:w-[120px] h-[140px] lg:h-[120px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                alt='Group'
                                src={dots}
                            />

                            {/* Sun Icon */}
                            <img
                                src={sun}
                                alt='Sun'
                                className='absolute'
                                style={{
                                    width: 40,
                                    height: 40,
                                    left: sunX - 20,
                                    top: sunY - 20,
                                }}
                            />

                            {/* Moon Icon */}
                            <img
                                src={moon}
                                alt='Moon'
                                className='absolute'
                                style={{
                                    width: 30,
                                    height: 30,
                                    left: moonX - 15,
                                    top: moonY - 15,
                                }}
                            />

                            <div className='absolute w-[65px] lg:w-[60px] h-[65px] lg:h-[60px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#ebeff3] rounded-full shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]'>
                                <div className='flex flex-col w-full h-full items-center justify-center gap-1'>
                                    <div className="[font-family:'Quicksand',Helvetica] font-semibold text-dark text-[10px] lg:text-[9px] text-center tracking-[0] leading-3">
                                        Progress
                                    </div>
                                    <div className="bg-[linear-gradient(135deg,rgba(123,0,255,1)_0%,rgba(178,0,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Quicksand',Helvetica] font-bold text-transparent text-base lg:text-sm text-center tracking-[0] leading-4 whitespace-nowrap">
                                        {progress}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between relative self-stretch w-full flex-[0_0_auto] mt-2 lg:mt-1 px-2'>
                    <div className="relative w-fit">
                        <select
                            className="appearance-none bg-transparent border-none p-0 m-0 font-bold text-[#7B00FF] text-sm lg:text-xs font-['Quicksand'] focus:outline-none cursor-pointer pr-6"
                            defaultValue="5"
                        >
                            <option value="5">Batch A</option>
                        </select>

                        <svg
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-3 lg:h-3 text-[#7B00FF] pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <div className={`relative [font-family:'Quicksand',Helvetica] font-bold text-[#706f6f] text-sm lg:text-xs text-right tracking-[0] leading-[normal]`}>
                        {CourseProgress?.[0]?.total} Classes
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseProgress;