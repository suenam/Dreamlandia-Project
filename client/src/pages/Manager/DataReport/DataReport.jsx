import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MSidebar from '../../../components/MSidebar/MSidebar';import './DataReport.css';

function DataReport() {
    const { setShowNavbar } = useOutletContext();
  setShowNavbar(false);
    const [showFinance, setShowFinance] = useState(false);
    const [showTicketPurchase, setShowTicketPurchase] = useState(false);
    const [showVisitReports, setShowVisitReports] = useState(false);

  const [financeStartDate, setFinanceStartDate] = useState('');
  const [financeEndDate, setFinanceEndDate] = useState('');
  const [financeType, setFinanceType] = useState('');
  const [financeCategory, setFinanceCategory] = useState('');

  const [ticketStartDate, setTicketStartDate] = useState('');
  const [ticketEndDate, setTicketEndDate] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);

  const [visitStartDate, setVisitStartDate] = useState('');
  const [visitEndDate, setVisitEndDate] = useState('');
  const [visitCategory, setVisitCategory] = useState('');

  const handleFinanceSubmit = (e) => {
    e.preventDefault();
    // Handle finance report submission
    console.log('Finance Report:', financeStartDate, financeEndDate, financeType, financeCategory);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Handle ticket purchase report submission
    console.log('Ticket Purchase Report:', ticketStartDate, ticketEndDate, ticketTypes);
  };

  const handleVisitSubmit = (e) => {
    e.preventDefault();
    // Handle visit report submission
    console.log('Visit Report:', visitStartDate, visitEndDate, visitCategory);
  };


  return (
        
        <>
        <MSidebar />
        <h1 className='h1-dr-m'>Data Reports</h1>
        <div className='data-report '>
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
              <label>Type:</label>
              <select value={financeType} onChange={(e) => setFinanceType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="profit">Profit</option>
                <option value="revenue">Revenue</option>
                <option value="expense">Expense</option>
              </select>
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
            <button className='generate-but-dr' type="submit">Generate Report</button>
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
            <button className='generate-but-dr'ctype="submit">Generate Report</button>
          </form>
        )}
      </div>
      </div>
    </>
  );
}

export default DataReport;