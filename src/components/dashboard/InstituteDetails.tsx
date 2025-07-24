/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
// import instituteLogo from '../../assets/dashboard/Group 191.png'
import { FONTS } from '@/constants/uiConstants'
import { useSelector } from 'react-redux'
import { GetImageUrl } from '@/utils/helper'

const InstituteDetails: React.FC = () => {

    const institute = useSelector((state: any) => state.dashboard.data.institute)

    return (
        <div className='w-full h-[365px] flex flex-col gap-[10px] p-[20px] rounded-[16px] divshadow'>
            {/* <h1 style={{ ...FONTS.heading_02 }}>Institute Name</h1> */}
            <p style={{ ...FONTS.para_01 }}>{institute?.institute_name}</p>
            <img src={institute?.logo ?? GetImageUrl(institute?.logo)} alt="" className='w-[265px] h-[290px] self-center' />
        </div>
    )
}

export default InstituteDetails