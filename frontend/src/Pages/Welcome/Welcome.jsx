import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            alert('Login Successful');
            navigate('/home'); // Correct navigation
        } else {
            setError('Invalid username or password');
        }
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        setError(''); // Clear previous errors

        if (!name) {
            setError('Please enter your name');
            isValid = false;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            isValid = false;
        }

        if (signUpPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            isValid = false;
        }

        if (isValid) {
            alert('Sign-Up Successful! Please log in.');
            setIsSignUp(false);
        }
    };

    return (
        <div className="welcome-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h1>Welcome</h1>
        <h2>To</h2>
        <h1>HavenTrace</h1>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {isSignUp ? (
          <>
            <h1>SIGN UP</h1>
            <p>Create a new account:</p>
            <form onSubmit={handleSignUpSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={Number} // Ensure phoneNumber is the state variable
                  onChange={(e) => setPhoneNumber(e.target.value)} // Update with appropriate setter
                  required
                />
              </div>

              <div className="input-field">
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="sign-up-btn">
                Sign Up
              </button>
              {error && <p className="error">{error}</p>}
            </form>
            <p>
              Already have an account?{' '}
              <span className="toggle-link" onClick={() => setIsSignUp(false)}>
                Login
              </span>
            </p>
          </>
        ) : (
          <>
            <h1>LOGIN</h1>
            <p>Enter your credentials:</p>
            <form onSubmit={handleSignInSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="sign-up-btn">
                Login
              </button>
              {error && <p className="error">{error}</p>}
            </form>
            <p>
              Don’t have an account?{' '}
              <span className="toggle-link" onClick={() => setIsSignUp(true)}>
                Sign Up
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;