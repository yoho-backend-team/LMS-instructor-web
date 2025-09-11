import type { RootState } from "@/store/store";

export const selectAttendance = (state: RootState) => state.AttendanceSlice.data;
export const selectAttendanceDaily = (state: RootState) => state.AttendanceSlice.dailyData
