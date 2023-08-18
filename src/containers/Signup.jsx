import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

const Signup = ({ signup, isAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  });
  const [emailExists, setEmailExists] = useState(false);
  const [firstNameExists, setFirstNameExists] = useState(false);
  const [lastNameExists, setLastNameExists] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setPasswordMismatch(false);
    setEmailExists(false);
    setFirstNameExists(false);
    setLastNameExists(false);
  
    if (password !== re_password) {
      setPasswordMismatch(true);
    } else {
      const response = await signup(first_name,last_name, email, password, re_password);
  
      if (response && response.status === 400) {
        const errorData = response.data;
  
        if (errorData.first_name) {
          setFirstNameExists(true);
        }
        if (errorData.last_name) {
          setLastNameExists(true);

        }
        if (errorData.email) {
          setEmailExists(true);
        }
        if (errorData.password) {
          setPasswordErrors(errorData.password);
        }
      } else {
        navigate('/login');
      }
    }
  };

  if (isAuthenticated) {
    return navigate('/');
  }

  return (
    <div className='items-center justify-center m-auto'>
      <h1>Sign Up</h1>
      <p>Sign up for an Account</p>
      {passwordMismatch && <div className='text-red-500'>Password Not Match</div>}
      {firstNameExists && <div className='text-red-500'>First Name already exists</div>}
      {lastNameExists && <div className='text-red-500'>Last Name already exists</div>}
      {emailExists && <div className='text-red-500'>Email already exists</div>}
      {passwordErrors.length > 0 && (
        <div className='text-red-500'>
          {passwordErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className=''>
          <input
            className=''
            type='text'
            placeholder='First Name'
            name='first_name'
            value={first_name}
            onChange={onChange}
            required
          />
        </div>
        <div className=''>
          <input
            className=''
            type='text'
            placeholder='Last Name'
            name='last_name'
            value={last_name}
            onChange={onChange}
            required
          />
        </div>
        <div className=''>
          <input
            className=''
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className=''>
          <input
            className=''
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <div className=''>
          <input
            className=''
            type='password'
            placeholder='Confirm Password'
            name='re_password'
            value={re_password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <button className='bg-yellow-500 text-[#fff] p-1 text-1xl rounded-md mt-4' type='submit'>
          Sign Up
        </button>
      </form>
      <p className='mt-3'>
        Already have an account? <Link className='bg-blue-500 text-[#fff] p-1 text-1xl rounded-md' to='/login'>Login</Link>
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
