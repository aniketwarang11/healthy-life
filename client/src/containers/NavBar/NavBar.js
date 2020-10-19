import React, { useState, useContext } from 'react';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

function NavBar(props) {

    const [toggle, setToggle] = useState(true);
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const logOutHandler = async (event) => {
        event.preventDefault();
        setUserData({
            token: undefined,
            user: undefined,
        })
        localStorage.setItem("auth-token", "");
        history.push("/login");
        onClickHandler();

    }

    const onClickHandler = () => {
        setToggle(!toggle)
    }

    return (
        <nav className={classes.NavBar}>
            <div className={classes.Hamburger}
                onClick={onClickHandler}>
                <div className={toggle ? classes.Line : classes.LineDiv1}></div>
                <div className={toggle ? classes.Line : classes.LineDiv2}></div>
                <div className={toggle ? classes.Line : classes.LineDiv3}></div>
            </div>
            <h3 className={classes.Fitness}>Fitness</h3>
            <ul className={toggle ? classes.NavBarUl : classes.NavBarUlOpen}>
                {
                    userData.user ? (
                        <li><Link to="/logout"
                            onClick={logOutHandler}>
                            Log Out</Link></li>) : (
                            <>
                                <li><Link to="/register"
                                    onClick={onClickHandler}>
                                    Register</Link></li>
                                <li><Link to="/login"
                                    onClick={onClickHandler}>
                                    Login</Link></li>
                            </>
                        )}
                <li><Link to="/posts"
                    onClick={onClickHandler}>
                    Posts</Link></li>
                <li><Link to="/add-post"
                    onClick={onClickHandler}>
                    Add Post</Link></li>
                <li><Link to={{
                    pathname: '/weight-loss',
                    // hash: '#claculate',
                    // search: '?quick-calculate=true'
                }}
                    onClick={onClickHandler}>
                    Weight Loss</Link></li>
                <li><Link to="/weight-gain"
                    onClick={onClickHandler}>
                    Weight Gain</Link></li>
                <li><Link to="/"
                    onClick={onClickHandler}>
                    Home</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
