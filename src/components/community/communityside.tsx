/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo, useState } from "react";
import msgframe from "@/assets/icons/community/Frame 5185.png";
import { GetLocalStorage } from "@/utils/helper";
import { useInstructorSocket } from "@/context/socketContext";
import Sidebar from "./sidebar";
import ChatHeader from "./chatHeader";
import MessageList from "./messageList";
import ChatInputWithEmojiPicker from "./chatInputWithEmojiPicker";
import type { CommunitiesProp, Community } from "./type.ts";
import { useCommunityChat } from "./hooks/useCommunityChat";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { bg } from "date-fns/locale";

type Props = {
  communities: CommunitiesProp;
};

const CommunitySide: React.FC<Props> = ({ communities }) => {
  const socket = useInstructorSocket();
  const user: any = GetLocalStorage("instructorDetails");
  const [searchTerm, setSearchTerm] = useState("");

  const { selectedChat, selectChat, messages, sendMessage, isMine } =
    useCommunityChat({
      socket,
      userId: user?._id,
      userName: user?.full_name,
      communities: communities.data,
      receiveEventName: "sendMessage",
    });

  const bottomRef = useAutoScroll<HTMLDivElement>([messages]);

  const filteredCommunities = useMemo<Community[]>(() => {
    const list = communities?.data ?? [];
    if (!searchTerm) return list;
    return list.filter((g) =>
      g?.batch?.batch_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [communities?.data, searchTerm]);

  const formatMessageDate = (date?: string | Date): string => {
    if (!date) return "";

    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date): boolean =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const formatTime = (d: Date): string =>
      d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

    if (isSameDay(messageDate, today)) return formatTime(messageDate);
    if (isSameDay(messageDate, yesterday))
      return `Yesterday ${formatTime(messageDate)}`;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 6);
    if (messageDate >= oneWeekAgo) {
      const weekday = messageDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      return `${weekday} ${formatTime(messageDate)}`;
    }

    return messageDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row position-sticky p-4 gap-4">
      {/* Sidebar */}
      <Sidebar
        communities={filteredCommunities}
        selectedChat={selectedChat}
        onSelectChat={selectChat}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        formatMessageDate={formatMessageDate}
      />

      {/* Chat Area */}
      <div className="w-full lg:w-2/3 2xl:w-full flex flex-col h-[85vh] sm:h-[75vh] position-sticky ">
        {selectedChat ? (
          <>
         <div className="p-3 bg-[#EBEFF3] rounded-lg overflow-hidden shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] transition-all cursor-pointer flex flex-col h-[75vh]">
  {/* Header - stays fixed */}
  <div className="flex-shrink-0 mb-2">
    <ChatHeader chat={selectedChat} />
  </div>

  {/* Scrollable message area with background */}
  <div
    className="flex-1 overflow-y-auto px-2 py-1 rounded-md"
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >
    <MessageList
      messages={messages}
      formatMessageDate={formatMessageDate}
      isMine={isMine}
      bottomRef={bottomRef}
    />
  </div>

  {/* Input area - stays fixed */}
  <div className="flex-shrink-0 mt-2">
    <ChatInputWithEmojiPicker onSend={sendMessage} />
  </div>
</div>

          </>
        ) : (
          <div className="flex-1 min-w-0 bg-[#EBEFF3] rounded-xl shadow flex items-center justify-center ">
            <img
              src={msgframe}
              alt="Message frame"
              className="max-w-full h-auto object-contain drop-shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitySide;
