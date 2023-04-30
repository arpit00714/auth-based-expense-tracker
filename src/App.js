// import { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Home from './components/Home';
import './App.css';
import { useSelector } from 'react-redux';


function App() {
  
  const isDark = useSelector(state => state.theme.isDark)

  useEffect(() => {
      !isDark ? document.body.className = 'dark' : document.body.className = ''
  }, [isDark])

  return (
    <div className="App">
        {/* <Signup /> */}
        <Routes>
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
       
         {/* <Route path='/' element={<Login />} /> */}
         <Route path='/login' element={<Login />} />

      </Routes>
    </div>
  )
}

export default App;