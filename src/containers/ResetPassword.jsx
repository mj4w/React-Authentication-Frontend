import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';

function ResetPassword({ reset_password }) {
    const navigate = useNavigate();
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
      email: ''
    });

    const { email } = formData;
    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = (e) => {
      e.preventDefault();
      reset_password(email);
      setRequestSent(true);
    };

    if (requestSent) {
      return navigate('/login')
    }
    return (
      <div>
        <h1>Reset Password: </h1>
        <form onSubmit={onSubmit}>
          <div>
            <input className=''
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
            required />
          </div>
          <button type='submit' className='bg-red-500 text-[#fff] p-1 text-1xl rounded-md'>Reset Password</button>
        </form>
        

      </div>
    )
}

export default connect(null, { reset_password })(ResetPassword);