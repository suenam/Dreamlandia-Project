// MaintenanceReportCard.js
import React from 'react';
import './MaintenanceReportCard.css';

const MaintenanceReportCard = ({ maintenanceRequests }) => {
  // Filter active maintenance requests
  const activeMaintenanceRequests = maintenanceRequests.filter(request => request.status === 'Open' || request.status === 'In Progress');

  return (
    <div className="maintenance-report-card">
      <h2>Active Maintenance Requests</h2>
      {activeMaintenanceRequests.map(request => (
        <div key={request.id} className="maintenance-request">
          <h3>Request ID: {request.id}</h3>
          <p>Attraction: {request.attraction}</p>
          <p>Status: {request.status}</p>
          <p>Comment: {request.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default MaintenanceReportCard;
