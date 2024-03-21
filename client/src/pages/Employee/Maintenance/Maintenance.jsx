
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './Maintenance.css';
import Sidebar from '../../../components/Sidebar/Sidebar';

function Maintenance() {
  const { setShowNavbar } = useOutletContext();
  setShowNavbar(false);
  const maintenanceRequests = [
    { id: 1, attraction: 'attraction1', status: 'Open', comment: 'Initial request' },
    { id: 2, attraction: 'attraction2', status: 'In Progress', comment: 'Working on it' },
    { id: 3, attraction: 'attraction3', status: 'Completed', comment: 'All done' },
  ];
  const attractions = [
    { value: '', label: 'Select an Attraction' },
    { value: 'attraction1', label: 'Attraction 1' },
    { value: 'attraction2', label: 'Attraction 2' },
    { value: 'attraction3', label: 'Attraction 3' },
  ];

  const employees = [
    { value: 'emp1', label: 'Employee 1' },
    { value: 'emp2', label: 'Employee 2' },
    { value: 'emp3', label: 'Employee 3' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentComment, setCurrentComment] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showSubmitContainer, setShowSubmitContainer] = useState(false);
  const [showEditContainer, setShowEditContainer] = useState(false);

  const handleRequestSelect = (requestId) => {
    const request = maintenanceRequests.find((req) => req.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setCurrentStatus(request.status);
      setCurrentComment(request.comment);
      setNewStatus(request.status);
      setNewComment(request.comment);
    }
  };

  const handleEmployeeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEmployeeAdd = (employee) => {
    if (employee && !selectedEmployees.includes(employee.value)) {
      setSelectedEmployees([...selectedEmployees, employee.value]);
      setSearchTerm('');
    }
  };

  const handleEmployeeRemove = (employeeValue) => {
    setSelectedEmployees(selectedEmployees.filter((value) => value !== employeeValue));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected Attraction:', event.target.attraction.value);
    console.log('Selected Employees:', selectedEmployees);
    console.log('Comment:', comment);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedEmployees.includes(employee.value)
  );

  return (
    <>
      <Sidebar />
      <h1 className='Maintenance-header1'>Maintenance Requests</h1>

        
       
        
        <div className='report-sec-maintenace'>
        <button  onClick={() => setShowSubmitContainer(!showSubmitContainer)}>
          {showSubmitContainer ? '▲ Submit Request' : '▼ Submit Request'}
        </button>
        {showSubmitContainer && (
          <div className="submit-request-container">
            
            <form className='submit-mr' onSubmit={handleSubmit}>
            <h3 className="container-heading">Submit Maintenance Request</h3>
              <div className='input-container'>
                <label>Select Attraction</label>
                <select name="attraction">
                  {attractions.map((attraction) => (
                    <option key={attraction.value} value={attraction.value}>
                      {attraction.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='input-container'>
                <label>Select Employees to assign</label>
                <input type="text" value={searchTerm} onChange={handleEmployeeSearch} />
                {searchTerm && (
                  <div className="employee-list">
                    {filteredEmployees.map((employee) => (
                      <div
                        key={employee.value}
                        className="employee-item clickable"
                        onClick={() => handleEmployeeAdd(employee)}
                      >
                        {employee.label}
                      </div>
                    ))}
                  </div>
                )}
                <button type="button" onClick={() => handleEmployeeAdd(null)}>
                  Add Employee
                </button>
              </div>
              <div className='selected-employees'>
                <label>Selected Employees:</label>
                <div className="employee-list">
                  {selectedEmployees.map((employeeValue) => (
                    <div key={employeeValue} className="employee-item">
                      {employees.find((employee) => employee.value === employeeValue)?.label}
                      <button
                        type="button"
                        className="remove-employee"
                        onClick={() => handleEmployeeRemove(employeeValue)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className='input-container'>
                <label>Comment</label>
                <textarea value={comment} onChange={handleCommentChange} />
              </div>
              <div className="submit-actions">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        )}
        </div>
        <div className='report-sec-maintenace'>
        <button  onClick={() => setShowEditContainer(!showEditContainer)}>
          {showEditContainer ? '▲ Edit Request' : '▼ Edit Request'}
        </button>
        {showEditContainer && (
          <div className="edit-container">
            <form className='submit-mr' onSubmit={handleSubmit}>

            <h3 className="container-heading">Edit Maintenance Request</h3>
            <div className="edit-details">
              <div className="edit-row">
                <label>Select Maintenance Request</label>
                <select
                  value={selectedRequest?.id || ""}
                  onChange={(e) => handleRequestSelect(parseInt(e.target.value))}
                >
                  <option value="">Select a Request</option>
                  {maintenanceRequests.map((request) => (
                    <option key={request.id} value={request.id}>
                      {`Request ID: ${request.id} - ${request.attraction}`}
                    </option>
                  ))}
                </select>
              </div>

              {selectedRequest && (
                <>
                  <div className="edit-row">
                    <label>Current Status:</label>
                    <span>{currentStatus}</span>
                  </div>
                  <div className="edit-row">
                    <label>Current Comment:</label>
                    <span>{currentComment}</span>
                  </div>

                  <div className="input-container">
                    <label>New Status:</label>
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="input-container">
                    <label>New Comment:</label>
                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                  </div>

                  <div className="edit-actions">
                    <button type="button">Save Changes</button>
                    <button type="button" onClick={() => setSelectedRequest(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
            </form>

          </div>
        )}
        </div>
    </>
  );
}

export default Maintenance;
