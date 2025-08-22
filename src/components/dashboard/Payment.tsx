import React from 'react'
import { Card, CardContent } from '../ui/card'
import eclip from '../../assets/dashboard/ellipse-2-4.svg'
import dots from '../../assets/dashboard/dotcircle.png'

const Payment: React.FC = () => {
    const CourseProgress: any[] = []
    const progress = CourseProgress?.[0]?.total || 0
    const completed = CourseProgress?.[1]?.total || 0
    const radius = 60 // reduced from 80
    const circumference = 2 * Math.PI * radius

    const strokeDashoffsetProgress = (circumference - (progress / 100) * circumference) || 0
    const strokeDashoffsetCompleted = (circumference - (completed / 100) * circumference) || 0

    const Circle = ({ title, value, strokeDashoffset }: { title: string, value: number, strokeDashoffset: number }) => (
        <div className="flex flex-col h-[220px] items-center gap-4 relative w-[200px]">
            <div className="[font-family:'Quicksand',Helvetica] font-bold text-dark text-lg tracking-[0] leading-[normal]">
                {title}
            </div>
            <div className="relative w-[200px] h-[210px]">
                <img className="absolute w-[200px] h-[200px] top-2 left-0" alt="Ellipse" src={eclip} />
                <svg className="w-[200px] h-[210px] transform -rotate-90" viewBox="0 0 200 200">
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>
                <img className="absolute w-[130px] h-[130px] top-[40px] left-[35px]" alt="Group" src={dots} />
                <div className="absolute w-[65px] h-[65px] top-[72px] left-[68px] bg-[#ebeff3] rounded-full shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] flex flex-col items-center justify-center">
                    <div className="[font-family:'Quicksand',Helvetica] font-semibold text-dark text-xs text-center">
                        Progress
                    </div>
                    <div className="bg-[linear-gradient(135deg,rgba(123,0,255,1)_0%,rgba(178,0,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent font-bold text-lg">
                        {value}%
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Card className="flex w-full h-[365px] items-start justify-between p-5 bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
            <div className="flex flex-col gap-2 w-[30%] pl-4">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-dark text-xl tracking-[0] leading-[normal]">
                    Tickets
                </div>
                <div className="relative w-full [font-family:'Quicksand',Helvetica] font-bold text-[#706f6f] text-sm whitespace-nowrap mb-4">Total 9 Tickets Raised</div>
            </div>
            <CardContent className="flex flex-row items-center gap-10 p-0">
                <Circle title="" value={progress} strokeDashoffset={strokeDashoffsetProgress} />
                <Circle title="" value={completed} strokeDashoffset={strokeDashoffsetCompleted} />
            </CardContent>
        </Card>
    )
}

export default Payment