/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { FONTS } from '@/constants/uiConstants'
import updatesimg from '../../assets/dashboard/updates.png'
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllNotificationsThunk } from '@/features/Notifications/reducers/thunks';

const Updates: React.FC = () => {

    const nowdate = new Date()
    // const dispatch = useDispatch<any>()

    // useEffect(() => {
    //     dispatch(getAllNotificationsThunk({}));
    // }, [dispatch]);

    const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');

    let data: any[] = []
    let prev: any[] = []

    // const dts = useSelector((state: any) => state.NotificationSlice.data) ?? []
    const dts: any[] = []
    data = dts.filter((items: any) => items.createdAt == nowdate)
    prev = dts.filter((items: any) => items.createdAt != nowdate)

    return (
        <div className='flex flex-col gap-5 divshadow w-full h-full rounded-[16px] p-5'>
            <div className="flex flex-row justify-between">
                <h1 style={{ ...FONTS.heading_02 }}>Updates</h1>
                <p style={{ ...FONTS.para_01 }}><span>{data.length}</span> New Messages</p>
            </div>
            <div className='flex flex-row gap-10 '>
                <button onClick={() => setActiveTab('today')} style={{ fontFamily: FONTS.heading_06.fontFamily, fontSize: FONTS.heading_06.fontSize, fontWeight: FONTS.heading_06.fontWeight }} className={activeTab === 'today' ? `btnshadow text-white btnfocusshadow  w-[86px] h-[42px] rounded-xl` : `text-[#716F6F] btnshadow w-[86px] h-[42px] rounded-xl btnhovershadow hover:text-white`}>Today</button>
                <button onClick={() => setActiveTab('upcoming')} style={{ fontFamily: FONTS.heading_06.fontFamily, fontSize: FONTS.heading_06.fontSize, fontWeight: FONTS.heading_06.fontWeight }} className={activeTab === 'upcoming' ? `btnshadow text-white btnfocusshadow w-[86px] h-[42px] rounded-xl` : `text-[#716F6F] btnshadow w-[86px] h-[42px] rounded-xl btnhovershadow hover:text-white focus:text-white`}>Previous</button>
            </div>
            <div>
                {activeTab == 'today' ?
                    data.length == 0 ?
                        <div className='flex flex-col w-full items-center gap-3 mt-20'>
                            <img src={updatesimg} alt="" className='w-[646px] h-[200px] ' />
                            <h1 style={{ ...FONTS.heading_04 }}>No New Message found</h1>
                            <p style={{ ...FONTS.para_02 }}>Any updates will appear here when available</p>
                        </div> :
                        <div>
                            {
                                data?.map((item, index) => {
                                    return (
                                        <Card
                                            key={index}
                                            className={`relative bg-[#ebeff3] lg:h-[165px] cursor-pointer shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] ${item?.status === 'unread'
                                                ? 'border-l-4 border-[#7b00ff]'
                                                : 'border-l-4 border-[#ebeff3]'
                                                }`}
                                        // onClick={() => handleNotificationClick(notification)}
                                        >
                                            <CardHeader>
                                                <div className='flex lg:flex-row md:flex-col-reverse lg:justify-between md:items-start md:gap-4 lg:items-center'>
                                                    <div>
                                                        <CardTitle style={{ ...FONTS.heading_02 }}>
                                                            {item?.title}
                                                        </CardTitle>
                                                        <CardDescription />
                                                    </div>
                                                    <CardAction>
                                                        <Dialog>
                                                            <DialogTrigger>
                                                                <Button
                                                                    className='bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
                                                                    variant='outline'
                                                                >
                                                                    {item?.createdAt.split('T')[0]}
                                                                </Button>
                                                            </DialogTrigger>
                                                        </Dialog>
                                                    </CardAction>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p style={{ ...FONTS.para_01 }} className=''>
                                                    {item?.body}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    : null
                }
                {
                    activeTab == 'upcoming' ?
                        prev.length == 0 ?
                            <div className='flex flex-col w-full items-center gap-3'>
                                <img src={updatesimg} alt="" className='w-[646px] h-[200px]' />
                                <h1 style={{ ...FONTS.heading_04 }}>No New Message found</h1>
                                <p style={{ ...FONTS.para_02 }}>Any updates will appear here when available</p>
                            </div> :
                            <div>
                                {
                                    prev?.map((item, index) => {
                                        return (
                                            <Card
                                                key={index}
                                                className={`relative bg-[#ebeff3] lg:h-[165px] cursor-pointer shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] ${item?.status === 'unread'
                                                    ? 'border-l-4 border-[#7b00ff]'
                                                    : 'border-l-4 border-[#ebeff3]'
                                                    }`}
                                            // onClick={() => handleNotificationClick(notification)}
                                            >
                                                <CardHeader>
                                                    <div className='flex lg:flex-row md:flex-col-reverse lg:justify-between md:items-start md:gap-4 lg:items-center'>
                                                        <div>
                                                            <CardTitle style={{ ...FONTS.heading_02 }}>
                                                                {item?.title}
                                                            </CardTitle>
                                                            <CardDescription />
                                                        </div>
                                                        <CardAction>
                                                            <Dialog>
                                                                <DialogTrigger>
                                                                    <Button
                                                                        className='bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
                                                                        variant='outline'
                                                                    >
                                                                        {item?.createdAt.split('T')[0]}
                                                                    </Button>
                                                                </DialogTrigger>
                                                            </Dialog>
                                                        </CardAction>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <p style={{ ...FONTS.para_01 }} className=''>
                                                        {item?.body}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        )
                                    })
                                }
                            </div>
                        : null
                }
            </div>
        </div>
    )
}

export default Updates