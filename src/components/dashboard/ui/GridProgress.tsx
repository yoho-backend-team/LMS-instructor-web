import { CircularProgressWithLabelDemo } from "@/components/dashboard/ui/Progeress"
import type React from "react";
import { FONTS } from "@/constants/uiConstants";
import { dashicons } from "@/assets/icons/dashboard";

interface propstype {
    title: string;
    value: number;
    icon: string;
}

const GridProgress: React.FC<propstype> = ({ title, value, icon }) => {
    const color = {
        totalclass: "stroke-[#18BABA]",
        completed: "stroke-[#3ABE65]",
        pending: "stroke-[#6623E6]",
        liveclass: "stroke-[#DF23E6]",
        onlineclass: "stroke-[#A32AF3]",
        offlineclass: "stroke-[#E67123]",
    }
    return (
        <div className="flex flex-row justify-between px-4 py-2">
            <div className="flex flex-col">
                <h3
                    style={{ ...FONTS.heading_05 }}
                    className="!text-[12px]">{title ?? "title"}</h3>
                <img src={dashicons[icon as keyof typeof dashicons]} alt="" width={40} height={40} className="mt-2" />
            </div>
            <div className="w-[50px] h-[50px]">
                <CircularProgressWithLabelDemo value={value} color={color[icon as keyof typeof color]} />
            </div>
        </div >
    )
}

export default GridProgress