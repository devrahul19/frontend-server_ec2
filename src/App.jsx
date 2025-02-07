import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const handleSignup = async (event, setAlert, navigate) => {
  event.preventDefault();  // Prevent the form from submitting by default

  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.setItem('authToken', data.token);
          setAlert({ message: 'Sign Up successful!', type: 'success' });
          navigate('/dashboard');  // navigate to the dashboard
      } else {
          setAlert({ message: 'Sign Up failed: ' + data.message, type: 'error' });
      }
  } catch (error) {
      console.error('Network error:', error);
      setAlert({ message: 'Network error, please try again later', type: 'error' });
  }
};

function App() {
  const [alert, setAlert] = useState(null);  // State for displaying alerts
  const navigate = useNavigate();  // Use the navigate hook for routing

  return (
      <div className="signup-wrapper">
          <div className="signup-container">
              <div className="form-box">
                  <h2>Sign Up</h2>
                  <form onSubmit={(e) => handleSignup(e, setAlert, navigate)}>
                      <div className="input-group">
                          <input type="text" name="name" required />
                          <label>Full Name</label>
                      </div>
                      <div className="input-group">
                          <input type="email" name="email" required />
                          <label>Email</label>
                      </div>
                      <div className="input-group">
                          <input type="password" name="password" required />
                          <label>Password</label>
                      </div>
                      <button type="submit" className="btn">Sign Up</button>
                      <p className="toggle-text">
                          Already have an account? <Link to="/login">Login</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default App
