import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const onSignUp = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    setErrors([])

    const nums = '1234567890'
    const specialChars = "`~!@#$%^&*()_+-=\\|}{[]"
    const alpha = 'qwertyuiopasdfghjklmnbvcxz'

    let passNums = 0
    let passSpecialChars = 0
    let passAlphas = 0

    let uniqueEmail = true
    let uniqueUsername = true

    for (let i = 0; i < users.length; i++) {
      let user = users[i]
      if (user.email === email) uniqueEmail = false
      if (user.username === username) uniqueUsername = false
    }

    if (!uniqueEmail) setErrors((errors) => [...errors, 'Email is already taken.'])
    if (!uniqueUsername) setErrors((errors) => [...errors, 'Username is already taken.'])

    for (let i = 0; i < password.length; i++) {
      let char = password[i]
      if (nums.includes(parseInt(char))) passNums++
      if (specialChars.includes(char)) passSpecialChars++
      if (alpha.toUpperCase().includes(char)) passAlphas++
    }

    if (!email.includes("@") &&
      !email.endsWith(".com") &&
      !email.endsWith(".org") &&
      !email.endsWith(".io") &&
      !email.endsWith(".net")) {
      setErrors((errors) => [...errors, 'Please provide a valid email.'])
    }

    if (passNums === 0 || passSpecialChars === 0 || passAlphas === 0) {
      setErrors((errors) => [...errors, 'Password must contain a number, uppercase letter and special character.'])
    }

    if (password !== repeatPassword) {
      setErrors((errors) => [...errors, 'Passwords do not match.'])
    }

    if (password.length <= 5) {
      setErrors((errors) => [...errors, 'Password must be no less than 5 characters.'])
    }

    if (username.length > 20) {
      setErrors((errors) => [...errors, 'Username must be no more than 20 characters.'])
    }


    console.log(((password === repeatPassword) &&
      (passAlphas > 0 && passNums > 0 && passSpecialChars > 0) &&
      (email.includes("@") ||
        email.endsWith(".com") ||
        email.endsWith(".org") ||
        email.endsWith(".io") ||
        email.endsWith(".net")) &&
      (uniqueEmail && uniqueUsername)))

    if ((password === repeatPassword) &&
      (passAlphas > 0 && passNums > 0 && passSpecialChars > 0) &&
      (email.includes("@") ||
        email.endsWith(".com") ||
        email.endsWith(".org") ||
        email.endsWith(".io") ||
        email.endsWith(".net")) &&
      (uniqueEmail && uniqueUsername) &&
      (password.length > 5) &&
      (username.length <= 20)
    ) {

      console.log(username, email, password)
      const data = await dispatch(signUp(username, email, password));
      setSubmitted(false)
      if (data) {
        setErrors([data])
      }
    } else {
      setSubmitted(false)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-cont'>
      <h1>Signup</h1>
      <form onSubmit={onSignUp}>
        <div className='signup-form'>
          <div>
            {errors.map((error, ind) => (
              <div className='error' key={ind}>{error}</div>
            ))}
          </div>
          <div className='signup-form-input'>
            <label>Username</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required
            ></input>
          </div>
          <div className='signup-form-input'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div className='signup-form-input'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div className='signup-form-input'>
            <label>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button disabled={submitted} type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
