import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
    return (
        <div>
            <button className={classes.Button} onClick={props.clicked}>{props.buttonName}</button>
        </div>
    )
}

export default button;