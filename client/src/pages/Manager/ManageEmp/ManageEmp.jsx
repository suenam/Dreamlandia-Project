import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './ManageEmp.css';

function ManageEmp() {
  const [newEmployeeDOB, setNewEmployeeDOB] = useState('');
  const [newEmployeeAddress, setNewEmployeeAddress] = useState('');
  const [newEmployeePhone, setNewEmployeePhone] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [showArchiveEmployee, setShowArchiveEmployee] = useState(false);
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
    const [newEmployeeRole, setNewEmployeeRole] = useState('');
    const [employeeToArchive, setEmployeeToArchive] = useState('');

const [employees, setEmployees] = useState([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'manager' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'employee' },
  // Add more employee data as needed
]);

const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
  
  };
const handleArchiveEmployeeSubmit = (e) => {
  e.preventDefault();
  console.log('Archive Employee:', employeeToArchive);
};

  return (
        
        <>
        <MSidebar />
        <h1 className='h1-dr-m'>Manage Employees</h1>
        <div className='data-report '>
        <div className="report-section">
  <button onClick={() => setShowAddEmployee(!showAddEmployee)}>
    {showAddEmployee ? '▲ Add Employee' : '▼ Add Employee'}
  </button>

  {showAddEmployee && (
    <form onSubmit={handleAddEmployeeSubmit}>
      <div className="form-header">
        <h3>Add Employee</h3>
        <i title="Form to add a new employee to the system.">&#9432;</i>
      </div>
      <div className="form-row">
        <label>Name:</label>
        <input
          type="text"
          value={newEmployeeName}
          onChange={(e) => setNewEmployeeName(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Date of Birth:</label>
        <input
          type="date"
          value={newEmployeeDOB}
          onChange={(e) => setNewEmployeeDOB(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Address:</label>
        <input
          type="text"
          value={newEmployeeAddress}
          onChange={(e) => setNewEmployeeAddress(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Email:</label>
        <input
          type="email"
          value={newEmployeeEmail}
          onChange={(e) => setNewEmployeeEmail(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Phone Number:</label>
        <input
          type="tel"
          value={newEmployeePhone}
          onChange={(e) => setNewEmployeePhone(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Role:</label>
        <select
          value={newEmployeeRole}
          onChange={(e) => setNewEmployeeRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
      </div>
      <button className="generate-but-dr" type="submit">
        Add Employee
      </button>
    </form>
  )}
</div>

<div className="report-section">
  <button onClick={() => setShowArchiveEmployee(!showArchiveEmployee)}>
    {showArchiveEmployee ? '▲ Archive Employee' : '▼ Archive Employee'}
  </button>

  {showArchiveEmployee && (
    <form onSubmit={handleArchiveEmployeeSubmit}>
      <div className="form-header">
        <h3>Archive Employee</h3>
        <i title="Form to archive an existing employee from the system.">&#9432;</i>
      </div>
      <div className="form-row">
        <label>Employee:</label>
        <select
          value={employeeToArchive}
          onChange={(e) => setEmployeeToArchive(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      <button className="generate-but-dr" type="submit">
        Archive Employee
      </button>
    </form>
  )}
</div>
      </div>
    </>
  );
}

export default ManageEmp;