import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(['Email and Password combination is invalid.']);
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault()
    const data = await dispatch(login('DemoUser@gmail.com', 'Pass!1'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-cont'>
      <h1>Login</h1>
      <form onSubmit={onLogin}>

        <div className='login-form'>
        <div>
          {errors.map((error, ind) => (
            <div className='error' key={ind}>{error}</div>
          ))}
        </div>

          <div className='login-input'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              required
            />
          </div>
          <div className='login-input'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              required
            />
          </div>
          <button className='login-btn' type='submit'>Login</button>
          <button className='demo-btn' onClick={handleDemoUser}>Demo User</button>
        </div>
      </form>
    </div>

  );
};

export default LoginForm;
