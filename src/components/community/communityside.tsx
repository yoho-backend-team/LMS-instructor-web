import { useEffect, useState } from 'react';
import msgframe from '../../assets/icons/community/Frame 5185.png';
import doubleicon from '../../assets/icons/community/Group 210.png';
import cursor from '../../assets/icons/community/Icon.png';
import { toast } from 'react-toastify';
import { getMessage } from '@/features/community/services/communityservices';
import { GetLocalStorage } from '@/utils/helper';
import { useInstructorSocket } from '@/context/socketContext';
import { selectCommunities } from '@/features/community/redux/communitySelector';
import { useSelector } from 'react-redux';
import { getAllCommunitiesData } from '@/features/community/redux/commuityThunk';
import { useAppDispatch } from '@/features/community/redux/hooks';

type Community = {
  _id: string;
  group: string;
  last_message?: {
    message: string;
    timestamp: string;
  };
  users: { user: string; isblock: boolean }[];
  groupimage?: string;
  admin?: { first_name: string }[];
  batch?: {
    _id: string;
    batch_name: string;
    groupImage?: string;
  };
};

type Chat = {
  _id: string;
  name: string;
  lastMessage: string;
  time: string;
  members: string;
  groupImage?: string;
  admin: string;
};

type Message = {
  content: string;
  time: string;
  sender?: string;
  sender_name?: string;
  name: string;
  message?: string;
  timestamp?: string | Date;
  groupId?: string;
  senderId?: string;
};

const CommunitySide = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useInstructorSocket();
  const dispatch = useAppDispatch();
  const communities = useSelector(selectCommunities);
  const user: any = GetLocalStorage("instructorDetails");

  console.log("Communities", communities)

  useEffect(() => {
    dispatch(getAllCommunitiesData(''));
  }, [dispatch]);

  useEffect(() => {
    if (communities) {
      setFilteredCommunities(
        communities?.filter((group: Community) =>
          group?.batch?.batch_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, communities]);

  const handleChatClick = (chat: Community) => {
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

  const handleSendMessage = () => {
    if (!socket || !selectedChat || !inputMessage.trim() || !user?._id) return;
    
    const message: Message = {
      content: inputMessage,
      groupId: selectedChat._id,
      senderId: user._id,
      name: user?.full_name || '',
      time: new Date().toISOString(),
    };

    socket.emit('sendMessage', message);
    setMessages((prev) => [...prev, message]);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const FetchMessages = async () => {
    try {
      if (!selectedChat?._id) return;
      const params = { community: selectedChat._id };
      const data = await getMessage(params);
      setMessages(data?.data?.reverse() || []);
    } catch (error: any) {
      toast.error(error?.message || 'Error fetching messages');
    }
  };

  useEffect(() => {
    FetchMessages();
  }, [selectedChat]);

  const formatMessageDate = (date?: string | Date): string => {
    if (!date) return '';

    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date): boolean => {
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    };

    const formatTime = (d: Date): string => {
      return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    };

    if (isSameDay(messageDate, today)) {
      return formatTime(messageDate);
    }

    if (isSameDay(messageDate, yesterday)) {
      return `Yesterday ${formatTime(messageDate)}`;
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 6);

    if (messageDate >= oneWeekAgo) {
      const weekday = messageDate.toLocaleDateString('en-US', {
        weekday: 'long',
      });
      return `${weekday} ${formatTime(messageDate)}`;
    }

    return messageDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const isMine = (m: Message) => (m.sender ?? m.senderId) === user?._id;

  return (
    <div className='flex flex-col lg:flex-row position-sticky p-4 gap-4'>
      {/* Sidebar */}
      <div className='w-full lg:w-[400px] xl:w-[500px] h-[490px] bg-[#EBEFF3] rounded-xl shadow-2xl'>
        <div className='relative p-2 bg-[#EBEFF3]'>
          <div className='relative mt-4'>
            <input
              type='text'
              placeholder='Search'
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full sticky p-3 h-10 pl-10 bg-[#EBEFF3] rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
            />
            <svg
              className='absolute left-3 top-3.5 h-5 w-5 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div>

        <div className='p-4 h-[calc(500px-80px)] overflow-y-scroll relative bg-[#EBEFF3]'>
          {filteredCommunities?.map((chat) => (
            <div
              key={chat._id}
              className={`relative z-10 flex items-center justify-between p-3 bg-[#EBEFF3] rounded-lg overflow-hidden shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] transition-all ${
                selectedChat?._id === chat._id ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleChatClick(chat)}
            >
              <div className='flex items-center space-x-3'>
                <div className='bg-gray-900 text-white rounded-full h-12 w-12 flex items-center justify-center overflow-hidden'>
                  {chat.batch?.groupImage ? (
                    <img
                      src={chat.batch.groupImage}
                      alt={chat.batch.batch_name}
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <span className='text-lg font-bold'>
                      {chat.batch?.batch_name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className='font-bold text-gray-900'>
                    {chat.batch?.batch_name || chat.group}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {chat.last_message?.message}
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <p className='text-xs text-gray-500'>
                  {chat.last_message?.timestamp &&
                    formatMessageDate(chat.last_message.timestamp)}
                </p>
                <img
                  src={doubleicon}
                  className='mt-1 w-4 h-4 opacity-70'
                  alt='Read receipt'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className='w-2/3 flex flex-col h-[490px] position-sticky'>
        {selectedChat ? (
          <>
            {/* Header */}
            <div className='p-4 border-b border-gray-200 bg-[#EBEFF3] shadow flex items-center'>
              <div className='bg-gray-900 text-white rounded-full h-12 w-12 flex items-center justify-center overflow-hidden mr-3'>
                {selectedChat.groupImage ? (
                  <img
                    src={selectedChat.groupImage}
                    alt={selectedChat.name}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <span className='text-lg font-bold'>
                    {selectedChat.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h2 className='font-bold text-lg text-gray-900'>
                  {selectedChat.name}
                </h2>
                <p className='text-sm text-gray-600'>{selectedChat.members}</p>
              </div>
            </div>

            {/* Messages */}
            <div className='flex-1  bg-[#EBEFF3]  overflow-y-scroll  scroll-smooth relative'>
              <div className='relative z-10 space-y-3 p-2'>
                {messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg max-w-[40%] shadow ${
                      isMine(message)
                        ? 'ml-auto bg-blue-100'
                        : 'mr-auto bg-white'
                    }`}
                  >
                    <span className='text-gray-500 text-xs'>
                      {message?.sender_name}
                    </span>
                    <p>{message?.message || message.content}</p>
                    <p className='text-xs text-gray-500 text-right mt-1'>
                      {formatMessageDate(message?.timestamp || message.time)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className='p-4 border-t bg-[#EBEFF3] flex items-center'>
              <input
                type='text'
                placeholder='Type a Message'
                className='flex-1 border border-[#F4F7F9] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200'
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                className='bg-[#EBEFF3] ml-2 text-white rounded-sm shadow-inner p-2'
                onClick={handleSendMessage}
              >
                <img src={cursor} className='h-5 w-5' alt='Send' />
              </button>
            </div>
          </>
        ) : (
          <div className='flex-1 min-w-0 bg-[#EBEFF3] rounded-xl shadow flex items-center justify-center'>
            <img
              src={msgframe}
              alt='Message frame'
              className='max-w-full h-auto object-contain drop-shadow-lg'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitySide;