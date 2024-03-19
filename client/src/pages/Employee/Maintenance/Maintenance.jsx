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

  const [subject, setSubject] = useState('');
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

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Sidebar />
      <h1 className='Maintenance-header1'>Maintenance Requests</h1>

      <div className='report-sec-maintenace'>
        <button onClick={() => setShowSubmitContainer(!showSubmitContainer)}>
          {showSubmitContainer ? '▲ Submit Request' : '▼ Submit Request'}
        </button>
        {showSubmitContainer && (
          <div className="submit-request-container">
            <form className='submit-mr' onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>Submit Maintenance Request</h3>
                <i title="Form to submit a new maintenance request for an attraction.">&#9432;</i>
              </div>
              <div className='input-container'>
                <label>Subject</label>
                <input type="text" value={subject} onChange={handleSubjectChange} />
              </div>
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
        <button onClick={() => setShowEditContainer(!showEditContainer)}>
          {showEditContainer ? '▲ Edit Request' : '▼ Edit Request'}
        </button>
        {showEditContainer && (
          <div className="edit-container">
            <form className='submit-mr' onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>Edit Maintenance Request</h3>
                <i title="Form to edit an existing maintenance request.">&#9432;</i>
              </div>
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