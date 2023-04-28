// import React from 'react';
// import { Link } from 'react-router-dom';
import {useState} from 'react';
import UpdateProfile from './Auth/UpdateProfile';

function Home() {

  const [show, setShow] = useState(false);


  return (
    <>
    <div style={{display : 'flex', justifyContent: 'space-evenly', borderBottom: '2px solid gray'}}>

      <h1>Welcome to Expense Tracker</h1>
      {/* <p>Your Profile is Incomplete. <Link to="/update">Complete Now</Link></p> */}
      <p>Your Profile is Incomplete. <a href='#' onClick={() => setShow(prev => !prev)}>Complete Now</a></p>
      </div>
    {show && <UpdateProfile />}
    </>
  )
}

export default Home;