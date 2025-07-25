// src/components/community/CommunitySide/ChatHeader.tsx
import React from 'react';
import type { Chat } from './type';

type Props = { chat: Chat };

const ChatHeader: React.FC<Props> = ({ chat }) => {
  return (
    <div className="p-4 border-b border-gray-200 bg-[#EBEFF3] shadow flex items-center">
      <div className="bg-gray-900 text-white rounded-full h-12 w-12 flex items-center justify-center overflow-hidden mr-3">
        {chat.groupImage ? (
          <img src={chat.groupImage} alt={chat.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-lg font-bold">{chat.name?.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div>
        <h2 className="font-bold text-lg text-gray-900">{chat.name}</h2>
        <p className="text-sm text-gray-600">{chat.members}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
