import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
    <div style={{display : 'flex', justifyContent: 'space-evenly', borderBottom: '2px solid gray'}}>

      <h1>Welcome to Expense Tracker</h1>
      <p>Your Profile is Incomplete. <Link to="/update">Complete Now</Link></p>
      </div>
    </>
  )
}

export default Home;