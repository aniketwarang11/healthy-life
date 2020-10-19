import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import classes from './Register.module.css';
import Input from '../UI/Inputs/Input';
import Button from './../UI/Button/Button';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../../misc/ErrorNotice';

function Register(props) {
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [emailid, setEmailid] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [address, setAddress] = useState();
    const [error, setError] = useState();


    const { setUserData } = useContext(UserContext)
    const history = useHistory();

    const submit = async (event) => {
        event.preventDefault();
        try {
            const newUser = { fname, lname, emailid, password, confirmPassword, address }
            await Axios.post('http://localhost:5000/user/add', newUser);
            // .then(res => console.log(res.data))
            // .catch(err => console.log(err));
            const loginRes = await Axios.post('http://localhost:5000/user/login', { emailid, password });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }
    return (
        <div className={classes.Image}>
            <form onSubmit={submit} >
                <h1 className={classes.H1} style={{ textAlign: "center" }}>Register</h1>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <div className={classes.Register}>
                    <h3>Register Yourself</h3>
                    <Input
                        type='text'
                        placeholder='First Name'
                        change={(event) => setFname(event.target.value)}></Input>
                    <Input
                        type='text'
                        placeholder='Last Name'
                        change={(event) => setLname(event.target.value)}></Input>
                    <Input
                        type='email'
                        placeholder='Email Id'
                        change={(event) => setEmailid(event.target.value)}></Input>
                    <Input
                        type='password'
                        placeholder='Password'
                        change={(event) => setPassword(event.target.value)}></Input>
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        change={(event) => setConfirmPassword(event.target.value)}></Input>
                    <Input
                        type='text'
                        placeholder='Address'
                        change={(event) => setAddress(event.target.value)}></Input>
                    <div className={classes.Button}>
                        <Button buttonName={"Register"} />
                    </div>
                </div>
            </form>
        </div >
    );
}

export default Register;