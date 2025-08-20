"use client"

import { FONTS } from "@/constants/uiConstants"
import Cloud from "../../assets/icons/payments/Cloud.png"
import FileUpload from "../../assets/icons/payments/File-upload.png"
import { useEffect, useState, useRef } from "react"
import Modal from "./Modal"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { getStudentPaymentThunk } from "@/features/Payment/reducers/thunks"
import { selectPayment } from "@/features/Payment/reducers/selectors"
import { getDashBoardReports } from "@/features/Dashboard/reducers/thunks"
import { SalarySlip } from "./Salaryslip"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface PaymentTable {
  Month: string
  Payment: number
  workingDays: number
  presentDays: number
  absentDays: number
  deductions: number
  status: boolean
  actions: any
}

interface PaymentTableProps {
  selectedStatus: string
}

const PaymentTable = ({ selectedStatus }: PaymentTableProps) => {
  const [selectedDetail, setSelectedDetail] = useState<any>([])
  const salarySlipRef = useRef<HTMLDivElement>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [pdfPaymentData, setPdfPaymentData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // Declare isModalOpen variable

  const dispatch = useDispatch<any>()
  const SalaryDetails = useSelector(selectPayment)

  useEffect(() => {
    dispatch(getStudentPaymentThunk({}))
  }, [dispatch])

  useEffect(() => {
    dispatch(getDashBoardReports())
  }, [dispatch])

  const headers = [
    "Month",
    "Payment",
    "workingDays",
    "present",
    "absent",
    // 'deductions',
    "status",
    "Actions",
  ]

  const formatDateTime = (isoString?: string): string => {
    if (!isoString) return "No date provided"

    const dateObj = new Date(isoString)
    if (isNaN(dateObj.getTime())) return "Invalid date"

    const date = dateObj.toISOString().split("T")[0]
    const time = dateObj.toTimeString().split(" ")[0]

    return `${date}  &  ${time}`
  }

  const handleDownloadPDF = async (paymentData: any) => {
    try {
      setIsGeneratingPDF(true)
      setPdfPaymentData(paymentData)

      await new Promise((resolve) => setTimeout(resolve, 100))

      if (salarySlipRef.current) {
        salarySlipRef.current.classList.add("pdf-generation")

        const canvas = await html2canvas(salarySlipRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: salarySlipRef.current.scrollWidth,
          height: salarySlipRef.current.scrollHeight,
          ignoreElements: (element) => {
            return element.tagName === "SCRIPT" || element.tagName === "STYLE"
          },
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.querySelector(".pdf-generation")
            if (clonedElement && clonedElement instanceof HTMLElement) {
              clonedElement.style.backgroundColor = "#ffffff"
              clonedElement.style.color = "#000000"
            }
          },
        })

        salarySlipRef.current.classList.remove("pdf-generation")

        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF("p", "mm", "a4")

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 0

        pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)

        const fileName = `salary-slip-${paymentData.staff?.username || "employee"}-${new Date(paymentData.payment_date).toLocaleString("en-US", { month: "long", year: "numeric" })}.pdf`
        pdf.save(fileName)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
      setPdfPaymentData(null)
    }
  }

  const filteredPayments =
    selectedStatus.toLowerCase() === "all"
      ? SalaryDetails
      : SalaryDetails?.filter((payment: any) => payment?.status.toLowerCase() === selectedStatus.toLowerCase())
  return (
    <div className="p-4 custom-inset-shadow grid gap-4">
      <section
        className="grid grid-cols-7 text-center bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-4 rounded-lg"
        style={{ ...FONTS.heading_03 }}
      >
        {headers.map((header, index) => (
          <div key={index}>{header}</div>
        ))}
      </section>

      <section>
        {filteredPayments?.length ? (
          filteredPayments?.map((PaymentTable: any, index: any) => (
            <div
              className="grid grid-cols-7 justify-center items-center my-5 text-center bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-3 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:-translate-y-1 
                        hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                        cursor-pointer"
              style={{ ...FONTS.heading_06 }}
              key={index}
            >
              <p>
                {new Date(PaymentTable.payment_date).toLocaleString("en-US", {
                  month: "long",
                })}
              </p>
              <p>{PaymentTable?.salary_amount}</p>
              <p>{PaymentTable?.attendance_details?.totalWorkingDays}</p>
              <p>{PaymentTable?.attendance_details?.presentDays}</p>
              <p>{PaymentTable?.attendance_details?.absentDays}</p>
              <button
                style={{
                  boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
                }}
                className={`p-2 rounded-lg w-[100px] m-auto
                        ${
                          PaymentTable?.status !== "pending"
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-500 hover:to-green-600 shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]"
                            : "bg-gradient-to-r from-red-500 to-red-600 text-white  shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_red_inset,-4px_-8px_10px_0px_#B20_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white"
                        }`}
              >
                {PaymentTable?.status === "pending" ? "Pending" : "Paid"}
              </button>
              <p className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handleDownloadPDF(PaymentTable)}
                  disabled={isGeneratingPDF}
                  className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] p-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  title={isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
                >
                  <img src={Cloud || "/placeholder.svg"} alt="Download" />
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(true)
                    setSelectedDetail(PaymentTable)
                  }}
                  className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] p-2 rounded-lg cursor-pointer"
                  title="Upload"
                >
                  <img src={FileUpload || "/placeholder.svg"} alt="Upload" />
                </button>
              </p>
            </div>
          ))
        ) : (
          <div className="flex justify-center mt-3">
            <p style={{ ...FONTS.heading_06 }}>No payment datas available</p>
          </div>
        )}
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold mb-2" style={{ ...FONTS.heading_01 }}>
            Payment Details
          </h2>
          <div
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-lg cursor-pointer"
            style={{
              boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
            }}
          >
            <p className="h-5 w-5 text-[#716F6F] font-bold flex justify-center items-center rounded-full">X</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <section>
            <p style={{ ...FONTS.heading_04 }}>Month</p>
            <p
              className="p-4 rounded-lg mt-4"
              style={{
                ...FONTS.heading_06,
                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
              }}
            >
              {new Date(selectedDetail?.payment_date).toLocaleString("en-US", {
                month: "long",
              })}
            </p>
          </section>

          <section>
            <p style={{ ...FONTS.heading_04 }}>Date & time</p>
            <p
              className="p-4 rounded-lg mt-4"
              style={{
                ...FONTS.heading_06,
                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
              }}
            >
              {formatDateTime(selectedDetail?.payment_date)}
            </p>
          </section>

          <section>
            <p style={{ ...FONTS.heading_04 }}>workingDays</p>
            <p
              className="p-4 rounded-lg mt-4"
              style={{
                ...FONTS.heading_06,
                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
              }}
            >
              {selectedDetail?.attendance_details?.totalWorkingDays}
            </p>
          </section>
          <section>
            <p style={{ ...FONTS.heading_04 }}>Amount</p>
            <p
              className="p-4 rounded-lg mt-4"
              style={{
                ...FONTS.heading_06,
                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
              }}
            >
              {selectedDetail?.salary_amount}
            </p>
          </section>

          <section>
            <p style={{ ...FONTS.heading_04 }}>Absent Days</p>
            <p
              className="p-4 rounded-lg mt-4"
              style={{
                ...FONTS.heading_06,
                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(106, 141, 175, 0.75) 2px 2px 3px inset`,
              }}
            >
              {selectedDetail?.attendance_details?.absentDays}
            </p>
          </section>

          <section>
            <p style={{ ...FONTS.heading_04 }}>Present Days</p>
            <p
              className="p-4 rounded-lg mt-4"
              style={{
                ...FONTS.heading_06,
                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
              }}
            >
              {selectedDetail?.attendance_details?.presentDays}
            </p>
          </section>

          <section>
            <p style={{ ...FONTS.heading_04 }}>Payment Method</p>
            <p
              className="p-4 rounded-lg mt-4"
              style={{
                ...FONTS.heading_06,
                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
              }}
            >
              {selectedDetail.paymentMethod || "Cash"}
            </p>
          </section>

          <section>
            <p style={{ ...FONTS.heading_04 }}>Deductions</p>
            <p
              className="p-4 rounded-lg mt-4"
              style={{
                ...FONTS.heading_06,
                boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
              }}
            >
              {selectedDetail.deductions || "NIL"}
            </p>
          </section>

          <section>
            <p style={{ ...FONTS.heading_04 }}>Status</p>
            <Button
              className={`p-2 px-8 rounded-lg mt-4 
                        ${
                          selectedDetail.status !== "pending"
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-500 hover:to-green-600 shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]"
                            : "bg-gradient-to-r from-red-500 to-red-600 text-white  shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_red_inset,-4px_-8px_10px_0px_#B20_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white"
                        }`}
            >
              {selectedDetail?.status === "pending" ? "Pending" : "Paid"}
            </Button>
          </section>
        </div>

        <div className="flex justify-end ">
          <Button
            onClick={() => setIsModalOpen(false)}
            className="cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white rounded-lg shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white"
          >
            Close
          </Button>
        </div>
      </Modal>

      {pdfPaymentData && (
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <SalarySlip ref={salarySlipRef} data={pdfPaymentData} />
        </div>
      )}

      {isGeneratingPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <span className="text-lg font-medium">Generating PDF...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentTable
