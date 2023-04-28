import {useRef, useEffect, useContext} from 'react'
import classes from './auth.module.css';
// import { Button, Form, Input } from 'antd';
import { AuthContext } from '../../context/authContext';


function UpdateProfile() {
    const enteredNameRef = useRef()
    const enteredUrlRef = useRef()

    const { token } = useContext(AuthContext)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB0a1CXL6SvaRj0wzPycig1PD6v5LNdXg8'
        const options = {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {

            const res = await fetch(url, options)
            const data = await res.json()
            // console.log(data.users[0])
            enteredNameRef.current.value = data.users[0].displayName
            enteredUrlRef.current.value = data.users[0].photoUrl
        } catch (error) {
            console.error(error)
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault()

        const enteredName = enteredNameRef.current.value
        const enteredUrl = enteredUrlRef.current.value

        const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB0a1CXL6SvaRj0wzPycig1PD6v5LNdXg8"
        const options = {
            method: 'POST',
            body: JSON.stringify({
                displayName : enteredName,
                photoUrl : enteredUrl,
                idToken: localStorage.getItem('token'),

                returnSecureToken: true,
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
            <form onSubmit={submitHandler} className="form">
                <div className={classes.control}>
                    <label htmlFor='name'>Full Name : </label>
                    <input type='text' id='name' required ref={enteredNameRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='url'>Profile Photo URL :</label>
                    <input
                        type='text'
                        id='url'
                        required
                        ref={enteredUrlRef}
                    />
                </div>

                <div className={classes.actions}>

                    <button
                        type='submit'
                        className={classes.toggle}
                    >
                        Update
                    </button>

                </div>
            </form>
        </>
    )
}

export default UpdateProfile;
