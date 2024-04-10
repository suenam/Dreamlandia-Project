import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ForgotPass.css';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import OutlinedInput from '@mui/material/OutlinedInput';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Logo from '../../../assets/dreamlandia_logo.svg';

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openFailureModalEmail, setOpenFailureModalEmail] = useState(false);
  const [openFailureModalPass, setOpenFailureModalPass] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handleSubmitReset = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        setOpenFailureModalPass(true);
        return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password }),
      });

      if (response.ok) {
        setOpenSuccessModal(true);
        console.log("Login successful");
      } else {
        setOpenFailureModalEmail(true);
        console.error("Reset password failed");
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseFailureModal = () => {
    setOpenFailureModalEmail(false);
    setOpenFailureModalPass(false);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    navigate('/login', { replace: true });
  }


  return (
    <div className="forgot-pass-container">
      <img src={Logo} />
      <div className="forgot-pass-form">
        <h1>Reset Your Password</h1>
        
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

        <FormControl required sx={{ m: 1, width: '75%', marginBottom: '8px' }} variant="outlined">
          <OutlinedInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password *"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

        <button className="forgot-pass-button" onClick={handleSubmitReset}>
          Reset Password
        </button>
      </div>

      <Modal
        open={openFailureModalEmail}
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
          <h2 id="submit-failure-modal-title" className="modal-reset-title">
            Failed to Reset Password
          </h2>
          <p id="submit-failure-modal-description" className="modal-reset-description">
            <br/>Email not found
          </p>
          <button onClick={handleCloseFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openFailureModalPass}
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
          <h2 id="submit-failure-modal-title" className="modal-reset-title">
            Failed to Reset Password
          </h2>
          <p id="submit-failure-modal-description" className="modal-reset-description">
          <br/>Passwords do not match
          </p>
          <button onClick={handleCloseFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openSuccessModal}
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
          <h2 id="submit-failure-modal-title" className="modal-reset-title">
            Password reset successful!
          </h2>
          <button onClick={handleCloseSuccessModal} className="modal-button">
            Login
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotPass;