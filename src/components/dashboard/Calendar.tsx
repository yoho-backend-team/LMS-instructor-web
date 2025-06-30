import React from 'react'
import { Calendar } from '../ui/calendar'
import { COLORS, FONTS } from '@/constants/uiConstants'
import { TabViewResponsive } from '@/hooks/TabViewResponce/TabViewResponsive'

const CalendarDash: React.FC = () => {
    const date = new Date()
    const { TabView } = TabViewResponsive()
    return (
        <div className='divshadow w-full h-full rounded-[16px] p-2'>
            <h1 style={{ ...FONTS.heading_02 }} className='mb-4'>Calendar</h1>
            {
                TabView ?
                    <Calendar
                        mode="single"
                        selected={date}
                        // onSelect={setDate}
                        className="rounded-md border shadow-lg bg-gray-100"
                        style={{ backgroundColor: COLORS.bg_Colour }}
                        captionLayout="dropdown"
                    /> :
                    <Calendar
                        mode="single"
                        selected={date}
                        // onSelect={setDate}
                        className="rounded-md border shadow-lg bg-gray-100  w-full  **:mt-1"
                        style={{ backgroundColor: COLORS.bg_Colour }}
                        captionLayout="dropdown"
                    />
            }

        </div>
    )
}

export default CalendarDash