/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom';
import ticketicon from '../../assets/icons/Tickets/back.png';
import messageicon from '../../assets/icons/Tickets/Frame 301.png';
import sendicon from '../../assets/icons/Tickets/Frame 5386.png';
import { Button } from '@/components/ui/button';
import { COLORS, FONTS } from "@/constants/uiConstants";
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetImageUrl, GetLocalStorage } from '@/utils/helper';
import { socketConnect } from '../../socket/socket'
import socket from '../../socket/socket'
import { useEffect, useRef, useState } from 'react';

const TicketId = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const ticket = location.state;
  const [Messages, setMessages] = useState<any[]>(ticket?.messages);
  const inputValue = useRef<HTMLInputElement | null>(null)
  const instructor: any = GetLocalStorage("instructorDetails")

  const handleBack = () => {
    navigate(-1);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getSenderName = (senderType: string) => {
    switch (senderType) {
      case "InstituteAdmin":
        return "Admin";
      case "Instituteuserlist":
        return ticket?.user?.full_name || "User";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    socketConnect()
    socket.on("connect", () => {
      socket.emit("joinTicket", ticket?.uuid)
    })
    const handleMessage = (message: any) => {
      setMessages((prev: any) => [message, ...prev])
    }
    socket.on("receiveTeacherTicketMessage", handleMessage)
    return () => {
      socket.off("receiveTeacherTicketMessage", handleMessage)
    };
  }, [ticket?.uuid]);

  const handelsend = () => {
    if (!inputValue.current?.value) return;

    const newMessage: any = {
      ticket_id: ticket?.uuid,
      text: inputValue.current?.value,
      senderType: "Instituteuserlist",
      user: instructor?._id
    };
    socket.emit("sendTeacherTicketMessage", newMessage)
    inputValue.current.value = ""
  }


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img
            src={ticketicon}
            alt="Back"
            className="cursor-pointer"
            onClick={handleBack}
          />
          <h1 className="text-2xl font-semibold" style={{ ...FONTS.heading_01 }}>Ticket</h1>
        </div>
        <h2 className="text-lg font-semibold text-gray-700" style={{ ...FONTS.heading_04, color: COLORS.blue_02, fontSize: '24px' }}>
          TICKET ID: Ticket #{id}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#ebeff3] h-[550px] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]" style={{ ...FONTS.heading_04 }}>
          <CardHeader>
            <CardTitle>
              <h1>#{id} {ticket?.query || 'This ticket was created from the student Mobile App'}</h1>
            </CardTitle>
          </CardHeader>

          <CardContent className="overflow-y-auto h-[500px] pb-4 scrollbar-hide">
            <div className="flex flex-col-reverse gap-4">
              {Messages?.map((message: any) => (
                <Card
                  key={message._id}
                  className={`w-[250px] h-auto ${message.senderType === "InstituteAdmin"
                    ? "self-start ml-10"
                    : "self-end mr-10"
                    } bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]`}
                >
                  <CardContent className="pb-3 ">
                    <div className="flex justify-between items-center mb-2 ">
                      <p className="text-sm !text-gray-800 font-medium" style={{ ...FONTS.para_01, fontSize: '15px' }}>
                        {getSenderName(message.senderType)}
                      </p>
                      <p className="text-xs !text-gray-500" style={{ ...FONTS.para_01, fontSize: '12px' }}>
                        {formatDate(message.date)}
                      </p>
                    </div>
                    {message.senderType === "InstituteAdmin" && message.content.toLowerCase().includes("problem solved") ? (
                      <div className="flex justify-end pt-6 pl-6">
                        <Button
                          className="px-2 py-1 text-xs rounded-sm bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white 
                          shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] 
                          hover:opacity-90 transition"
                          style={{ ...FONTS.para_01, fontSize: '15px' }}
                        >
                          {message.content}
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm !text-gray-700 pt-6 pl-6" style={{ ...FONTS.para_01, fontSize: '14px' }}>
                        {message.content}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>

          <CardFooter className="px-4">
            <div className="flex flex-col sm:flex-row items-center w-full gap-3">

              {/* Message Icon */}
              {/* <div className="p-2 bg-[#ebeff3] rounded-md flex items-center justify-center w-15 h-15">
                <img
                  src={messageicon}
                  alt="Message"
                  className="w-20 h-20 object-contain cursor-pointer"
                />
              </div> */}

              {/* Input Box */}
              <div className="flex-1 w-full bg-[#ebeff3] rounded-md shadow-[inset_2px_2px_5px_rgba(189,194,199,0.75),3px_3px_5px_rgba(255,255,255,0.7)] px-3 py-2">
                <input
                  type="text"
                  placeholder="Say Something..."
                  ref={inputValue}
                  className="w-full bg-transparent focus:outline-none text-sm text-gray-800"
                  style={{ ...FONTS.para_01, fontSize: '15px' }}
                />
              </div>

              {/* Send Icon */}
              <div className="p-2 bg-[#ebeff3] rounded-md flex items-center justify-center w-15 h-15 cursor-pointer" onClick={handelsend}>
                <img
                  src={sendicon}
                  alt="Send"
                  className="w-20 h-20 object-contain cursor-pointer"
                />
              </div>
            </div>
          </CardFooter>

        </Card>

        <Card className="bg-[#ebeff3] p-4 rounded-xl w-full shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Issue Description</label>
              <div className="bg-[#ebeff3] text-sm !text-gray-700 mt-6 rounded-md p-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ ...FONTS.para_01, fontSize: '14px' }}>
                {ticket?.description || "No description available"}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Issue Category</label>
              <div className="bg-[#ebeff3] text-sm mt-6 !text-gray-700 rounded-md p-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ ...FONTS.para_01, fontSize: '14px' }}>
                {ticket?.category || "General"}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Attachments</label>
              <div className="bg-[#ebeff3] text-sm !text-gray-700 mt-6 rounded-md p-3 flex justify-between items-center shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ ...FONTS.para_01, fontSize: '14px' }}>
                <span>{ticket?.file ? "Attachment available" : "No Attachment"}</span>
                {ticket?.file && (
                  <a href={GetImageUrl(ticket.file) ?? ""} target="_blank" rel="noopener noreferrer" className="!text-[#7b00ff] text-sm font-medium hover:underline">
                    View
                  </a>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Status</label>
              <div className="bg-[#ebeff3] rounded-md p-2 mt-5 w-full shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                <Button className="px-2 py-1 text-xs rounded-sm bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white 
                          shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] 
                          hover:opacity-90 transition" style={{ ...FONTS.para_01, fontSize: '15px' }}>
                  {ticket?.status ? ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1) : "Unknown"}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Messages</label>
              <div className="bg-[#ebeff3] text-sm !text-gray-700 rounded-md mt-5 p-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ ...FONTS.para_01, fontSize: '14px' }}>
                {ticket?.messages?.length || 0}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketId;