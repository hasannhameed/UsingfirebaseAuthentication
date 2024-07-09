import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import  AuthContext  from '../../Store.js/auth-context'; // Import your AuthContext

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext); // Use your AuthContext

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // Add validation if necessary

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDMGEPT6_WQcPUgRPQu-lYfN6dO2K-rEv4', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer abc'
      }
    }).then(response => {
      // Handle response
      if (response.ok) {
        // Password change was successful
      } else {
        // Handle errors
      }
    }).catch(error => {
      // Handle network errors
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
