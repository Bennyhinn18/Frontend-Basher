//loginpage.jsx
import React, { useState } from 'react';
import bash from '../assets/img/bashers.png';
import google from '../assets/img/google-icon.png';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import '../css/LoginPage.css';

import {googleLogin} from  '../api';


function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/leaderboard'); // Replace with your intended route
  };

  const matchPassword = () => {
    // Handle password logic (can be removed if not needed)
    const pw1 = document.getElementById('pswd1').value;
    const pw2 = document.getElementById('pswd2').value;
    if (pw1 !== pw2) {
      alert('Passwords did not match');
    } else {
      alert('Password created successfully');
    }
  };

  const handleSignIn = () => {
    document.getElementById('container').classList.remove('right-panel-active');
  };





// Inside your component


const login = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log('Login successful:', tokenResponse);
    const { access_token } = tokenResponse;
    googleLogin(access_token, navigate) // pass the history object
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setErrorMessage('You are not allowed to access this resource.');
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      });
  }
});


  return (
    <div id="login-page">
      {/* Your HTML structure */}
      {errorMessage && <div class="row"><div class="col-xl-12"><div class="alert alert-danger left-icon-big alert-dismissible fade show"><div class="close" data-bs-dismiss="alert" aria-label="Close"><span><i class="la la-close"></i></span></div><div class="d-flex"><div class="alert-left-icon-big"><span><i class="la la-exclamation-triangle"></i></span></div><div class="flex-grow-1">{errorMessage}</div></div></div></div></div>}
      <button className='Gog' onClick={login}>
        <img src={google} alt="Google icon" width="20px" height="20px" />
        Login with Google
      </button>
    </div>
  );
}

export default LoginPage;
