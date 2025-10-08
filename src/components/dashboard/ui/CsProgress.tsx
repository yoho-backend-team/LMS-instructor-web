import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CourseProgressProps {
    progress?: number // Progress percentage (0-100)
    totalClasses?: number
    completedClasses?: number
}

const CsProgress: React.FC<CourseProgressProps> = ({ progress = 2, totalClasses = 2 }) => {
    const radius = 85
    const strokeWidth = 12
    const normalizedRadius = radius - strokeWidth * 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDasharray = `${circumference} ${circumference}`
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <Card className="w-[280px] h-[360px] bg-white rounded-2xl shadow-lg border-0 p-6">
            <CardContent className="flex flex-col h-full items-center gap-6 p-0">
                {/* Title */}
                <div className="w-full">
                    <h2 className="text-lg font-semibold text-gray-800 text-left">Courses Progress</h2>
                </div>

                {/* Circular Progress Container */}
                <div className="relative flex items-center justify-center flex-1">
                    {/* Concentric Background Circles */}
                    <div className="absolute w-[220px] h-[220px] rounded-full bg-gray-100"></div>
                    <div className="absolute w-[190px] h-[190px] rounded-full bg-gray-50"></div>
                    <div className="absolute w-[160px] h-[160px] rounded-full bg-white shadow-inner"></div>

                    {/* SVG Progress Circle */}
                    <svg width={radius * 2} height={radius * 2} className="relative z-10">
                        {/* Background circle */}
                        <circle
                            cx={radius}
                            cy={radius}
                            r={normalizedRadius}
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth={strokeWidth}
                        />

                        {/* Progress circle */}
                        <circle
                            cx={radius}
                            cy={radius}
                            r={normalizedRadius}
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            transform={`rotate(-90 ${radius} ${radius})`}
                            className="transition-all duration-1000 ease-out"
                        />

                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Moon Icon - positioned at start of progress */}
                    <div
                        className="absolute w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center z-20"
                        style={{
                            top: "20px",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#8b5cf6" />
                        </svg>
                    </div>

                    {/* Sun Icon - positioned at end of progress arc */}
                    <div
                        className="absolute w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center z-20"
                        style={{
                            top: "50%",
                            right: "20px",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="4" fill="#8b5cf6" />
                            <path
                                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                                stroke="#8b5cf6"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    {/* Center Progress Display */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-20 h-20 bg-white rounded-full shadow-sm flex flex-col items-center justify-center">
                            <div className="text-xs font-medium text-gray-600 mb-1">Progress</div>
                            <div className="text-xl font-bold text-purple-600">{Math.round(progress)}%</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="flex items-center justify-between w-full">
                    <div className="text-sm font-medium text-gray-600">Total Classes</div>
                    <div className="text-sm font-medium text-gray-600">{totalClasses} Classes</div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="text-sm font-medium text-gray-600">Completed</div>
                    {/* <div className="text-sm font-medium text-gray-600">{completedClasses} Classes</div> */}
                </div>
            </CardContent>
        </Card>
    )
}

export default CsProgress