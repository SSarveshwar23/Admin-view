import React, { useEffect, useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import logo from '../../assets/logo dark.png';

function LoginV3() {
  const context = useContext(AppSettings);
  const [redirect, setRedirect] = useState(false);
  const showPopup = () => {
    alert("Contact admin to reset the password");
  };

  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass('p-0');

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass('');
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to='/home' />;
  }

  return (
    <div className="login login-with-news-feed">
      <div className="news-feed">
        <div className="news-image" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-11.jpg)' }}></div>
        <div className="news-caption">
          <h4 className="caption-title"><b>Reinfosec</b> </h4>
          <p>
            Govern | Detect | Respond | Protect
          </p>
        </div>
      </div>
      <div className="login-container">
        <div className="login-header mb-30px">
          <div className="brand">
            <div className="d-flex align-items-center">
              <img src={logo} alt="Logo" className="logo" style={{ width: "150px", height: "40px" }} />

            </div>
          </div>

        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit} className="fs-13px">
            <div className="form-floating mb-15px">
              <input type="text" className="form-control h-45px fs-13px" placeholder="Email Address" id="emailAddress" />
              <label htmlFor="emailAddress" className="d-flex align-items-center fs-13px text-gray-600">Email Address</label>
            </div>
            <div className="form-floating mb-15px">
              <input type="password" className="form-control h-45px fs-13px" placeholder="Password" id="password" />
              <label htmlFor="password" className="d-flex align-items-center fs-13px text-gray-600">Password</label>
            </div>
            <div className='d-flex justify-content-between'>
              <div className="form-check mb-30px">
                <input className="form-check-input" type="checkbox" value="1" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <a href='' onClick={showPopup}>Forgot Password</a>
            </div>
            <div className="mb-10px">
              <button type="submit" className="btn btn-theme d-block h-45px w-100 btn-lg fs-14px">Sign me in</button>
            </div>
            <div className='mb-10px d-flex justify-content-center align-items-center'>
              <div className="flex-grow-1 border-bottom"></div>
              <div className='mx-2'>Or continue with</div>
              <div className="flex-grow-1 border-bottom"></div>
            </div>
            <div className='mb-15px'>
              <Link to="/ui/social-buttons" className="btn btn-lg w-100 h-45px fs-14px btn-social btn-google d-flex justify-content-center align-items-center">
                <span className="fab fa-google "></span> <div className="" style={{ marginLeft: '-40px' }}>Sign in with Google</div>
              </Link>
            </div>
            <div className="mb-20px pb-20px text-body">
              Not a member yet? Click <Link to="/user/register-v3" className="text-primary">here</Link> to register.
            </div>
            <hr className="bg-gray-600 opacity-2" />
            <div className="text-gray-600 text-center text-gray-500-darker mb-0">
              &copy; Copyright 2023. Reverse Engineering Infosec Private Limited. All rights reserved.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginV3;