import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ticketicon from "../../assets/icons/Tickets/Mask group.png";
import { COLORS, FONTS } from "@/constants/uiConstants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const ticketData = [
  {
    id: "ANTITS01",
    date: "10 Jan",
    count: 1,
    status: "open",
    contentTitle: "Unable to upload study materials",
    contentDescription: "Instructor reported that PDFs fail to upload due to file size restriction errors.",
  },
  {
    id: "ANTITS02",
    date: "15 Feb",
    count: 2,
    status: "closed",
    contentTitle: "Student progress not updating",
    contentDescription: "Progress bar remains at 0% even after completing all modules.",
  },
  {
    id: "ANTITS03",
    date: "21 Mar",
    count: 1,
    status: "open",
    contentTitle: "Zoom meeting not starting",
    contentDescription: "Live session throws error: 'Meeting ID not valid or expired'.",
  },
  {
    id: "ANTITS04",
    date: "03 Apr",
    count: 3,
    status: "closed",
    contentTitle: "App crashes during attendance",
    contentDescription: "Instructor app crashes when marking attendance for more than 40 students.",
  },
  {
    id: "ANTITS05",
    date: "12 May",
    count: 2,
    status: "open",
    contentTitle: "Audio issues in recorded sessions",
    contentDescription: "Recorded videos do not have instructor voice on certain devices.",
  },
  {
    id: "ANTITS06",
    date: "22 May",
    count: 1,
    status: "closed",
    contentTitle: "Calendar not showing events",
    contentDescription: "Instructor's calendar page is blank even after scheduling classes.",
  },
  {
    id: "ANTITS07",
    date: "01 Jun",
    count: 1,
    status: "closed",
    contentTitle: "Forgot password email not received",
    contentDescription: "Instructor reported not getting reset password link via email.",
  },
  {
    id: "ANTITS08",
    date: "08 Jun",
    count: 4,
    status: "open",
    contentTitle: "Dashboard analytics incorrect",
    contentDescription: "Number of enrolled students showing 0 despite active enrollments.",
  },
  {
    id: "ANTITS09",
    date: "19 Jun",
    count: 2,
    status: "closed",
    contentTitle: "Class reschedule option not working",
    contentDescription: "Unable to update date/time once class has been published.",
  },
  {
    id: "ANTITS10",
    date: "25 Jun",
    count: 3,
    status: "open",
    contentTitle: "Student chat feature missing",
    contentDescription: "Instructors can't see student replies inside the messaging module.",
  },
];

const Tickets = () => {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 4;

  const handleCreate = () => {
    navigate("/tickets/create-ticket");
  };

  const filteredTickets =
    filter === "all"
      ? ticketData
      : ticketData.filter((ticket) => ticket.status === filter);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex min-h-screen flex-col px-4 md:px-8 py-10">
   
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold" style={FONTS.heading_01}>Ticket</h1>
        <Button
          className="bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white rounded-sm cursor-pointer shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] py-5"
          style={FONTS.heading_07}
          variant="outline"
          onClick={handleCreate}
        >
          Create Tickets
        </Button>
      </div>

    
      <div className="flex flex-wrap gap-3 mb-8">
        {["all", "open", "closed"].map((label) => (
          <Button
            key={label}
            className={`cursor-pointer rounded-sm ${
              filter === label
                ? "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
                : "bg-[#ebeff3] !text-black shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
            }`}
            style={FONTS.heading_05}
            variant="outline"
            onClick={() => {
              setFilter(label);
              setCurrentPage(1); 
            }}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Button>
        ))}
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 gap-6 w-full">
        {paginatedTickets.map((ticket) => (
          <Card
            key={ticket.id + Math.random()}
            onClick={() => navigate(`/ticket/${ticket.id}`, { state: ticket })}
            className="relative bg-[#ebeff3] min-h-[231px] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] cursor-pointer"
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle style={{ ...FONTS.heading_01, color: COLORS.blue_02, fontSize: "24px" }}>
                  TICKET #{ticket.id}
                </CardTitle>
                <CardAction>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                        style={FONTS.heading_06}
                        variant="outline"
                      >
                        {ticket.date}
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardAction>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-semibold" style={FONTS.heading_04}>{ticket.contentTitle}</p>
              <p style={FONTS.heading_06}>{ticket.contentDescription}</p>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-1">
                  <img
                    src={ticketicon}
                    alt="Prev"
                    className="w-9 h-9 p-2 rounded-lg shadow-[4px_3px_3px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                  />
                  <p className="ml-3" style={FONTS.heading_04}>{ticket.count}</p>
                </div>
                <CardAction>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        className={`rounded-sm cursor-pointer ${
                          ticket.status === "open"
                            ? "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
                            : "bg-[#ebeff3] !text-black shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                        }`}
                        style={FONTS.heading_04}
                        variant="outline"
                      >
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardAction>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
     

     {totalPages > 1 && (
  <div className="flex justify-center items-center mt-10 gap-2">
   
    <Button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
    >
      <ChevronLeft size={20} />
    </Button>

   
    {[...Array(totalPages)].map((_, index) => {
      const isActive = currentPage === index + 1;
      return (
        <Button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`rounded-full w-10 h-10 px-0 transition-all duration-200 cursor-pointer
            ${
              isActive
                ? "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white hover:from-[#7B00FF] hover:bg-gradient-to-1 hover:to-[#B200FF] hover:text-white "
                : "bg-[#ebeff3] text-black shadow-[3px_3px_5px_rgba(255,255,255,0.7),_inset_2px_2px_3px_rgba(189,194,199,0.75)]  "
            }`}
          variant="ghost"
        >
          {index + 1}
        </Button>
      );
    })}

  
    <Button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
    >
      <ChevronRight size={20} />
    </Button>
  </div>
)}

    </div>
  );
};

export default Tickets;
