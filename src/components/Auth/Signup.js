import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import classes from './auth.module.css';

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passConfirmRef = useRef();
  const navigate = useNavigate();


  // const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const switchAuthModeHandler = () => {
  //   setIsLogin((prevState) => !prevState);
  // };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const passConfirm = passConfirmRef.current.value;

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0a1CXL6SvaRj0wzPycig1PD6v5LNdXg8';

    if (enteredEmail != '' && enteredPassword != '' && passConfirm != '') {

      setIsLoading(true);

      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
             console.log('User has successfully signed up')
             navigate('/')
          } else {
            return res.json().then(() => {
              let errorMessage = 'Signup failed'

              throw new Error(errorMessage);
            });
          }
        })
        .catch((err) => {
          alert(err.message);
        });
      }
    };

    return (
      <section className={classes.auth}>
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='passConfirm'>Confirm Password</label>
            <input
              type='password'
              id='passConfirm'
              required
              ref={passConfirmRef}
            />
          </div>
          <div className={classes.actions}>

            {isLoading && <p>Sending request...</p>}
            <button
              type='submit'
              className={classes.toggle}
              onClick={submitHandler}
            >
              Create new account
            </button>
            {/* <p>Already have an account ? <Link to={'/login'}>Login...</Link></p> */}
            <p>Already have an account ? <Link to={'/'}>Login...</Link></p>
            
          </div>
        </form>
      </section>
    );
  };

export default Signup;