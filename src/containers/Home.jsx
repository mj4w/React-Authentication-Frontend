import React from 'react';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated, user }) => (
    <div className='container'>
        {isAuthenticated && user ? (
            
            <div className='text-2xl font-extrabold'>Welcome,{user.id}: {user.email}!
             <p className='text-1xl font-semibold'>Ohayo, {user.first_name} {user.last_name}</p>
             </div>
           
        ) : (
            <h1>Welcome to React!</h1>
            
        )}
    </div>
);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
