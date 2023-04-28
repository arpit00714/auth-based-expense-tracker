// import React from 'react';
// import { Link } from 'react-router-dom';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../context/authContext';
import UpdateProfile from './Auth/UpdateProfile';
import { useNavigate } from 'react-router-dom';
import Expenses from './Expense/Expenses';

function Home() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/login')
  }

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
    {/* <div style={{display : 'flex', justifyContent: 'space-evenly', borderBottom: '2px solid gray'}}> */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', borderBottom: '2px solid gray' }}>

      <h1>Welcome to Expense Tracker</h1>
      {/* <button onClick={handleClick}>Verify Email</button> */}
      <div>
          <button onClick={handleClick}>Verify Email</button>
          <button onClick={handleLogout}>Logout</button>

        </div>
      {/* <p>Your Profile is Incomplete. <Link to="/update">Complete Now</Link></p> */}
      <p>Your Profile is Incomplete. <a href='#' onClick={() => setShow(prev => !prev)}>Complete Now</a></p>
      </div>
      <Expenses />
    {show && <UpdateProfile />}
    </>
  )
}

export default Home;