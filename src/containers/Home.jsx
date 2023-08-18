import React from 'react';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated, user }) => (
    <div className='container'>
        {isAuthenticated && user ? (
            
            <div>Welcome,{user.id}: {user.email}!
             <p>Ohayo, {user.first_name} {user.last_name}</p>
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
