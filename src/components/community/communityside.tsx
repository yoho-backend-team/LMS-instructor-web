import { useState } from 'react';
import msgframe from "../../assets/icons/community/Frame 5185.png";
import doubleicon from '../../assets/icons/community/Group 210.png';
import cursor from '../../assets/icons/community/Icon.png'

const communityside = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    {
      id: 1,
      name: "MERN 2025",
      lastMessage: "Hii",
      time: "1.15pm",
      members: "3 Member",
      userName: "LISTENAL",
      date: "12/11/2025",
      chatTime: "1:00 PM"
    },

  ];

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };


  return (
    <>
      <div className='flex flex-col lg:flex-row p-4 gap-4'>
        <div className="w-full lg:w-[400px] xl:w-[500px] h-[600px] bg-[#EBEFF3] rounded-xl shadow-2xl overflow-hidden 
                      transform transition-all ">
          <div className="relative p-4 bg-[#EBEFF3]">
            <div className="absolute inset-0 rounded-xl pointer-events-none"></div>


            <div className="relative mt-4" >
              <input
                type="text"
                placeholder="Search"
                className="w-full p-3 h-10 pl-10 bg-[#EBEFF3]  
                           rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>




          <div className=" p-4 bg-[#EBEFF3] h-[calc(600px-80px)]  border-[#EBEFF3] rounded-b-xl relative overflow-y-auto">
            <div className="absolute inset-0 border-2  rounded-b-xl pointer-events-none"></div>


            {chats.map(chat => (
              <div key={chat.id} className={`" relative z-10 flex items-center shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] justify-between p-3 bg-[#EBEFF3] rounded-lg "
                
                ${selectedChat?.id === chat.id ? 'bg-[#EBEFF3]' : ''}`}
                onClick={() => handleChatClick(chat)}
              >

                <div className="flex items-center space-x-3">
                  <div className="bg-gray-900 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">

                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{chat.name}</h3>
                    <p className="text-sm text-gray-600">{chat.lastMessage}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs text-gray-500">{chat.time}</p>
                  <img src={doubleicon} className="mt-1 w-4 h-4 opacity-70" alt="Read receipt" />
                </div>
              </div>

            ))}
          </div>
        </div>


        <div className="w-2/3 flex flex-col">
          {selectedChat ? (
            <>


              <div className="p-4 border-b border-gray-200 bg-[#EBEFF3]  shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]  justify-between items-center">
                <div className='bg-gray-900 text-white rounded-full h-12 w-12 pl-10'>

                  <h2 className="font-bold text-lg text-gray-900 ml-10 w-40">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-600 w-40 ml-12">{selectedChat.members}</p>
                </div>
              </div>


              <div className="flex-1 p-4 bg-[#EBEFF3]  w-full   h-[600px] overflow-y-auto relative">
                <div className="absolute inset-0 border-2  rounded-xl pointer-events-none"></div>


                <div className="relative z-10 space-y-3">

                  <div className="bg-white p-3 rounded-lg max-w-[15%] shadow">
                    <p>Hii</p>
                    <p className="text-xs text-gray-500 text-right mt-1">1:15 PM</p>
                  </div>
                </div>



                <div className="p-4 border-t   bg-[#EBEFF3] mt-[340px]">
                  <div className="flex items-center justify-between" >
                    <input
                      type="text"
                      placeholder="Type a Message"
                      className="flex w-80 border  border-[#F4F7F9] rounded-lg py-2 btnshadow px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 w-10 "
                    />
                    <button className=" bg-[#EBEFF3] ml text-white rounded-sm shadow-inner p-2 ">

                      <img src={cursor} className="h-5 w-5" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />

                    </button>
                  </div>
                </div>
                {/*             
<div className="p-4 border-t bg-[#EBEFF3] mt-[340px]">
  <div className="flex items-center">
    <input 
      type="text" 
      placeholder="Type a Message" 
      className="flex border border-gray-300 w-20 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
    <button className="ml-2 bg-[#EBEFF3] text-white rounded-sm shadow-inner p-2">
      <img src={cursor} className="h-5 w-5" />
    </button>
  </div>
</div> */}

              </div>
            </>
          ) : (

            <div className="flex-1 min-w-0 bg-[#EBEFF3] rounded-xl 
                        shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]
                        overflow-hidden transform transition-all hover:shadow-2xl ">
              <div className="relative p-4 h-full">
                <div className="inset-0 border-2 border-gray-100 rounded-t-xl pointer-events-none"></div>

                <div className="p-4 md:p-10 text-center text-gray-500 bg-[#EBEFF3] rounded-b-xl h-[500px] 
                          flex items-center justify-center shadow-inner">
                  <img
                    src={msgframe}
                    alt="Message frame"
                    className="max-w-full h-auto object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  )
}

export default communityside;