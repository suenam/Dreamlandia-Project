import React, { useState } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, fullname, email, password }),
      });

      if (response.ok) {
        // Handle success - perhaps redirect to login or home page
        console.log("Signup successful");
      } else {
        // Handle errors - invalid input, user already exists, etc.
        console.error("Signup failed");
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="Fullname"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupPage;