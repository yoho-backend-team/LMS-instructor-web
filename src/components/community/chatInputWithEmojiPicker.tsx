// src/components/community/CommunitySide/ChatInputWithEmojiPicker.tsx
import React, { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
// import { RiEmojiStickerLine } from 'react-icons/ri';
import cursor from '@/assets/icons/community/Icon.png';
import { useOnClickOutside } from './hooks/useOnClickOutside';

type Props = {
  onSend: (text: string) => void;
};

const ChatInputWithEmojiPicker: React.FC<Props> = ({ onSend }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef: any = useRef<HTMLDivElement>(null);

  useOnClickOutside(pickerRef, () => setShowPicker(false));

  const handleSelectEmoji = (emojiData: any) => {
    setInputMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    onSend(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="relative p-4 border-t bg-[#EBEFF3] flex items-center gap-2">
      {/* <button
        type="button"
        onClick={() => setShowPicker((s) => !s)}
        className="p-2 rounded-full bg-gray-300  transition cursor-pointer"
      >
        <RiEmojiStickerLine className="text-xl" />
      </button> */}

      {showPicker && (
        <div ref={pickerRef} className="absolute bottom-14 left-2 z-50 w-[320px] h-[380px] rounded-xl shadow-xl bg-white">
          <EmojiPicker onEmojiClick={handleSelectEmoji} width="100%" height="100%" />
        </div>
      )}

      <input
        type="text"
        placeholder="Type a Message"
        className="flex-1 border border-[#F4F7F9] rounded-lg py-2 px-4 focus:outline-none shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <button
        className="  bg-gray-300  ml-2 text-white rounded-md p-2 transition cursor-pointer"
        onClick={handleSend}
        type="button"
      >
        <img src={cursor} className="h-5 w-5 invert " alt="Send" />
      </button>
    </div>
  );
};

export default ChatInputWithEmojiPicker;
