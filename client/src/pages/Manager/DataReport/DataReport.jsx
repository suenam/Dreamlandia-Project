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

  const { setShowNavbar, setShowFooter } = useOutletContext();
  setShowNavbar(false);
  setShowFooter(false);

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
      const totalVisitors = data.reduce(
        (sum, row) => sum + parseInt(row.Visitors),
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

  const generateVisitTableAllDining = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const totalVisitors = data.reduce(
        (sum, row) => sum + parseInt(row.Total),
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

            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bella's Fairy Tale Feast</th>
                  <th>Burger Castle</th>
                  <th>HerHarmony Eatery</th>
                  <th>Silver Spoon Serenade</th>
                  <th>The Velvet Vineyard</th>
                  <th>WhataSandwich</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.TransactionDate}</td>
                    <td>{row["Bella's Fairy Tale Feast"]}</td>
                    <td>{row["Burger Castle"]}</td>
                    <td>{row["HerHarmony Eatery"]}</td>
                    <td>{row["Silver Spoon Serenade"]}</td>
                    <td>{row["The Velvet Vineyard"]}</td>
                    <td>{row.WhataSandwich}</td>
                    <td>{row.Total}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="7"
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

  const generateVisitTable = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const totalVisitors = data.reduce(
        (sum, row) => sum + parseInt(row.Total),
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

            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Roller Coaster</th>
                  <th>Carousel</th>
                  <th>Ferris Wheel</th>
                  <th>Themed Rides</th>
                  <th>Water Rides</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.PurchaseDate}</td>
                    <td>{row["Roller Coaster"]}</td>
                    <td>{row.Carousel}</td>
                    <td>{row["Ferris Wheel"]}</td>
                    <td>{row["Themed Rides"]}</td>
                    <td>{row["Water Rides"]}</td>
                    <td>{row.Total}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="6"
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
  const generateMaintenanceTable = (data) => {
    const totalExpense = data.reduce(
      (sum, row) => sum + parseFloat(row.MRCost),
      0
    );

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
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total Expense:
                  </td>
                  <td style={{ fontWeight: "bold" }}>${totalExpense}</td>
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
    const totalRevenue = data.reduce(
      (sum, row) => sum + parseFloat(row.Ticket_Price),
      0
    );

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

            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ticket Type</th>
                  <th>Quantity Sold</th>
                  <th>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Date}</td>
                    <td>{row.Ticket_Type}</td>
                    <td>{row.Number_Tickets}</td>
                    <td>${row.Ticket_Price}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="3"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total Revenue:
                  </td>
                  <td style={{ fontWeight: "bold" }}>${totalRevenue}</td>
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
            Finance Report ({financeStartDate} - {financeEndDate})
          </h3>
          <div>No finance report found for the selected date and type.</div>
        </>
      );
    }
  };
  const generateDiningReport = (data) => {
    if (financeType === "") {
      return null; // Don't render anything if financeType is empty
    }
    if (Array.isArray(data) && data.length > 0) {
      const totalAmount = data.reduce(
        (sum, row) =>
          sum +
          parseFloat(
            row[financeType === "diningRev" ? "TotalRevenue" : "ExpenseAmt"]
          ),
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

            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Restaurant Type</th>
                  <th>Restaurant Name</th>
                  {financeType === "diningRev" && <th>Quantity Sold</th>}
                  {financeType === "diningExpense" && <th>Expense Type</th>}
                  <th>{amountLabel}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Date}</td>
                    <td>{row.RestaurantType}</td>
                    <td>{row.RestaurantName}</td>
                    {financeType === "diningRev" && <td>{row.QuantitySold}</td>}
                    {financeType === "diningExpense" && (
                      <td>{row.ExpenseType}</td>
                    )}
                    <td>
                      $
                      {financeType === "diningRev"
                        ? row.TotalRevenue
                        : row.ExpenseAmt}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan={financeType === "diningRev" ? 4 : 4}
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    {amountLabel}:
                  </td>
                  <td style={{ fontWeight: "bold" }}>${totalAmount}</td>
                </tr>
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
    const totalAmount = data.reduce(
      (sum, row) =>
        sum +
        parseFloat(
          financeType === "merchRevenue" ? row.TotalRevenue : row.ExpenseAmt
        ),
      0
    );
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
                <tr>
                  <td
                    colSpan={financeType === "merchRevenue" ? 4 : 4}
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    {amountLabel}:
                  </td>
                  <td style={{ fontWeight: "bold" }}>${totalAmount}</td>
                </tr>
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
    const totalExpense = data.reduce(
      (sum, row) => sum + parseFloat(row.Cost),
      0
    );

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
                    <td>${row.Cost}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="3"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total Expense:
                  </td>
                  <td style={{ fontWeight: "bold" }}>${totalExpense}</td>
                </tr>
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

            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Department</th>
                  <th>
                    <div>Revenue</div>
                  </th>
                  <th>
                    <div>Expense</div>
                  </th>
                  <th>
                    <div>Profit</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Date}</td>
                    <td>{row.Department}</td>
                    <td>${row.Revenue}</td>
                    <td>${row.Expense}</td>
                    <td>${row.Profit}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="2"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total:
                  </td>
                  <td style={{ fontWeight: "bold" }}>
                    $
                    {data.reduce(
                      (sum, row) => sum + parseFloat(row.Revenue),
                      0
                    )}
                  </td>
                  <td style={{ fontWeight: "bold" }}>
                    $
                    {data.reduce(
                      (sum, row) => sum + parseFloat(row.Expense),
                      0
                    )}
                  </td>
                  <td style={{ fontWeight: "bold" }}>
                    $
                    {data.reduce((sum, row) => sum + parseFloat(row.Profit), 0)}
                  </td>
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
            Finance Report ({financeStartDate} - {financeEndDate})
          </h3>
          <div>No finance report found for the selected date and type.</div>
        </>
      );
    }
  };

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
          console.log("!!!!!!!!!!");
        } else {
          requestBody.financeType = financeType;
        }
        requestBody.diningType = diningType;
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
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={financeStartDate}
                    onChange={(e) => setFinanceStartDate(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label>End Date:</label>
                  <input
                    type="date"
                    value={financeEndDate}
                    onChange={(e) => setFinanceEndDate(e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <label>Category:</label>
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
                    <label>Type:</label>
                    <select
                      value={financeType}
                      onChange={(e) => setFinanceType(e.target.value)}
                    >
                      <option value="financeType">Revenue</option>
                    </select>
                    <label>Ticket Type:</label>
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
                    <label>Type:</label>
                    <select
                      value={financeType}
                      onChange={(e) => setFinanceType(e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="diningRev">Revenue</option>
                      <option value="diningExpense">Expense</option>
                    </select>
                    <label>Dining Type:</label>
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
                    <label>Type:</label>
                    <select
                      value={financeType}
                      onChange={(e) => setFinanceType(e.target.value)}
                    >
                      <option value="default">Select Type</option>

                      <option value="merchRevenue">Revenue</option>
                      <option value="merchExpense">Expense</option>
                    </select>
                  </div>
                )}
                {financeCategory === "maintenance" && (
                  <div className="form-row">
                    <label>Type:</label>
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
                    <label>Type:</label>
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
                      financeType !== "default" && (
                        <div>{generateDiningReport(financeReportData)}</div>
                      )}
                    {financeCategory === "merch" && (
                      <div>{generateMerchReport(financeReportData)}</div>
                    )}
                    {financeCategory === "maintenance" && (
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
                <label>Start Date:</label>
                <input
                  type="date"
                  value={maintenanceStartDate}
                  onChange={(e) => setMaintenanceStartDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>End Date:</label>
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
                <label>Status:</label>
                <select
                  value={maintenanceStatus}
                  onChange={(e) => setMaintenanceStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <label>Attraction Name:</label>
                <select
                  value={attractionName}
                  onChange={(e) => setAttractionName(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Carousel">Carousel</option>
                  <option value="Ferris Wheel">Ferris Wheel</option>
                  <option value="Roller Coaster">Roller Coaster</option>
                  <option value="Themed Rides">Themed Rides</option>
                  <option value="Water Rides">Water Rides</option>
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
                <label>Start Date:</label>
                <input
                  type="date"
                  value={visitStartDate}
                  onChange={(e) => setVisitStartDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>End Date:</label>
                <input
                  type="date"
                  value={visitEndDate}
                  onChange={(e) => setVisitEndDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Category:</label>
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
                  <label>Attraction:</label>
                  <select
                    value={attractionName}
                    onChange={(e) => setAttractionName(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="Carousel">Carousel</option>
                    <option value="Ferris Wheel">Ferris Wheel</option>
                    <option value="Roller Coaster">Roller Coaster</option>
                    <option value="Themed Rides">Themed Rides</option>
                    <option value="Water Rides">Water Rides</option>
                  </select>
                </div>
              )}
              {visitCategory === "dining" && (
                <div className="form-row">
                  <label>Dining:</label>
                  <select
                    value={diningName}
                    onChange={(e) => setDiningName(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="WhataSandwich">WhataSandwich</option>
                    <option value="Burger Castle">Burger Castle</option>
                    <option value="The Velvet Vineyard">
                      The Velvet Vineyard
                    </option>
                    <option value="Silver Spoon Serenade">
                      Silver Spoon Serenade
                    </option>
                    <option value="HerHarmony Eatery">HerHarmony Eatery</option>
                    <option value="Bella's Fairy Tale Feast">
                      Bella's Fairy Tale Feast{" "}
                    </option>
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
