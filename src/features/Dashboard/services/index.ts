/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreLocalStorage } from '@/utils/helper'
import Client from '../../../api/index'

export const getDashBoardData = async () => {
    try {
        const response = await Client.Instructor.reports.get()
        const branch = response?.data?.branch?.uuid
        const institute = response?.data?.institute?.uuid
        StoreLocalStorage("branchId", branch)
        StoreLocalStorage("instituteId", institute)

        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
}