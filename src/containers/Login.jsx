import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const { email, password } = formData;
    const [error, setError] = useState('');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            if (error.response && error.response.data && error.response.data.detail) {
                setError(error.response.data.detail);
            } else {
                setError('Email or Password is Incorrect! Please Try again later.');
            }
        } catch (error) {

        }
    };

    if (isAuthenticated) {
        return navigate('/');
    }

    return (
        <div className='items-center justify-center m-auto'>
             {error && <div className='text-red-500'>{error}</div>}
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
        
            <form onSubmit={onSubmit}>
                <div className=''>
                    <input
                        className=''
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
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
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='bg-blue-500 text-[#fff] p-1 text-1xl rounded-md mt-4' type='submit'>Login</button>
            </form>
            <p className='mt-3'>
                Don't have an account? <Link className='bg-yellow-500 text-[#fff] p-1 text-1xl rounded-md' to='/signup'>Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your Password? <Link className='bg-red-500 text-[#fff] p-1 text-1xl rounded-md' to='/reset-password'>Reset Password</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
