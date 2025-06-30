import { useNavigate, useParams } from 'react-router-dom';
import classImg from '../../assets/classes/Mask group.png'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COLORS, FONTS } from '@/constants/uiConstants';
import backImg from '../../assets/classes/back.png'

const ClassId = () => {
	const { id } = useParams();

	// handle backpage button function

	const navigate = useNavigate();
	const handleBackPage = () => {
		navigate('/classes');
	}

	return(
	 <div className='my-2 py-2 '>
		{/* title section */}
		<div className='my-4 flex flex-row justify-start items-center gap-5'>
		<div onClick={handleBackPage} className='cursor-pointer p-2 rounded-lg bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'>
			<img src={backImg} alt="back-img" />
		</div>	
		<h1 style={{...FONTS.heading_01}} >Class Details  -{id}</h1>
		</div>

		{/* card section */}
	<div className='grid xl:grid-cols-2 md:grid-cols-1 justify-between gap-10 py-2'>
        {/* Left side card */}
        <Card style={{backgroundColor:COLORS.bg_Colour}} className='px-4 py-1 h-[400px]'>
            <CardHeader>
                <CardTitle style={{...FONTS.heading_01}} className='!text-[#7B00FF] my-4'> Batch No: #13</CardTitle>
                <CardDescription>
                    <h2 style={{...FONTS.heading_02}} className='text-[#2A2A2A] mb-2'>The Path Of MERN Stack</h2>
                    <p style={{...FONTS.para_02}} >The Path of MERN Stack involves mastering four powerful technologies: MongoDB, Express.js, React.js, and Node.js. This stack enables developers to build full-stack web applications using JavaScript from frontend to backend. .</p>
                </CardDescription>
            </CardHeader>

            <Card className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] mx-4'>
                <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-4 mx-4">
                    <table  className='w-full table-fixed text-center'>
                        <thead style={{...FONTS.para_02}} className='!text-[#ffffff]'>
                            <tr>
                                <td>Date</td>
                                <td>Start At</td>
                                <td>End At</td>
                                <td>Duration</td>
                            </tr>
                        </thead>
                        <tbody style={{...FONTS.heading_04}} className='!text-[#ffffff]'>
                            <tr>
                                <td>10 Mar 2025</td>
                                <td>9.30 Am</td>
                                <td>6.00 Pm</td>
                                <td>6 Month</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </Card>
        </Card>
        <Card style={{backgroundColor:COLORS.bg_Colour}} className='px-4 h-[400px]'>
            <CardTitle style={{...FONTS.heading_02}} >Session Materials</CardTitle>
            <Card style={{...FONTS.para_02}}  className='py-2 px-3 rounded-sm bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] '>
                Once Class finished study material videos will be upload
            </Card>
            <div className='mx-auto my-auto'>
                <img className='w-[400px]'  src={classImg} alt="" />
            </div>
        </Card>
    </div>
</div>
	)
};

export default ClassId;
