
// AssessmentCard.jsx
// import { FONTS } from "@/constants/uiConstants";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
// import { useSelector } from "react-redux";


const Assesments = () => {

    // const Attendance = useSelector((state: any) => state.dashboard.data) ?? []

    const [activeTab, setactiveTab] = useState<'average' | 'exam' | 'completed'>('average');

    const assessmentDots = [
        { top: "top-[83px]", left: "left-0" },
        { top: "top-0", left: "left-[66px]" },
        { top: "top-[53px]", left: "left-[132px]" },
        { top: "top-5", left: "left-[198px]" },
        { top: "top-[3px]", left: "left-[260px]" },
        { top: "top-[35px]", left: "left-[318px]" },
        { top: "top-[33px]", left: "left-[381px]" },
    ];

    return (
        <>
            <Card className="w-full h-[300px] p-5 flex flex-col items-start gap-2.5 relative bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
                <CardContent className="flex flex-col w-[400px] items-start gap-5 relative flex-[0_0_auto] p-0">
                    <div className="relative self-stretch mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[normal]">
                        Assesments
                    </div>

                    <div className="relative w-[399.55px] h-[153px]">
                        <div className="relative w-[400px] h-[153px]">
                            <div className="absolute w-[400px] h-[153px] top-0 left-0">
                                <div className="relative h-[153px]">

                                    <div className="absolute w-[400px] h-[103px] top-0 left-0">
                                        <div className="relative w-[423px] h-[117px] -top-px -left-2 bg-[url(https://c.animaapp.com/mck68j5cT59wYP/img/vector-1.svg)] bg-[100%_100%]">
                                            <div className="relative w-[400px] h-[103px] top-px left-2">
                                                {assessmentDots.map((dot, index) => (
                                                    <div
                                                        key={`dot-${index}`}
                                                        className={`absolute w-[20px] h-[20px] ${dot.top} ${dot.left} rounded-[9.28px/9.67px] 
                                                             divshadow
                                                             bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                activeTab === 'average' &&
                                <div>
                                    <div className="absolute w-[12px] h-[118px] top-[35px] left-[72px] bg-[#ebeff3] rounded-2xl border-[0.4px] border-solid border-[#f4f6f8] shadow-[2px_2px_4px_#ffffffbf,inset_1px_1px_2px_#bdc2c7bf]" />
                                    <div className="flex flex-col w-[52px] h-[54px] items-center justify-center gap-2.5 px-[13px] py-3.5 absolute top-[99px] left-[50px] rounded-[56px] shadow-[inset_4px_4px_8px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#73e2bbbf,inset_-8px_-8px_12px_#73e2bbcc,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]">
                                        <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal]">
                                            4%
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                activeTab === 'exam' &&
                                <div>
                                    <div className="absolute w-[12px] h-[110px] top-[45px] left-[50%] bg-[#ebeff3] rounded-2xl border-[0.4px] border-solid border-[#f4f6f8] shadow-[2px_2px_4px_#ffffffbf,inset_1px_1px_2px_#bdc2c7bf]" />
                                    <div className="flex flex-col w-[52px] h-[54px] items-center justify-center gap-2.5 px-[13px] py-3.5 absolute top-[99px] left-[45%] rounded-[56px] shadow-[inset_4px_4px_8px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#73e2bbbf,inset_-8px_-8px_12px_#73e2bbcc,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]">
                                        <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal]">
                                            4%
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                activeTab === 'completed' &&
                                <div>
                                    <div className="absolute w-[12px] h-[100px] top-[60px] left-[80%] bg-[#ebeff3] rounded-2xl border-[0.4px] border-solid border-[#f4f6f8] shadow-[2px_2px_4px_#ffffffbf,inset_1px_1px_2px_#bdc2c7bf]" />
                                    <div className="flex flex-col w-[52px] h-[54px] items-center justify-center gap-2.5 px-[13px] py-3.5 absolute top-[99px] left-[75%] rounded-[56px] shadow-[inset_4px_4px_8px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#73e2bbbf,inset_-8px_-8px_12px_#73e2bbcc,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]">
                                        <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal]">
                                            4%
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>


                </CardContent>
                <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                    <Button
                        onClick={() => setactiveTab('average')}
                        className={activeTab === 'average' ?
                            " cursor-pointer flex w-[114px] h-[42px] items-center text-white justify-center gap-2.5 px-3 py-2 relative rounded-lg shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)]"
                            :
                            " cursor-pointer flex w-[114px] h-[42px] items-center text-[#706f6f]  justify-center gap-2.5 px-4 py-3.5 relative bg-[#ebeff3] rounded-lg border border-solid border-[#f4f7f9] shadow-[inset_2px_2px_8px_#bdc2c7bf,4px_4px_8px_#ffffffbf] hover:shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] hover:bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white"
                        }>
                        {/* <img
                            className="relative w-6 h-6 ml-[-0.50px]"
                            alt="Chart icon"
                            src="https://c.animaapp.com/mck68j5cT59wYP/img/vuesax-linear-chart.svg"
                        /> */}
                        {/* <span className="relative w-fit mr-[-0.50px] [font-family:'Quicksand',Helvetica] font-bold text-white text-sm text-center tracking-[0] leading-[normal]"> */}
                        Average
                        {/* </span> */}
                    </Button>

                    <Button
                        onClick={() => setactiveTab('exam')}
                        variant="outline"
                        className={activeTab === 'exam' ?
                            "cursor-pointer flex w-[114px] h-[42px] items-center text-white justify-center gap-2.5 px-3 py-2 relative rounded-lg shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white"
                            :
                            "cursor-pointer flex w-[114px] h-[42px] items-center text-[#706f6f]  justify-center gap-2.5 px-4 py-3.5 relative bg-[#ebeff3] rounded-lg border border-solid border-[#f4f7f9] shadow-[inset_2px_2px_8px_#bdc2c7bf,4px_4px_8px_#ffffffbf] hover:shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] hover:bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white"
                        }>
                        {/* <img
                            className="relative w-6 h-6 mt-[-5.00px] mb-[-5.00px] ml-[-4.00px]"
                            alt="Clipboard icon"
                            src="https://c.animaapp.com/mck68j5cT59wYP/img/vuesax-linear-clipboard-text.svg"
                        /> */}
                        {/* <span className="relative w-fit mt-[-3.00px] mb-[-1.00px] mr-[-4.00px] [font-family:'Quicksand',Helvetica] font-bold text-[#706f6f] text-sm tracking-[0] leading-[normal]"> */}
                        Exam
                        {/* </span> */}
                    </Button>

                    <Button
                        onClick={() => setactiveTab('completed')}
                        variant="outline"
                        className={activeTab === 'completed' ?
                            "cursor-pointer flex w-[114px] h-[42px] items-center text-white justify-center gap-2.5 px-3 py-2 relative rounded-lg shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white"
                            :
                            "cursor-pointer flex w-[114px] h-[42px] items-center text-[#706f6f]  justify-center gap-2.5 px-4 py-3.5 relative bg-[#ebeff3] rounded-lg border border-solid border-[#f4f7f9] shadow-[inset_2px_2px_8px_#bdc2c7bf,4px_4px_8px_#ffffffbf] hover:shadow-[inset_-2px_4px_15px_#ffffffbf,inset_8px_8px_12px_#ffffff40,inset_-4px_-4px_8px_#6ae1b7,inset_-8px_-8px_12px_#6ae1b7,4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40] hover:bg-[linear-gradient(90deg,rgba(106,225,183,1)_0%,rgba(106,225,183,0.92)_52%,rgba(106,225,183,1)_100%)] hover:text-white"
                        }>
                        {/* <img
                            className="relative w-6 h-6 mt-[-5.00px] mb-[-5.00px] ml-[-5.50px]"
                            alt="Task icon"
                            src="https://c.animaapp.com/mck68j5cT59wYP/img/vuesax-linear-task-square.svg"
                        /> */}
                        {/* <span className="relative w-fit mt-[-3.00px] mb-[-1.00px] mr-[-5.50px] [font-family:'Quicksand',Helvetica] font-bold text-[#706f6f] text-sm tracking-[0] leading-[normal]"> */}
                        Completed Task
                        {/* </span> */}
                    </Button>
                </div>
            </Card>
        </>
    );
};

export default Assesments;
