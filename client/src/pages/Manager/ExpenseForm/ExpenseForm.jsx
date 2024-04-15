import React, { useState, useEffect, useRef } from 'react';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './ExpenseForm.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';

const ExpenseForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [attractionList, setAttractionList] = useState([]);
  const [selectedAttractionId, setSelectedAttractionId] = useState('');
  
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] = useState(false);
  const [openDeleteFailureModal, setOpenDeleteFailureModal] = useState(false);

 
  const handleCloseDeleteSuccessModal = () => {
    setOpenDeleteSuccessModal(false);
  };

  const handleCloseDeleteFailureModal = () => {
    setOpenDeleteFailureModal(false);
  };

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);
  const [openAttractionSuccessModal, setOpenAttractionSuccessModal] = useState(false);
  const [openAttractionFailureModal, setOpenAttractionFailureModal] = useState(false);
  const handleCloseAttractionSuccessModal = () => {
    setOpenAttractionSuccessModal(false);
  };

  const handleCloseAttractionFailureModal = () => {
    setOpenAttractionFailureModal(false);
  };
  const staffIdRef = useRef(null);

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showDeleteRestForm, setShowDeleteRestForm] = useState(false);

  
  const [showAttractionForm, setShowAttractionForm] = useState(false);
  const [showRestForm, setShowRestForm] = useState(false);

  const [showDeleteAttractionForm, setShowDeleteAttractionForm] = useState(false);

  useEffect(() => {
    const fetchStaffId = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/employee`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData && userData.StaffID) {
            staffIdRef.current = userData.StaffID;
            setEmployeeId(staffIdRef.current);
            console.log('staffid:', staffIdRef.current);
          }
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    console.log('staffid:', staffIdRef.current);
    fetchStaffId();
  }, []);

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/expense-restaurant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          StaffID: staffIdRef.current,
          RestaurantID: restaurantId,
          ExpenseAmt: expenseAmount,
          ExpenseDate: expenseDate,
          ExpenseType: expenseType,
        }),
      });

      if (response.ok) {
        setOpenSuccessModal(true);
        console.log('Submitted!');
      } else {
        setOpenFailureModal(true);
        console.error('Failed!');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  const handleCloseFailureModal = () => {
    setOpenFailureModal(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    shortDescription: '',
    thrillLevel: '',
    heightRequirement: '',
    status: '',
    image: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  useEffect(() => {
    const fetchMerchandiseList = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-merch`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch merchandise list');
        }

        const data = await response.json();
        console.log('merchandise list data:', data);
        setMerchandiseList(data.merchandise);
      } catch (error) {
        console.error('Error fetching merchandise list:', error);
        fetchMerchandiseList([]);
      }
    };

    fetchMerchandiseList();
  }, []);
  useEffect(() => {
    const fetchRestList = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-rest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch merchandise list');
        }

        const data = await response.json();
        console.log('rest list data:', data);
        setRestList(data.restaurants);
      } catch (error) {
        console.error('Error fetching rest list:', error);
        fetchRestList([]);
      }
    };

    fetchRestList();
  }, []);
  useEffect(() => {
    const fetchAttractionList = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/attractions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attraction list');
        }

        const data = await response.json();
        console.log('Attraction list data:', data);
        setAttractionList(data.attractions);
      } catch (error) {
        console.error('Error fetching attraction list:', error);
        setAttractionList([]);
      }
    };

    fetchAttractionList();
  }, []);
  const handleDeleteMerchandise = async (e) => {
    e.preventDefault();

    try {
      console.log('Selected merch ID:', selectedMerchandiseId);

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/delete-merch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedMerchandiseId }),
      });
      if(response.ok){
        console.log("done");
      }
    
    } catch (error) {
      console.error('Error deleting merchandise:', error);
    }
  };
  
  const handleDeleteAttraction = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Selected Attraction ID:', selectedAttractionId);
  
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/delete-attraction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedAttractionId }),
      });
  
      if (response.ok) {
        setOpenDeleteSuccessModal(true);
      } else {
        setOpenDeleteFailureModal(true);
      }
    } catch (error) {
        setOpenDeleteFailureModal(true);

      console.error('Error deleting attraction:', error);
    }
  };
  const [selectedRestId, setSelectedRestId] = useState('');

  const handleDeleteRest = async (e) => {
    e.preventDefault();
  
    try {
  
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/delete-rest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedRestId }),
      });
  
      if (response.ok) {
        setOpenDeleteSuccessModal(true);
      } else {
        setOpenDeleteFailureModal(true);
      }
    } catch (error) {
        setOpenDeleteFailureModal(true);

      console.error('Error deleting rest:', error);
    }
  };
  const [showAddMerchandiseForm, setShowAddMerchandiseForm] = useState(false);
  const [merchandiseFormData, setMerchandiseFormData] = useState({
    name: '',
    type: '',
    supplierCost: '',
    sellingCost: '',
    image: '',
  });
  
  const [openMerchandiseSuccessModal, setOpenMerchandiseSuccessModal] = useState(false);
  const [openMerchandiseFailureModal, setOpenMerchandiseFailureModal] = useState(false);
  const [merchandiseMessage, setMerchandiseMessage] = useState('');
  const handleMerchandiseInputChange = (e) => {
    setMerchandiseFormData({
      ...merchandiseFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRestInputChange = (e) => {
    setrestFormData({
      ...restFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCloseMerchandiseSuccessModal = () => {
    setOpenMerchandiseSuccessModal(false);
  };

  const handleCloseMerchandiseFailureModal = () => {
    setOpenMerchandiseFailureModal(false);
  };
  const [showDeleteMerchandiseForm, setShowDeleteMerchandiseForm] = useState(false);
  const [selectedMerchandiseId, setSelectedMerchandiseId] = useState('');
  const [merchandiseList, setMerchandiseList] = useState([]);
  const [restList, setRestList] = useState([]);

  const handleAddMerchandiseSubmit = async (e) => {
    e.preventDefault();
    console.log( merchandiseFormData.name);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/insert-new-merch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: merchandiseFormData.name,
          type: merchandiseFormData.type,
          supplierCost: merchandiseFormData.supplierCost,
          sellingCost: merchandiseFormData.sellingCost,
          image: merchandiseFormData.image,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setOpenMerchandiseSuccessModal(true);
        setMerchandiseMessage(data.message);
        setMerchandiseFormData({
          name: '',
          type: '',
          supplierCost: '',
          sellingCost: '',
          image: '',
        });
      } else {
        setOpenMerchandiseFailureModal(true);
        setMerchandiseMessage('Error submitting merchandise. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting merchandise:', error);
      setOpenMerchandiseFailureModal(true);
      setMerchandiseMessage('Error submitting merchandise. Please try again later.');
    }
  };

  const [showAddRestForm, setshowAddRestForm] = useState(false);
  const [restFormData, setrestFormData] = useState({
    name: '',
    type: '',
    amount: '',
    description: '',
    image: '',
  });
  
  const handleAddRestSubmit = async (e) => {
    e.preventDefault();
    console.log(restFormData.name);
    try {
      let amount = 0;
      switch (restFormData.type.toLowerCase()) {
        case 'standard':
          amount = 10;
          break;
        case 'deluxe':
          amount = 35;
          break;
        case 'special':
          amount = 45;
          break;
        default:
          amount = 0;
          break;
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/insert-new-rest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: restFormData.name,
          type: restFormData.type,
          amount: amount,
          description: restFormData.description,
          image: restFormData.image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOpenMerchandiseSuccessModal(true);
      } else {
        setOpenMerchandiseFailureModal(true);
      }
    } catch (error) {
      console.error('Error submitting rest:', error);
      setOpenMerchandiseFailureModal(true);
    }
  };
  const handleAttractionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/insert-new-attractions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          description: formData.description,
          shortDescription: formData.shortDescription,
          thrillLevel: formData.thrillLevel,
          heightRequirement: formData.heightRequirement,
          status: 1,
          image: formData.image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOpenAttractionSuccessModal(true);
        setMessage(data.message);
        setFormData({
          name: '',
          type: '',
          description: '',
          shortDescription: '',
          thrillLevel: '',
          heightRequirement: '',
          status: 1,
          image: '',
        });
      } else {
        setOpenAttractionFailureModal(true);
        setMessage('Error submitting attraction. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting attraction:', error);
      setOpenAttractionFailureModal(true);
      setMessage('Error submitting attraction. Please try again later.');
    }
  };

const handleMerchandiseSelect = (e) => {
  setSelectedMerchandiseId(e.target.value);
};
const handleResteSelect = (e) => {
  setSelectedRestId(e.target.value);
};

  return (
    <div className="expense-form">
      <MSidebar />
      <h1 className="h1-expense-form">Manage Departments</h1>

      <div className="expense-section">
        <button
          onClick={() => setShowExpenseForm(!showExpenseForm)}
          className={`show-hide-button ${showExpenseForm ? 'hide' : 'show'}`}
        >
          {showExpenseForm ? '▲ Expense Form' : '▼ Expense Form'}
        </button>

        {showExpenseForm && (
          <form onSubmit={handleExpenseSubmit}>
            <div className="form-header">
              <h3>Resturant Expense Form</h3>
              <i title="Form for managers to submit restaurant expenses.">&#9432;</i>
            </div>

            <div className="form-row">
              <label>Restaurant:<span className="required">*</span></label>
              <select value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)}>
                <option value="">Select Restaurant</option>
                <option value="1">WhataSandwich</option>
                <option value="2">Burger Castle</option>
                <option value="3">The Velvet Vineyard</option>
                <option value="4">Silver Spoon Serenade</option>
                <option value="5">HerHarmony Eatery</option>
                <option value="6">Bella's Fairy Tale Feast</option>
              </select>
            </div>
            <div className="form-row">
              <label>Amount:<span className="required">*</span></label>
              <input type="number" step="0.01" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Date:<span className="required">*</span></label>
              <input type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Type:<span className="required">*</span></label>
              <select value={expenseType} onChange={(e) => setExpenseType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="produce">Produce</option>
                <option value="supplies">Supplies</option>
                <option value="utilities">Utilities</option>
              </select>
            </div>
            <button type="submit" onClick={handleExpenseSubmit}>
              Submit Expense
            </button>
          </form>
        )}
      </div>

      <div className="expense-section">
        <button
          onClick={() => setShowAttractionForm(!showAttractionForm)}
          className={`show-hide-button ${showAttractionForm ? 'hide' : 'show'}`}
        >
          {showAttractionForm ? '▲ Add Attraction' : '▼ Add Attraction'}
        </button>

        {showAttractionForm && (
          <form onSubmit={handleAttractionSubmit}>
            <div className="form-header">
              <h3>Add Attraction</h3>
              <i title="Form for managers to add new attractions.">&#9432;</i>
            </div>
            <div className="form-row">
              <label>Name:<span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Type:<span className="required">*</span></label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Description:<span className="required">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-row">
              <label>Short Description:<span className="required">*</span></label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-row">
              <label>Thrill Level:<span className="required">*</span></label>
              <input
                type="text"
                name="thrillLevel"
                value={formData.thrillLevel}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Height Requirement:<span className="required">*</span></label>
              <input
                type="text"
                name="heightRequirement"
                value={formData.heightRequirement}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Image:<span className="required">*</span></label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" onClick={handleAttractionSubmit}>
              Add Attraction
            </button>
          </form>
        )}
      </div>

      <div className="expense-section">
        <button
          onClick={() => setShowDeleteAttractionForm(!showDeleteAttractionForm)}
          className={`show-hide-button ${showDeleteAttractionForm ? 'hide' : 'show'}`}
        >
          {showDeleteAttractionForm ? '▲ Delete Attraction' : '▼ Delete Attraction'}
        </button>

        {showDeleteAttractionForm && (
  <form onSubmit={handleDeleteAttraction}>
    <div className="form-row">
      <label>Select Attraction:</label>
      <select
        value={selectedAttractionId}
        onChange={(e) => setSelectedAttractionId(e.target.value)}
      >
        <option value="">Select Attraction</option>
        {attractionList.length > 0 ? (
          attractionList.map((attraction) => (
            <option key={attraction.attractionID} value={attraction.attractionID}>
              {attraction.name}
            </option>
          ))
        ) : (
          <option disabled>Loading...</option>
        )}
      </select>
    </div>
    <button type="submit" onClick={handleDeleteAttraction}>Delete Attraction</button>
  </form>
)}
<div className="expense-section">
  <button
    onClick={() => setShowAddMerchandiseForm(!showAddMerchandiseForm)}
    className={`show-hide-button ${showAddMerchandiseForm ? 'hide' : 'show'}`}
  >
    {showAddMerchandiseForm ? '▲ Add Merchandise' : '▼ Add Merchandise'}
  </button>

  {showAddMerchandiseForm && (
    <form onSubmit={handleAddMerchandiseSubmit}>
      <div className="form-header">
        <h3>Add Merchandise</h3>
        <i title="Form for managers to add new merchandise.">&#9432;</i>
      </div>
      <div className="form-row">
        <label>Name:<span className="required">*</span></label>
        <input type="text" name="name" value={merchandiseFormData.name} onChange={handleMerchandiseInputChange} required />
      </div>
      <div className="form-row">
        <label>Type:<span className="required">*</span></label>
        <input type="text" name="type" value={merchandiseFormData.type} onChange={handleMerchandiseInputChange} required />
      </div>
      <div className="form-row">
        <label>Supplier Cost:<span className="required">*</span></label>
        <input type="number" name="supplierCost" value={merchandiseFormData.supplierCost} onChange={handleMerchandiseInputChange} required />
      </div>
      <div className="form-row">
        <label>Selling Cost:<span className="required">*</span></label>
        <input type="number" name="sellingCost" value={merchandiseFormData.sellingCost} onChange={handleMerchandiseInputChange} required />
      </div>
      <div className="form-row">
        <label>Image:<span className="required">*</span></label>
        <input type="text" name="image" value={merchandiseFormData.image} onChange={handleMerchandiseInputChange} required />
      </div>
      <button type="submit" onClick={handleAddMerchandiseSubmit}>
        Add Merchandise
      </button>
    </form>
  )}
</div>
<div className="expense-section">
  <button
    onClick={() => setShowDeleteMerchandiseForm(!showDeleteMerchandiseForm)}
    className={`show-hide-button ${showDeleteMerchandiseForm ? 'hide' : 'show'}`}
  >
    {showDeleteMerchandiseForm ? '▲ Delete Merchandise' : '▼ Delete Merchandise'}
  </button>

  {showDeleteMerchandiseForm && (
    <form onSubmit={handleDeleteMerchandise}>
      <div className="form-row">
        <label>Select Merchandise:</label>
        <select value={selectedMerchandiseId} onChange={handleMerchandiseSelect}>
    <option value="">Select Merchandise</option>
    {merchandiseList.map((merchandise) => (
      <option key={merchandise.MId} value={merchandise.MId}>
        {merchandise.name}
      </option>
    ))}
  </select>
      </div>
      <button type="submit" onClick={handleDeleteMerchandise}>
        Delete Merchandise
      </button>
    </form>
  )}
</div>
      </div>

      <div className="expense-section">
        <button
          onClick={() => setShowRestForm(!showRestForm)}
          className={`show-hide-button ${showRestForm ? 'hide' : 'show'}`}
        >
          {showRestForm ? '▲ Add Restaurant' : '▼ Add Restaurant'}
        </button>

        {showRestForm && (
          <form onSubmit={handleAddRestSubmit}>
            <div className="form-header">
              <h3>Add Restaurant</h3>
              <i title="Form for managers to add new Restaurants.">&#9432;</i>
            </div>
            <div className="form-row">
              <label>Name:<span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={restFormData.name}
                onChange={handleRestInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Type:<span className="required">*</span></label>
              <input
                type="text"
                name="type"
                value={restFormData.type}
                onChange={handleRestInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Description:<span className="required">*</span></label>
              <textarea
                name="description"
                value={restFormData.description}
                onChange={handleRestInputChange}
                required
              ></textarea>
            </div>
            
            <div className="form-row">
              <label>Image:<span className="required">*</span></label>
              <input
                type="text"
                name="image"
                value={restFormData.image}
                onChange={handleRestInputChange}
                required
              />
            </div>
            <button type="submit" onClick={handleAddRestSubmit}>
              Add Restaurant
            </button>
          </form>
        )}
      </div>
      <div className="expense-section">
  <button
    onClick={() => setShowDeleteRestForm(!showDeleteRestForm)}
    className={`show-hide-button ${showDeleteRestForm ? 'hide' : 'show'}`}
  >
    {showDeleteRestForm ? '▲ Delete Restaurant' : '▼ Delete Restaurant'}
  </button>

  {showDeleteRestForm && (
  <form onSubmit={handleDeleteRest}>
    <div className="form-row">
      <label>Select Restaurant:</label>
      <select value={selectedRestId} onChange={handleResteSelect}>
        <option value="">Select Restaurant</option>
        {restList.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>
    </div>
    <button type="submit" onClick={handleDeleteRest}>
      Delete Rest
    </button>
  </form>
)}
</div>
<Modal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
        className="modal-container success-modal"
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
          <h2 id="success-modal-title" className="modal-title">
            Expense Submitted
          </h2>
          <p id="success-modal-description" className="modal-description">
            The expense has been submitted successfully.
          </p>
          <button onClick={handleCloseSuccessModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openFailureModal}
        onClose={handleCloseFailureModal}
        aria-labelledby="failure-modal-title"
        aria-describedby="failure-modal-description"
        className="modal-container failure-modal"
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
          <h2 id="failure-modal-title" className="modal-title">
            Failed to Submit Expense
          </h2>
          <p id="failure-modal-description" className="modal-description">
            There was an error while submitting the expense. Please try again later.
          </p>
          <button onClick={handleCloseFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openAttractionSuccessModal}
        onClose={handleCloseAttractionSuccessModal}
        aria-labelledby="attraction-success-modal-title"
        aria-describedby="attraction-success-modal-description"
        className="modal-container success-modal"
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
          <h2 id="attraction-success-modal-title" className="modal-title">
            Attraction Submitted
          </h2>
          <p id="attraction-success-modal-description" className="modal-description">
            The new attraction has been submitted successfully.
          </p>
          <button onClick={handleCloseAttractionSuccessModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openAttractionFailureModal}
        onClose={handleCloseAttractionFailureModal}
        aria-labelledby="attraction-failure-modal-title"
        aria-describedby="attraction-failure-modal-description"
        className="modal-container failure-modal"
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
          <h2 id="attraction-failure-modal-title" className="modal-title">
            Failed to Submit Attraction
          </h2>
          <p id="attraction-failure-modal-description" className="modal-description">
            There was an error while submitting the new attraction. Please try again later.
          </p>
          <button onClick={handleCloseAttractionFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>
      <Modal
  open={openDeleteSuccessModal}
  onClose={handleCloseDeleteSuccessModal}
  aria-labelledby="delete-success-modal-title"
  aria-describedby="delete-success-modal-description"
  className="modal-container success-modal"
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
    <h2 id="delete-success-modal-title" className="modal-title">
      Attraction Deleted
    </h2>
    <p id="delete-success-modal-description" className="modal-description">
      The attraction has been deleted successfully.
    </p>
    <button onClick={handleCloseDeleteSuccessModal} className="modal-button">
      Close
    </button>
  </Box>
</Modal>

<Modal
  open={openDeleteFailureModal}
  onClose={handleCloseDeleteFailureModal}
  aria-labelledby="delete-failure-modal-title"
  aria-describedby="delete-failure-modal-description"
  className="modal-container failure-modal"
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
    <h2 id="delete-failure-modal-title" className="modal-title">
      Failed to Delete Attraction
    </h2>
    <p id="delete-failure-modal-description" className="modal-description">
      There was an error while deleting the attraction. Please try again later.
    </p>
    <button onClick={handleCloseDeleteFailureModal} className="modal-button">
      Close
    </button>
  </Box>
</Modal>

      <Modal
        open={openDeleteSuccessModal}
        onClose={handleCloseDeleteSuccessModal}
        aria-labelledby="delete-success-modal-title"
        aria-describedby="delete-success-modal-description"
        className="modal-container success-modal"
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
          <h2 id="delete-success-modal-title" className="modal-title">
            Attraction Deleted
          </h2>
          <p id="delete-success-modal-description" className="modal-description">
            The attraction has been deleted successfully.
          </p>
          <button onClick={handleCloseDeleteSuccessModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openDeleteFailureModal}
        onClose={handleCloseDeleteFailureModal}
        aria-labelledby="delete-failure-modal-title"
        aria-describedby="delete-failure-modal-description"
        className="modal-container failure-modal"
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
          <h2 id="delete-failure-modal-title" className="modal-title">
            Failed to Delete Attraction
          </h2>
          <p id="delete-failure-modal-description" className="modal-description">
            There was an error while deleting the attraction. Please try again later.
          </p>
          <button onClick={handleCloseDeleteFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>
      <Modal
        open={openMerchandiseSuccessModal}
        onClose={handleCloseMerchandiseSuccessModal}
        aria-labelledby="merchandise-success-modal-title"
        aria-describedby="merchandise-success-modal-description"
        className="modal-container success-modal"
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
          <h2 id="merchandise-success-modal-title" className="modal-title">
            Merchandise Submitted
          </h2>
          <p id="merchandise-success-modal-description" className="modal-description">
            {merchandiseMessage}
          </p>
          <button onClick={handleCloseMerchandiseSuccessModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openMerchandiseFailureModal}
        onClose={handleCloseMerchandiseFailureModal}
        aria-labelledby="merchandise-failure-modal-title"
        aria-describedby="merchandise-failure-modal-description"
        className="modal-container failure-modal"
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
          <h2 id="merchandise-failure-modal-title" className="modal-title">
            Failed to Submit Merchandise
          </h2>
          <p id="merchandise-failure-modal-description" className="modal-description">
            {merchandiseMessage}
          </p>
          <button onClick={handleCloseMerchandiseFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>


    </div>
  );
};

export default ExpenseForm;