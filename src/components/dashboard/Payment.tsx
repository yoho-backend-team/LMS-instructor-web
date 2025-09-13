/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Card, CardContent } from '../ui/card'
import eclip from '../../assets/dashboard/ellipse-2-4.svg'
import dots from '../../assets/dashboard/dotcircle.png'
import sun from '../../assets/dashboard/sun.png';
import moon from '../../assets/dashboard/moon.png';
import { TabViewResponsive } from '@/hooks/TabViewResponce/TabViewResponsive'
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const Payment: React.FC = () => {
    const assessment: any = useSelector((state: RootState) => state.dashboard.data)
    const { TabView } = TabViewResponsive();

    const closed = assessment?.tickets?.closed
    const opened = assessment?.tickets?.opened
    const total = assessment?.tickets?.total

    const radius = 80;
    const radius2 = TabView ? 40 : 60;
    const circumference = 2 * Math.PI * radius;

    const centerX = TabView ? 34 : 54;
    const centerY = TabView ? 36 : 72;

    const getCirclePosition = (angleDeg: number) => {
        const angleRad = (angleDeg - 90) * (Math.PI / 180);
        const x = centerX + radius2 * Math.cos(angleRad);
        const y = centerY + radius2 * Math.sin(angleRad);
        return { x, y };
    };


    const moonAngle = (1 / 100) * 360;
    const { x: moonX, y: moonY } = getCirclePosition(moonAngle);

    const progress = parseFloat((opened / total * 100).toFixed(1));
    const progress2 = parseFloat((closed / total * 100).toFixed(1));
    const strokeDashoffset =
        circumference - (progress / 100) * circumference || 0;
    const strokeDashoffset2 =
        circumference - (progress2 / 100) * circumference || 0;

    const sunAngle = ((progress) % 100) * 3.6;
    const { x: sunX, y: sunY } = getCirclePosition(sunAngle);
    const sunAngle2 = ((progress2) % 100) * 3.6;
    const { x: sunX2, y: sunY2 } = getCirclePosition(sunAngle2);



    const Circle = ({ strokeDashoffset, type }: { strokeDashoffset: number, type: string }) => (
        <div className={`relative w-full h-full ${TabView ? 'left-6' : ''}`}>
            <div className={TabView ? `relative w-[160px] h-[180px] -top-6 left-2` : `relative w-[160px] h-[180px] -top-5 left-8`}>
                <img
                    className={TabView ? `absolute w-[100px] h-[100px] top-0 left-0` : 'absolute w-[150px] h-[150px] top-4 left-0'}
                    alt='Ellipse'
                    src={eclip}
                />

                <svg
                    className={`${TabView ? 'w-[100px] h-[100px] transform -rotate-90 ' : 'w-[150px] h-[180px]'} transform -rotate-90`}
                    viewBox='0 0 200 200'
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
                    className={`absolute ${TabView ? ' w-[60px] h-[60px] left-5 top-[20px]' : ' w-[100px] h-[100px] top-[40px] left-6'} `}
                    alt='Group'
                    src={dots}
                />

                {
                    type === 't1' &&
                    <img
                        src={sun}
                        alt='Sun'
                        className='absolute'
                        style={{
                            width: TabView ? 20 : 30,
                            height: TabView ? 20 : 30,
                            left: sunX + 20 - 16,
                            top: sunY + 20 - 16,
                        }}
                    />
                }
                {
                    type === 't2' &&
                    <img
                        src={sun}
                        alt='Sun'
                        className='absolute'
                        style={{
                            width: TabView ? 20 : 30,
                            height: TabView ? 20 : 30,
                            left: sunX2 + 20 - 16,
                            top: sunY2 + 20 - 16,
                        }}
                    />
                }

                {/* Moon Icon */}
                <img
                    src={moon}
                    alt='Moon'
                    className='absolute'
                    style={{
                        width: TabView ? 16 : 23,
                        height: TabView ? 16 : 23,
                        left: moonX + 20 - 16,
                        top: moonY + 20 - 16,
                    }}
                />

                <div className={`absolute ${TabView ? 'w-[40px] h-[40px] top-[30px] left-[30px]' : 'w-[65px] h-[65px] top-[55px] left-[40px]'}  bg-[#ebeff3] rounded-[40.33px] shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]`}>
                    <div className={`flex flex-col w-[63px] items-center ${TabView ? 'top-[6px] -left-2.5' : 'gap-2 top-[17px] left-[2px]'}  relative `}>
                        <div className={`relative w-[62px] mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-semibold text-dark  ${TabView ? 'text-[6px]' : 'text-[10px]'} text-center tracking-[0] leading-4`}>
                            {type === 't1' ? 'Opened' : 'closed'}
                        </div>

                        <div className={`relative self-stretch h-[19px] bg-[linear-gradient(135deg,rgba(123,0,255,1)_0%,rgba(178,0,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Quicksand',Helvetica] font-bold text-transparent ${TabView ? 'text-[10px]' : 'text-md'}  text-center tracking-[0] leading-4 whitespace-nowrap`}>
                            {type === 't1' ? opened : closed}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

    return (
        <Card className="flex w-full h-[300px] items-start justify-between p-5 bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
            <div className="flex flex-col gap-2 w-[30%] pl-4">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-dark text-xl tracking-[0] leading-[normal]">
                    Tickets
                </div>
                <div className="relative w-full [font-family:'Quicksand',Helvetica] font-bold text-[#706f6f] text-sm whitespace-nowrap mb-4">Total {total} Tickets Raised</div>
            </div>
            <CardContent className="w-full grid grid-cols-2 -ml-4">
                <Circle strokeDashoffset={strokeDashoffset} type='t1' />
                <Circle strokeDashoffset={strokeDashoffset2} type='t2' />
            </CardContent>
        </Card>
    )
}

export default Payment