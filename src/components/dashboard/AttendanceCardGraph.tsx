import { selectAttendance } from '@/features/attentance/reduces/selectors';

import { useSelector } from 'react-redux';

 

type WaveGraphProps = {
  value: number
  total: number
  color: string
  waveType?: number
  pointerShape?: "circle" | "diamond" | "hex"
}

const WaveGraph = ({ value, total, color, waveType = 1, pointerShape = "circle" }: WaveGraphProps) => {
  const width = 400
  const height = 100
  const centerY = (height / 2) + 30
  const amplitude = waveType === 1 ? 18 : waveType === 2 ? 12 : 22
  const frequency = waveType === 1 ? 2.5 : waveType === 2 ? 3.2 : 1.8

  const percentage = total ? (value / total) * 100 : 100

  const indicatorX = Math.min((percentage / 100) * width, width - 10)

  const generateWavePath = () => {
    const points = []
    const numPoints = 50
    for (let i = 0; i <= numPoints; i++) {
      const x = (i / numPoints) * width
      const y = centerY + Math.sin((i / numPoints) * Math.PI * frequency) * amplitude
      points.push({ x, y })
    }

    let path = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cp1x = prev.x + (curr.x - prev.x) / 3
      const cp1y = prev.y
      const cp2x = prev.x + (2 * (curr.x - prev.x)) / 3
      const cp2y = curr.y
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
    }
    return path
  }

  const getYAtX = (x: number) => {
    const normalizedX = x / width
    return centerY + Math.sin(normalizedX * Math.PI * frequency) * amplitude
  }

  const indicatorY = getYAtX(indicatorX)

  const renderPointerShape = () => {
    switch (pointerShape) {
      case "diamond":
        return <path d="M0,-6 L6,0 L0,6 L-6,0Z" fill={color} filter="url(#dotGlow)" />
      case "hex":
        return (
          <path
            d="M7,0 L3.5,6 L-3.5,6 L-7,0 L-3.5,-6 L3.5,-6Z"
            fill={color}
            filter="url(#dotGlow)"
            transform="translate(0,0)"
          />
        )
      default:
        return <circle cx={0} cy={0} r="5" fill={color} filter="url(#dotGlow)" />
    }
  }

  return (

    <div className="relative w-full h-32">
      <svg
        width={width}
        height={height + 60}
        viewBox={`0 0 ${width} ${height + 60}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`waveGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="70%" stopColor={color} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={generateWavePath()}
          fill="none"
          stroke={`url(#waveGradient-${color})`}
          strokeWidth="8"
          strokeLinecap="round"
        />

        <g transform={`translate(${indicatorX}, ${indicatorY})`}>
          {renderPointerShape()}
          <circle cx={0} cy={0} r="7" fill="none" stroke="#E9EBED" strokeWidth="3" opacity="0.9" />
        </g>

        <g transform={`translate(${indicatorX }, ${indicatorY - 34})`}>
          <rect
            x="-22"
            y="0"
            width="40"
            height="24"
            rx="14"
            ry="14"
            fill={color}
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }}
          />
          <text x="-2" y="17" textAnchor="middle" fill="white" fontSize="15" fontWeight="700">
            {value}
          </text>
        </g>
      </svg>
    </div>
  )
}

type AttendanceCardProps = {
  label: string
  current: number
  total: number
  color: string
  waveType?: number
  pointerShape?: "circle" | "diamond" | "hex"
}

const AttendanceCard = ({ label, current, total, color, waveType, pointerShape }: AttendanceCardProps) => (
  
  <div
    className="relative w-full rounded-2xl p-2 flex flex-col gap-4"
    style={{
      backgroundColor: "#EBEFF8",
      boxShadow: "-4px -4px 8px rgba(255,255,255,0.8), 5px 5px 8px rgba(189,194,199,0.75)",
    }}
  >
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-medium text-gray-700">{label}</h3>
      <div className="text-right">
        <span className="text-4xl font-bold" style={{ color }}>
          {current}
        </span>
        {total && <span className="text-2xl text-gray-400 font-semibold">/{total}</span>}
      </div>
    </div>
    <div>
      <WaveGraph value={current} total={total} color={color} waveType={waveType} pointerShape={pointerShape} />
    </div>
  </div>
)

export default function AttendanceCardGraph() {
  const attendancedata: any = useSelector(selectAttendance);
  console.log("attendancedata", attendancedata);
  const attendanceData = [
    {
      label: "Total Classes",
      current: attendancedata?.data?.total_class || 0,
      total: attendancedata?.data?.totalWorkingDays || 0,
      color: "#7B00FF",
      waveType: 1,
      pointerShape: "circle",
    },
    {
      label: "Present Days",
     current: attendancedata?.data?.presentDays || 0,
      total: attendancedata?.data?.totalWorkingDays || 0,
      color: "#DF23E6",
      waveType: 2,
      pointerShape: "diamond",
    },
    {
      label: "Absent Days",
      current: attendancedata?.data?.
absentDays || 0,
      total: attendancedata?.data?.totalWorkingDays || 0,
      color: "#38D2DC",
      waveType: 3,
      pointerShape: "hex",
    },
  ]

  return (
    <div className="" style={{ backgroundColor: "#EBEFF3" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendanceData.map((card, i) => (
          <AttendanceCard
            key={i}
            {...card}
            pointerShape={card.pointerShape as "circle" | "diamond" | "hex"}
          />
        ))}
      </div>
    </div>
  )
}