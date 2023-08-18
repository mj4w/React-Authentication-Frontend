import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { reset_password_confirm } from '../actions/auth';

function ResetPasswordConfirm({ reset_password_confirm }) {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  });

  const { new_password, re_new_password } = formData;
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

  

    if (new_password !== re_new_password) {
      setPasswordMismatch(true);
      return;
    }

    try {
      const response = await reset_password_confirm(
        uid,
        token,
        new_password,
        re_new_password
      );

      if (response && response.status === 400) {
        const errorData = response.data;

        if (errorData.new_password) {
          setPasswordErrors(errorData.new_password);
        } else {
         
        
        }
      } else {
        setRequestSent(true);
        navigate('/');

      }
    } catch (error) {
      // Handle error if necessary
    }
  };

  if (requestSent) {
    
    // Message that congratulations for changing your password
    return navigate('/');
  }

  return (
    <div>
      <h1>Change Password: </h1>
      {passwordMismatch && (
          <p className="text-red-500">Passwords do not match.</p>
        )}
      {passwordErrors.length > 0 && (
        <div className='text-red-500'>
          {passwordErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div>
          <input
            className=""
            type="password"
            placeholder="New Password"
            name="new_password"
            value={new_password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div>
          <input
            className=""
            type="password"
            placeholder="Re Type Password"
            name="re_new_password"
            value={re_new_password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>

        <button
          className="bg-green-500 text-[#fff] p-1 text-1xl rounded-md"
          type="submit"
        >
          Confirm Password
        </button>
      </form>
    </div>
  );
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
