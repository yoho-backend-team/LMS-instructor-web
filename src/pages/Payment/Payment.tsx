"use client"

import type React from "react"

import { COLORS, FONTS } from "@/constants/uiConstants"
import { useEffect, useState, type SetStateAction } from "react"
import { startOfMonth, setYear } from "date-fns"
import Edit from "../../assets/icons/payments/Edit-alt.png"
import { Card } from "@/components/ui/card"
import filImg from "../../assets/classes/filter.png"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PaymentDetails from "@/components/payment/paymentTable"
import { Button } from "@/components/ui/button"
import { CustomTabContent, CustomTabs } from "@/components/payment/CustomTabs"
import { useDispatch, useSelector } from "react-redux"
import { selectPayment } from "@/features/Payment/reducers/selectors"
import { getStudentPaymentThunk } from "@/features/Payment/reducers/thunks"

export const Payment = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedYear, setSelectedYear] = useState<number>(selectedDate.getFullYear())
  const years = Array.from({ length: 36 }, (_, i) => 2000 + i)
  const status = ["All", "Completed", "Pending"]
  const [showSelect, setShowSelect] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("staff")
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch<any>()
  const SalaryDetails = useSelector(selectPayment)

  useEffect(() => {
    dispatch(getStudentPaymentThunk({}))
  }, [dispatch])

  const staffDetail = SalaryDetails[0]?.staff
  const bankDetail = SalaryDetails[0]?.staff?.Bank_Details

  const [, setStaffDetails] = useState({
    name: "John Doe",
    designation: "Teacher",
    staffId: "STF-001",
    address: "123 Main St, City, Country",
  })

  const [salaryStructure] = useState({
    basic: "30,000",
    hra: "12,000",
    conveyance: "2,000",
    travelAllowance: "3,000",
    homeAllowance: "5,000",
  })

  const handleYearChange = (newYear: string) => {
    const numericYear = Number.parseInt(newYear, 10)
    const updatedDate = startOfMonth(setYear(selectedDate, numericYear))
    setSelectedYear(numericYear)
    setSelectedDate(updatedDate)
  }

  const handleSelectStatus = (value: SetStateAction<string | undefined>) => {
    setSelectedStatus(value)
  }

  const toggleSelect = () => {
    setShowSelect(!showSelect)
  }

  const handleStaffDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStaffDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // const handleSaveStaffDetails = () => {
  // 	setIsEditing(false);
  // };

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <h2 className="" style={{ ...FONTS.heading_01 }}>
          Salary Details
        </h2>

        <div className="flex items-center gap-4">
          <div>
            <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
              <SelectTrigger
                className="w-[100px] cursor-pointer rounded-sm border-0 px-4 py-4.5 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
                style={{ ...FONTS.para_02, backgroundColor: COLORS.bg_Colour }}
              >
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="bg-[#ebeff3] rounded-sm p-2 shadow-[4px_4px_6px_rgba(189,194,199,0.5),-4px_-4px_6px_rgba(255,255,255,0.7)]">
                {years.map((year) => (
                  <SelectItem
                    key={year}
                    value={year.toString()}
                    className={`
                      cursor-pointer px-2 py-2 text-gray-700 
                      rounded-sm 
                      bg-[#ebeff3]
                      shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(189,194,199,0.6)]
                      data-[state=checked]:bg-gradient-to-r 
                      data-[state=checked]:from-purple-500 
                      data-[state=checked]:to-purple-700 
                      data-[state=checked]:text-white
                      mb-2 transition
                    `}
                    style={{ backgroundColor: COLORS.bg_Colour }}
                  >
                    {year || "Year"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div
            className="p-2 rounded-lg cursor-pointer"
            style={{
              boxShadow: `
                rgba(255, 255, 255, 0.7) 5px 5px 4px, 
                rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
            }}
            onClick={() => {
              setIsModalOpen(true)
              setIsEditing(false)
              setActiveTab("staff")
            }}
          >
            <img src={Edit} alt="edit-icon" />
          </div>
        </div>
      </div>

      <Card style={{ backgroundColor: COLORS.bg_Colour }} className="px-4 custom-inset-shadow mt-6 flex flex-row">
        <h2 style={{ ...FONTS.heading_02 }}>Payment Status</h2>

        {showSelect && (
          <div>
            <Select value={selectedStatus} onValueChange={handleSelectStatus}>
              <SelectTrigger
                className="w-[150px] cursor-pointer rounded-sm border-0 px-4 py-5 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
                style={{ ...FONTS.para_02, backgroundColor: COLORS.bg_Colour }}
              >
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#ebeff3] rounded-sm p-2 shadow-[4px_4px_6px_rgba(189,194,199,0.5),-4px_-4px_6px_rgba(255,255,255,0.7)]">
                {status.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className={`
                      cursor-pointer px-2 py-2 text-gray-700 
                      rounded-sm 
                      bg-[#ebeff3]
                      shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(189,194,199,0.6)]
                      data-[state=checked]:bg-gradient-to-r 
                      data-[state=checked]:from-purple-500 
                      data-[state=checked]:to-purple-700 
                      data-[state=checked]:text-white
                      mb-2 transition
                    `}
                    style={{ backgroundColor: COLORS.bg_Colour }}
                  >
                    {status || "Year"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </Card>

      <div className="flex absolute right-14 top-29 items-center gap-3">
        <img
          src={filImg}
          alt="filter"
          className="cursor-pointer p-2 rounded-lg bg-[#ebeff3] 
                    shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
          onClick={toggleSelect}
        />
      </div>

      <div className="mt-8 custom-inset-shadow">
        <PaymentDetails selectedStatus={selectedStatus ?? "All"} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-[#ebeff3] rounded-lg p-6 w-full max-w-2xl lg:max-h-[95vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="" style={{ ...FONTS.heading_02 }}>
                Staff Settings
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg cursor-pointer"
                style={{
                  boxShadow: `
                    rgba(255, 255, 255, 0.7) 5px 5px 4px, 
                    rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                }}
              >
                <span className="h-5 w-5 text-[#716F6F] font-bold flex justify-center items-center rounded-full">
                  X
                </span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <CustomTabs
                tabs={[
                  { value: "staff", label: "Staff Details" },
                  { value: "bank", label: "Bank Details" },
                  { value: "salary", label: "Salary Structure" },
                ]}
                defaultValue={activeTab}
              >
                {/* Staff Details Tab */}
                <CustomTabContent value="staff">
                  <div className="">
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Staff Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={staffDetail?.username}
                        onChange={handleStaffDetailChange}
                        disabled={!isEditing}
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Designation
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={staffDetail?.designation}
                        onChange={handleStaffDetailChange}
                        disabled={!isEditing}
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Staff ID
                      </label>
                      <input
                        type="text"
                        name="staffId"
                        value={staffDetail?.staffId}
                        onChange={handleStaffDetailChange}
                        disabled={!isEditing}
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={staffDetail?.institute_id?.contact_info?.address?.address1}
                        onChange={handleStaffDetailChange}
                        disabled={!isEditing}
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className='flex justify-end space-x-4 mt-4'>
										{isEditing ? (
											<>
												<Button
													onClick={() => setIsEditing(false)}
													className='cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-white  shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_red_inset,-4px_-8px_10px_0px_#B20_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white'
												>
													Cancel
												</Button>
												<Button
													onClick={handleSaveStaffDetails}
													className='cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600 shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]'
												>
													Save
												</Button>
											</>
										) : (
											<Button
												onClick={() => setIsEditing(true)}
												className='cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white rounded-lg shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white'
											>
												Edit
											</Button>
										)}
									</div> */}
                </CustomTabContent>

                {/* Bank Details Tab */}
                <CustomTabContent value="bank">
                  <div className="">
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={bankDetail?.Account_Number}
                        disabled
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Bank Branch
                      </label>
                      <input
                        type="text"
                        value={bankDetail?.Branch}
                        disabled
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        value={bankDetail?.IFSC}
                        disabled
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      // disabled
                      className="cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-white  shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_red_inset,-4px_-8px_10px_0px_#B20_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white"
                    >
                      Request Edit
                    </Button>
                    {/* <Button
											disabled
											className='cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600 shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]'
										>
											Save
										</Button> */}
                  </div>
                </CustomTabContent>

                {/* Salary Structure Tab */}
                <CustomTabContent value="salary">
                  <div className="">
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Monthly Basic
                      </label>
                      <input
                        type="text"
                        value={salaryStructure.basic}
                        disabled
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        HRA
                      </label>
                      <input
                        type="text"
                        value={salaryStructure.hra}
                        disabled
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Conveyance
                      </label>
                      <input
                        type="text"
                        value={salaryStructure.conveyance}
                        disabled
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Travel Allowance
                      </label>
                      <input
                        type="text"
                        value={salaryStructure.travelAllowance}
                        disabled
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                        Home Allowance
                      </label>
                      <input
                        type="text"
                        value={salaryStructure.homeAllowance}
                        disabled
                        className="p-4 rounded-lg mb-2 w-full"
                        style={{
                          ...FONTS.heading_06,
                          boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className='flex justify-end space-x-4 mt-6'>
										<Button
											onClick={() => setIsModalOpen(false)}
											disabled
											className='cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-white  shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_red_inset,-4px_-8px_10px_0px_#B20_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white'
										>
											Cancel
										</Button>
										<Button
											disabled
											className='cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600 shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]'
										>
											Save
										</Button>
									</div> */}
                </CustomTabContent>
              </CustomTabs>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Payment
