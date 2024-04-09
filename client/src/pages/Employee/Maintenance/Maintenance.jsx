import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import './Maintenance.css';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { alignProperty } from '@mui/material/styles/cssUtils';

function Maintenance() {


  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newCost, setNewCost] = useState(0);
  const [dateResolved, setDateResolved] = useState('');
  const [showEditContainer, setShowEditContainer] = useState(false);

  const [openSubmitSuccessModal, setOpenSubmitSuccessModal] = useState(false);
  const [openSubmitFailureModal, setOpenSubmitFailureModal] = useState(false);
  const [openEditSuccessModal, setOpenEditSuccessModal] = useState(false);
  const [openEditFailureModal, setOpenEditFailureModal] = useState(false);
  const [unresolvedMaintenanceRequests, setUnresolvedMaintenanceRequests] = useState([
    
  ]);
  const [showUnresolvedMaintenanceModal, setShowUnresolvedMaintenanceModal] = useState(false);  

  useEffect(() => {
    const fetchUnresolvedMaintenanceRequests = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-unresolved-maintenance-requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: new Date().toISOString().slice(0, 10),
            subject: 'Maintenance Required',
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.requests) {
            console.log(data.requests);
            setUnresolvedMaintenanceRequests(data.requests);
            setShowUnresolvedMaintenanceModal(unresolvedMaintenanceRequests.length > 0);
          } else {
            console.error('No unresolved maintenance requests found');
          }
          
        } else {
          console.error('Failed to fetch unresolved maintenance requests:', data.message);
        }
      } catch (error) {
        console.error('There was an error:', error);
      }
    };
  
    fetchUnresolvedMaintenanceRequests();
  }, []);
  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const fetchMaintenanceRequests = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-maintenancerequests`);
      const data = await response.json();
      if (response.ok) {
        setMaintenanceRequests(data.requests);
        console.log(maintenanceRequests);
      } else {
        console.error('Failed to fetch maintenance requests:', data.message);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const handleRequestSelect = (RequestID) => {
    const request = maintenanceRequests.find((req) => req.id === RequestID);
    if (request) {
      setSelectedRequest(request);
      setNewStatus(request.status);
      setNewComment(request.comment);
      setNewCost(request.cost);
      setDateResolved('');
    }
  };

  const handleNewCostChange = (event) => {
    setNewCost(parseFloat(event.target.value));
  };

  const handleDateResolvedChange = (event) => {
    setDateResolved(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/updateMaintenanceRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RequestID: selectedRequest.id,
          status: newStatus,
          comment: newComment,
          cost: newCost,
          dateResolved: dateResolved,
        }),
      });

      if (response.ok) {
        console.log('Maintenance request updated successfully');
        fetchMaintenanceRequests();
        setSelectedRequest(null);
        setOpenEditSuccessModal(true); // Open success modal for editing
      } else {
        console.error('Failed to update maintenance request');
        setOpenEditFailureModal(true); // Open failure modal for editing
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
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

  const getAttractionIdFromName = (attractionName) => {
    const attraction = attractions.find((a) => a.label === attractionName);
    return attraction ? attraction.id : null;
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
          AttractionID: attractionId,
          MRSubject: subject
        }),
      });

      if (response.ok) {
        setOpenSubmitSuccessModal(true); // Open success modal for submission
        console.log('Maintenance request submitted successfully!');
        fetchMaintenanceRequests(); // Fetch updated maintenance requests
      } else {
        setOpenSubmitFailureModal(true); // Open failure modal for submission
        console.error('Failed to submit maintenance request.');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  // Modal handlers
  const handleCloseSubmitSuccessModal = () => {
    setOpenSubmitSuccessModal(false);
  };

  const handleCloseSubmitFailureModal = () => {
    setOpenSubmitFailureModal(false);
  };

  const handleCloseEditSuccessModal = () => {
    setOpenEditSuccessModal(false);
  };

  const handleCloseEditFailureModal = () => {
    setOpenEditFailureModal(false);
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
                <label>Subject<span className="required">*</span></label>
                <input type="text" value={subject} onChange={handleSubjectChange} required />
                
                </div>
                <div className='input-container'>

              <label>Select Attraction<span className="required">*</span></label>
               <select
                 name="attraction"
                 value={selectedAttractionId}
                 onChange={handleAttractionChange}
                 required
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
               <label>Cost<span className="required">*</span></label>
               <input type="number" value={cost} onChange={handleCostChange} required />
             </div>
             <div className='input-container'>
               <label>Comment<span className="required">*</span></label>
               <textarea value={comment} onChange={handleCommentChange} required />
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
           <form className='submit-mr'>
             <div className="form-header">
               <h3>Edit Maintenance Request</h3>
               <i title="Form to edit an existing maintenance request.">&#9432;</i>
             </div>
             <div className="edit-details">
               <div className="edit-row">
                 <label>Select Request<span className="required">*</span></label>
                 <select
                   value={selectedRequest?.id || ""}
                   onChange={(e) => handleRequestSelect(parseInt(e.target.value))}
                   required
                 >
                   <option value="">Select a Request</option>
                   {maintenanceRequests.map((request) => (
                     <option key={request.id} value={request.id}>
                       {`RID: ${request.id} - ${request.subject}`}
                     </option>
                   ))}
                 </select>
               </div>

               {selectedRequest && (
                 <>
                 <div className="edit-row">
                     <label>Current Subject:</label>
                     <span>{selectedRequest.subject}</span>
                   </div>
                   <div className="edit-row">
                     <label>Current Status:</label>
                     <span>{selectedRequest.status}</span>
                   </div>
                   <div className="edit-row">
                     <label>Current Comment:</label>
                     <span>{selectedRequest.comment}</span>
                   </div>
                   <div className="edit-row">
                     <label>Current Cost:</label>
                     <span>${selectedRequest.cost}</span>
                   </div>

                   <div className="input-container">
                     <label>New Status:<span className="required">*</span></label>
                     <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} required>
                       <option value="Open">Pending</option>
                       <option value="In Progress">In Progress</option>
                       <option value="Completed">Completed</option>
                     </select>
                   </div>

                   {newStatus === 'Completed' && (
                     <div className="input-container">
                       <label>Date Resolved:<span className="required">*</span></label>
                       <input type="date" value={dateResolved} onChange={handleDateResolvedChange} required />
                     </div>
                   )}

                   <div className="input-container">
                     <label>New Cost:<span className="required">*</span></label>
                     <input type="number" value={newCost} onChange={handleNewCostChange} required />
                   </div>

                   <div className="input-container">
                     <label>New Comment:<span className="required">*</span></label>
                     <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
                   </div>

                   <div className="edit-actions">
                     <button type="button" onClick={handleSaveChanges}>Save Changes</button>
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

     <Modal
       open={openSubmitSuccessModal}
       onClose={handleCloseSubmitSuccessModal}
       aria-labelledby="submit-success-modal-title"
       aria-describedby="submit-success-modal-description"
       className="modal-container submit-success-modal"
     >
       <Box
         sx={{
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           bgcolor: 'background.paper',
           boxShadow: 24,
           p: 4,
         }}
         className="modal-content"
       >
         <h2 id="submit-success-modal-title" className="modal-title">Maintenance Request Submitted</h2>
         <p id="submit-success-modal-description" className="modal-description">The maintenance request has been submitted successfully.</p>
         <button onClick={handleCloseSubmitSuccessModal} className="modal-button">Close</button>
       </Box>
     </Modal>

     <Modal
       open={openSubmitFailureModal}
       onClose={handleCloseSubmitFailureModal}
       aria-labelledby="submit-failure-modal-title"
       aria-describedby="submit-failure-modal-description"
       className="modal-container submit-failure-modal"
     >
       <Box
         sx={{
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           bgcolor: 'background.paper',
           boxShadow: 24,
           p: 4,
         }}
         className="modal-content"
       >
         <h2 id="submit-failure-modal-title" className="modal-title">Failed to Submit Maintenance Request</h2>
         <p id="submit-failure-modal-description" className="modal-description">There was an error while submitting the maintenance request.</p>
         <button onClick={handleCloseSubmitFailureModal} className="modal-button">Close</button>
       </Box>
     </Modal>

     <Modal
       open={openEditSuccessModal}
       onClose={handleCloseEditSuccessModal}
       aria-labelledby="edit-success-modal-title"
       aria-describedby="edit-success-modal-description"
       className="modal-container edit-success-modal"
     >
       <Box
         sx={{
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           bgcolor: 'background.paper',
           boxShadow: 24,
           p: 4,
         }}
         className="modal-content"
       >
         <h2 id="edit-success-modal-title" className="modal-title">Maintenance Request Updated</h2>
         <p id="edit-success-modal-description" className="modal-description">The maintenance request has been updated successfully.</p>
         <button onClick={handleCloseEditSuccessModal} className="modal-button">Close</button>
       </Box>
     </Modal>

     <Modal
       open={openEditFailureModal}
       onClose={handleCloseEditFailureModal}
       aria-labelledby="edit-failure-modal-title"
       aria-describedby="edit-failure-modal-description"
       className="modal-container edit-failure-modal"
       >
       <Box
       sx={{
       position: 'absolute',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       bgcolor: 'background.paper',
       boxShadow: 24,
       p: 4,
       }}
       className="modal-content"
       >
       <h2 id="edit-failure-modal-title" className="modal-title">Failed to Update Maintenance Request</h2>
       <p id="edit-failure-modal-description" className="modal-description">There was an error while updating the maintenance request.</p>
       <button onClick={handleCloseEditFailureModal} className="modal-button">Close</button>
       </Box>
       </Modal>
       

       {unresolvedMaintenanceRequests.length > 0 && (
      <Modal
        open={true}
        onClose={() => setUnresolvedMaintenanceRequests([])}
        aria-labelledby="unresolved-maintenance-modal-title"
        aria-describedby="unresolved-maintenance-modal-description"
        className="modal-container unresolved-maintenance-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="unresolved-maintenance-modal-title" className="modal-title">URGENT!</h2>
          <p id="unresolved-maintenance-modal-description" className="modal-description">
            These requests were created due to lack of maintenance in the past 30 days:
          </p>
          <ul>
            {unresolvedMaintenanceRequests.map((request) => (
              <li key={request.id}>
                <p>RID: <span style={{ fontWeight: 'bold' }}>{request.id}</span> </p>
               
            </li>
            ))}
          </ul>
          <button onClick={() => setUnresolvedMaintenanceRequests([])} className="modal-button">Close</button>
        </Box>
      </Modal>
          )}

       </>
       );
       }
       
       export default Maintenance;