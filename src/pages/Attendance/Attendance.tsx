'use client'

import { COLORS, FONTS } from '@/constants/uiConstants'
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import filter from '../../assets/icons/common/Mask group.png'
import { startOfMonth, setMonth, setYear } from 'date-fns'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'


const chartData = [
  { month: 'January', desktop: 120 },
  { month: 'February', desktop: 135 },
  { month: 'March', desktop: 120},
  { month: 'April', desktop: 137 },
   { month: 'May', desktop: 120 },
  { month: 'June', desktop: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Day',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const attendanceCards = [
  {
    label: "Classes Attend",
    current: 32,
    total: 40,
    color: COLORS.light_blue,
  },
  {
    label: "Present Days",
    current: 12,
    total: 40,
    color: COLORS.light_pink,
  },
  {
    label: "Absent Days",
    current: 23,
    total: 40,
    color: COLORS.light_green_02,
  },
]

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedMonth, setSelectedMonth] = useState<string>(months[selectedDate.getMonth()])
  const [selectedYear, setSelectedYear] = useState<number>(selectedDate.getFullYear())
  const [showFilters, setShowFilters] = useState<boolean>(false)

  // const current = new Date()

  const handleMonthChange = (newMonth: string) => {
    const monthIndex = months.indexOf(newMonth)
    const updatedDate = startOfMonth(setMonth(selectedDate, monthIndex))
    setSelectedMonth(newMonth)
    setSelectedDate(updatedDate)
  }

  const handleYearChange = (newYear: string) => {
    const numericYear = parseInt(newYear, 10)
    const updatedDate = startOfMonth(setYear(selectedDate, numericYear))
    setSelectedYear(numericYear)
    setSelectedDate(updatedDate)
  }

  const handleCalendarMonthChange = (newMonth: Date) => {
    setSelectedDate(newMonth)
    setSelectedMonth(months[newMonth.getMonth()])
    setSelectedYear(newMonth.getFullYear())
  }

  const years = Array.from({ length: 5 }, (_, i) => 2021 + i)

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold mb-0 mx-1" style={{ ...FONTS.heading_01 }}>Attendance</h2>

        <div className="relative flex items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:scale-105 transition z-10"
            style={{ backgroundColor: COLORS.bg_Colour }}
          >
            <img src={filter} alt="Filter" className="w-6 h-6" />
          </button>

          <div
            className={`absolute right-full top-1/2 transform -translate-y-1/2 mr-4 flex gap-4 ${
              showFilters ? 'opacity-100 max-w-[400px]' : 'opacity-0 max-w-0 overflow-hidden'
            }`}
          >
            <Select value={selectedMonth} onValueChange={handleMonthChange}>
              <SelectTrigger
                style={{ ...FONTS.para_02, backgroundColor: COLORS.bg_Colour }}
                className="w-max-sm rounded-sm border-0 px-1 py-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
              >
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent className="bg-[#ebeff3] rounded-sm w-[40px] px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                {months.map((month) => (
                  <SelectItem
                    key={month}
                    value={month}
                    className={`
                      cursor-pointer text-gray-700 w-[100px]
                      rounded-sm 
                      bg-[#ebeff3]
                      shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] 
                      data-[state=checked]:bg-gradient-to-r 
                      data-[state=checked]:from-purple-500 
                      data-[state=checked]:to-purple-700 
                      data-[state=checked]:text-white
                      mb-2 transition
                    `}
                    style={{ backgroundColor: COLORS.bg_Colour }}
                  >
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
              <SelectTrigger
                className="w-max-sm rounded-sm border-0 px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
                style={{ ...FONTS.para_02, backgroundColor: COLORS.bg_Colour }}
              >
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="bg-[#ebeff3] rounded-sm w-[40px] px-2 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                {years.map((year) => (
                  <SelectItem
                    key={year}
                    value={year.toString()}
                    className={`
                      cursor-pointer px-2 py-2 text-gray-700 
                      rounded-sm 
                      bg-[#ebeff3]
                      shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(189,194,199,0.6)]
                      data-[state=checked]:bg-gradient-to-r 
                      data-[state=checked]:from-purple-500 
                      data-[state=checked]:to-purple-700 
                      data-[state=checked]:text-white
                      mb-2 transition
                    `}
                    style={{ backgroundColor: COLORS.bg_Colour }}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 justify-center pt-6">
        {attendanceCards.map((card) => (
          <Card
          key={card.label}
          className="
            relative 
            w-full 
             md:max-w-full
            md:h-[150px]
            h-auto 
            shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] 
            overflow-hidden
          "
          style={{ backgroundColor: COLORS.bg_Colour }}
        >
        
            <CardHeader className='md:w-auto md:text-[10px] h-full'>
              <div className="max-w-screen-xl flex justify-between">
                <span style={{ ...FONTS.heading_04 }}>{card.label}</span>
                <span className="text-2xl font-bold" style={{ ...FONTS.heading_01 }}>
                  <span style={{ color: card.color }}>{card.current}</span>
                  <span className="text-sm text-gray-500">/{card.total}</span>
                </span>
              </div>
              </CardHeader>
               <CardContent className='h-full md:h-[30px] md:w-[220px] md:pb-0 lg:w-[100%] lg:mb-2 '>
              <ChartContainer  config={chartConfig} style={{ ...FONTS.para_03 }} >
                {/* <ResponsiveContainer width="100%" height={70}> */}
                  <LineChart data={chartData} margin={{ left: 0, right: 0 }}
                  width={500} 
                  height={70}
                  className='md:mb-20'
                  >
                    <XAxis dataKey="month" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line
                      dataKey="desktop"
                      type="monotone"
                      stroke={card.color}
                      strokeWidth={2.5}
                      dot={true}
                      className='max-w-sm  md:max-w-full h-auto md:h-[60px]'
                    />
                  </LineChart>
                {/* </ResponsiveContainer> */}
              </ChartContainer>
              </CardContent>
           
          </Card>
        ))}
      </div>

      <div className="flex flex-row gap-6 pt-6 ">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4 mt-2" style={{ ...FONTS.heading_02 }}>Calendar</h2>
          <Calendar
            mode="single"
            required
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={selectedDate}
            onMonthChange={handleCalendarMonthChange}
            className="border **:gap-5 **:py-0.5 md:**:gap-2  rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]"
            style={{ ...FONTS.heading_02, backgroundColor: COLORS.bg_Colour }}
            // modifiers={{ current: current }}
            // modifiersClassNames={{
            //   current: "text-[#A32AF3] font-bold" ,
            //   selected: "text-white",
            // }}
          />
        </div>

        <div className="flex flex-col w-full">
          <h3 className="text-lg font-semibold mb-4 mt-2" style={{ ...FONTS.heading_02 }}>
            Day Overview
          </h3>
          <div className="flex flex-col justify-between rounded-md p-6  h-full shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]" style={{ backgroundColor: COLORS.bg_Colour }}>
            <div>
              <p className="text-sm mb-4 text-gray-700" style={{...FONTS.para_01}}>
                {selectedDate ? selectedDate.toDateString() : "Select a date"}
              </p>
              <ul className="space-y-2 text-gray-700" style={{ ...FONTS.heading_06 }}>
                <li>Classes Scheduled: 4</li>
                <li>Classes Attended: 3</li>
                <li>Absent: 1</li>
                <li>Notes: Good performance</li>
              </ul>
            </div>
            <button
              className=" w-max-sm mt-4 self-start px-4 py-2 rounded-md bg-[#7b00ff] !text-white hover:bg-[#7b00ff] hover:text-white shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]"
              style={{ ...FONTS.heading_06 }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance
