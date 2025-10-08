
// import { Moon, Sun } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Progress3D() {
    const progress = 30
    const radius = 80
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <div className="flex items-center justify-center p-4">
            <div className="relative flex items-center justify-center mb-8">
                <svg className="w-[242px] h-[287px] transform -rotate-90" viewBox="0 0 200 200">
                    {/* Outer dotted circle with subtle shadow */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="20"
                        strokeDasharray=""
                        // className="opacity-100"
                        className={cn("stroke-[#BDC2C7] border-2 border-[#F4F7F9] opacity-50")}
                    />

                    {/* Dashed inner ring with more presence */}
                    <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke="#d1d5db"
                        strokeWidth="6"
                        strokeDasharray="10 30"
                        className="opacity-90 drop-shadow-lg"
                    />

                    {/* Progress Arc */}
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
                        className="transition-all duration-1000 ease-out shadow-2xl bg-gradient-to-r from-[#7B00FF] to-[#7B00FF]"
                    />

                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Center content with 3D neumorphic effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-[5px_5px_10px_#ccc,inset_-5px_-5px_10px_#fff,4px_4px_12px_rgba(0,0,0,0.15)]">
                        <span className="text-sm text-gray-600 font-medium">Progress</span>
                        <span className="text-2xl font-bold text-purple-600">{progress}%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}