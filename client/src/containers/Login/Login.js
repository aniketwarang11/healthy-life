import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import classes from './Login.module.css';
import Input from '../UI/Inputs/Input';
import Button from './../UI/Button/Button';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../../misc/ErrorNotice';
import Axios from 'axios';

function Login(props) {
    const [emailid, setEmailid] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext)
    const history = useHistory();

    const submit = async (event) => {
        event.preventDefault();
        try {
            const loginUser = { emailid, password }
            const loginRes = await Axios.post('http://localhost:5000/user/login', loginUser);
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
        <div>
            <form onSubmit={submit} >
                <h1 className={classes.H1} style={{ textAlign: "center" }}>Login</h1>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <div className={classes.Login}>
                    <h3>Login Please</h3>
                    <Input
                        type='email'
                        placeholder='Email Id'
                        change={(event) => setEmailid(event.target.value)}></Input>
                    <br />
                    <Input
                        type='password'
                        placeholder='Password'
                        change={(event) => setPassword(event.target.value)}></Input>
                    <div className={classes.Button}>
                        <Button buttonName={"Submit"} />
                    </div>
                </div>
            </form>
        </div >
    );
}

export default Login;