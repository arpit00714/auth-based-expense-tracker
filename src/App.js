import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Home from './components/Home';
import './App.css';

function App() {

  return (
    <div className="App">
        {/* <Signup /> */}
        <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;