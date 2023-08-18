import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';



const Activate = ({ verify }) => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const { uid, token } = useParams();
  const verify_account = (e) => {
    verify(uid,token);
    setVerified(true);
    
  };
  if (verified) {
    return navigate('/')
  }
  return (
    <div>
      <h1>Verify your Account:</h1>
      <button onClick={verify_account}
      type='button' className='bg-green-500 text-[#fff] p-1 text-1xl rounded-md'>Verify</button>

    </div>
  )
}

export default connect(null, { verify })(Activate);