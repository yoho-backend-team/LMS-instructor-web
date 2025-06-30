import React from 'react'
import Progress3D from './ui/Progress3D'
import { FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'

const CourseProgress: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate('/courses')} className='flex flex-col justify-between w-full h-[365px] bg-[#EBEFF3] divshadow rounded-[16px] p-[20px] gap-[10px]'>
            <h1 style={{ ...FONTS.heading_02 }}>Courses Progress</h1>
            <div className='-mt-20'>
                <Progress3D />
            </div>
            <div className='flex flex-row justify-between -mt-30'>
                <h1 style={{ ...FONTS.heading_06 }}>Total Classes</h1>
                <p style={{ ...FONTS.heading_06 }}>2 Classes</p>
            </div>
        </div>
    )
}

export default CourseProgress