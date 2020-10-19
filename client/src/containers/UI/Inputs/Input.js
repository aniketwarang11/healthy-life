import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    return (
        <div className={classes.Input}>
            <input type={props.type} placeholder={props.placeholder} onChange={props.change}></input>
        </div>
    );
}

export default input;