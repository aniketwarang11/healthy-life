import React, { useEffect, useContext, useState } from 'react';
import Input from '../UI/Inputs/Input';
import Button from '../UI/Button/Button';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import classes from './WeightLoss.module.css';
import { RiCloseCircleLine } from 'react-icons/ri';

function WeightLoss() {

    const { userData } = useContext(UserContext);
    const history = useHistory();


    useEffect(() => {
        if (!userData.user) history.push('/login');
    });

    const [firstInput, setFirstInput] = useState(0);
    console.log(firstInput);

    const [secondInput, setSecondInput] = useState('');

    const [toggle, setToggle] = useState(false);

    const fInput = parseInt(firstInput, 10);
    const sInput = parseInt(secondInput, 10);

    const totalWeight = fInput - sInput;

    const inTakeCalories = ((totalWeight) * (1.0) * (24) * (0.95) * (1.65)).toFixed(2);

    const handelFirstChange = (e) => {
        setFirstInput(e.target.value)
    }

    const handelSecondChange = (e) => {
        setSecondInput(e.target.value)
    }

    const faWindowCloseHandler = (e) => {
        e.preventDefault();
        setToggle(false);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setToggle(true)
    }
    const [display, setDisplay] = useState(true);

    // if (firstInput === 0) {
    //     setDisplay(false);
    // }

    return (
        <div>
            <form className={classes.Weight} onSubmit={onSubmitHandler}>
                <h1 className={classes.H1}>WeightLoss</h1>
                <div className={classes.WeightLoss}>
                    <h4>Your Current Weight in kg</h4><br />
                    <Input
                        type={"text"}
                        placeholder={"eg: 95"}
                        value={firstInput}
                        change={handelFirstChange}
                    /><br />
                    <h4 style={{ marginTop: "8px" }}>How Much Weight You Want to Loose ?</h4> <br />
                    <Input
                        type={"text"}
                        placeholder={"eg: 12"}
                        value={secondInput}
                        change={handelSecondChange}
                    /><br />
                    <Button buttonName={"Calculate"} />
                </div>
            </form>
            {toggle ? (display ? (<div className={classes.Calories} >
                <p> You have to take {inTakeCalories} calories/day</p>
                < RiCloseCircleLine
                    onClick={faWindowCloseHandler}
                    style={{
                        paddingRight: '10px',
                        fontSize: '1.5em'
                    }} />
            </div>) : (
                    <div className={classes.Calories} >
                        <p> Please enter valid input </p>
                        < RiCloseCircleLine
                            onClick={faWindowCloseHandler}
                            style={{
                                paddingRight: '10px',
                                fontSize: '1.5em'
                            }} />
                    </div>
                )
            ) : null}

        </div>
    );
}

export default WeightLoss;