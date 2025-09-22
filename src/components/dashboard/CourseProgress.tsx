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
    const CourseProgress = useSelector((state: RootState) => state.dashboard.data.classes) ?? [];
    const progress = CourseProgress?.[0]?.total || 0;

    const radius = 80;
    const radius2 = 100;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
        circumference - (progress / 100) * circumference || 0;

    const { TabView } = TabViewResponsive();

    const centerX = 100;
    const centerY = 115;

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
        <Card className='flex w-full h-[365px] items-start justify-center gap-2.5 p-5 relative bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]'>
            <CardContent className={`flex flex-col ${TabView ? 'w-80' : 'w-full'}  h-[325px] items-center gap-5 relative p-0`}>
                <div className='flex flex-col h-[277px] items-center gap-5 relative self-stretch w-full'>
                    <div className="relative self-stretch mt-2 [font-family:'Quicksand',Helvetica] font-bold text-dark text-xl tracking-[0] leading-[normal]">
                        Courses Progress
                    </div>

                    <div className={`relative w-full h-[242px] ${TabView ? 'left-6' : ''}`}>
                        <div className={TabView ? `relative w-[248px] h-[264px] -top-6 left-2` : `relative w-[258px] h-[274px] -top-5 left-8`}>
                            <img
                                className={TabView ? `absolute w-[248px] h-[248px] top-4 left-0` : 'absolute w-[258px] h-[258px] top-4 left-0'}
                                alt='Ellipse'
                                src={eclip}
                            />

                            <svg
                                className={`${TabView ? 'w-[248px] h-[277px]' : 'w-[258px] h-[287px]'} transform -rotate-90`}
                                viewBox='0 0 198 205'
                            >
                                <defs>
                                    {/* Gradient */}
                                    <linearGradient id='progressGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                                        <stop offset='0%' stopColor='#8b5cf6' />
                                        <stop offset='100%' stopColor='#a855f7' />
                                    </linearGradient>

                                    {/* Shadow filter */}
                                    <filter id="shadowFilter" x="-50%" y="-50%" width="200%" height="200%">
                                        <feDropShadow dx="4" dy="4" stdDeviation="4" floodColor="#BDC2C7BF" />
                                    </filter>
                                </defs>

                                {/* Progress Circle */}
                                <circle
                                    cx='100'
                                    cy='100'
                                    r={radius}
                                    fill='none'
                                    stroke='url(#progressGradient)'
                                    strokeWidth='25'
                                    strokeLinecap='round'
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    filter='url(#shadowFilter)'
                                    className='transition-all duration-1000 ease-out'
                                />
                            </svg>

                            <img
                                className={`absolute w-[170px] h-[170px]  ${TabView ? 'left-9 top-[55px]' : 'top-[60px] left-11'} `}
                                alt='Group'
                                src={dots}
                            />

                            {/* Sun Icon */}
                            <img
                                src={sun}
                                alt='Sun'
                                className='absolute'
                                style={{
                                    width: 50,
                                    height: 50,
                                    left: sunX + 22 - 16,
                                    top: sunY + 19 - 16,
                                }}
                            />

                            {/* Moon Icon */}
                            <img
                                src={moon}
                                alt='Moon'
                                className='absolute'
                                style={{
                                    width: 35,
                                    height: 35,
                                    left: moonX + 20 - 18,
                                    top: moonY + 22 - 16,
                                }}
                            />

                            <div className={`absolute w-[81px] h-[81px] ${TabView ? 'top-[95px] left-[80px]' : 'top-[99px] left-[85px]'}  bg-[#ebeff3] rounded-[40.33px] shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]`}>
                                <div className='flex flex-col w-[63px] items-center gap-2 relative top-[17px] left-[9px]'>
                                    <div className="relative w-[62px] mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-semibold text-dark text-xs text-center tracking-[0] leading-4">
                                        Progress
                                    </div>

                                    <div className="relative self-stretch h-[19px] bg-[linear-gradient(135deg,rgba(123,0,255,1)_0%,rgba(178,0,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Quicksand',Helvetica] font-bold text-transparent text-xl text-center tracking-[0] leading-4 whitespace-nowrap">
                                        {progress}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`flex items-center ${TabView ? 'pb-2' : 'mt-2'} justify-between relative self-stretch w-full flex-[0_0_auto]`}>
                    <div className="relative w-fit mt-[-1px]">
                        <select
                            className="appearance-none bg-transparent border-none p-0 m-0 font-bold text-[#7B00FF] text-sm font-['Quicksand'] focus:outline-none cursor-pointer pr-6"
                            defaultValue="5"
                        >
                            <option value="5">Batch A</option>

                        </select>

                        {/* Custom dropdown arrow */}
                        <svg
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B00FF] pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <div className={`relative [font-family:'Quicksand',Helvetica] font-bold text-[#706f6f] text-sm text-right tracking-[0] leading-[normal]`}>
                        {CourseProgress?.[0]?.total} Classes
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseProgress;
