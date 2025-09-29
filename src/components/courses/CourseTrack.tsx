import { COLORS, FONTS } from "@/constants/uiConstants"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { useNavigate, useParams } from "react-router-dom"
import navigationicon from '../../assets/courses icons/navigation arrow.svg';
import { useEffect, useState } from "react";
import { getWithUuidBatches, UpdateModuleWithUuidBatches } from "@/features/Course/services/Course";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "react-toastify";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const CourseTrack = () => {
    const { batchId } = useParams();
    const [SelectBatches, setSelectBatches] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBatchWithUuid = async () => {
            const batchUUId = { batchId }
            const response = await getWithUuidBatches(batchUUId)
            console.log("batch with uuid", response);
            setSelectBatches(response?.data || []);
        }
        fetchBatchWithUuid();
    }, [batchId])

    const updateModuleStatus = async (id: any, value: any) => {
        const params = { batchId }
        const data = { moduleId: id, status: value }
        const response = await UpdateModuleWithUuidBatches(params, data)
        if (response.success) {
            toast.success("Module status updated successfully")
        }
    }


    console.log("selected batch", SelectBatches);
    return (
        <div className="w-full p-6">
            <div className="flex justify-between">
                <div className='flex items-center gap-3 mb-6'>
                    <Button
                        onClick={() => navigate('/batches')}
                        className='bg-[#EBEFF3] cursor-pointer text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
                    >
                        <img src={navigationicon} />
                    </Button>
                    <h1 style={{ ...FONTS.heading_02 }}>Course-Modules</h1>
                </div>
                <div><h1>Batch Name: <span style={{ ...FONTS.heading_02 }}>{SelectBatches?.batch_name}</span></h1></div>
            </div>
            <Card className='overflow-hidden bg-[#EBEFF3] rounded-xl shadow-inner'>
                <div className='flex flex-col'>
                    <Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-4 mx-4 rounded-md sticky top-0 z-10 mb-4'>
                        <div className='grid grid-cols-3 gap-4  text-center !text-white'>
                            <div style={{ ...FONTS.heading_02, color: COLORS.white }}>
                                Module Name
                            </div>
                            <div style={{ ...FONTS.heading_02, color: COLORS.white }}>
                                Description
                            </div>
                            <div style={{ ...FONTS.heading_02, color: COLORS.white }}>
                                Status
                            </div>

                        </div>
                    </Card>

                    <div className='overflow-y-auto mx-4'>
                        {SelectBatches?.course_modules?.length ? (
                            SelectBatches?.course_modules?.map((item: any, index: any) => (
                                <Card
                                    key={index}
                                    className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-md rounded-lg'
                                >
                                    <div className='grid grid-cols-3 gap-4 text-center items-center'>
                                        <div style={{ ...FONTS.para_01 }}>{item?.module?.title}</div>
                                        <div style={{ ...FONTS.para_01 }}>{item?.module?.description}</div>
                                        <div style={{ ...FONTS.para_01 }} className="flex justify-center">
                                            <Select onValueChange={(value) => updateModuleStatus(item?._id, value)} defaultValue={item?.status}>
                                                <SelectTrigger className={`
      ${item?.status === "completed" ? "bg-green-100 text-green-700 border-green-400 cursor-pointer" : ""}
      ${item?.status === "in-progress" ? "bg-orange-100 text-orange-700 border-orange-400 cursor-pointer" : ""}
      ${item?.status === "not-started" ? "bg-red-100 text-red-700 border-red-400 cursor-pointer" : ""}
    `}>
                                                    <SelectValue placeholder={item?.status} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem className="cursor-pointer" value="not-started">Not Started</SelectItem>
                                                    <SelectItem className="cursor-pointer" value="in-progress">In Progress</SelectItem>
                                                    <SelectItem className="cursor-pointer" value="completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div className='flex justify-center mt-3'>
                                <p style={{ ...FONTS.heading_06 }}>No modules available</p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CourseTrack