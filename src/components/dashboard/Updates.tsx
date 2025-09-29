import React, { useEffect, useState } from "react";
import { FONTS } from "@/constants/uiConstants";
import updatesimg from "../../assets/dashboard/updates.png";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotificationsThunk } from "@/features/Notifications/reducers/thunks";

const Updates: React.FC = () => {
  const nowdate = new Date();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllNotificationsThunk({}));
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState<"today" | "upcoming">("today");

  const dts = useSelector((state: any) => state.NotificationSlice.data) ?? [];
  const data = dts.filter((item: any) => item.createdAt === nowdate);
  const prev = dts.filter((item: any) => item.createdAt !== nowdate);

  return (
    <div className="flex flex-col gap-5 divshadow w-full h-[620px] rounded-[16px] p-5">
      {/* HEADER */}
      <div className="flex flex-row justify-between">
        <h1 style={{ ...FONTS.heading_02 }}>Updates</h1>
        <p style={{ ...FONTS.para_01 }}>
          <span>{data.length}</span> New Messages
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-row gap-4">
        <button
          onClick={() => setActiveTab("today")}
          style={FONTS.heading_06}
          className={
            activeTab === "today"
              ? "btnshadow !text-white btnfocusshadow w-[86px] h-[42px] rounded-xl"
              : "text-[#716F6F] btnshadow w-[86px] h-[42px] rounded-xl btnhovershadow hover:text-white"
          }
        >
          Today
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          style={FONTS.heading_06}
          className={
            activeTab === "upcoming"
              ? "btnshadow !text-white btnfocusshadow w-[86px] h-[42px] rounded-xl"
              : " btnshadow w-[86px] h-[42px] rounded-xl btnhovershadow hover:text-white text-white"
          }
        >
          Previous
        </button>
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto pr-2">
        {activeTab === "today" ? (
          data.length === 0 ? (
            <div className="flex flex-col w-full items-center gap-3 mt-10">
              <img src={updatesimg} alt="" className="w-[300px] h-[180px]" />
              <h1 style={FONTS.heading_04}>No New Message found</h1>
              <p style={FONTS.para_02}>Any updates will appear here when available</p>
            </div>
          ) : (
            data.map((item?:any, index?:any) => (
              <Card
                key={index}
                className={`relative bg-[#ebeff3] lg:h-[165px] cursor-pointer shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] ${
                  item?.status === "unread"
                    ? "border-l-4 border-[#7b00ff]"
                    : "border-l-4 border-[#ebeff3]"
                }`}
              >
                <CardHeader>
                  <div className="flex lg:flex-row md:flex-col-reverse lg:justify-between md:items-start md:gap-4 lg:items-center">
                    <div>
                      <CardTitle style={FONTS.heading_02}>{item?.title}</CardTitle>
                    </div>
                    <CardAction>
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                            variant="outline"
                          >
                            {item?.createdAt.split("T")[0]}
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </CardAction>
                  </div>
                </CardHeader>
                <CardContent>
                  <p style={FONTS.para_01}>{item?.body}</p>
                </CardContent>
              </Card>
            ))
          )
        ) : activeTab === "upcoming" ? (
          prev.length === 0 ? (
            <div className="flex flex-col w-full items-center gap-3 mt-10">
              <img src={updatesimg} alt="" className="w-[300px] h-[180px]" />
              <h1 style={FONTS.heading_04}>No New Message found</h1>
              <p style={FONTS.para_02}>Any updates will appear here when available</p>
            </div>
          ) : (
            prev.map((item?:any, index?:any) => (
              <Card
                key={index}
                className={`relative bg-[#ebeff3] lg:h-[165px] cursor-pointer shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] ${
                  item?.status === "unread"
                    ? "border-l-4 border-[#7b00ff]"
                    : "border-l-4 border-[#ebeff3]"
                }`}
              >
                <CardHeader>
                  <div className="flex lg:flex-row md:flex-col-reverse lg:justify-between md:items-start md:gap-4 lg:items-center">
                    <div>
                      <CardTitle style={FONTS.heading_02}>{item?.title}</CardTitle>
                    </div>
                    <CardAction>
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                            variant="outline"
                          >
                            {item?.createdAt.split("T")[0]}
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </CardAction>
                  </div>
                </CardHeader>
                <CardContent>
                  <p style={FONTS.para_01}>{item?.body}</p>
                </CardContent>
              </Card>
            ))
          )
        ) : null}
      </div>
    </div>
  );
};

export default Updates;
