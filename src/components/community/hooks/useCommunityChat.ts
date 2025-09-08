/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/community/CommunitySide/hooks/useCommunityChat.ts
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMessage } from '@/features/community/services/communityservices';
import type { Chat, Community, Message } from '../type';

type UseCommunityChatArgs = {
  socket: any;
  userId?: string;
  communities?: Community[];
  receiveEventName?: string;
  userName?: string;
};

export function useCommunityChat({
  socket,
  userId,
  // communities,
  userName,
  receiveEventName = 'receiveMessage',
}: UseCommunityChatArgs) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const selectChat = (chat: Community) => {
    const selected: Chat = {
      _id: chat._id,
      name: chat.batch?.batch_name || chat.group,
      lastMessage: chat.last_message?.message || '',
      time: chat.last_message?.timestamp || '',
      members: `${chat.users.length} members`,
      groupImage: chat.batch?.groupImage,
      admin: chat.admin?.[0]?.first_name || '',
    };
    setSelectedChat(selected);
  };

  const fetchMessages = async (chatId?: string) => {
    try {
      if (!chatId) return;
      const params = { community: chatId };
      const data = await getMessage(params);
      setMessages(data?.data?.reverse() || []);
    } catch (error: any) {
      toast.error(error?.message || 'Error fetching messages');
    }
  };

  useEffect(() => {
    fetchMessages(selectedChat?._id);
  }, [selectedChat?._id]);

  // incoming socket messages
  useEffect(() => {
    if (!socket) return;

    const handler = (msg: Message) => {
      // If the message belongs to the selected room, append it
      if (msg.groupId === selectedChat?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on(receiveEventName, handler);
    return () => {
      socket.off(receiveEventName, handler);
    };
  }, [socket, selectedChat?._id, receiveEventName]);

  const sendMessage = (text: string) => {
    if (!socket || !selectedChat || !text.trim() || !userId) return;

    const message: Message = {
      content: text,
      groupId: selectedChat._id,
      senderId: userId,
      name: userName,
      time: new Date().toISOString(),
    };

    socket.emit('sendMessage', message);
    setMessages((prev) => [...prev, message]);
  };

  const isMine = (m: Message) => (m.sender ?? m.senderId) === userId;

  return {
    selectedChat,
    selectChat,
    messages,
    setMessages,
    sendMessage,
    isMine,
  };
}
