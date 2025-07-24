/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import payments from '../../assets/dashboard/payments.png'
import { FONTS } from '@/constants/uiConstants'
import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { getStudentPaymentThunk } from '@/features/Payment/reducers/thunks'

const Payment: React.FC = () => {

    // const dispatch = useDispatch<any>()

    // useEffect(() => {
    //     dispatch(getStudentPaymentThunk({ paymentId: '67f3b8feb8d2634300cc8819' }));
    // }, [dispatch]);

    // const Payments: any = useSelector((state: any) => state.PaymentSlice.data) ?? []
    const Payments: any[] = []
    const navigate = useNavigate()
    return (
        <div className='flex flex-row p-5 gap-10 divshadow w-full h-[300px] rounded-[16px]'>
            <div className="flex flex-col justify-between">
                <div className='flex flex-col gap-4'>
                    <h1 style={{ ...FONTS.heading_02 }}>Payment</h1>
                    <p style={{ ...FONTS.heading_06 }}>Payment Pending for <span style={{ ...FONTS.heading_04 }}>April</span></p>
                    <p style={{ ...FONTS.heading_06 }}>Amount to pay:</p>
                    <p style={{ ...FONTS.heading_03, fontSize: '30px' }}>{Payments?.pending_payment}</p>
                </div>
                <button type="button" onClick={() => navigate('/payment')} className='btnshadow w-[145px] h-[42px] rounded-xl btnhovershadow hover:!text-white focus:!text-white' style={{ ...FONTS.heading_06 }}>Check Payments</button>
            </div>
            <div>
                <img src={payments} alt="" className='mt-10' />
            </div>
        </div>
    )
}

export default Payment