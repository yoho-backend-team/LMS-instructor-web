import Gridprofile from '@/components/dashboard/ui/GridProgress'
import React from 'react'
import proLogo from '../../assets/dashboard/image.png'
import { FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'

const ProfileCard: React.FC = () => {

    const navigate = useNavigate()

    const data = [
        {
            title: "Total Classes",
            icon: "totalclass",
            total: 30,
        },
        {
            title: "Completed",
            icon: "completed",
            total: 10,
        },
        {
            title: "Pending",
            icon: "pending",
            total: 20,
        },
        {
            title: "Live Class",
            icon: "liveclass",
            total: 10,
        },
        {
            title: "Online Class",
            icon: "onlineclass",
            total: 10,
        },
        {
            title: "Offline Class",
            icon: "offlineclass",
            total: 10,
        }
    ]


    return (
        <div className='flex flex-col w-full h-[365px] gap-4 p-[20px] divshadow shadow-xl rounded-[16px]'>
            <h2 style={{ ...FONTS.heading_02 }}>Classes</h2>
            <div className="flex flex-row justify-between">
                <div className='flex flex-row gap-5'>
                    <img src={proLogo} alt="" width={62} height={62} className='rounded-xl' />
                    <div className="flex flex-col w-[215px] h-[53px]">
                        <h3
                            style={{ fontFamily: FONTS.heading_03.fontFamily, fontSize: FONTS.heading_03.fontSize, fontWeight: FONTS.heading_03.fontWeight }}
                            className='text-transparent bg-clip-text bg-gradient-to-r from-[#7B00FF] to-[#B200FF]'
                        >Name</h3>
                        <p style={{ ...FONTS.para_01 }}>Trainee ID:</p>
                    </div>
                </div>
                <button type="button"
                    onClick={() => navigate('/profile')}
                    style={{ fontFamily: FONTS.heading_06.fontFamily, fontWeight: FONTS.heading_06.fontWeight }}
                    className='items-center w-[104px] h-[48px] rounded-xl btnshadow text-[#716F6F] text-[14px] hover:text-white btnhovershadow'
                >View Profile</button>
            </div>
            <div className="grid grid-cols-3 gap-5">
                {
                    data.map((item, index) => {
                        return (
                            <div key={index} className="w-full sm:w-[160px] md:w-[165px] md:h-[96px] lg:h-[89px] rounded-xl divshadow">
                                <Gridprofile title={item.title} value={item.total} icon={item.icon} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProfileCard