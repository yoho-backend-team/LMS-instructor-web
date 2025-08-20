import { forwardRef } from "react"

interface SalarySlipData {
  _id: string
  staff: {
    username: string
    designation: string
    staffId: string
    roll_no: string
    Bank_Details: {
      Account_Number: string
      Branch: string
      Bank: string
      IFSC: string
    }
  }
  institute_id: {
    institute_name: string
    logo: string
    email: string
    website: string
    contact_info?: {
      address?: {
        address1: string
        address2: string
        state: string
      }
    }
  }
  salary_amount: number
  payment_date: string
  balance: number
  transaction_id: number
  bank_details: {
    bank_name: string
    branch: string
    IFSC: string
    account_number: string
  }
}

interface SalarySlipProps {
  data: SalarySlipData
}

export const SalarySlip = forwardRef<HTMLDivElement, SalarySlipProps>(({ data }, ref) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString.split("-").reverse().join("-"))
    if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
    }
    return dateString
  }

  const styles = {
    container: {
      maxWidth: "210mm",
      margin: "0 auto",
      padding: "10mm",
      fontFamily: "Arial, sans-serif",
      fontSize: "12px",
      lineHeight: "1.4",
      color: "#333",
      backgroundColor: "#fff",
      minHeight: "297mm", // A4 height
      boxSizing: "border-box" as const,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      paddingBottom: "15px",
      borderBottom: "2px solid #2563eb",
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    logo: {
      width: "60px",
      height: "60px",
      objectFit: "contain" as const,
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      padding: "5px",
    },
    instituteInfo: {
      lineHeight: "1.3",
    },
    instituteName: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "0 0 5px 0",
      color: "#1f2937",
    },
    instituteDetails: {
      fontSize: "11px",
      color: "#6b7280",
      margin: "2px 0",
    },
    titleSection: {
      textAlign: "right" as const,
      border: "1px solid #2563eb",
      padding: "10px 15px",
      borderRadius: "4px",
      backgroundColor: "#f8fafc",
    },
    title: {
      fontSize: "16px",
      fontWeight: "bold",
      margin: "0 0 5px 0",
      color: "#2563eb",
    },
    paymentDate: {
      fontSize: "11px",
      color: "#374151",
      fontWeight: "500",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "15px",
      marginBottom: "20px",
    },
    infoCard: {
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      padding: "12px",
      backgroundColor: "#fafafa",
    },
    cardTitle: {
      fontSize: "13px",
      fontWeight: "bold",
      marginBottom: "8px",
      paddingBottom: "5px",
      borderBottom: "1px solid #d1d5db",
      color: "#374151",
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "6px",
    },
    infoLabel: {
      fontSize: "11px",
      color: "#6b7280",
      fontWeight: "500",
    },
    infoValue: {
      fontSize: "11px",
      fontWeight: "bold",
      color: "#1f2937",
    },
    highlightValue: {
      fontSize: "11px",
      fontWeight: "bold",
      backgroundColor: "#e0f2fe",
      padding: "2px 6px",
      borderRadius: "3px",
      fontFamily: "monospace",
      color: "#0369a1",
    },
    netPayValue: {
      fontSize: "13px",
      fontWeight: "bold",
      color: "#059669",
    },
    salarySection: {
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      marginBottom: "20px",
      overflow: "hidden",
    },
    salarySectionTitle: {
      fontSize: "14px",
      fontWeight: "bold",
      padding: "12px 15px",
      backgroundColor: "#f3f4f6",
      borderBottom: "1px solid #e5e7eb",
      color: "#374151",
      margin: "0",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
    },
    tableHeader: {
      backgroundColor: "#374151",
      color: "#fff",
    },
    tableHeaderCell: {
      padding: "10px 15px",
      fontSize: "12px",
      fontWeight: "bold",
      textAlign: "left" as const,
    },
    tableHeaderCellRight: {
      padding: "10px 15px",
      fontSize: "12px",
      fontWeight: "bold",
      textAlign: "right" as const,
    },
    tableRow: {
      borderBottom: "1px solid #f3f4f6",
    },
    tableCell: {
      padding: "8px 15px",
      fontSize: "11px",
      color: "#374151",
    },
    tableCellRight: {
      padding: "8px 15px",
      fontSize: "11px",
      textAlign: "right" as const,
      fontWeight: "bold",
      color: "#374151",
    },
    deductionValue: {
      color: "#dc2626",
      fontWeight: "bold",
    },
    totalRow: {
      backgroundColor: "#374151",
      color: "#fff",
    },
    totalCell: {
      padding: "10px 15px",
      fontSize: "13px",
      fontWeight: "bold",
    },
    totalCellRight: {
      padding: "10px 15px",
      fontSize: "13px",
      fontWeight: "bold",
      textAlign: "right" as const,
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingTop: "15px",
      borderTop: "1px solid #e5e7eb",
      marginTop: "20px",
    },
    footerLeft: {
      flex: "1",
    },
    footerNote: {
      fontSize: "10px",
      color: "#6b7280",
      marginBottom: "5px",
    },
    generatedDate: {
      fontSize: "10px",
      color: "#9ca3af",
      backgroundColor: "#f9fafb",
      padding: "4px 8px",
      borderRadius: "3px",
      fontFamily: "monospace",
    },
    signatureSection: {
      textAlign: "center" as const,
      minWidth: "120px",
    },
    signatureBox: {
      width: "100px",
      height: "40px",
      border: "1px dashed #9ca3af",
      borderRadius: "3px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5px",
      backgroundColor: "#fafafa",
    },
    signatureText: {
      fontSize: "9px",
      color: "#9ca3af",
    },
    signatureLabel: {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#374151",
    },
  }

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
          }
          
          * {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
          }
        }
        
        @media screen {
          body {
            background-color: #f5f5f5;
            padding: 20px;
          }
        }
      `}</style>

      <div ref={ref} style={styles.container}>
        {/* Header Section */}
        <div style={styles?.header}>
          <div style={styles?.logoSection}>
            {data.institute_id.logo && (
              <img src={data.institute_id.logo || "/placeholder.svg"} alt="Institute Logo" style={styles?.logo} />
            )}
            <div style={styles.instituteInfo}>
              <h1 style={styles.instituteName}>{data?.institute_id?.institute_name}</h1>
              <p style={styles.instituteDetails}>{data?.institute_id?.email}</p>
              <p style={styles.instituteDetails}>{data?.institute_id?.website}</p>
            </div>
          </div>
          <div style={styles.titleSection}>
            <h2 style={styles.title}>SALARY SLIP</h2>
            <p style={styles.paymentDate}>Payment Date: {formatDate(data?.payment_date)}</p>
          </div>
        </div>

        {/* Information Grid */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <h3 style={styles.cardTitle}>Employee Details</h3>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Name:</span>
              <span style={styles.infoValue}>{data?.staff?.username}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>ID:</span>
              <span style={styles.highlightValue}>{data?.staff?.staffId}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Designation:</span>
              <span style={styles.infoValue}>{data?.staff?.designation.substring(0,15)}</span>
            </div>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.cardTitle}>Payment Information</h3>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Transaction ID:</span>
              <span style={styles.highlightValue}>{data?.transaction_id}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Date:</span>
              <span style={styles.infoValue}>{formatDate(data?.payment_date)}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Net Pay:</span>
              <span style={styles.netPayValue}>{formatCurrency(data?.balance)}</span>
            </div>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.cardTitle}>Bank Details</h3>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Bank:</span>
              <span style={styles.infoValue}>{data?.staff?.Bank_Details?.Bank|| "Nil"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Account:</span>
              <span style={styles.highlightValue}>{data?.staff?.Bank_Details?.Account_Number|| "Nil"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>IFSC:</span>
              <span style={styles.highlightValue}>{data?.staff?.Bank_Details?.IFSC|| "Nil"}</span>
            </div>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div style={styles.salarySection}>
          <h3 style={styles.salarySectionTitle}>Salary Breakdown</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Description</th>
                <th style={styles.tableHeaderCellRight}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>Basic Salary</td>
                <td style={styles.tableCellRight}>{formatCurrency(data?.salary_amount)}</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>Allowances</td>
                <td style={styles.tableCellRight}>{formatCurrency(0)}</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>Deductions</td>
                <td style={{ ...styles.tableCellRight, ...styles.deductionValue }}>{formatCurrency(data?.salary_amount - data?.balance)}
                </td>
              </tr>
              <tr style={styles.totalRow}>
                <td style={styles.totalCell}>Net Pay</td>
                <td style={styles.totalCellRight}>{formatCurrency(data?.balance)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerLeft}>
            <p style={styles.footerNote}>Computer-generated salary slip. No signature required.</p>
            <p style={styles.generatedDate}>Generated: {new Date().toLocaleDateString("en-IN")}</p>
          </div>
          <div style={styles.signatureSection}>
            <div style={styles.signatureBox}>
              <span style={styles.signatureText}>Digital Signature</span>
            </div>
            <p style={styles.signatureLabel}>Authorized Signatory</p>
          </div>
        </div>
      </div>
    </>
  )
})

SalarySlip.displayName = "SalarySlip"
