import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Store.js/auth-context'; // Import your AuthContext

const ProfileForm = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext); // Use your AuthContext

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // Add validation if necessary
    if (enteredNewPassword.trim().length < 7) {
      alert("Password should be at least 7 characters long.");
      return;
    }

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDMGEPT6_WQcPUgRPQu-lYfN6dO2K-rEv4', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to change password.');
      }
      return response.json();
    })
    .then(data => {
      // Password change was successful
      alert("Password changed successfully!");
      authCtx.login(data.idToken); // Assuming this method updates your authentication state
      navigate('/'); // Navigate to home or another route
    })
    .catch(error => {
      // Handle network errors or other errors
      alert("An error occurred! Please try again.");
      console.error('Password change error:', error);
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
