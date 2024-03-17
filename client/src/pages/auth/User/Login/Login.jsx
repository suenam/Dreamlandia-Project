import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Login.css';
import { useAuth } from "../../auth";
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import Logo from '../../../../assets/dreamlandia_logo.svg';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/';

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        // handle the logic after successful login here, such as saving tokens, redirecting, etc
        auth.login(data.user, data.token);
        navigate(redirectPath, {replace: true});
      } else {
        console.error("Login failed", data);
        // Handling login failures
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
    // let user = 'user123'; // user object, set up login logic here
    // auth.login(user);
    // navigate(redirectPath, {replace: true});
    // console.log('Email:', email);
    // console.log('Password:', password);
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
          <Link className="link" to='/contactus'>Forgot password?</Link>
        </div>
          <button className="login-button" onClick={handleLogin}>
              Login
          </button>
        <div className="signup-text">
          New user? <Link className="link" to='/auth/signup'>Sign up here</Link>
        </div>
      </div>
    </div>

  );
}
export default Login

