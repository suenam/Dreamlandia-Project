import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";
import './EmployeeLogin.css';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import Logo from '../../../../assets/dreamlandia_logo.svg'
import TextField from '@mui/material/TextField'; 
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const [openFailureModal, setOpenFailureModal] = useState(false);

  useEffect(() => {
    if (auth.employee && auth.employee.SRole) {
      navigate(`/${auth.employee.SRole === "Staff" ? "employee/profile" : "manager/dashboard"}`, { replace: true });
    }
  }, [auth.employee, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const isloginSuccessful = await auth.employeeLogin({ email, password });
      console.log("employeeLogin.jsx is called");
    } catch (error) {
      console.error('employee Login failed:', error);
      setOpenFailureModal(true);

    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCloseFailureModal = () => {
    setOpenFailureModal(false);
  };
  return (
    <div className="employee-login-container">
        <img src={Logo} />
      <div className="employee-login-form">
        <h1>Employee Login</h1>
        <FormControl required sx={{ m: 1, width: '75%', marginTop:'35px'}} variant="outlined">
        <OutlinedInput
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          id="outlined-adornment-email"
          type='text'
          placeholder="Email *"
          startAdornment={
            <InputAdornment position="start">
                <PersonIcon fontSize="medium"/>
            </InputAdornment>
          }
        />
        </FormControl>
        <FormControl required sx={{ m: 1, width: '75%', marginBottom:'8px' }} variant="outlined">
          <OutlinedInput
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password *"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
                <InputAdornment position="start">
                    <LockIcon fontSize="medium"/>
                </InputAdornment>
              }
          />
        </FormControl>
        <div className="forgotPassword">
          <Link className="link" to='/employee/forgot-password'>Forgot password?</Link>
        </div>
          <button className="login-button" onClick={handleLogin}>
              Login
          </button>
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
            Failed to Login
          </h2>
          <p id="submit-failure-modal-description" className="modal-description">
            Wrong password and/or email.
          </p>
          <button onClick={handleCloseFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>
    </div>

  );
}
export default EmployeeLogin

