import type React from "react";

import { COLORS, FONTS } from "@/constants/uiConstants";
import { useEffect, useState, type SetStateAction } from "react";
import { startOfMonth, setYear } from "date-fns";
import { Card } from "@/components/ui/card";
import filImg from "../../assets/classes/filter.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaymentDetails from "@/components/payment/paymentTable";
import { CustomTabContent, CustomTabs } from "@/components/payment/CustomTabs";
import { useDispatch, useSelector } from "react-redux";
import { selectPayment } from "@/features/Payment/reducers/selectors";
import { getStudentPaymentThunk } from "@/features/Payment/reducers/thunks";
// import { updateInstructorbankdetails } from "../../features/Payment/services/index";
import image2 from "../../assets/Payment/Paymentimage_2.png";
import image5 from "../../assets/Payment/Paymentimage_5.png";
import Frame1 from "../../assets/payment/Frame 1.png";
import { useLoader } from "@/context/LoadingContext/Loader";
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks";

export const Payment = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<number>(
    selectedDate.getFullYear()
  );
  const years = Array.from({ length: 36 }, (_, i) => 2000 + i);
  const status = ["All", "Completed", "Pending"];
  const [showSelect, setShowSelect] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("staff");
  const [isEditing, setIsEditing] = useState(false);
  const [isBankEditing, _setIsBankEditing] = useState(false); // New state for bank editing
  const [bankEditDetails, setBankEditDetails] = useState<any>({}); // State for bank edit form

  const dispatch = useDispatch<any>();
  const SalaryDetails = useSelector(selectPayment);
  console.log(SalaryDetails, "salary details");

  useEffect(() => {
    dispatch(getStudentPaymentThunk({}));
  }, [dispatch]);

  const staffDetail = SalaryDetails[0]?.staff;
  const bankDetail = SalaryDetails[0]?.staff?.Bank_Details;

  // Initialize bank edit details when bankDetail changes
  useEffect(() => {
    if (bankDetail) {
      setBankEditDetails({
        Account_Number: bankDetail.Account_Number || "",
        Branch: bankDetail.Branch || "",
        IFSC: bankDetail.IFSC || "",
      });
    }
  }, [bankDetail]);

  const [_staffDetails, setStaffDetails] = useState<any>();

  const [salaryStructure, setSalaryStructure] = useState({
    basic: "30,000",
    // hra: "12,000",
    // conveyance: "2,000",
    travelAllowance: "3,000",
    homeAllowance: "5,000",
  });

  const handleYearChange = (newYear: string) => {
    const numericYear = Number.parseInt(newYear, 10);
    const updatedDate = startOfMonth(setYear(selectedDate, numericYear));
    setSelectedYear(numericYear);
    setSelectedDate(updatedDate);
  };

  const handleSelectStatus = (value: SetStateAction<string | undefined>) => {
    setSelectedStatus(value);
  };

  const toggleSelect = () => {
    setShowSelect(!showSelect);
  };

  const handleStaffDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStaffDetails((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle bank detail changes
  const handleBankDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankEditDetails((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // // Handle Request Edit button click
  // const handleRequestEdit = () => {
  //   setIsBankEditing(true);
  // };

  // // Handle Save bank details
  // const handleSaveBankDetails = async () => {
  //   try {
  //     // Prepare data for API call
  //     const updateData = {
  //       id: staffDetail?.id, // Assuming you have staff ID
  //       Bank_Details: {
  //         Account_Number: bankEditDetails.Account_Number,
  //         Branch: bankEditDetails.Branch,
  //         IFSC: bankEditDetails.IFSC,
  //       },
  //     };

  //     // Call the API service
  //     const response = await updateInstructorbankdetails(updateData);

  //     if (response) {
  //       // Refresh the data after successful update
  //       dispatch(getStudentPaymentThunk({}));
  //       setIsBankEditing(false);

  //       // Optional: Show success message
  //       console.log("Bank details updated successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error updating bank details:", error);
  //     // Optional: Show error message to user
  //   }
  // };

  // // Handle Cancel bank edit
  // const handleCancelBankEdit = () => {
  //   // Reset to original values
  //   setBankEditDetails({
  //     Account_Number: bankDetail?.Account_Number || "",
  //     Branch: bankDetail?.Branch || "",
  //     IFSC: bankDetail?.IFSC || "",
  //   });
  //   setIsBankEditing(false);
  // };

  const [leftCards, setLeftCards] = useState<any>([
    {
      title: "Salary Paid",
      desc: "Payment completed so far",
      salary: "0",
      image: image2,
    },
    {
      title: "Payment Method",
      desc: "Mode of transaction",
      salary: "Online",
      image: image5,
    },
  ]);

  useEffect(() => {
    if (SalaryDetails?.length) {
      const totalSalary = SalaryDetails.reduce((acc: number, item: any) => {
        return acc + (Number(item.salary_amount) || 0);
      }, 0);

      setLeftCards((prev: any) => {
        const updated = [...prev];
        updated[0] = { ...updated[0], salary: totalSalary.toLocaleString() };
        return updated;
      });
    }
  }, [SalaryDetails]);

  console.log("salary details", SalaryDetails);

  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    (async () => {
      try {
        showLoader();
        const timeoutId = setTimeout(() => {
          hideLoader();
        }, 8000);
        const response = await dispatch(getDashBoardReports());
        if (response) {
          clearTimeout(timeoutId);
        }
      } finally {
        hideLoader();
      }
    })();
  }, [dispatch, hideLoader, showLoader]);

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <h2 className="" style={{ ...FONTS.heading_01 }}>
          Salary Details
        </h2>

        <div className="flex items-center gap-4">
          <div>
            <Select
              value={selectedYear.toString()}
              onValueChange={handleYearChange}
            >
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
              setIsModalOpen(true);
              setIsEditing(false);
              setActiveTab("staff");
            }}
          >
            <img src={Frame1} alt="edit-icon" className="h-5" />
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        <div className="w-[20%] bg-[#ebeff3]  p-4 flex flex-col gap-4">
          {leftCards?.map((item: any, index: any) => (
            <div
              key={index}
              className="px-2 py-3 rounded-lg cursor-pointer
            bg-[#ebeff3]
            shadow-[5px_5px_4px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]
            hover:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(189,194,199,0.6)]
            transition-shadow"
            >
              <h3 className="text-gray-700 font-semibold text-lg">
                {item.title}
              </h3>
              <div className="flex items-center justify-between mt-2">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                )}

                <p className="text-gray-500 text-end">{item.salary}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-gray-200 p-4">
          <Card
            style={{ backgroundColor: COLORS.bg_Colour }}
            className="px-4 custom-inset-shadow mt-6 flex flex-row"
          >
            <h2 style={{ ...FONTS.heading_02 }}>Payment Status</h2>

            {showSelect && (
              <div>
                <Select
                  value={selectedStatus}
                  onValueChange={handleSelectStatus}
                >
                  <SelectTrigger
                    className="w-[150px] cursor-pointer rounded-sm border-0 px-4 py-5 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
                    style={{
                      ...FONTS.para_02,
                      backgroundColor: COLORS.bg_Colour,
                    }}
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

          <div className="flex absolute right-14 top-33 items-center gap-3">
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
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
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
                <CustomTabContent value="staff">
                  <div className="">
                    <div>
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
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
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
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
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
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
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={
                          staffDetail?.institute_id?.contact_info?.address
                            ?.address1
                        }
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
                </CustomTabContent>

                {/* Bank Details Tab */}
                <CustomTabContent value="bank">
                  <div className="">
                    <div>
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="Account_Number"
                        value={
                          isBankEditing
                            ? bankEditDetails.Account_Number
                            : bankDetail?.Account_Number
                        }
                        onChange={handleBankDetailChange}
                        disabled={!isBankEditing}
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
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
                        Bank Branch
                      </label>
                      <input
                        type="text"
                        name="Branch"
                        value={
                          isBankEditing
                            ? bankEditDetails.Branch
                            : bankDetail?.Branch
                        }
                        onChange={handleBankDetailChange}
                        disabled={!isBankEditing}
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
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        name="IFSC"
                        value={
                          isBankEditing
                            ? bankEditDetails.IFSC
                            : bankDetail?.IFSC
                        }
                        onChange={handleBankDetailChange}
                        disabled={!isBankEditing}
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
                </CustomTabContent>

                {/* Salary Structure Tab */}
                <CustomTabContent value="salary">
                  <div className="">
                    <div>
                      <label
                        className="block  mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
                        Monthly Basic
                      </label>
                      <input
                        type="text"
                        value={salaryStructure.basic}
                        onChange={(e) =>
                          setSalaryStructure((prev: any) => ({
                            ...prev,
                            basic: e.target.value,
                          }))
                        }
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
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
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
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
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
                    </div> */}
                    <div>
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
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
                      <label
                        className="block mb-1"
                        style={{ ...FONTS.heading_05 }}
                      >
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
                </CustomTabContent>
              </CustomTabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
