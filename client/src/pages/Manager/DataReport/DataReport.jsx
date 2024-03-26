import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './DataReport.css';

function DataReport() {
  const { setShowNavbar, setShowFooter } = useOutletContext();
  setShowNavbar(false);
  setShowFooter(false);
  const [diningType, setDiningType] = useState('allDining');
  const generateFinanceTable = (data) => {
    
    const totalRevenue = data.reduce((sum, row) => sum + parseFloat(row.Ticket_Price), 0);

    if (Array.isArray(data) && data.length > 0) {
      return (
        <>
        <h3>Finance Report</h3>

        <table className='contact-table'>
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
            <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Revenue:</td>
            <td style={{ fontWeight: 'bold' }}>${totalRevenue.toFixed(2)}</td>
          </tr>
          </tbody>
        </table>
        </>
      );
    } else {
      return <>
              <h3>Finance Report</h3>
              <div>No finance report found for the selected date and type.</div>
      
      </>
    }
    
  };
  const generateDiningReport = (data) => {
    const totalAmount = data.reduce((sum, row) => sum + parseFloat(financeType === 'diningRev' ? row.TotalRevenue : row.ExpenseAmt), 0);
    const amountLabel = financeType === 'diningRev' ? 'Total Revenue' : 'Total Expense';
  
    if (Array.isArray(data) && data.length > 0) {
      return (
        <>
          <h3>Finance Report</h3>
  
          <table className='contact-table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Restaurant Type</th>
                <th>Restaurant Name</th>
                {financeType === 'diningRev' && <th>Quantity Sold</th>}
                {financeType === 'diningExpense' && <th>Expense Type</th>}
                <th>{amountLabel}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.Date}</td>
                  <td>{row.RestaurantType}</td>
                  <td>{row.RestaurantName}</td>
                  {financeType === 'diningRev' && <td>{row.QuantitySold}</td>}
                  {financeType === 'diningExpense' && <td>{row.ExpenseType}</td>}
                  <td>${financeType === 'diningRev' ? row.TotalRevenue : row.ExpenseAmt}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={financeType === 'diningRev' ? 4 : 3} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  {amountLabel}:
                </td>
                <td style={{ fontWeight: 'bold' }}>${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
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
  const generateMerchReport = (data) => {
    const totalAmount = data.reduce((sum, row) => sum + parseFloat(financeType === 'merchRevenue' ? row.TotalRevenue : row.ExpenseAmt), 0);
    const amountLabel = financeType === 'merchRevenue' ? 'Total Revenue' : 'Total Expense';
  
    if ( data.length > 0) {
      return (
        <>
          <h3>Finance Report</h3>
  
          <table className='contact-table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Item Type</th>
                <th>Item Name</th>
                {financeType === 'merchRevenue' && <th>Quantity Sold</th>}
                {financeType === 'merchExpense' && <th>Quantity Supplied</th>}
                <th>{amountLabel}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.Date}</td>
                  <td>{row.ItemType}</td>
                  <td>{row.ItemName}</td>
                  {financeType === 'merchRevenue' && <td>{row.QuantitySold}</td>}
                  {financeType === 'merchExpense' && <td>{row.QuantitySold}</td>}
                  <td>${financeType === 'merchRevenue' ? row.TotalRevenue : row.ExpenseAmt}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={financeType === 'merchRevenue' ? 4 : 4} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  {amountLabel}:
                </td>
                <td style={{ fontWeight: 'bold' }}>${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
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
    const totalExpense = data.reduce((sum, row) => sum + parseFloat(row.Cost), 0);

    if (Array.isArray(data) && data.length > 0) {
      return (
        <>
        <h3>Finance Report</h3>

        <table className='contact-table'>
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
            <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Expense:</td>
            <td style={{ fontWeight: 'bold' }}>${totalExpense.toFixed(2)}</td>
          </tr>
          </tbody>
        </table>
        </>
      );
    } else {
      return <>
              <h3>Finance Report</h3>
              <div>No finance report found for the selected date and type.</div>
      
      </>
    }
    
  };
  const generateProfitTable = (data) =>{
    const totalExpense = data.reduce((sum, row) => sum + parseFloat(row.Cost), 0);

    if (Array.isArray(data) && data.length > 0) {
      return (
        <>
        <h3>Finance Report</h3>

        <table className='contact-table'>
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
                <td>{row.Date}</td>
                <td>{row.Department}</td>
                <td>${row.Revenue}</td>
                <td>${row.Expense}</td>
                <td>${row.Profit}</td>
              </tr>
            ))}
            <tr>
            <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Expense:</td>
            <td style={{ fontWeight: 'bold' }}>${totalExpense.toFixed(2)}</td>
          </tr>
          </tbody>
        </table>
        </>
      );
    } else {
      return <>
              <h3>Finance Report</h3>
              <div>No finance report found for the selected date and type.</div>
      
      </>
    }
    

  };

  
  

  const [showFinance, setShowFinance] = useState(false);
  const [showTicketPurchase, setShowTicketPurchase] = useState(false);
  const [showVisitReports, setShowVisitReports] = useState(false);

  const [financeStartDate, setFinanceStartDate] = useState('');
  const [financeEndDate, setFinanceEndDate] = useState('');
  const [financeCategory, setFinanceCategory] = useState('');

  const [financeType, setFinanceType] = useState(() => {
    switch (financeCategory) {
      case 'dining':
        return 'diningRev';
      case 'tickets':
        return 'ticketType';
      case 'merch':
        return 'merchRevenue';
      case 'maintenance':
        return 'maintExpense';
      default:
        return '';
    }
  });      

  const [ticketStartDate, setTicketStartDate] = useState('');
  const [ticketEndDate, setTicketEndDate] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState('allTicket');

  const [visitStartDate, setVisitStartDate] = useState('');
  const [visitEndDate, setVisitEndDate] = useState('');
  const [visitCategory, setVisitCategory] = useState('');


  const handleFinanceSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let requestBody = {
        startDate: financeStartDate,
        endDate: financeEndDate,
        category: financeCategory,
      };
  
      if (financeCategory === 'tickets') {
        
        requestBody.ticketType = ticketType;
        
      } else if (financeCategory === 'dining') {
        if(financeType ===''){
          console.log("!!!!!!!!!!");
          requestBody.financeType = 'diningRev';
        }else{
        requestBody.financeType = financeType;
        }
        requestBody.diningType = diningType;
      } else if (financeCategory === 'merch') {
        requestBody.financeType = financeType;
      } else if (financeCategory === 'maintenance') {
        requestBody.type = 'expense';
      } else if (financeCategory === 'all') {
        requestBody.type = 'profit';
      }
  
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/finance-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const reportData = await response.json();
        console.log('Finance report data:', reportData);
        if(financeCategory === 'tickets'){
          setFinanceReportData(reportData.TicketData);
        }else if(financeCategory === 'dining'){
          setFinanceReportData(reportData.diningData);
        }else if(financeCategory === 'merch'){
          setFinanceReportData(reportData.merchData);
        }else if(financeCategory === 'maintenance'){
          setFinanceReportData(reportData.maintData);
        }else if(financeCategory === 'all'){
          setFinanceReportData(reportData.profitData);
        }

      } else {
        const errorData = await response.json();
        console.error('Failed to generate finance report:', errorData.message);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
    

  };
  const [financeReportData, setFinanceReportData] = useState([]);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();

    try {
      let requestBody = {};

      if (ticketTypes.length === 1) {
        requestBody = {
          startDate: ticketStartDate,
          endDate: ticketEndDate,
          ticketType: ticketTypes[0].toLowerCase(),
        };
      } else if (ticketTypes.length === 2) {
        requestBody = {
          startDate: ticketStartDate,
          endDate: ticketEndDate,
          ticketType1: ticketTypes[0].toLowerCase(),
          ticketType2: ticketTypes[1].toLowerCase(),
        };
      } else if (ticketTypes.length === 3) {
        requestBody = {
          startDate: ticketStartDate,
          endDate: ticketEndDate,
          ticketType1: ticketTypes[0].toLowerCase(),
          ticketType2: ticketTypes[1].toLowerCase(),
          ticketType3: ticketTypes[2].toLowerCase(),
        };
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/ticket-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const reportData = await response.json();
        console.log('Ticket report data:', reportData);
      } else {
        const errorData = await response.json();
        console.error('Failed to generate ticket report:', errorData.message);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const handleVisitSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/visit-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: visitStartDate,
          endDate: visitEndDate,
          category: visitCategory,
        }),
      });

      if (response.ok) {
        const reportData = await response.json();
        console.log('Visit report data:', reportData);
      } else {
        const errorData = await response.json();
        console.error('Failed to generate visit report:', errorData.message);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <>
      <MSidebar />
      <h1 className='h1-dr-m'>Data Reports</h1>
      <div className='data-report'>
        <div className="report-section">
          <div className='finance-report-div'>
            <button onClick={() => setShowFinance(!showFinance)}>
              {showFinance ? '▲ Finance Report' : '▼ Finance Report'}
            </button>

            {showFinance && (
              <form onSubmit={handleFinanceSubmit}>
                <div className="form-header">
                  <h3>Finance Report</h3>
                  <i title="Report providing financial data and insights, including profitability, revenue, and expenses across various categories.">&#9432;</i>
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
                  <select value={financeCategory} onChange={(e) => setFinanceCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="dining">Dining</option>
                    <option value="merch">Merchandise</option>
                    <option value="tickets">Tickets</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="all">All</option>
                  </select>
                </div>
                {(financeCategory === 'tickets') && (
                  <div className="form-row">
                    <label>Type:</label>
                    <select value={financeType} onChange={(e) => setFinanceType(e.target.value)}>
                      <option value="financeType">Revenue</option>
                    </select>
                    <label>Ticket Type:</label>
    <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
      <option value="allTicket">All</option>
      <option value="Standard">Standard</option>
      <option value="Express">Express</option>
      <option value="Child">Child</option>
    </select>
                  </div>
                  )}
                  {(financeCategory === 'dining') && (
                  <div className="form-row">
                    <label>Type:</label>
                    <select value={financeType} onChange={(e) => setFinanceType(e.target.value)}>
                      <option value="diningRev">Revenue</option>
                      <option value="diningExpense">Expense</option>
                    </select>
                    <label>Dining Type:</label>
    <select value={diningType} onChange={(e) => setDiningType(e.target.value)}>
      <option value="allDining">All</option>
      <option value="Standard">Standard</option>
      <option value="Deluxe">Deluxe</option>
      <option value="Special">Special</option>
    </select>
                  </div>
                  )}

                {(financeCategory === 'merch') && (
                  <div className="form-row">
                    <label>Type:</label>
                    <select value={financeType} onChange={(e) => setFinanceType(e.target.value)}>
                      <option value="merchRevenue">Revenue</option>
                      <option value="merchExpense">Expense</option>
                    </select>
                  </div>
                  )}
                  {(financeCategory === 'maintenance') && (
                  <div className="form-row">
                    <label>Type:</label>
                    <select value={financeType} onChange={(e) => setFinanceType(e.target.value)}>
                      <option value="maintExpense">Expense</option>
                    </select>
                  </div>
                  )}
                  {(financeCategory === 'all') && (
                  <div className="form-row">
                    <label>Type:</label>
                    <select value={financeType} onChange={(e) => setFinanceType(e.target.value)}>
                      <option value="allProfit">Profit</option>
                    </select>
                  </div>
                  )}

                <button className='generate-but-dr' type="submit">Generate Report</button>
                <div className="report-section">
  <div className="report-section">
  {financeCategory === 'tickets' && (
      generateFinanceTable(financeReportData)
    )}
    {financeCategory === 'dining' && (
  <div>
    {generateDiningReport(financeReportData)}
  </div>
)}
{financeCategory === 'merch' && (
  <div>
    {generateMerchReport(financeReportData)}
  </div>
)}
{financeCategory === 'maintenance' && (
  <div>
    {generateMaintExpense(financeReportData)}
  </div>
)}
{financeCategory === 'all' && (
  <div>
    {generateProfitTable(financeReportData)}
  </div>
)}
        </div>

</div>
              </form>
            )}
            
          </div>
        </div>

        <div className="report-section">
          <button onClick={() => setShowTicketPurchase(!showTicketPurchase)}>
            {showTicketPurchase ? '▲  Ticket Report' : '▼  Ticket Report'}
          </button>

          {showTicketPurchase && (
            <form onSubmit={handleTicketSubmit}>
              <div className="form-header">
                <h3>Ticket Report</h3>
                <i title="Report focusing on ticket sales data, allowing analysis of ticket types, purchase patterns, and trends.">&#9432;</i>
              </div>
              <div className="form-row">
                <label>Start Date:</label>
                <input
                  type="date"
                  value={ticketStartDate}
                  onChange={(e) => setTicketStartDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>End Date:</label>
                <input
                  type="date"
                  value={ticketEndDate}
                  onChange={(e) => setTicketEndDate(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>Ticket Types:</label>
                <div className="checkbox-group">
                  <div>
                    <input
                      type="checkbox"
                      value="child"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTicketTypes([...ticketTypes, 'child']);
                        } else {
                          setTicketTypes(ticketTypes.filter((type) => type !== 'child'));
                        }
                      }}
                    />
                    <label>Child</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="express"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTicketTypes([...ticketTypes, 'express']);
                        } else {
                          setTicketTypes(ticketTypes.filter((type) => type !== 'express'));
                        }
                      }}
                    />
                    <label>Express</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="standard"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTicketTypes([...ticketTypes, 'standard']);
                        } else {
                          setTicketTypes(ticketTypes.filter((type) => type !== 'standard'));
                        }
                      }}
                    />
                    <label>Standard</label>
                  </div>
                </div>
              </div>
              <button className='generate-but-dr' type="submit">Generate Report</button>
            </form>
          )}
        </div>

        <div className="report-section">
          <button onClick={() => setShowVisitReports(!showVisitReports)}>
            {showVisitReports ? '▲  Visit Report' : '▼  Visit Report'}
          </button>

          {showVisitReports && (
            <form onSubmit={handleVisitSubmit}>
              <div className="form-header">
                <h3>Visit Report</h3>
                <i title="Report offering visitor data and information, useful for understanding attendance, popular attractions, and visitor behavior.">&#9432;</i>
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
                <select value={visitCategory} onChange={(e) => setVisitCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  <option value="attractions">Attractions</option>
                  <option value="dining">Dining</option>
                </select>
              </div>
              <button className='generate-but-dr' type="submit">Generate Report</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default DataReport;
