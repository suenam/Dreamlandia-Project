import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MSidebar from "../../../components/MSidebar/MSidebar";
import "./ManageEmp.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { STATES } from '../../../constants/stateOptions';

function ManageEmp() {
  function generatePassword(firstName, lastName, birthYear) {
    const firstLetter = firstName.charAt(0).toUpperCase();
    const password = `${firstLetter}${lastName}${birthYear}`;
    return password;
  }
  const [openArchiveModal, setOpenArchiveModal] = useState(false);

  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const [showFailedToAddModal, setShowFailedToAddModal] = useState(false);
  const [showFailedToArchiveModal, setShowFailedToArchiveModal] =
    useState(false);
  const [newEmployeeCity, setNewEmployeeCity] = useState("");
  const [newEmployeeState, setNewEmployeeState] = useState("");
  const [newEmployeeZipcode, setNewEmployeeZipcode] = useState("");

  const handleCloseAddEmployeeModal = () => {
    setOpenAddEmployeeModal(false);
  };
  const handleCloseArchiveModal = () => {
    setOpenArchiveModal(false);
  };
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [newEmployeeDOB, setNewEmployeeDOB] = useState("");
  const [newEmployeeAddress, setNewEmployeeAddress] = useState("");
  const [newEmployeePhone, setNewEmployeePhone] = useState("");

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showArchiveEmployee, setShowArchiveEmployee] = useState(false);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
  const [newEmployeeRole, setNewEmployeeRole] = useState("");
  const [employeeToArchive, setEmployeeToArchive] = useState("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");

  const fetchActiveEmployees = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/employees`
      );
      const data = await response.json();
      if (response.ok) {
        setActiveEmployees(data.employees);
      } else {
        console.error("Failed to fetch active employees:", data.message);
      }
    } catch (error) {
      console.error("There was an error:", error);
    }
  };
  useEffect(() => {
    fetchActiveEmployees();
  }, []);
  const handleAddEmployeeSubmit = async (e) => {
    e.preventDefault();
    const newPassword = generatePassword(
      newEmployeeName,
      newEmployeeName.split(" ")[1],
      newEmployeeDOB.split("-")[0]
    );
  
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/addEmp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: newEmployeeName,
          address: newEmployeeAddress,
          role: newEmployeeRole,
          email: newEmployeeEmail,
          phoneNum: formattedPhoneNumber,
          password: newPassword,
          DOB: newEmployeeDOB,
          city: newEmployeeCity,
          state: newEmployeeState,
          zipcode: newEmployeeZipcode,
        }),
      });
  
      if (response.ok) {
        console.log("New Employee Added Successfully");
        setOpenAddEmployeeModal(true);
        setNewEmployeeName("");
        setNewEmployeeDOB("");
        setNewEmployeeAddress("");
        setNewEmployeeEmail("");
        setNewEmployeePhone("");
        setNewEmployeeRole("");
        setFormattedPhoneNumber("");
        setNewEmployeeDOB("");
        setNewEmployeeCity("");
        setNewEmployeeState("");
        setNewEmployeeZipcode("");
      } else {
        console.error("Failed to add new employee");
        setShowFailedToAddModal(true);
      }
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const handleArchiveEmployeeSubmit = async (e) => {
    e.preventDefault();
    if (employeeToArchive) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/archiveEmp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ employeeToArchive }),
          }
        );

        if (response.ok) {
          console.log("Employee archived successfully");
          setOpenArchiveModal(true);
          setEmployeeToArchive("");
        } else {
          console.error("Failed to archive employee");
          setShowFailedToArchiveModal(true);
        }
      } catch (error) {
        console.error("There was an error:", error);
      }
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + "-" + match[2] + "-" + match[3];
    }
    return phoneNumber;
  };

  return (
    <>
      <MSidebar />
      <h1 className="h1-dr-m">Manage Employees</h1>
      <div className="data-report ">
        <div className="report-section">
          <button onClick={() => setShowAddEmployee(!showAddEmployee)}>
            {showAddEmployee ? "▲ Add Employee" : "▼ Add Employee"}
          </button>

          {showAddEmployee && (
            <form onSubmit={handleAddEmployeeSubmit}>
              <div className="form-header">
                <h3>Add Employee</h3>
                <i
                  title={`Auto-generated password: First letter of the first name (UPPERCASE) + Last name + Birth Year`}
                >
                  &#9432;
                </i>{" "}
              </div>
              <div className="form-row">
                <label>
                  Name:<span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>
                  Date of Birth:<span className="required">*</span>
                </label>
                <input
                  type="date"
                  value={newEmployeeDOB}
                  onChange={(e) => setNewEmployeeDOB(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>
                  Email:<span className="required">*</span>
                </label>
                <input
                  type="email"
                  value={newEmployeeEmail}
                  onChange={(e) => setNewEmployeeEmail(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>
                  Phone Number:<span className="required">*</span>
                </label>
                <input
                  type="tel"
                  value={formattedPhoneNumber}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setFormattedPhoneNumber(formatted);
                  }}
                />
              </div>
              <div className="form-row">
                <label>
                  Address:<span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={newEmployeeAddress}
                  onChange={(e) => setNewEmployeeAddress(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>
                  City:<span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={newEmployeeCity}
                  onChange={(e) => setNewEmployeeCity(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>
                  State:<span className="required">*</span>
                </label>
                <TextField
                  id="outlined-select-state"
                  select
                  value={newEmployeeState}
                  onChange={(e) => setNewEmployeeState(e.target.value)}
                  className="state-emp"
                >
                  {STATES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="form-row">
                <label>
                  Zipcode:<span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={newEmployeeZipcode}
                  onChange={(e) => setNewEmployeeZipcode(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>
                  Role:<span className="required">*</span>
                </label>
                <select
                  value={newEmployeeRole}
                  onChange={(e) => setNewEmployeeRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <button className="generate-but-dr" type="submit">
                Add Employee
              </button>
            </form>
          )}
        </div>
        <div className="report-section"></div>
        <div className="report-section">
          <button onClick={() => setShowArchiveEmployee(!showArchiveEmployee)}>
            {showArchiveEmployee ? "▲ Archive Employee" : "▼ Archive Employee"}
          </button>

          {showArchiveEmployee && (
            <form onSubmit={handleArchiveEmployeeSubmit}>
              <div className="form-header">
                <h3>Archive Employee</h3>
                <i title="Form to archive an existing employee from the system.">
                  &#9432;
                </i>
              </div>
              <div className="form-row">
                <label>
                  Employee:<span className="required">*</span>
                </label>
                <select
                  value={employeeToArchive}
                  onChange={(e) => setEmployeeToArchive(e.target.value)}
                >
                  <option value="">Select Employee</option>
                  {activeEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      EID {employee.id} -- {employee.name}
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
      <Modal
        open={openArchiveModal}
        onClose={handleCloseArchiveModal}
        aria-labelledby="archive-modal-title"
        aria-describedby="archive-modal-description"
        className="modal-container archive-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="archive-modal-title" className="modal-title">
            Employee Archived
          </h2>
          <p id="archive-modal-description" className="modal-description">
            The employee has been successfully archived.
          </p>
          <button onClick={handleCloseArchiveModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openAddEmployeeModal}
        onClose={handleCloseAddEmployeeModal}
        aria-labelledby="add-employee-modal-title"
        aria-describedby="add-employee-modal-description"
        className="modal-container add-employee-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="add-employee-modal-title" className="modal-title">
            Employee Added
          </h2>
          <p id="add-employee-modal-description" className="modal-description">
            The new employee has been added successfully.
          </p>
          <button
            onClick={handleCloseAddEmployeeModal}
            className="modal-button"
          >
            Close
          </button>
        </Box>
      </Modal>
      <Modal
        open={showFailedToAddModal}
        onClose={() => setShowFailedToAddModal(false)}
        aria-labelledby="failed-to-add-modal-title"
        aria-describedby="failed-to-add-modal-description"
        className="modal-container failed-to-add-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="failed-to-add-modal-title" className="modal-title">
            Failed to Add Employee
          </h2>
          <p id="failed-to-add-modal-description" className="modal-description">
            There was an error while adding the new employee.
          </p>
          <button
            onClick={() => setShowFailedToAddModal(false)}
            className="modal-button"
          >
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={showFailedToArchiveModal}
        onClose={() => setShowFailedToArchiveModal(false)}
        aria-labelledby="failed-to-archive-modal-title"
        aria-describedby="failed-to-archive-modal-description"
        className="modal-container failed-to-archive-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="failed-to-archive-modal-title" className="modal-title">
            Failed to Archive Employee
          </h2>
          <p
            id="failed-to-archive-modal-description"
            className="modal-description"
          >
            There was an error while archiving the employee.
          </p>
          <button
            onClick={() => setShowFailedToArchiveModal(false)}
            className="modal-button"
          >
            Close
          </button>
        </Box>
      </Modal>
    </>
  );
}

export default ManageEmp;
