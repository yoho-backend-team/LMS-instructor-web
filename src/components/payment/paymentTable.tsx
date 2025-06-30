import { FONTS } from '@/constants/uiConstants';
import Cloud from "../../assets/icons/payments/Cloud.png"
import FileUpload from "../../assets/icons/payments/File-upload.png"
import { useState } from 'react';
import Modal from './Modal';
import { Button } from '../ui/button';

interface PaymentTable {
    Month: string;
    Payment: number;
    workingDays: number;
    presentDays: number;
    absentDays: number;
    deductions: number;
    status: boolean;
    actions: any;
}

const PaymentTable = () => {
    const [selectedDetail, setSelectedDetail] = useState<any>([])

    const payments: PaymentTable[] = [
        {
            Month: "January",
            Payment: 56778,
            workingDays: 30,
            presentDays: 20,
            absentDays: 10,
            deductions: 3000,
            status: true,
            actions: "helo"
        },
        {
            Month: "Febraury",
            Payment: 56778,
            workingDays: 30,
            presentDays: 20,
            absentDays: 10,
            deductions: 3000,
            status: false,
            actions: "helo"
        },
        {
            Month: "January",
            Payment: 56778,
            workingDays: 30,
            presentDays: 20,
            absentDays: 10,
            deductions: 3000,
            status: true,
            actions: "helo"
        },
        {
            Month: "Febraury",
            Payment: 56778,
            workingDays: 30,
            presentDays: 20,
            absentDays: 10,
            deductions: 3000,
            status: false,
            actions: "helo"
        },
        {
            Month: "January",
            Payment: 56778,
            workingDays: 30,
            presentDays: 20,
            absentDays: 10,
            deductions: 3000,
            status: true,
            actions: "helo"
        },
        {
            Month: "Febraury",
            Payment: 56778,
            workingDays: 30,
            presentDays: 20,
            absentDays: 10,
            deductions: 3000,
            status: false,
            actions: "helo"
        },
    ];

    // Header data
    const headers = ['Month', 'Payment', 'workingDays', 'present', 'absent', 'deductions', 'status', 'Actions'];
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='p-4 custom-inset-shadow grid gap-4'>
            <section className='grid grid-cols-8 text-center bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-4 rounded-lg'
                style={{ ...FONTS.heading_03 }}>
                {headers.map((header, index) => (
                    <div key={index}>{header}</div>
                ))}
            </section>

            <section>
                {payments.map((PaymentTable) => (
                    <div

                        className='grid grid-cols-8 justify-center items-center my-5 text-center bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-3 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:-translate-y-1 
                        hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                        cursor-pointer'
                        style={{ ...FONTS.heading_06 }} >
                        <p>{PaymentTable.Month}</p>
                        <p>{PaymentTable.Payment}</p>
                        <p>{PaymentTable.workingDays}</p>
                        <p>{PaymentTable.presentDays}</p>
                        <p>{PaymentTable.absentDays}</p>
                        <p>{PaymentTable.deductions}</p>
                        <button
                            className='p-2 px-4 rounded-lg cursor-pointer w-[100px] m-auto'
                            style={{
                                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                            }}                        >
                            {PaymentTable.status ? "Paid" : "Pending"}</button>
                        <p className='flex justify-center items-center gap-4'>
                            <button
                                className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] p-2 rounded-lg'
                                title="Download"
                            >
                                <img src={Cloud} alt="Download" />
                            </button>
                            <button
                                onClick={() => {
                                    setIsModalOpen(true)
                                    setSelectedDetail(PaymentTable)
                                }
                                }
                                className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] p-2 rounded-lg'
                                title="Upload"
                            >
                                <img src={FileUpload} alt="Upload" />
                            </button>
                        </p>
                    </div>
                ))}

            </section>

            {/* <Model /> */}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className='flex justify-between items-center mb-3'>
                    <h2 className="text-xl font-semibold mb-2" style={{ ...FONTS.heading_01 }}>Payment Details</h2>
                    <div onClick={() => setIsModalOpen(false)}
                        className='p-2 rounded-lg cursor-pointer'
                        style={{
                            boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }} >
                        <p className='h-5 w-5 text-[#716F6F] font-bold flex justify-center items-center rounded-full'>X</p>
                    </div>
                </div>


                <div className='grid grid-cols-2 gap-4' >
                    <section>
                        <p style={{ ...FONTS.heading_04 }}>Month</p>
                        <p className='p-4 rounded-lg mt-4'
                            style={{
                                ...FONTS.heading_06,
                                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                            }}>{selectedDetail.Month}</p>
                    </section>

                    <section>
                        <p style={{ ...FONTS.heading_04 }}>Date & time</p>
                        <p className='p-4 rounded-lg mt-4'
                            style={{
                                ...FONTS.heading_06,
                                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                            }}>{selectedDetail.Date || "DD/MM/YYYY"}</p>
                    </section>

                    <section>
                        <p style={{ ...FONTS.heading_04 }}>workingDays</p>
                        <p className='p-4 rounded-lg mt-4'
                            style={{
                                ...FONTS.heading_06,
                                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                            }}>{selectedDetail.workingDays}</p>
                    </section>
                    <section>
                        <p style={{ ...FONTS.heading_04 }}>Amount</p>
                        <p className='p-4 rounded-lg mt-4'
                            style={{
                                ...FONTS.heading_06,
                                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                            }}>{selectedDetail.Payment}</p>
                    </section>

                    <section>
                        <p style={{ ...FONTS.heading_04 }}>Absent Days</p>
                        <p className='p-4 rounded-lg mt-4'
                            style={{
                                ...FONTS.heading_06,
                                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                            }}>{selectedDetail.absentDays}</p>
                    </section>

                    <section>
                        <p style={{ ...FONTS.heading_04 }}>Present Days</p>
                        <p className='p-4 rounded-lg mt-4'
                            style={{
                                ...FONTS.heading_06,
                                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                            }}>{selectedDetail.presentDays}</p>
                    </section>

                    <section>
                        <p style={{ ...FONTS.heading_04 }}>Payment Method</p>
                        <p className='p-4 rounded-lg mt-4'
                            style={{
                                ...FONTS.heading_06,
                                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                            }}>{selectedDetail.paymentMethod || "Cash"}</p>
                    </section>

                    <section>
                        <p style={{ ...FONTS.heading_04 }}>Deductions</p>
                        <p className='p-4 rounded-lg mt-4'
                            style={{
                                ...FONTS.heading_06,
                                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                            }}>{selectedDetail.deductions}</p>
                    </section>

                    <section>
                        <p style={{ ...FONTS.heading_04 }}>Status</p>
                        <Button className={`p-2 px-8 rounded-lg mt-4 
                        ${selectedDetail.status ? "bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600 shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]" 
                            :
                             "bg-gradient-to-r from-red-500 to-red-600 text-white  shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_red_inset,-4px_-8px_10px_0px_#B20_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white"}"
                             `}
                        >{selectedDetail.status ? "Paid" : "Pending"}</Button>
                    </section>
                </div>



                <div className='flex justify-end '>
                    <Button
                        onClick={() => setIsModalOpen(false)}
                        className="cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white rounded-lg shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white"
                    >
                        Close
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default PaymentTable;