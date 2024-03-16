import React, {useState} from "react";
import './Login.css';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import Logo from '../../../../assets/dreamlandia_logo.svg';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // login logic here 
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
        <img src={Logo} />
      <div className="login-form">
        <h1>Login</h1>
        <FormControl required sx={{ m: 1, width: '75%', marginTop:'35px'}} variant="outlined">
        {/* <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel> */}
        <OutlinedInput
          value={email}
          onChange={(e)=>setEmail(e.target.value)} 
          id="outlined-adornment-email"
          type='text'
        //   label="Email"
          placeholder="Email *"
          startAdornment={
            <InputAdornment position="start"> 
                <PersonIcon fontSize="medium"/>
            </InputAdornment>
          }
        />
        </FormControl>
        <FormControl required sx={{ m: 1, width: '75%', marginBottom:'8px' }} variant="outlined">
          {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
          <OutlinedInput
            value={password}
            onChange={(e)=>setPassword(e.target.value)} 
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password *"
            // label="Password"
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
          <Link className="link" to='/contactus'>Forgot password?</Link>
        </div>
          <button className="login-button" onClick={handleLogin}>
              Login
          </button>
        <div className="signup-text">
          New user? <Link className="link" to='/signup'>Sign up here</Link>
        </div>
      </div>
    </div>  
    
  );
}
export default Login

 