// import React from 'react';
// import { Link } from 'react-router-dom';
import {useState, useContext} from 'react';
import {AuthContext} from '../context/authContext';
import UpdateProfile from './Auth/UpdateProfile';

function Home() {

  const [show, setShow] = useState(false);

  const {token} = useContext(AuthContext)

  const handleClick = async () => {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB0a1CXL6SvaRj0wzPycig1PD6v5LNdXg8";
    const options = {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {

      const res = await fetch(url, options)
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
    <div style={{display : 'flex', justifyContent: 'space-evenly', borderBottom: '2px solid gray'}}>

      <h1>Welcome to Expense Tracker</h1>
      <button onClick={handleClick}>Verify Email</button>
      {/* <p>Your Profile is Incomplete. <Link to="/update">Complete Now</Link></p> */}
      <p>Your Profile is Incomplete. <a href='#' onClick={() => setShow(prev => !prev)}>Complete Now</a></p>
      </div>
    {show && <UpdateProfile />}
    </>
  )
}

export default Home;