import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import MSidebar from "../../../components/MSidebar/MSidebar";
import { PDFExport } from "@progress/kendo-react-pdf";

import "./DataReport.css";

function DataReport() {
  const dataReportRef = useRef(null);

  const exportToPDF = () => {
    if (dataReportRef.current) {
      dataReportRef.current.save();
    }
  };

  const [diningType, setDiningType] = useState("allDining");
  const generateVisitTableSingleAttraction = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const totalVisitors = data.reduce(
        (sum, row) => sum + parseInt(row.VisitorsCount),
        0
      );
      return (
        <>
          <button
            onClick={exportToPDF}
            className="data-report-exportPdf-dr-butt"
          >
            Export to PDF
          </button>

          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "2cm", bottom: "2cm", right: "2cm", left: "2cm" }}
            ref={dataReportRef}
          >
            <h3>
              Visit Report{" "}
              <span className="datareport-date-range">
                ({visitStartDate} - {visitEndDate})
              </span>
            </h3>
            <p>{attractionName}</p>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Visitors Count</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.PurchaseDate}</td>
                    <td>{row.VisitorsCount}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="1"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total Visitors:
                  </td>
                  <td style={{ fontWeight: "bold" }}>{totalVisitors}</td>
                </tr>
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>
            Visit Report ({visitStartDate} - {visitEndDate})
          </h3>
          <div>No visit report data found for the selected criteria.</div>
        </>
      );
    }
  };

  const generateVisitTableSingleDining = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      // Calculate the total visitors for the date range
      const totalVisitors = data.reduce((sum, row) => sum + parseFloat(row.Visitors), 0);
  
      return (
        <>
          <button onClick={exportToPDF} className="data-report-exportPdf-dr-butt">
            Export to PDF
          </button>
  
          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "2cm", bottom: "2cm", right: "2cm", left: "2cm" }}
            ref={dataReportRef}
          >
            <h3>
              Visit Report{" "}
              <span className="datareport-date-range">
                ({visitStartDate} - {visitEndDate})
              </span>
            </h3>
            <p>{diningName}</p>
  
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Visitors Count</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.TransactionDate}</td>
                    <td>{row.Visitors}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>
                    Total Visitors :
                  </td>
                  <td style={{ fontWeight: "bold" }}>{totalVisitors}</td>
                </tr>
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>
            Visit Report ({visitStartDate} - {visitEndDate})
          </h3>
          <div>No visit report data found for the selected criteria.</div>
        </>
      );
    }
  };

  const generateVisitTableAllDining = (data) => {
    if (Array.isArray(data) && data.length > 0) {
        // Calculate the total visitors for the date range
        const totalVisitors = data.reduce((sum, row) => sum + parseFloat(row.Total), 0);
      const transformedData = data.map((row) => {
        const { TransactionDate, ...restaurants } = row;
        return {
          TransactionDate,
          ...restaurants,
        };
      });
  
  
      return (
        <>
          <button onClick={exportToPDF} className="data-report-exportPdf-dr-butt">
            Export to PDF
          </button>
  
          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "2cm", bottom: "2cm", right: "2cm", left: "2cm" }}
            ref={dataReportRef}
          >
            <h3>
              Visit Report{" "}
              <span className="datareport-date-range">
                ({visitStartDate} - {visitEndDate})
              </span>
            </h3>
  
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {Object.keys(transformedData[0])
                    .filter((key) => key !== 'TransactionDate')
                    .map((key) => <th key={key}>{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {transformedData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.TransactionDate}</td>
                    {Object.keys(row)
                      .filter((key) => key !== 'TransactionDate')
                      .map((key) => (
                        <td key={key}>{row[key] || 0}</td>
                      ))}
                   
                  </tr>
                ))}
                <tr>
                  <td colSpan={Object.keys(transformedData[0]).length} style={{ textAlign: "right", fontWeight: "bold" }}>
                    Total Visitors:
                  </td>
                  <td style={{ fontWeight: "bold" }}>{totalVisitors}</td>
                </tr>
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>
            Visit Report ({visitStartDate} - {visitEndDate})
          </h3>
          <div>No visit report data found for the selected criteria.</div>
        </>
      );
    }
  };

  const generateVisitTable = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      // Transform the data to match the expected structure
      const transformedData = data.map((row) => {
        const { PurchaseDate, ...attractions } = row;
        return {
          PurchaseDate,
          ...attractions,
          Total: row.Total,
        };
      });
  
      const totalVisitors = transformedData.reduce(
        (sum, row) => sum + parseInt(row.Total),
        0
      );
  
      return (
        <>
          <button onClick={exportToPDF} className="data-report-exportPdf-dr-butt">
            Export to PDF
          </button>
          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "2cm", bottom: "2cm", right: "2cm", left: "2cm" }}
            ref={dataReportRef}
          >
            <h3>
              Visit Report{" "}
              <span className="datareport-date-range">
                ({visitStartDate} - {visitEndDate})
              </span>
            </h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {Object.keys(transformedData[0]).map(
                    (key) =>
                      key !== "PurchaseDate" && key !== "Total" && (
                        <th key={key}>{key}</th>
                      )
                  )}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {transformedData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.PurchaseDate}</td>
                    {Object.keys(row)
                      .filter((key) => key !== "PurchaseDate" && key !== "Total")
                      .map((key) => (
                        <td key={key}>{row[key]}</td>
                      ))}
                    <td>{row.Total}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={Object.keys(transformedData[0]).length - 1} style={{ textAlign: "right", fontWeight: "bold" }}>
                    Total Visitors:
                  </td>
                  <td style={{ fontWeight: "bold" }}>{totalVisitors}</td>
                </tr>
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>
            Visit Report ({visitStartDate} - {visitEndDate})
          </h3>
          <div>No visit report data found for the selected criteria.</div>
        </>
      );
    }
  };
  const generateMaintenanceTable = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      return (
        <>
          <button
            onClick={exportToPDF}
            className="data-report-exportPdf-dr-butt"
          >
            Export to PDF
          </button>

          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "1cm", bottom: "1cm", right: "1cm", left: "1cm" }}
            ref={dataReportRef}
          >
            <h3>
              Maintenance Report{" "}
              <span className="datareport-date-range">
                ({maintenanceStartDate} - {maintenanceEndDate})
              </span>
            </h3>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Attraction Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Date}</td>
                    <td>{row.MRSubject}</td>
                    <td>{row.AName}</td>
                    <td>{row.MRDescription}</td>
                    <td>{row.MRStatus}</td>
                    <td>${row.MRCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>
            Maintenance Report{" "}
            <span className="datareport-date-range">
              ({maintenanceStartDate} - {maintenanceEndDate})
            </span>
          </h3>
          <div>No maintenance report data found for the selected criteria.</div>
        </>
      );
    }
  };
  const generateFinanceTable = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      return (
        <>
          <button
            onClick={exportToPDF}
            className="data-report-exportPdf-dr-butt"
          >
            Export to PDF
          </button>

          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "1cm", bottom: "1cm", right: "1cm", left: "1cm" }}
            ref={dataReportRef}
          >
            <h3>
              Ticket Report{" "}
              <span className="datareport-date-range">
                ({financeStartDate} - {financeEndDate})
              </span>
            </h3>
            <div className="data-report-summary-container">
              <div className="data-report-summary-box">
                <p>Average Daily Tickets:</p>
                <p className="data-report-summary-box-value">
                  {parseFloat(data[0].AvgDailyTickets).toFixed(2)}
                </p>
              </div>
              <div className="data-report-summary-box">
                <p>Average Daily Revenue:</p>
                <p className="data-report-summary-box-value">
                  {" "}
                  ${parseFloat(data[0].AvgDailyRevenue).toFixed(2)}
                </p>
              </div>
              <div className="data-report-summary-box">
                <p>Total Revenue: </p>
                <p className="data-report-summary-box-value">
                  ${parseFloat(data[0].TotalRevenue).toFixed(2)}
                </p>
              </div>
            </div>

            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {(ticketType === "Standard" ||
                    ticketType === "allTicket") && <th>Standard</th>}
                  {(ticketType === "Express" || ticketType === "allTicket") && (
                    <th>Express</th>
                  )}
                  {(ticketType === "Child" || ticketType === "allTicket") && (
                    <th>Child</th>
                  )}
                  {(ticketType === "Standard" ||
                    ticketType === "allTicket") && <th>Standard Revenue</th>}
                  {(ticketType === "Express" || ticketType === "allTicket") && (
                    <th>Express Revenue</th>
                  )}
                  {(ticketType === "Child" || ticketType === "allTicket") && (
                    <th>Child Revenue</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Date}</td>
                    {(ticketType === "Standard" ||
                      ticketType === "allTicket") && (
                      <td>{row.Standard_Tickets}</td>
                    )}
                    {(ticketType === "Express" ||
                      ticketType === "allTicket") && (
                      <td>{row.Express_Tickets}</td>
                    )}
                    {(ticketType === "Child" || ticketType === "allTicket") && (
                      <td>{row.Child_Tickets}</td>
                    )}
                    {(ticketType === "Standard" ||
                      ticketType === "allTicket") && (
                      <td>${row.Standard_Ticket_Price}</td>
                    )}
                    {(ticketType === "Express" ||
                      ticketType === "allTicket") && (
                      <td>${row.Express_Ticket_Price}</td>
                    )}
                    {(ticketType === "Child" || ticketType === "allTicket") && (
                      <td>${row.Child_Ticket_Price}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>Finance Report</h3>
          <div>No finance report found for the selected date and type.</div>
        </>
      );
    }
  };
  const generateDiningReport = (data) => {
    if (financeType === "") {
      return null;
    }

    if (Array.isArray(data) && data.length > 0) {
      const totalRevenue = data.reduce(
        (sum, row) => sum + parseFloat(row.TotalRevenue),
        0
      );

      const totalExpense = data.reduce(
        (sum, row) => sum + parseFloat(row.TotalExpense),
        0
      );

      const amountLabel =
        financeType === "diningRev" ? "Total Revenue" : "Total Expense";

      return (
        <>
          <button
            onClick={exportToPDF}
            className="data-report-exportPdf-dr-butt"
          >
            Export to PDF
          </button>
          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "2cm", bottom: "2cm", right: "2cm", left: "2cm" }}
            ref={dataReportRef}
          >
            <h3>
              Dining Report{" "}
              <span className="datareport-date-range">
                ({financeStartDate} - {financeEndDate})
              </span>
            </h3>

            {financeType === "diningRev" && (
              <div className="data-report-summary-container">
                <div className="data-report-summary-box">
                  <p>Average Daily Sales:</p>
                  <p className="data-report-summary-box-value">
                    {parseFloat(data[0].AvgDailySales).toFixed(2)}
                  </p>
                </div>
                <div className="data-report-summary-box">
                  <p>Average Daily Revenue:</p>
                  <p className="data-report-summary-box-value">
                    ${parseFloat(data[0].AvgDailyRevenue).toFixed(2)}
                  </p>
                </div>
                <div className="data-report-summary-box">
                  <p>
                    {diningType === "allDining"
                      ? "Total Revenue"
                      : `Total ${diningType} Revenue`}
                  </p>
                  <p className="data-report-summary-box-value">
                    ${parseFloat(data[0].TotalRevenue).toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {financeType === "diningExpense" && (
              <div className="data-report-summary-container">
                <div className="data-report-summary-box">
                  <p>Average Daily Expenses:</p>
                  <p className="data-report-summary-box-value">
                    ${parseFloat(data[0].AvgDailyExpenseAmt).toFixed(2)}
                  </p>
                </div>
                <div className="data-report-summary-box">
                  <p>
                    {diningType === "allDining"
                      ? "Total Expense"
                      : `Total Expense`}
                  </p>
                  <p className="data-report-summary-box-value">
                    ${parseFloat(data[0].TotalExpense).toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {financeType === "diningRev" && (
                    <>
                      {diningType === "allDining" ||
                      diningType === "Standard" ? (
                        <th>Standard</th>
                      ) : null}
                      {diningType === "allDining" || diningType === "Deluxe" ? (
                        <th>Deluxe</th>
                      ) : null}
                      {diningType === "allDining" ||
                      diningType === "Special" ? (
                        <th>Special</th>
                      ) : null}
                      {diningType === "allDining" ||
                      diningType === "Standard" ? (
                        <th>Standard Revenue</th>
                      ) : null}
                      {diningType === "allDining" || diningType === "Deluxe" ? (
                        <th>Deluxe Revenue</th>
                      ) : null}
                      {diningType === "allDining" ||
                      diningType === "Special" ? (
                        <th>Special Revenue</th>
                      ) : null}
                    </>
                  )}

                  {financeType === "diningExpense" && (
                    <>
                      {diningType === "allDining" ? <th>Type</th> : null}
                      <th>Produce Expense</th>
                      <th>Supplies Expense</th>
                      <th>Utilities Expense</th>
                      {diningType === "allDining" ? (
                        <th>Total Expense</th>
                      ) : null}
                      {diningType === "Standard" ? (
                        <th>Total Expense</th>
                      ) : null}
                      {diningType === "Deluxe" ? <th>Total Expense</th> : null}
                      {diningType === "Special" ? <th>Total Expense</th> : null}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Date}</td>
                    {financeType === "diningRev" && (
                      <>
                        {diningType === "allDining" ||
                        diningType === "Standard" ? (
                          <td>{row.Standard_Transactions}</td>
                        ) : null}
                        {diningType === "allDining" ||
                        diningType === "Deluxe" ? (
                          <td>{row.Deluxe_Transactions}</td>
                        ) : null}
                        {diningType === "allDining" ||
                        diningType === "Special" ? (
                          <td>{row.Special_Transactions}</td>
                        ) : null}
                        {diningType === "allDining" ||
                        diningType === "Standard" ? (
                          <td>
                            ${parseFloat(row.Standard_Revenue).toFixed(2)}
                          </td>
                        ) : null}
                        {diningType === "allDining" ||
                        diningType === "Deluxe" ? (
                          <td>${parseFloat(row.Deluxe_Revenue).toFixed(2)}</td>
                        ) : null}
                        {diningType === "allDining" ||
                        diningType === "Special" ? (
                          <td>${parseFloat(row.Special_Revenue).toFixed(2)}</td>
                        ) : null}
                      </>
                    )}
                    {financeType === "diningExpense" && (
                      <>
                        {diningType === "allDining" ? (
                          <td>{row.rtype}</td>
                        ) : null}
                        <td>${parseFloat(row.Produce_Expense).toFixed(2)}</td>
                        <td>${parseFloat(row.Supplies_Expense).toFixed(2)}</td>
                        <td>${parseFloat(row.Utilities_Expense).toFixed(2)}</td>

                        {diningType === "allDining" ? (
                          <td>${parseFloat(row.Total_Expense).toFixed(2)}</td>
                        ) : null}
                        {diningType === "Standard" ? (
                          <td>
                            ${parseFloat(row.Standard_Expense).toFixed(2)}
                          </td>
                        ) : null}
                        {diningType === "Deluxe" ? (
                          <td>${parseFloat(row.Total_Expense).toFixed(2)}</td>
                        ) : null}
                        {diningType === "Special" ? (
                          <td>${parseFloat(row.Total_Expense).toFixed(2)}</td>
                        ) : null}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>Finance Report</h3>
          <div>No dining report data found for the selected date and type.</div>
        </>
      );
    }
  };
  const generateMerchReport = (data) => {
    if (financeType === "") {
      return null;
    }

    const amountLabel =
      financeType === "merchRevenue" ? "Total Revenue" : "Total Expense";

    if (data.length > 0) {
      return (
        <>
          <button
            onClick={exportToPDF}
            className="data-report-exportPdf-dr-butt"
          >
            Export to PDF
          </button>

          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "2cm", bottom: "2cm", right: "2cm", left: "2cm" }}
            ref={dataReportRef}
          >
            <h3>
              Merchandise Report{" "}
              <span className="datareport-date-range">
                ({financeStartDate} - {financeEndDate})
              </span>
            </h3>
            {financeType === "merchExpense" && (
              <div className="data-report-summary-container">
                <div className="data-report-summary-box">
                  <p>Average Daily Expense:</p>
                  <p className="data-report-summary-box-value">
                    {" "}
                    ${parseFloat(data[0].AvgCost).toFixed(2)}
                  </p>
                </div>
                <div className="data-report-summary-box">
                  <p>Total Expense: </p>
                  <p className="data-report-summary-box-value">
                    ${parseFloat(data[0].TotalExpense).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            {financeType === "merchRevenue" && (
              <div className="data-report-summary-container">
                <div className="data-report-summary-box">
                  <p>Average Daily Sales:</p>
                  <p className="data-report-summary-box-value">
                    {parseFloat(data[0].AvgDailyTransactions).toFixed(2)}
                  </p>
                </div>
                <div className="data-report-summary-box">
                  <p>Average Daily Revenue:</p>
                  <p className="data-report-summary-box-value">
                    {" "}
                    ${parseFloat(data[0].AvgRevenue).toFixed(2)}
                  </p>
                </div>
                <div className="data-report-summary-box">
                  <p>Total Revenue: </p>
                  <p className="data-report-summary-box-value">
                    ${parseFloat(data[0].TotalRevenuePeriod).toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item Type</th>
                  <th>Item Name</th>
                  {financeType === "merchRevenue" && <th>Quantity Sold</th>}
                  {financeType === "merchExpense" && <th>Quantity Supplied</th>}
                  <th>{amountLabel}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Date}</td>
                    <td>{row.ItemType}</td>
                    <td>{row.ItemName}</td>
                    {financeType === "merchRevenue" && (
                      <td>{row.QuantitySold}</td>
                    )}
                    {financeType === "merchExpense" && (
                      <td>{row.QuantitySold}</td>
                    )}
                    <td>
                      $
                      {financeType === "merchRevenue"
                        ? row.TotalRevenue
                        : row.ExpenseAmt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>Finance Report</h3>
          <div>No dining report found for the selected date and type.</div>
        </>
      );
    }
  };

  const generateMaintExpense = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      return (
        <>
          <button
            onClick={exportToPDF}
            className="data-report-exportPdf-dr-butt"
          >
            Export to PDF
          </button>

          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "2cm", bottom: "2cm", right: "2cm", left: "2cm" }}
            ref={dataReportRef}
          >
            <h3>
              Maintenance Report{" "}
              <span className="datareport-date-range">
                ({financeStartDate} - {financeEndDate})
              </span>
            </h3>
            <div className="data-report-summary-container">
              <div className="data-report-summary-box">
                <p>Average Daily Submits:</p>
                <p className="data-report-summary-box-value">
                  {parseFloat(data[0].AvgDailySubmits).toFixed(2)}
                </p>
              </div>
              <div className="data-report-summary-box">
                <p>Average Daily Expense:</p>
                <p className="data-report-summary-box-value">
                  {" "}
                  ${parseFloat(data[0].AvgCost).toFixed(2)}
                </p>
              </div>
              <div className="data-report-summary-box">
                <p>Total Expense: </p>
                <p className="data-report-summary-box-value">
                  ${parseFloat(data[0].TotalCost).toFixed(2)}
                </p>
              </div>
            </div>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Attraction Name</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Date}</td>
                    <td>{row.Subject}</td>
                    <td>{row.AttractionN}</td>
                    <td>${parseFloat(row.Cost).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>Finance Report</h3>
          <div>No finance report found for the selected date and type.</div>
        </>
      );
    }
  };

  const generateProfitTable = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      return (
        <>
          <button
            onClick={exportToPDF}
            className="data-report-exportPdf-dr-butt"
          >
            Export to PDF
          </button>
          <PDFExport
            paperSize="auto"
            fileName="data_report.pdf"
            margin={{ top: "2cm", bottom: "2cm", right: "2cm", left: "2cm" }}
            ref={dataReportRef}
          >
            <h3>
              Profit Report{" "}
              <span className="datareport-date-range">
                ({financeStartDate} - {financeEndDate})
              </span>
            </h3>
            <div className="data-report-summary-container">
              <div className="data-report-summary-box">
                <p>Total Revenue:</p>
                <p className="data-report-summary-box-value">
                  ${parseFloat(data[0].total_revenue).toFixed(2)}
                </p>
              </div>
              <div className="data-report-summary-box">
                <p>Total Expense:</p>
                <p className="data-report-summary-box-value">
                  ${parseFloat(data[0].total_expenses).toFixed(2)}
                </p>
              </div>
              <div className="data-report-summary-box">
                <p>Total Profit:</p>
                <p className="data-report-summary-box-value">
                  ${parseFloat(data[0].total_profit).toFixed(2)}
                </p>
              </div>
            </div>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Department</th>
                  <th>Revenue</th>
                  <th>Expense</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.department}</td>
                    <td>${row.revenue}</td>
                    <td>${row.expenses}</td>
                    <td>${row.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PDFExport>
        </>
      );
    } else {
      return (
        <>
          <h3>
            Finance Report ({financeStartDate} - {financeEndDate})
          </h3>
          <div>No finance report found for the selected date and type.</div>
        </>
      );
    }
  };
  const [restList, setRestList] = useState([]);

  useEffect(() => {
    const fetchRestList = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/get-rest`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch rest list");
        }

        const data = await response.json();
        console.log("rest list data:", data);
        setRestList(data.restaurants);
      } catch (error) {
        console.error("Error fetching rest list:", error);
        fetchRestList([]);
      }
    };

    fetchRestList();
  }, []);
  const [showFinance, setShowFinance] = useState(false);
  const [showVisitReports, setShowVisitReports] = useState(false);

  const [financeStartDate, setFinanceStartDate] = useState("");
  const [financeEndDate, setFinanceEndDate] = useState("");
  const [financeCategory, setFinanceCategory] = useState("");

  const [financeType, setFinanceType] = useState(() => {
    switch (financeCategory) {
      case "tickets":
        return "ticketType";
      case "merch":
        return "merchRevenue";
      case "maintenance":
        return "maintExpense";
      default:
        return "";
    }
  });

  const [showMaintenance, setShowMaintenance] = useState(false);
  const [attractionName, setAttractionName] = useState("all");
  const [diningName, setDiningName] = useState("all");

  const [maintenanceStartDate, setMaintenanceStartDate] = useState("");
  const [maintenanceEndDate, setMaintenanceEndDate] = useState("");
  const [maintenanceStatus, setMaintenanceStatus] = useState("");
  const [maintenanceKeyword, setMaintenanceKeyword] = useState("");
  const [ticketType, setTicketType] = useState("allTicket");

  const [visitStartDate, setVisitStartDate] = useState("");
  const [visitEndDate, setVisitEndDate] = useState("");
  const [visitCategory, setVisitCategory] = useState("");

  const handleFinanceSubmit = async () => {
    try {
      let requestBody = {
        startDate: financeStartDate,
        endDate: financeEndDate,
        category: financeCategory,
      };

      if (financeCategory === "tickets") {
        requestBody.ticketType = ticketType;
      } else if (financeCategory === "dining") {
        if (financeType === "") {
          console.log("!!!!!!!!!!!");
        } else {
          requestBody.financeType = financeType;
          requestBody.diningType = diningType;
        }
      } else if (financeCategory === "merch") {
        requestBody.financeType = financeType;
      } else if (financeCategory === "maintenance") {
        requestBody.type = "expense";
      } else if (financeCategory === "all") {
        requestBody.type = "profit";
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/finance-report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const reportData = await response.json();
        console.log("Finance report data:", reportData);

        if (financeCategory === "tickets") {
          setFinanceReportData(reportData.TicketData);
        } else if (financeCategory === "dining") {
          setFinanceReportData(reportData.diningData);
        } else if (financeCategory === "merch") {
          setFinanceReportData(reportData.merchData);
        } else if (financeCategory === "maintenance") {
          setFinanceReportData(reportData.maintData);
        } else if (financeCategory === "all") {
          setFinanceReportData(reportData.profitData);
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to generate finance report:", errorData.message);
      }
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  useEffect(() => {
    if (financeStartDate && financeEndDate && financeCategory) {
      handleFinanceSubmit();
    }
  }, [
    financeStartDate,
    financeEndDate,
    financeCategory,
    financeType,
    ticketType,
    diningType,
  ]);
  const [financeReportData, setFinanceReportData] = useState([]);
  const [visitReportData, setvisitReportData] = useState([]);

  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/maintenance-report`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: maintenanceStartDate,
              endDate: maintenanceEndDate,
              maintenanceStatus,
              maintenanceKeyword,
              attractionName,
            }),
          }
        );

        if (response.ok) {
          const reportData = await response.json();
          console.log("Maintenance report data:", reportData);
          setMaintenanceData(reportData);
        } else {
          const errorData = await response.json();
          console.error(
            "Failed to generate maintenance report:",
            errorData.message
          );
        }
      } catch (error) {
        console.error("There was an error:", error);
      }
    };

    fetchMaintenanceData();
  }, [
    maintenanceStartDate,
    maintenanceEndDate,
    maintenanceStatus,
    maintenanceKeyword,
    attractionName,
  ]);

  const handleMaintenanceSubmit = (e) => {
    e.preventDefault();
  };
  const [attractionList, setAttractionList] = useState([]);
  const [selectedAttractionId, setSelectedAttractionId] = useState("");

  useEffect(() => {
    const fetchAttractionList = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/attractions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attraction list");
        }

        const data = await response.json();
        console.log("Attraction list data:", data);
        setAttractionList(data.attractions);
      } catch (error) {
        console.error("Error fetching attraction list:", error);
        setAttractionList([]);
      }
    };

    fetchAttractionList();
  }, []);

  useEffect(() => {
    const generateVisitReport = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/visit-report`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: visitStartDate,
              endDate: visitEndDate,
              category: visitCategory,
              attractionName:
                visitCategory === "attractions" ? attractionName : null,
              diningName: visitCategory === "dining" ? diningName : null,
            }),
          }
        );

        if (response.ok) {
          const reportData = await response.json();
          console.log("Visit report data:", reportData);
          setvisitReportData(reportData);
        } else {
          const errorData = await response.json();
          console.error("Failed to generate visit report:", errorData.message);
        }
      } catch (error) {
        console.error("There was an error:", error);
      }
    };

    if (visitStartDate && visitEndDate && visitCategory) {
      generateVisitReport();
    }
  }, [visitStartDate, visitEndDate, visitCategory, attractionName, diningName]);

  return (
    <>
      <MSidebar />
      <h1 className="h1-dr-m">Data Reports</h1>
      <div className="data-report">
        <div className="report-section">
          <div className="finance-report-div">
            <button onClick={() => setShowFinance(!showFinance)}>
              {showFinance ? "▲ Finance Report" : "▼ Finance Report"}
            </button>

            {showFinance && (
              <form onSubmit={handleFinanceSubmit}>
                <div className="form-header">
                  <h3>Finance Report</h3>
                  <i title="Report providing financial data and insights, including profitability, revenue, and expenses across various categories.">
                    &#9432;
                  </i>
                </div>
                <div className="form-row">
                  <label>
                    Start Date:<span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={financeStartDate}
                    onChange={(e) => setFinanceStartDate(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>
                    End Date:<span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={financeEndDate}
                    onChange={(e) => setFinanceEndDate(e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <label>
                    Category:<span className="required">*</span>
                  </label>
                  <select
                    value={financeCategory}
                    onChange={(e) => setFinanceCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="dining">Dining</option>
                    <option value="merch">Merchandise</option>
                    <option value="tickets">Tickets</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="all">All</option>
                  </select>
                </div>
                {financeCategory === "tickets" && (
                  <div className="form-row">
                    <label>
                      Type:<span className="required">*</span>
                    </label>
                    <select
                      value={financeType}
                      onChange={(e) => setFinanceType(e.target.value)}
                    >
                      <option value="financeType">Revenue</option>
                    </select>
                    <label>
                      Ticket Type:<span className="required">*</span>
                    </label>
                    <select
                      value={ticketType}
                      onChange={(e) => setTicketType(e.target.value)}
                    >
                      <option value="allTicket">All</option>
                      <option value="Standard">Standard</option>
                      <option value="Express">Express</option>
                      <option value="Child">Child</option>
                    </select>
                  </div>
                )}
                {financeCategory === "dining" && (
                  <div className="form-row">
                    <label>
                      Type:<span className="required">*</span>
                    </label>
                    <select
                      value={financeType}
                      onChange={(e) => setFinanceType(e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="diningRev">Revenue</option>
                      <option value="diningExpense">Expense</option>
                    </select>
                    <label>
                      Dining Type:<span className="required">*</span>
                    </label>
                    <select
                      value={diningType}
                      onChange={(e) => setDiningType(e.target.value)}
                    >
                      <option value="allDining">All</option>
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Special">Special</option>
                    </select>
                  </div>
                )}

                {financeCategory === "merch" && (
                  <div className="form-row">
                    <label>
                      Type:<span className="required">*</span>
                    </label>
                    <select
                      value={financeType}
                      onChange={(e) => setFinanceType(e.target.value)}
                    >
                      <option value="">Select Type</option>

                      <option value="merchRevenue">Revenue</option>
                      <option value="merchExpense">Expense</option>
                    </select>
                  </div>
                )}
                {financeCategory === "maintenance" && (
                  <div className="form-row">
                    <label>
                      Type:<span className="required">*</span>
                    </label>
                    <select
                      value={financeType}
                      onChange={(e) => setFinanceType(e.target.value)}
                    >
                      <option value="maintExpense">Expense</option>
                    </select>
                  </div>
                )}
                {financeCategory === "all" && (
                  <div className="form-row">
                    <label>
                      Type:<span className="required">*</span>
                    </label>
                    <select
                      value={financeType}
                      onChange={(e) => setFinanceType(e.target.value)}
                    >
                      <option value="allProfit">Profit</option>
                    </select>
                  </div>
                )}

                <div className="report-section">
                  <div className="report-section">
                    {financeCategory === "tickets" &&
                      generateFinanceTable(financeReportData)}
                    {financeCategory === "dining" &&
                      (financeType === "diningRev" ||
                        financeType === "diningExpense") && (
                        <div>{generateDiningReport(financeReportData)}</div>
                      )}
                    {financeCategory === "merch" &&
                      (financeType === "merchRevenue" ||
                        financeType === "merchExpense") && (
                        <div>{generateMerchReport(financeReportData)}</div>
                      )}
                    {financeCategory === "maintenance" &&
                      financeType !== "default" && (
                        <div>{generateMaintExpense(financeReportData)}</div>
                      )}
                    {financeCategory === "all" && (
                      <div>{generateProfitTable(financeReportData)}</div>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="report-section">
          <button onClick={() => setShowMaintenance(!showMaintenance)}>
            {showMaintenance
              ? "▲  Maintenance Report"
              : "▼  Maintenance Report"}
          </button>

          {showMaintenance && (
            <form onSubmit={handleMaintenanceSubmit}>
              <div className="form-header">
                <h3>Maintenance Report</h3>
                <i title="Report focusing on maintenance requests, allowing you to filter by date range, status, and keyword search.">
                  &#9432;
                </i>
              </div>
              <div className="form-row">
                <label>
                  Start Date:<span className="required">*</span>
                </label>
                <input
                  type="date"
                  value={maintenanceStartDate}
                  onChange={(e) => setMaintenanceStartDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>
                  End Date:<span className="required">*</span>
                </label>
                <input
                  type="date"
                  value={maintenanceEndDate}
                  onChange={(e) => setMaintenanceEndDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Keyword:</label>
                <input
                  type="text"
                  value={maintenanceKeyword}
                  onChange={(e) => setMaintenanceKeyword(e.target.value)}
                  placeholder="Search by subject or description"
                />
              </div>
              <div className="form-row">
                <label>
                  Status:<span className="required">*</span>
                </label>
                <select
                  value={maintenanceStatus}
                  onChange={(e) => setMaintenanceStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <label>
                  Attraction:<span className="required">*</span>
                </label>
                <select
                  value={attractionName}
                  onChange={(e) => setAttractionName(e.target.value)}
                >
                  <option value="all">All</option>
                  {attractionList.map((attraction) => (
                    <option
                      key={attraction.attractionID}
                      value={attraction.name}
                    >
                      {attraction.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="report-section">
                <div className="report-section">
                  {generateMaintenanceTable(maintenanceData)}
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="report-section">
          <button onClick={() => setShowVisitReports(!showVisitReports)}>
            {showVisitReports ? "▲  Visit Report" : "▼  Visit Report"}
          </button>

          {showVisitReports && (
            <form>
              <div className="form-header">
                <h3>Visit Report</h3>
                <i title="Report offering visitor data and information, useful for understanding attendance, popular attractions, and visitor behavior.">
                  &#9432;
                </i>
              </div>
              <div className="form-row">
                <label>
                  Start Date:<span className="required">*</span>
                </label>
                <input
                  type="date"
                  value={visitStartDate}
                  onChange={(e) => setVisitStartDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>
                  End Date:<span className="required">*</span>
                </label>
                <input
                  type="date"
                  value={visitEndDate}
                  onChange={(e) => setVisitEndDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>
                  Category:<span className="required">*</span>
                </label>
                <select
                  value={visitCategory}
                  onChange={(e) => setVisitCategory(e.target.value)}
                >
                  <option value="all">Select Category</option>
                  <option value="attractions">Attractions</option>
                  <option value="dining">Dining</option>
                </select>
              </div>
              {visitCategory === "attractions" && (
                <div className="form-row">
                  <label>
                    Attraction:<span className="required">*</span>
                  </label>
                  <select
                    value={attractionName}
                    onChange={(e) => setAttractionName(e.target.value)}
                  >
                    <option value="all">All</option>
                    {attractionList.map((attraction) => (
                      <option
                        key={attraction.attractionID}
                        value={attraction.name}
                      >
                        {attraction.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {visitCategory === "dining" && (
                <div className="form-row">
                  <label>
                    Dining:<span className="required">*</span>
                  </label>
                  <select
                    value={diningName}
                    onChange={(e) => setDiningName(e.target.value)}
                  >
              
                <option value="all">All</option>
                {restList.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.name}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
              )}

              <div className="report-section">
                {visitCategory === "attractions" &&
                  attractionName === "all" && (
                    <div className="report-section">
                      {generateVisitTable(visitReportData)}
                    </div>
                  )}
                {visitCategory === "attractions" &&
                  attractionName !== "all" && (
                    <div className="report-section">
                      {generateVisitTableSingleAttraction(visitReportData)}
                    </div>
                  )}

                {visitCategory === "dining" && diningName !== "all" && (
                  <div className="report-section">
                    {generateVisitTableSingleDining(visitReportData)}
                  </div>
                )}

                {visitCategory === "dining" && diningName === "all" && (
                  <div className="report-section">
                    {generateVisitTableAllDining(visitReportData)}
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default DataReport;
