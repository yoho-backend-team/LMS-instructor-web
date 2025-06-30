import { FONTS } from '@/constants/uiConstants';
import Cloud from "../../assets/icons/payments/Cloud.png"
import FileUpload from "../../assets/icons/payments/File-upload.png"
import { useState } from 'react';
import Modal from './Modal';

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
                                onClick={() => setIsModalOpen(true)}
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
                <h2 className="text-xl font-semibold mb-2">Hello from Modal!</h2>
                <p className="text-gray-600 mb-4">
                    This is a reusable modal component.
                </p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default PaymentTable;