import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }))
  };

  return (
    <div>
        {
          window.location.pathname === "/signup" ? (
            <form onSubmit={handleSubmit} name={name} id="signin-form">
              <h1>Don't have an account? <span>Sign up.</span></h1>
              <div class="input-container">
                <label htmlFor="firstname">
                  <small>First Name</small>
                </label>
                <input name="firstname" type="text" required/>
              </div>
                <div class="input-container">
                <label htmlFor="lastname">
                  <small>Last Name</small>
                </label>
                <input name="Last Name" type="text" required/>
              </div>
              <div class="input-container">
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" required/>
              </div>
              <div class="input-container">
                <label htmlFor="username">
                  <small>Username</small>
                </label>
                <input name="username" type="text" required/>
              </div>
              <div class="input-container">
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" required/>
              </div>
              <div class="input-container">
                <button type="submit">{displayName}</button>
              </div>
              {error && <div> {error} </div>}
              <a href="/login">Have an account? Log in.</a>
            </form>
          ) : (
            <form onSubmit={handleSubmit} name={name} id="signin-form">
              <h1>Have an existing account? <span>Log in.</span></h1>
              <div class="input-container">
                <label htmlFor="username">
                  <small>Username</small>
                </label>
                <input name="username" type="text" />
              </div>
              <div class="input-container">
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div class="input-container">
                <button type="submit">{displayName}</button>
              </div>
              {error && <div> {error} </div>}
              <a href="/signup">Don't have one? Sign up here</a>
            </form>
          )
        }
    </div>
  );
};

export default AuthForm;
