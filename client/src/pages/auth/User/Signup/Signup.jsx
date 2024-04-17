import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Signup.css';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import OutlinedInput from '@mui/material/OutlinedInput';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Logo from '../../../../assets/dreamlandia_logo.svg';


const SignupPage = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setModalMessage("Signup successful! Redirecting to login...");
        setOpenSuccessModal(true);
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
        console.log("Signup successful");
      } else {
        setOpenFailureModal(true);
        setModalMessage(data.message || "There was an error while signing up");
        console.error("Signup failed");
      }
    } catch (error) {
      setOpenFailureModal(true);
      setModalMessage("Network error or server is down.");
      console.error('There was an error:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleCloseFailureModal = () => {
    setOpenFailureModal(false);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signup-container">
      <img src={Logo} />
      <div className="signup-form">
        <h1>Sign Up</h1>

        <FormControl required sx={{ m: 1, width: '75%', marginTop: '40px' }} variant="outlined">
          <OutlinedInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-adornment-email"
            type='text'
            placeholder="Email *"
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon fontSize="medium" />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl required sx={{ m: 1, width: '75%', marginTop: '10px' }} variant="outlined">
          <OutlinedInput
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            id="outlined-adornment-fullname"
            type='text'
            placeholder="Fullname *"
            startAdornment={
              <InputAdornment position="start">
                <PersonIcon fontSize="medium" />
              </InputAdornment>
            }
          />
        </FormControl>



        <FormControl required sx={{ m: 1, width: '75%', marginBottom: '8px' }} variant="outlined">
          <OutlinedInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password *"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <LockIcon fontSize="medium" />
              </InputAdornment>
            }
          />
        </FormControl>
        <button className="signup-button" onClick={handleSignup}>
          Sign Up
        </button>
        <div className="login-text">
          Already have an account? <Link className="link" to='/login'>Log in here</Link>
        </div>
      </div>
      <Modal
        open={openFailureModal}
        onClose={handleCloseFailureModal}
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
          <h2 id="submit-failure-modal-title" className="modal-title">
            Failed to Sign Up
          </h2>
          <p id="submit-failure-modal-description" className="modal-description">
            {modalMessage}
          </p>
          <button onClick={handleCloseFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>
      <Modal
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
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
            Success
          </h2>
          <p id="success-modal-description" className="modal-description">
            {modalMessage}
          </p>
          <button onClick={() => setOpenSuccessModal(false)} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default SignupPage;