import classes from './TasksForm.module.css';
import React, { useState, useEffect, useRef } from 'react';


function TasksForm(props) {
    const [input, setInput] = useState('');

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus()
    })

    const handelChange = (e) => {
        setInput(e.target.value)
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
        })
        setInput('');
    }

    return (
        <form onSubmit={handelSubmit} className={classes.Form}>
            <input
                type="text"
                placeholder="Enter the task you want to do"
                value={input}
                name="text"
                onChange={handelChange}
                ref={inputRef}
            ></input>
            <button>Add Task</button>
        </form>
    )
}

export default TasksForm
