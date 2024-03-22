import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './MMaintenance.css';
import MSidebar from '../../../components/MSidebar/MSidebar';

function Maintenance() {
  const { setShowNavbar } = useOutletContext();
  setShowNavbar(false);
  const maintenanceRequests = [
    { id: 1, attraction: 'attraction1', status: 'Open', comment: 'Initial request', cost: 0 },
    { id: 2, attraction: 'attraction2', status: 'In Progress', comment: 'Working on it', cost: 100 },
    { id: 3, attraction: 'attraction3', status: 'Completed', comment: 'All done', cost: 200 },
  ];
 
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentComment, setCurrentComment] = useState('');
  const [currentCost, setCurrentCost] = useState(0);
  const [newStatus, setNewStatus] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newCost, setNewCost] = useState(0);
  const [dateResolved, setDateResolved] = useState('');
  const [showEditContainer, setShowEditContainer] = useState(false);

  const handleRequestSelect = (requestId) => {
    const request = maintenanceRequests.find((req) => req.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setCurrentStatus(request.status);
      setCurrentComment(request.comment);
      setCurrentCost(request.cost);
      setNewStatus(request.status);
      setNewComment(request.comment);
      setNewCost(request.cost);
      setDateResolved('');
    }
  };

 
  const getAttractionIdFromName = (attractionName) => {
    const attraction = attractions.find((a) => a.label === attractionName);
    return attraction ? attraction.id : null;
  };
  
  const handleNewCostChange = (event) => {
    setNewCost(parseFloat(event.target.value));
  };

  const handleDateResolvedChange = (event) => {
    setDateResolved(event.target.value);
  };

 
  
  const attractions = [
    { id: 2, value: 'Roller Coaster', label: 'Roller Coaster' },
    { id: 3, value: 'Carousel', label: 'Carousel' },
    { id: 4, value: 'Ferris Wheel', label: 'Ferris Wheel' },
    { id: 5, value: 'Themed Rides', label: 'Themed Rides' },
    { id: 6, value: 'Water Rides', label: 'Water Rides' },
  ];

  const [subject, setSubject] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [cost, setCost] = useState(0);
  const [selectedAttractionId, setSelectedAttractionId] = useState('');
  const [showSubmitContainer, setShowSubmitContainer] = useState(false);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleCostChange = (event) => {
    setCost(parseFloat(event.target.value));
  };

  const handleAttractionChange = (event) => {
    setSelectedAttractionId(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const attractionId = getAttractionIdFromName(selectedAttractionId);
  
    if (attractionId === null) {
      alert('Please select a valid attraction.');
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/maintenance-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          MRDescription: comment,
          MRCost: cost,
          AttractionID: attractionId, // Use the attractionId obtained from getAttractionIdFromName
          MRSubject: subject
        }),
      });
  
      if (response.ok) {
        // Handle success
        alert('Maintenance request submitted successfully!');
        console.log('Maintenance request submitted successfully!');
      } else {
        // Handle errors
        alert('Failed to submit maintenance request.');
        console.error('Failed to submit maintenance request.');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };
  

  return (
    <>
      <MSidebar />
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
                <select
                  name="attraction"
                  value={selectedAttractionId}
                  onChange={handleAttractionChange}
                >
                  <option value="">Select an Attraction</option>
                  {attractions.map((attraction) => (
                    <option key={attraction.id} value={attraction.value}>
                      {attraction.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className='input-container'>
                <label>Cost</label>
                <input type="number" value={cost} onChange={handleCostChange} />
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
                    <div className="edit-row">
                      <label>Current Cost:</label>
                      <span>${currentCost.toFixed(2)}</span> {/* Display currentCost */}
                    </div>

                    <div className="input-container">
                      <label>New Status:</label>
                      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {newStatus === 'Completed' && (
                      <div className="input-container">
                        <label>Date Resolved:</label>
                        <input type="date" value={dateResolved} onChange={handleDateResolvedChange} />
                      </div>
                    )}

                    <div className="input-container">
                      <label>New Cost:</label>
                      <input type="number" value={newCost} onChange={handleNewCostChange} /> 
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