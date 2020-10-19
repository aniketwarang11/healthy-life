import React from 'react';
import Button from '../containers/UI/Button/Button';
import classes from './ErrorNotice.module.css';

export default function ErrorNotice(props) {
    return (
        <div className={classes.Enotice}>
            <span>{props.message}</span>
            <Button buttonName={"x"} clicked={props.clearError} />
        </div>
    )
}
